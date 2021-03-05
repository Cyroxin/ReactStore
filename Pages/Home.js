import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  Touchable,
  TouchableOpacityBase,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  useWindowDimensions,
} from 'react-native';
import Carousel from '../Components/Carousel';
import FloatingNavigator from '../Components/FloatingNavigator';
import SortSelector from '../Components/SortSelector';
import PostsList from '../Components/PostsList';
import { getPosts } from '../Hooks/Api';

const Home = (props) => {
  const [width, setWidth] = useState(useWindowDimensions().width);
  const height = useWindowDimensions().height;

  const simg = {
    height: 400,
    resizeMode: 'cover',
    aspectRatio: 800 / 400,
    width: width,
  };

  const banner = {
    width: width,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  /* Announcement Banners / Manually Highlighted Posts */
  const carousel = (
    <Carousel onContentSizeChangeInterval={(w) => setWidth(w)}>
      <TouchableWithoutFeedback onPress={(e) => console.log('Handicraft')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Handicraft</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={(e) => console.log('Art')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Art</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={(e) => console.log('Textiles')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Textiles</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={(e) => console.log('Electronics')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Electronics</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={(e) => console.log('Crafts')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Crafts</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={(e) => console.log('Food and Drink')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Food and Drink</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={(e) => console.log('Other')}>
        <View style={{ ...banner, backgroundColor: '#d9baba' }}>
          <Text style={{ fontSize: 50 }}>Other</Text>
        </View>
      </TouchableWithoutFeedback>
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
        items={getPosts(undefined, props.tag)}
        style={{ height: height }}
      />
      <FloatingNavigator
        onPress={[
          () => console.log('disabled by fabnav'),
          () => props.navigation.navigate('Profile'),
          () => props.navigation.navigate('Upload'),
          () => console.log('home'),
        ]}
      />
    </>
  );
};

export default Home;
