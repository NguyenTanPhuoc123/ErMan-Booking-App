import {useState} from 'react';
import NavigationActionService from '../../navigation/navigation';

const useCalendar = () => {
  const [open, setOpen] = useState(false);
  const openPicker = () => setOpen(true);
  const closePicker = () => setOpen(false);


  const formatStringDate = (dateStr: string) => {
    const [date, month, year] = dateStr.split('-');
    return `${year}-${month}-${date}`;
  };
  const goBack = () => {
    NavigationActionService.pop();
  };


  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'january',
      title: 'Tháng 1',
    },
    {
      key: 'february',
      title: 'Tháng 2',
    },
    {
      key: 'march',
      title: 'Tháng 3',
    },
  ]);

  const category = [
    {
      id: 0,
      name: 'Tất cả',
    },
    {
      id: 1,
      name: 'Giảm giá',
    },
    {
      id: 2,
      name: 'Giảm giá',
    },
    {
      id: 3,
      name: 'Giảm giá',
    },
    {
      id: 4,
      name: 'Giảm giá',
    },
    
  ];



  return {index, setIndex, routes,category,open,openPicker,closePicker,formatStringDate,goBack};
};

export default useCalendar;


