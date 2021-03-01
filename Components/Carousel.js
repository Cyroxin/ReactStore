import React, { useEffect } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';

export const Carousel = (props) => {
  const children = props.items == undefined ? (props.children == undefined ? [] : props.children) : props.items; 

  // Check if content is manually set as node children or if data is given.
  const manual = () => props.items != undefined;

  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [scroll, setScroll] = React.useState();
  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = children.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
    //return offset / (width / intervals) + 1;
  };

  const getOffset = (interval) => {
    return (width / intervals) * (interval - 1);
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        onPress= {(e) => {
          scroll.scrollTo({ x: getOffset(i), animated: true });
        }}
        style={{
          fontSize: 50,
          paddingHorizontal: 10,
          opacity: interval === i ? 0.5 : 0.2,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <ScrollView
        horizontal={true}
        ref={(scroller) => {
          setScroll(scroller);
        }}
        contentContainerStyle={{
          width: `${100 * intervals}%`,
          justifyContent: 'center'
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => {init(w); props.onContentSizeChangeInterval(w/intervals/itemsPerInterval,h);}}
        onScroll={(data) => {
          // Set the width to match the slide, not needed if slide sizes do not change/differ.
          setWidth(data.nativeEvent.contentSize.width);
          // Remember the current slide
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={1} // Do not show bullet opacity change done by animation
        pagingEnabled
        decelerationRate='normal'
        disableIntervalMomentum={true} // Max slide change is (+/-)1
        snapToInterval={width / intervals}
      >
        {manual ? children : children.map((value, index) => {
          <Image
            source={{ uri: value.url }}
            style={{
              height: 300, resizeMode: 'cover', aspectRatio: 800 / 400, width: width, display: 'flex'}}
          ></Image>;
        })}
      </ScrollView>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'} }>
        {bullets}
      </View>
    </View>
  );
};

export default Carousel;
