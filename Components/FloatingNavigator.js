import { Button, Container, Fab, Header, Icon } from 'native-base';
import React, { useEffect } from 'react';
import { View, ScrollView, Text, Platform, StyleSheet } from 'react-native';

export const FloatingNavigator = (props) => {
  const items = props.children;
  
  const upload = props.upload != undefined;
  const hasPress = props.onPress != undefined;

  const [floatingNavigator, setFloatingNavigator] = React.useState();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Fab
      ref={(c) => {
        setFloatingNavigator(c);
      }}
      active={upload ? true : expanded}
      direction='up'
      style={{flex: 0}}
      containerStyle={{}}
      position='bottomRight'
      onPress={
        upload ? hasPress && props.onPress[0] : () => setExpanded(!expanded)
      }
    >
      <Icon name={upload ? 'checkmark-sharp' : 'menu-sharp'} />
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
        <Icon name={upload ? 'text' : 'home-sharp'} />
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
    right: 30,
    bottom: 30,
  },
});

export default FloatingNavigator;
