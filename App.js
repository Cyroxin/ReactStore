import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, useWindowDimensions } from 'react-native';
import Carousel from './Components/Carousel';

export default function App() {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  return (
    <View>
      <Carousel>
      <Image source = {{uri:`https://dummyimage.com/800x400/daabdb/000000`}} style={{width: width, height: 300, resizeMode: 'cover', aspectRatio: 800/400}}></Image>
      <Image source = {{uri:`https://dummyimage.com/800x400/dbbbdb/000000`}} style={{width: width, height: 300, resizeMode: 'cover', aspectRatio: 800/400}}></Image>
      <Image source = {{uri:`https://dummyimage.com/800x400/dccbdb/000000`}} style={{width: width, height: 300, resizeMode: 'cover', aspectRatio: 800/400}}></Image>
      <Image source = {{uri:`https://dummyimage.com/800x400/dddbdb/000000`}} style={{width: width, height: 300, resizeMode: 'cover', aspectRatio: 800/400}}></Image>
      <Image source = {{uri:`https://dummyimage.com/800x400/deebdb/000000`}} style={{width: width, height: 300, resizeMode: 'cover', aspectRatio: 800/400}}></Image>
      </Carousel>
      <Text style={{margin: 10, alignSelf: 'center'}}>Open up App.js to start working on your app!</Text>
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
  }
});
