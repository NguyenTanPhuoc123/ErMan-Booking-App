import { useDispatch } from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import { useState } from 'react';

const usePreviewRating = () => {
  const dispatch = useDispatch();
  const [rating,setRating] = useState(1);
  const goBack = () => {
    NavigationActionService.pop();
  };
  return {goBack, rating,setRating};
};

export default usePreviewRating;
