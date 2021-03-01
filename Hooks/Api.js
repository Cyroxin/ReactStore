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
            const rawname = value.filename.substring(0, value.filename.lastIndexOf('.'));

              posts[index].url =
                value.media_type != 'video'
                  ? apiurl + '/uploads/' + value.filename
                  : apiurl + '/uploads/' + rawname + '.png';

              posts[index].thumbnail = [
                  apiurl + '/uploads/' + rawname + '-tn160.png',
                  apiurl + '/uploads/' + rawname + '-tn320.png',
                  apiurl + '/uploads/' + rawname + '-tn640.png',
              ]
        } else
        {
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





export {
    apiurl as url,
    getPosts,
};
