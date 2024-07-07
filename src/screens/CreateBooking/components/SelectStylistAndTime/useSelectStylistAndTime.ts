import moment from 'moment';
import {createRef, useState} from 'react';
import {FlatList} from 'react-native';

const useSelectStylistAndTime = () => {
  const stylistRef = createRef<FlatList>();
  const timeRef = createRef<FlatList>();
  const timeNow = moment(new Date()).format('HH:MM');
  const dateNow = moment(new Date()).format('DD-MM-YYYY');
  const [open, setOpen] = useState(false);
  const openPicker = () => {
    setOpen(true);
  };

  const closePicker = () => {
    setOpen(false);
  };
  return {
    stylistRef,
    timeRef,
    openPicker,
    closePicker,
    open,
    dateNow,
    timeNow,
  };
};

export default useSelectStylistAndTime;
