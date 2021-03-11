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
  Button,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
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
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedia, useTag } from '../Hooks/Api';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../utils/GlobalStyle';

const appId = 'cyroxin'; // TODO: CHANGE ME

const Upload = (props) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  // This is reused for each text component the user adds.
  const [input, setInput] = useState();
  const { handleInputChange, inputs, uploadErrors, reset } = useUploadForm();
  const [image, setImage] = useState(null);
  const [fileType, setFileType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { upload } = useMedia();
  const { update, setUpdate } = useContext(MainContext);
  const { postTag } = useTag();
  const [tagInput, setTagInput] = useState('');
  const [value, onChangeText] = useState('');
  const catagory = [];
  if (tagInput != '') {
    catagory.push(tagInput);
  }

  if (value != '') {
    catagory.push(value);
  }
  // catagory.push('electronics');
  const executeUpload = async () => {
    const formData = new FormData();
    //add title to form
    formData.append('title', inputs.title);
    //add description to form
    formData.append('description', inputs.description);
    //add image to form
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `${fileType}/${match[1]}` : fileType;
    if (type === 'image/jpg') type = 'image/jpeg';

    formData.append('file', {
      uri: image,
      name: filename,
      type: type,
    });
    try {
      setIsUploading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await upload(formData, userToken);
      console.log('upload response', resp);
      const tagResponse = await postTag(
        {
          file_id: resp.file_id,
          tag: appId,
        },
        userToken
      );
      let tagCatagory;
      for (let i = 0; i < catagory.length; i++) {
        tagCatagory = await postTag(
          {
            file_id: resp.file_id,
            tag: `${appId}_${catagory[i]}`,
          },
          userToken
        );
      }

      console.log('posting app identifier', tagResponse);
      console.log('posting app catagory', tagCatagory);
      Alert.alert(
        'Upload',
        'File uploaded',
        [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              doReset();
              props.navigation.navigate('Home');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert('Upload', 'Failed');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async (library) => {
    let result = null;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };

    if (library) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      result = await ImagePicker.launchCameraAsync(options);
    }

    console.log(result);

    if (!result.cancelled) {
      setFileType(result.type);
      setImage(result.uri);
    }
  };

  const doReset = () => {
    setImage(null);
    reset();
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.headerText}>Upload Media file</Text>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '30%', aspectRatio: 1 }}
            />
          )}
          <Input
            style={styles.titleInput}
            placeholder='title'
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            errorMessage={uploadErrors.title}
          />
          <Input
            style={styles.descriptionInput}
            placeholder='description'
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            errorMessage={uploadErrors.description}
          />
          <View style={styles.picker}>
            <Picker
              selectedValue={tagInput}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setTagInput(itemValue)}
            >
              <Picker.Item label='Select' value='' />
              <Picker.Item label='Art' value='art' />
              <Picker.Item label='Textiles' value='textiles' />
              <Picker.Item label='Electronics' value='electronics' />
              <Picker.Item label='Crafts' value='crafts' />
              <Picker.Item label='Food and Drink' value='food and drink' />
            </Picker>
          </View>
          <Input
            style={{
              marginTop: 0,
              marginBottom: 10,
              borderColor: 'gray',
              borderWidth: 1,
              borderColor: 'black',
              padding: 8,
            }}
            placeholder='Other Catagory'
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />

          {isUploading && <ActivityIndicator size='large' color='#0000ff' />}

          <Button style={styles.resetButton} title='Reset' onPress={doReset} />
        </ScrollView>
        <FloatingNavigator
          upload
          onPress={[
            () => executeUpload(),
            () => props.navigation.goBack(),
            () => pickImage(true),
            () => pickImage(false),
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(204, 252, 236)',
  },
  kav: {
    flex: 1,
  },
  picker: {
    marginTop: 0,
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
  titleInput: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
  },
  descriptionInput: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 4,
  },
  catagoryText: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  resetButton: {
    marginTop: 10,
  },
});

export default Upload;
