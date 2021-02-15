import { Picker } from 'native-base';
import React, { useEffect } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';

export const SortSelector = (props) => {
  const items = props.children;

  const [selected, setSelected] = React.useState();

  return (
    <Picker
      mode='dropdown'
      style={{ width: 150 }}
      selectedValue={selected}
      onValueChange={(value) => {setSelected(value)}}
    >
      {/* Default: Take x amount */}
      <Picker.Item label='Newest' value='Newest' />
      {/* Sort by likes, take x amount */}
      <Picker.Item label='Trending' value='Trending' />
      {/* Sort by comments, take x amount */}
      <Picker.Item label='Hot' value='Hot' />
    </Picker>
  );
};

export default SortSelector;
