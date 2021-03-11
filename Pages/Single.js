import React from "react";
import PropTypes from "prop-types";

import FloatingNavigator from "../Components/FloatingNavigator";
import { ActivityIndicator } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native";
import { Text } from "native-base";

const Single = (props) => {
  const { itemUrl } = props.route.params;
  const { userId } = props.route.params;
  const { description } = props.route.params;
  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{
            uri: itemUrl,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text>Description: {description}</Text>
      </Card>
      <FloatingNavigator
        back
        onPress={[
          () =>
            userId != undefined &&
            //props.posts != undefined &&
            props.navigation.goBack(),
          () => navigation.navigate("Profile"),
          () => navigation.navigate("Upload"),
          () => console.log("home"),
        ]}
      />
    </ScrollView>
  );
};

export default Single;
