import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect, useContext } from 'react';
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
  Title,
  Textarea,
} from 'native-base';
import useUploadForm from '../Hooks/UploadHooks';
import Carousel from '../Components/Carousel';
import FloatingNavigator from '../Components/FloatingNavigator';
import SortSelector from '../Components/SortSelector';

const Upload = (props) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  // This is reused for each text component the user adds.
  const [input, setInput] = useState();

  const content = (
    <Content padder>
      <Item
        underline={false}
        style={{ width: '100%', margin: 20, flexDirection: 'column' }}
      >
        <Textarea
          disabled
          multiline
          underline={false}
          onChangeText={(text) => setInput(text)}
          value='Some already written text that cannot be changed.'
          style={{ textAlignVertical: 'top', width: '100%' }}
        />
      </Item>
      <Image
        source={{ uri: 'https://dummyimage.com/800x400/badbcb/000000' }}
        style={img}
      />
      <Item
        underline={false}
        style={{ width: '100%', margin: 10, flexDirection: 'column' }}
      >
        <Input
          multiline
          style={{ textAlignVertical: 'top', width: '100%' }}
          numberOfLines={10}
          placeholder={'Freshly added textbox, press check when done.'}
        />
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ color: 'red', padding: 5, margin: 10 }}
            name='close-circle'
          />
          <Icon
            style={{ color: 'green', padding: 5, margin: 10 }}
            name='checkmark-circle'
          />
        </View>
      </Item>
    </Content>
  );

  return (
    <>
      <ScrollView style={{ height: height }}>{content}</ScrollView>
      <FloatingNavigator
        upload
        onPress={[
          () => props.navigation.goBack(),
          () => props.navigation.goBack(),
          () => console.log('image'),
          () => console.log('text'),
        ]}
      />
    </>
  );
};

const img = {
  width: 800,
  height: 400,
  resizeMode: 'center',
  aspectRatio: 800 / 400,
  margin: 10,
  alignSelf: 'center',
};

export default Upload;
