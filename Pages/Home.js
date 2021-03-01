import React, { useState } from 'react';
import {Image, useWindowDimensions} from 'react-native';
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
     onContentSizeChangeInterval={w => setWidth(w)}
     items={getPosts(undefined,'highlight')}>

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
