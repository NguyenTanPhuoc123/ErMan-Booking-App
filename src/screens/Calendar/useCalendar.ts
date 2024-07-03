import {useState} from 'react';
import NavigationActionService from '../../navigation/navigation';

const useCalendar = () => {
  const [open, setOpen] = useState(false);
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);

  const goBack = () => {
    NavigationActionService.pop();
  };


  const [index, setIndex] = useState(0);

  return {index, setIndex,open,openPicker,closePicker,goBack};
};

export default useCalendar;


