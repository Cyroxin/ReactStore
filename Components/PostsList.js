import { Body, Button, Icon, Card, CardItem, Left, List, ListItem, Picker, Right, Content } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Text, Platform, Image, FlatList } from 'react-native';
import toReadableTime from '../utils/relativetime';

/* Accepts either array Items[] or loader function which accepts loader(start,limit) index calls */
export const PostsList = (props) => {
  const children = props.children;

  /* Items[] element data:
    url       String  Link to the post image
    thumbnail Array[String] Link to the post thumbnail images
    screenshot String Link to the video thumbnail, media is a video.
    file_id 	Number  Id of the media file.
    user_id 	Number  Id of the user.
    filename 	String  Name of the media file in the uploads folder.
    filesize 	String  Size of the media file in bytes.
    title 	String 	Title of the media file.
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
      renderItem={({ item }) => (
        <ListItem>
          <Card style={{ width: '100%' }}>
            <CardItem>
              <Text>{item.title}</Text>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{
                  uri: item.url,
                }}
                style={{
                  width: '100%',
                  height: 200,
                  resizeMode: 'cover',
                  aspectRatio: 800 / 400,
                }}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <>
                    <Icon active name='thumbs-up' />
                    <Text>12 Likes</Text>
                  </>
                </Button>
              </Left>
              <Body>
                <Button transparent style={{ alignSelf: 'center' }}>
                  <Icon active name='chatbubbles' />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>
                  Uploaded {toReadableTime(Date.parse(item.time_added))}
                </Text>
              </Right>
            </CardItem>
          </Card>
        </ListItem>
      )}
    />
  );
};

export default PostsList;
