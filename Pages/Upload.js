import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  FlatList,
  Platform,
  TextInput,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form,
  List,
  ListItem,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Button,
  Right,
  Fab,
  Input,
  Item,
} from 'native-base';
import Carousel from '../Components/Carousel';
import FloatingNavigator from '../Components/FloatingNavigator';
import SortSelector from '../Components/SortSelector';

export default function App(props) {
    // This is reused for each text component the user adds.
    const [input, setInput] = useState();

  const img = {
    width: 800,
    height: 400,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
    margin: 10,
    alignSelf: 'center',
  };

  const content = (
    <Content padder contentContainerStyle={{ maxHeight: 1 }}>
      <Item>
        <Input
          editable
          multiline
          style={{ height: 100, margin: 10 }}
          placeholder={
            'Something like this could be added once a textbox is requested. Obviously the checkmarks would be destroyed when writing has finished.'
          }
        />
        <Icon style={{ color: 'red', margin: 1 }} name='close-circle' />
        <Icon style={{ color: 'green', margin: 1 }} name='checkmark-circle' />
      </Item>
      <Image
        source={{ uri: 'https://dummyimage.com/800x400/badbcb/000000' }}
        style={img}
      />
      <Item>
        <Input
          editable
          multiline
          style={{ height: 100, margin: 10 }}
          placeholder={
            'Another long paragraph could be added here by the user. Below this there could be a video of some sort. Make these text boxes look better.'
          }
        />
        <Icon style={{ color: 'red', margin: 1 }} name='close-circle' />
        <Icon style={{ color: 'green', margin: 1 }} name='checkmark-circle' />
      </Item>
      <Image
        source={{ uri: 'https://dummyimage.com/800x400/badbcb/000000' }}
        style={img}
      />
    </Content>
  );

  return (
    <Container style={{ maxHeight: '100%' }}>
      {/* Add text, image & video components here once navigator pressed */}
      {/* Note: If Action button does not float properly, use height as is done in home. */}
      {content}
      <FloatingNavigator
        upload
        onPress={[
          () => props.navigation.goBack(),
          () => props.navigation.goBack(),
          () => console.log('image'),
          () => console.log('text'),
        ]}
      />
    </Container>
  );
}
