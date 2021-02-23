import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  FlatList,
  Platform,
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
  Footer,
} from 'native-base';
import Carousel from '../Components/Carousel';
import FloatingNavigator from '../Components/FloatingNavigator';
import SortSelector from '../Components/SortSelector';
import PostsList from '../Components/PostsList';
import { getPosts } from '../Hooks/Api';

export default function App(props) {
  const [width, setWidth] = useState(useWindowDimensions().width);
  const height = useWindowDimensions().height;

  const simg = {
    height: 300,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
    width: width,
    display: 'flex',
  };

  /* Announcement Banners / Manually Highlighted Posts */
  const carousel = (
    <Carousel width='100%'
     onContentSizeChangeInterval={w => setWidth(w)}>
      <Image
        source={{ uri: `https://dummyimage.com/800x400/daabdb/000000` }}
        style={simg}
      ></Image>
      <Image
        source={{ uri: `https://dummyimage.com/800x400/dbbbdb/000000` }}
        style={simg}
      ></Image>
      <Image
        source={{ uri: `https://dummyimage.com/800x400/dccbdb/000000` }}
        style={simg}
      ></Image>
      <Image
        source={{ uri: `https://dummyimage.com/800x400/dddbdb/000000` }}
        style={simg}
      ></Image>
      <Image
        source={{ uri: `https://dummyimage.com/800x400/deebdb/000000` }}
        style={simg}
      ></Image>
    </Carousel>
  );

  // style={{ height: height }}

  return (
    <>
      <PostsList
        ListHeaderComponent={
          <>
            {carousel}
            {/* Sort List */}
            <SortSelector></SortSelector>
          </>
        }
        items={getPosts()}
        style={{height: height}}
      />
      <FloatingNavigator
        onPress={[
          () => console.log('disabled by fabnav'),
          () => console.log('profile'),
          () => props.navigation.navigate('Upload'),
          () => console.log('home'),
        ]}
      />
    </>
  );
}
