import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
type TabsProps = {
  id: string;
  name: string;
};

const Tabs = (props: TabsProps) => {
  const {id, name} = props;
  return (
    <View>
      <Text>Name:{name}</Text>
    </View>
  );
};

export default Tabs;
