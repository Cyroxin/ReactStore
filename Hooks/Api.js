import { useEffect } from 'react';
import { useState } from 'react';

const apiurl = 'https://media-new.mw.metropolia.fi/wbma';
const appId = 'cyroxin'; // TODO: CHANGE ME

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    throw new Error('doFetch failed');
  } else {
    return json;
  }
};

// Gets a list of media either by userId or custom tag. If no tag is given, all app posts are shown.
const getPosts = (userId = undefined, tag = undefined) => {
  const [getReturn, setReturn] = useState();

  const init = async () => {
    try {
      const posts = await doFetch(
        userId == undefined
          ? tag == undefined
            ? apiurl + '/tags/' + appId
            : apiurl + '/tags/' + appId + `_${tag}`
          : apiurl + `/media/user/${userId}`
      );

      // Add media url to each json array element
      posts.forEach((value, index) => {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty('filename')) {
          const rawname = value.filename.substring(
            0,
            value.filename.lastIndexOf('.')
          );

          posts[index].url =
            value.media_type != 'video'
              ? apiurl + '/uploads/' + value.filename
              : apiurl + '/uploads/' + rawname + '.png';

          posts[index].thumbnail = [
            apiurl + '/uploads/' + rawname + '-tn160.png',
            apiurl + '/uploads/' + rawname + '-tn320.png',
            apiurl + '/uploads/' + rawname + '-tn640.png',
          ];
        } else {
          posts[index].url = '';
          posts[index].thumbnail = [];
        }
      });

      setReturn(posts);
    } catch (exp) {
      console.log(exp.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return getReturn;
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tagList = await doFetch(apiurl + '/tags/' + tag);
      return tagList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postTag = async (tag, token) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      body: JSON.stringify(tag),
    };
    try {
      const result = await doFetch(apiurl + '/tags', options);
      return result;
    } catch (error) {
      throw new Error('postTag error: ' + error.message);
    }
  };
  return { getFilesByTag, postTag };
};

const useMedia = () => {
  const upload = async (fd, token) => {
    const options = {
      method: 'POST',
      headers: { 'x-access-token': token },
      data: fd,
      url: apiurl + '/media',
    };
    try {
      const response = await axios(options);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return { upload };
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials),
    };
    try {
      const userData = await doFetch(apiurl + '/login', options);
      return userData;
    } catch (error) {
      throw new Error('postLogin error: ' + error.message);
    }
  };
  return { postLogin };
};

const useUser = () => {
  const postRegister = async (inputs) => {
    console.log('trying to create user', inputs);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const json = await doFetch(apiurl + '/users', fetchOptions);
      console.log('register resp', json);
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const checkToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: { 'x-access-token': token },
      };
      const userData = await doFetch(apiurl + '/users/user', options);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const checkIfUserIsAvailable = async (username) => {
    try {
      const result = await doFetch(apiurl + '/users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('apiHooks checkIfUserIsAvailable', error.message);
    }
  };
  const getUserById = async (id, token) => {
    try {
      const options = {
        headers: {
          method: 'GET',
          'x-access-token': token,
        },
      };

      const userData = await doFetch(apiurl + '/users/' + id, options);
      return userData;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return { postRegister, checkToken, checkIfUserIsAvailable, getUserById };
};

export { apiurl as url, getPosts, useTag, useMedia, useLogin, useUser };
