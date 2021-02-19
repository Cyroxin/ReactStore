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

export default function App(props) {
  const [width, setWidth] = useState(useWindowDimensions().width);
  const height = useWindowDimensions().height;
    console.log('screenwidth: '+width)

  const simg = {
    height: 300,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
    width: width,
    display: 'flex',
  };

  const slistimg = {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
  };

  /* Announcement Banners / Manually Highlighted Posts */
  const carousel = (
    <Carousel width='100%' onContentSizeChangeInterval={(w,h) => {console.log('setwidth:'+w);setWidth(w);}}>
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

  const list = (
    <List>
      <ListItem>
        <Card style={{ width: '100%' }}>
          <CardItem cardBody>
            <Image
              source={{
                uri: 'https://dummyimage.com/800x400/dadbab/000000',
              }}
              style={slistimg}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name='thumbs-up' />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name='chatbubbles' />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>Jeff</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
      <ListItem>
        <Card style={{ width: '100%' }}>
          <CardItem cardBody>
            <Image
              source={{
                uri: 'https://dummyimage.com/800x400/cadbbb/000000',
              }}
              style={slistimg}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name='thumbs-up' />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name='chatbubbles' />
                <Text>2 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>Jeremy</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
      <ListItem>
        <Card style={{ width: '100%' }}>
          <CardItem cardBody>
            <Image
              source={{
                uri: 'https://dummyimage.com/800x400/badbcb/000000',
              }}
              style={slistimg}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name='thumbs-up' />
                <Text>55 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name='chatbubbles' />
                <Text>0 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>Candis</Text>
            </Right>
          </CardItem>
        </Card>
      </ListItem>
    </List>
  );


  const content = (
    <Content contentContainerStyle={{ maxHeight: 1 }}>
      {carousel}
      {/* Sort */}
      <SortSelector></SortSelector>
      {/* List */}
      {list}
    </Content>
  );

  return (
      <Container>
          {content}
        <FloatingNavigator
          onPress={[
            () => console.log('disabled by fabnav'),
            () => console.log('profile'),
            () => props.navigation.navigate('Upload'),
            () => console.log('home'),
          ]}
        />
      </Container>
  );
}
