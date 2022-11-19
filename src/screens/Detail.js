/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';

const Detail = ({route, navigation}) => {
  // eslint-disable-next-line no-unused-vars
  const {todoTask, isCompleted} = route.params;
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Todo Detail
      </Text>
      <View style={{textAlign: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          Todo: <Text>{todoTask}</Text>
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          isCompleted: <Text>{JSON.stringify(isCompleted)}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Detail;
