import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FloatingNavigator from "../Components/FloatingNavigator";
import { Image } from "react-native";

import { ScrollView, Alert } from "react-native";
import { Text, Card } from "native-base";
import { deleteMedia, getPosts } from "../Hooks/Api";

const Single = (props) => {
  const { item } = props.route.params.item;

  const checkOwner = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const postUserId = item.user_id.toString();
      return Boolean(userId == postUserId);
    } catch (e) {
      console.log(e);
    }
  };

  console.log({ checkOwner });

  return (
    <>
      <ScrollView>
        <Card>
          <Text> {item.title} </Text>
          <Image
            source={{
              uri: item.url,
            }}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              aspectRatio: 800 / 400,
            }}
          />
          <Text>{item.description}</Text>
        </Card>
      </ScrollView>
      <FloatingNavigator
        owner={checkOwner}
        onPress={[
          () => props.navigation.goBack(),
          async () => {
            console.log("DELETE POST", item);
            const userToken = await AsyncStorage.getItem("userToken");

            Alert.alert(
              "DELETE POST",
              "Are you sure?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    deleteMedia(userToken, item.file_id);
                    props.navigation.navigate("Home");
                  },
                },
              ],
              { cancelable: false }
            );
          },
        ]}
      />
    </>
  );
};

export default Single;
