import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FloatingNavigator from "../Components/FloatingNavigator";
import { Image } from "react-native";
import { toReadableTime } from "../utils/relativetime";

import { ScrollView, Alert, StyleSheet } from "react-native";
import {
  Text,
  Card,
  CardItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Input,
} from "native-base";
import { deleteMedia, useLike } from "../Hooks/Api";

const Single = (props) => {
  const { item } = props.route.params.item;

  const checkOwner = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const postUserId = item.user_id.toString();
      return userId == postUserId;
    } catch (e) {
      console.log(e);
    }
  };

  const editText = (editmode) => {
    let myelement = undefined;
    if (editmode) {
      myelement = <Input placeholder='description'>{item.description}</Input>;
    } else {
      myelement = <Text>{item.description}</Text>;
    }
    return myelement;
  };

  return (
    <>
      <ScrollView style={styles.card}>
        <Card>
          <Input placeholder='Title'> {item.title} </Input>
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

          <CardItem>
            <Left>
              <Button transparent>
                <>
                  <Icon
                    active
                    name='thumbs-up'
                    onPress={async () => {
                      const token = AsyncStorage.getItem('userToken');
                      console.log('usedlike');
                      const likes = useLike();
                      await likes.postLikes(item.file_id, token).then(() => item.likes.push([]));
                    }}
                  />
                  <Text>{item.likes.length} Likes</Text>
                </>
              </Button>
            </Left>
            <Right>
              <Text>
                Uploaded {toReadableTime(Date.parse(item.time_added))}
              </Text>
            </Right>
          </CardItem>

          <CardItem>
            <Body>{editText(true)}</Body>
          </CardItem>
        </Card>
      </ScrollView>
      <FloatingNavigator
        owner={checkOwner()}
        onPress={[
          () => props.navigation.goBack(),

          async () => {
            console.log('DELETE POST', item);
            const userToken = await AsyncStorage.getItem('userToken');

            Alert.alert(
              'DELETE POST',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    deleteMedia(userToken, item.file_id);
                    props.navigation.navigate('Home');
                  },
                },
              ],
              { cancelable: false }
            );
          },

          (props) => {
            props.style = styles.red;
            editText(true);
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  description: {},
  card: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    marginTop: 20,
  },

  editmode: {
    backgroundColor: "gray",
  },
});

export default Single;
