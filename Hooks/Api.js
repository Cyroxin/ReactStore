import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const apiurl = "https://media-new.mw.metropolia.fi/wbma";
const appId = "cyroxin"; // TODO: CHANGE ME

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ": " + json.error);
  } else if (!response.ok) {
    throw new Error("doFetch failed");
  } else {
    return json;
  }
};

// Gets a list of media either by userId or custom tag. If nothing is given, all app posts are shown.
const getPosts = async (userId, tag) => {
  try {
    const posts = await doFetch(
      userId == undefined
        ? tag == undefined
          ? apiurl + "/tags/" + appId
          : apiurl + "/tags/" + appId + `_${tag}`
        : apiurl + `/media/user/${userId}`
    );

    console.log(
      "search:" +
        (userId == undefined
          ? tag == undefined
            ? apiurl + "/tags/" + appId
            : apiurl + "/tags/" + appId + `_${tag}`
          : apiurl + `/media/user/${userId}`)
    );

    const likes = useLike();

    // Add media url to each json array element
    for (let index = 0; index < posts.length; index++) {
      const value = posts[index];

      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty("filename")) {
        const rawname = value.filename.substring(
          0,
          value.filename.lastIndexOf(".")
        );

        posts[index].url =
          value.media_type != "video"
            ? apiurl + "/uploads/" + value.filename
            : apiurl + "/uploads/" + rawname + ".png";

        posts[index].thumbnail = [
          apiurl + "/uploads/" + rawname + "-tn160.png",
          apiurl + "/uploads/" + rawname + "-tn320.png",
          apiurl + "/uploads/" + rawname + "-tn640.png",
        ];
      } else {
        posts[index].url = "";
        posts[index].thumbnail = [];
      }

      posts[index].likes = await likes.getLikesByFile(value.file_id);
      if (posts[index].likes == undefined) posts[index].likes = [];
    }

    return posts;
  } catch (exp) {
    console.log(exp.message);
  }
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tagList = await doFetch(apiurl + "/tags/" + tag);
      return tagList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postTag = async (tag, token) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify(tag),
    };
    try {
      const result = await doFetch(apiurl + "/tags", options);
      return result;
    } catch (error) {
      throw new Error("postTag error: " + error.message);
    }
  };
  return { getFilesByTag, postTag };
};

const useLike = () => {
  const getLikesByFile = async (postId) => {
    try {
      const likesList = await doFetch(apiurl + "/favourites/file/" + postId);
      return likesList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postLikes = async (file_id, token) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-access-token": token },
      body: JSON.stringify(file_id),
    };
    try {
      const result = await doFetch(apiurl + "/favourites", options);
      return result;
    } catch (error) {
      throw new Error("postTag error: " + error.message);
    }
  };
  return { getLikesByFile, postLikes };
};

const useMedia = () => {
  const upload = async (fd, token) => {
    const options = {
      method: "POST",
      headers: { "x-access-token": token },
      data: fd,
      url: apiurl + "/media",
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

const deleteMedia = async (token, fileId) => {
  const init = async () => {
    const headers = new Headers();
    headers.append("x-access-token", token);

    try {
      const response = await fetch(apiurl + `/media/${fileId}`, {
        method: "DELETE",
        headers: headers,
      });

      const json = await response.json();
      console.log("API DELETING:", json);

      return json;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

const updateMedia = async (
  token,
  mediaId,
  title = undefined,
  desc = undefined
) => {
  const init = async () => {
    const data = { title: title, description: desc };

    const options = {
      method: "PUT",
      headers: {
        "x-access-token": token,
      },
      data: data,
      url: apiurl + `/media/${mediaId}`,
    };

    try {
      const response = await axios(options);
      const data = response.data;
      console.log(data);
      return data;
    } catch (exp) {
      console.log(exp.message);
    }
  };

  return await init();
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
    };
    try {
      const userData = await doFetch(apiurl + "/login", options);
      return userData;
    } catch (error) {
      throw new Error("postLogin error: " + error.message);
    }
  };
  return { postLogin };
};

const useUser = () => {
  const postRegister = async (inputs) => {
    console.log("trying to create user", inputs);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    try {
      const json = await doFetch(apiurl + "/users", fetchOptions);
      console.log("register resp", json);
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const checkToken = async (token) => {
    try {
      const options = {
        method: "GET",
        headers: { "x-access-token": token },
      };
      const userData = await doFetch(apiurl + "/users/user", options);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const checkIfUserIsAvailable = async (username) => {
    try {
      const result = await doFetch(apiurl + "/users/username/" + username);
      return result.available;
    } catch (error) {
      throw new Error("apiHooks checkIfUserIsAvailable", error.message);
    }
  };
  const getUserById = async (id, token) => {
    try {
      const options = {
        headers: {
          method: "GET",
          "x-access-token": token,
        },
      };

      const userData = await doFetch(apiurl + "/users/" + id, options);
      return userData;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {
    postRegister,
    checkToken,
    checkIfUserIsAvailable,
    getUserById,
  };
};

export {
  apiurl as url,
  getPosts,
  useTag,
  useLike,
  useMedia,
  useLogin,
  useUser,
  deleteMedia,
  updateMedia,
};
