import {createRef} from 'react';
import {FlatList} from 'react-native';

const useService = () => {
  const categoryRef = createRef<FlatList>();
  const serviceListRef = createRef<FlatList>();
  return {categoryRef, serviceListRef};
};

export default useService;
