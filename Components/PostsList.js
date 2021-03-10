import {
  Body,
  Button,
  Icon,
  Card,
  CardItem,
  Left,
  List,
  ListItem,
  Picker,
  Right,
  Content,
} from "native-base";
import Post from "./Post";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Platform,
  Image,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";

/* Accepts either array Items[] or loader function which accepts loader(start,limit) index calls */
const PostsList = ({ props }) => {
  //const children = props.children;
  //const columns = Platform.OS == "web" ? 3 : 1;

  /* Items[] element data:
    url       String  Link to the post image
    thumbnail Array[String] Link to the post thumbnail images
    screenshot String Link to the video thumbnail, media is a video.
    file_id 	Number  Id of the media file.
    user_id 	Number  Id of the user.
    filename 	String  Name of the media file in the uploads folder.
    filesize 	String  Size of the media file in bytes.
    title 	String 	Title of the media file.
    likes   Array   Post like data.
    description 	String 	File description.
    media_type 	String 	audio, image or video
    mime_type 	String 	MIME type of the file.
    time_added 	String 	Upload time.
  */

  // TODO: Use thumbnails

  return (
    <FlatList
      ListHeaderComponent={props.ListHeaderComponent}
      contentContainerStyle={props.contentContainerStyle}
      style={props.style}
      data={props.items}
      keyExtractor={(_, index) => index.toString()}
      //numColumns={columns}
      // columnWrapperStyle={
      //   columns != 1 ? { justifyContent: "space-evenly" } : undefined
      // }
      renderItem={({ item }) => <Post />}
    />
  );
};

PostsList.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};

export default PostsList;
