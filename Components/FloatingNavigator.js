import { Button, Container, Fab, Header, Icon } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Text, Platform, StyleSheet } from 'react-native';
import PopupInput from './PopupInput';

export const FloatingNavigator = (props) => {
  const children = props.children;

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
      active={upload ? true : expanded}
      direction='up'
      position='bottomRight'
      onPress={() => {
        if (hasPress) props.onPress[0]();

        if (!upload && !back) setExpanded(!expanded);
      }}
    >
      <Icon
        name={back ? 'arrow-back' : upload ? 'checkmark-sharp' : 'menu-sharp'}
      />
      <Button
        style={upload ? styles.red : styles.blue}
        onPress={hasPress && props.onPress[1]}
      >
        <Icon name={upload ? 'close-sharp' : 'person-sharp'} />
      </Button>
      <Button
        style={upload ? styles.green : styles.green}
        onPress={hasPress && props.onPress[2]}
      >
        <Icon name={upload ? 'images-sharp' : 'add'} />
      </Button>
      <Button
        style={upload ? styles.blue : styles.blue}
        onPress={hasPress && props.onPress[3]}
      >
        <Icon name={upload ? 'camera' : 'home-sharp'} />
      </Button>
    </Fab>
  );
};

const styles = StyleSheet.create({
  green: {
    backgroundColor: '#34A34F',
  },
  red: {
    backgroundColor: '#DD5144',
    color: 'white',
  },
  blue: {
    backgroundColor: '#3B5998',
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
});

export default FloatingNavigator;
