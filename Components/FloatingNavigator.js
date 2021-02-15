import { Button, Container, Fab, Header, Icon } from 'native-base';
import React, { useEffect } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';

export const FloatingNavigator = (props) => {
  const items = props.children;

  const [floatingNavigator, setFloatingNavigator] = React.useState();
  const [expanded, setExpanded] = React.useState(false);

  return (
      <Fab
        ref={(c) => {
          setFloatingNavigator(c);
        }}
        active={expanded}
        direction='up'
        style={{ backgroundColor: '#5067FF' }}
        position='bottomRight'
        onPress={() => setExpanded(!expanded)}
      >
        <Icon name='share' />
        <Button style={{ backgroundColor: '#34A34F' }}>
          <Icon name='logo-whatsapp' />
        </Button>
        <Button style={{ backgroundColor: '#3B5998' }}>
          <Icon name='logo-facebook' />
        </Button>
        <Button disabled style={{ backgroundColor: '#DD5144' }}>
          <Icon name='mail' />
        </Button>
      </Fab>
  );
};

export default FloatingNavigator;
