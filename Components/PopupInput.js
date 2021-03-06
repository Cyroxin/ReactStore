import { StatusBar } from 'expo-status-bar';
import { Icon, Input } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const popupInput = (props) => {
  // This is to manage Modal State
  const [modalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState('');

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input placeholder='Write here' style={styles.modalText} numberOfLines={1} value={inputValue} onChangeText={(text) => setInputValue(text)} />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Icon style={{color: 'red', padding: 10, margin: 2}} onPress={() => { 
                  setModalVisible(!modalVisible); props.onPress[0](inputValue); }} name='close-circle'/>
                   <Icon style={{color: 'green', padding: 10, margin: 2}} onPress={() => { 
                  setModalVisible(!modalVisible); props.onPress[1](inputValue); }} name='checkmark-circle'/>
              </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        {props.children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
    width: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default popupInput;