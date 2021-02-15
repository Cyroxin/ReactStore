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
} from 'react-native';
import { Container, Header, Content, Icon, Picker, Form, List, ListItem, Card, CardItem, Thumbnail, Left, Body, Button, Right } from 'native-base';
import Carousel from './Components/Carousel';
import FloatingNavigator from './Components/FloatingNavigator';
import SortSelector from './Components/SortSelector';

export default function App() {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const simg = {
    width: width,
    height: 300,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
  };

  const slistimg = {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
  };

  return (
    <View>
    <ScrollView style={{height:height}}>
      {/* Announcement Banners / Manually Highlighted Posts */}
      <Carousel>
        <Image source={{ uri: `https://dummyimage.com/800x400/daabdb/000000` }} style={simg}></Image>
        <Image source={{ uri: `https://dummyimage.com/800x400/dbbbdb/000000` }} style={simg}></Image>
        <Image source={{ uri: `https://dummyimage.com/800x400/dccbdb/000000` }} style={simg}></Image>
        <Image source={{ uri: `https://dummyimage.com/800x400/dddbdb/000000` }} style={simg}></Image>
        <Image source={{ uri: `https://dummyimage.com/800x400/deebdb/000000` }} style={simg}></Image>
      </Carousel>
      {/* Sort */}
      <SortSelector></SortSelector>

      {/* List */}
      <List>
        <ListItem>
          <Card style={{width: '100%'}}>
            <CardItem cardBody>
              <Image source={{uri: 'https://dummyimage.com/800x400/dadbab/000000'}} style={slistimg}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
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
          <Card style={{width: '100%'}}>
            <CardItem cardBody>
              <Image source={{uri: 'https://dummyimage.com/800x400/cadbbb/000000'}} style={slistimg}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
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
          <Card style={{width: '100%'}}>
            <CardItem cardBody>
              <Image source={{uri: 'https://dummyimage.com/800x400/badbcb/000000'}} style={slistimg}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>55 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
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

      {/* Navigation */}
    </ScrollView>
    <FloatingNavigator/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
