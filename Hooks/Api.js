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

// Gets a list of media
const getPosts = (userId = undefined) => {
  const [getReturn, setReturn] = useState();

  const init = async () => {
    try {
      const posts = await doFetch(
        userId == undefined
          ? apiurl + '/tags/' + appId
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
      const tagList = await doFetch(apiUrl + '/tags/' + tag);
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
      const result = await doFetch(apiUrl + '/tags', options);
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
      url: apiUrl + '/media',
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

export { apiurl as url, getPosts, useTag, useMedia };
