import { Body, Button, Icon, Card, CardItem, Left, Right } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Platform,
  Image,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { toReadableTime } from "../utils/relativetime";

/* Accepts either array Items[] or loader function which accepts loader(start,limit) index calls */
export const PostsList = (props) => {
  const children = props.children;
  const navigation = props.navigation;
  const columns = Platform.OS == "web" ? 3 : 1;

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
      numColumns={columns}
      columnWrapperStyle={
        columns != 1 ? { justifyContent: "space-evenly" } : undefined
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Single", {
              itemUrl: item.url,
              userId: item.user_id,
              description: item.description,
            });
          }}
        >
          <Card style={{ width: `${99 / columns}%` }}>
            <Image
              source={{
                uri: item.thumbnail[1],
              }}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
                aspectRatio: 800 / 400,
              }}
            />
            <CardItem>
              <Left>
                <Button transparent>
                  <>
                    <Icon active name="thumbs-up" />
                    <Text>{item.likes.length} Likes</Text>
                  </>
                </Button>
              </Left>
              <Body>
                <Text style={{ alignSelf: "center" }}>{item.title}</Text>
              </Body>
              <Right>
                <Text>
                  Uploaded {toReadableTime(Date.parse(item.time_added))}
                </Text>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
};

export default PostsList;
