import { StatusBar } from 'expo-status-bar';
import React from 'react';
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
} from 'native-base';
import Carousel from '../Components/Carousel';
import FloatingNavigator from '../Components/FloatingNavigator';
import SortSelector from '../Components/SortSelector';

export default function App() {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

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
    <Carousel width='100%'>
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

  const content = (
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
              <Text>Cyroxin</Text>
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
  });

  return (
    <>
      {Platform.OS == 'web' && carousel}
      <ScrollView
        style={{ height: '100%' }}
        onContentSizeChange={(w, h) => {setWidth(w); setHeight(h);}}
      >
        {Platform.OS != 'web' && carousel}
        {/* Sort */}
        <SortSelector></SortSelector>
        {content}
      </ScrollView>

      {/* Navigation */}
      <FloatingNavigator />
    </>
  );
}
