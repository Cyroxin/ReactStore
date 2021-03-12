import { setStatusBarHidden } from "expo-status-bar";
import { Button, Container, Fab, Header, Icon } from "native-base";
import React, { useEffect, useRef } from "react";
import { View, ScrollView, Text, Platform, StyleSheet } from "react-native";
import PopupInput from "./PopupInput";

export const FloatingNavigator = (props) => {
  const children = props.children;

  const owner = props.owner;
  const upload = props.upload != undefined;
  const back = props.back != undefined && props.back == true;
  const hasPress = props.onPress != undefined;

  const [floatingNavigator, setFloatingNavigator] = React.useState();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Fab
      style={styles.btn}
      {...props}
      ref={(c) => {
        setFloatingNavigator(c);
      }}
      active={upload || owner ? true : expanded}
      direction='up'
      position='bottomRight'
      onPress={() => {
        if (hasPress) props.onPress[0]();

        if (!upload && !back) setExpanded(!expanded);
      }}
    >
      <Icon
        name={
          back || owner
            ? 'arrow-back'
            : upload
            ? 'checkmark-sharp'
            : 'menu-sharp'
        }
      />
      <Button
        style={upload || owner ? styles.red : styles.blue}
        onPress={hasPress && props.onPress[1]}
      >
        <Icon name={upload || owner ? 'close-sharp' : 'home-sharp'} />
      </Button>
      <Button
        style={upload ? styles.green : styles.blue}
        onPress={hasPress && props.onPress[2]}
      >
        <Icon
          name={upload ? 'images-sharp' : owner ? 'pencil' : 'person-sharp'}
        />
      </Button>

{!owner && (
      <Button
        style={upload ? styles.blue : owner ? styles.hide : styles.green}
        onPress={hasPress && props.onPress[3]}
      >
        <Icon name={upload ? 'camera' : owner ? null : 'add'} />
      </Button>
    )}
    </Fab>
  );
};

const styles = StyleSheet.create({
  green: {
    backgroundColor: "#34A34F",
  },
  red: {
    backgroundColor: "#DD5144",
    color: "white",
  },
  blue: {
    backgroundColor: "#3B5998",
  },
  btn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  hide: {
    display: "none",
  },
});

export default FloatingNavigator;
