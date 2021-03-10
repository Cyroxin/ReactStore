import React from "react";
import { Image } from "react-native";
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
  Text,
} from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { toReadableTime } from "../utils/relativetime";

const Post = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Single")}>
      <Card
        pointerEvents="none"
        //style={{ width: `${99 / columns}%` }}
      >
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
            <Text>Uploaded {toReadableTime(Date.parse(item.time_added))}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

Post.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};

export default Post;
