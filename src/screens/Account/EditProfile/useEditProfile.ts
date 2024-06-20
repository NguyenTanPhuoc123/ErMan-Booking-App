import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IAuthState} from '../../../modules/auth/model';
import NavigationActionService from '../../../navigation/navigation';
import {useForm} from 'react-hook-form';
import {User} from '../../../modules/user/model';
import {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const useEditProfile = () => {
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  const {
    control,
    getValues,
    formState: {errors},
    setError,
  } = useForm<User>({
    defaultValues: {
      ...currentUser,
    },
  });
  const firstnameRef = useRef<TextInput>(null);
  const lastnameRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const [open,setOpen] = useState(false);
  const onFocusFirstname = () => {
    firstnameRef.current?.focus();
  };

  const onFocusLastname = () => {
    lastnameRef.current?.focus();
  };

  const onFocusAddress = () => {
    addressRef.current?.focus();
  };

  const formatStringDate = (dateStr:string) =>{
    const [date,month,year] =  dateStr.split('-');
    return `${year}-${month}-${date}`;
  }

  const goBack = () => {
    NavigationActionService.pop();
  };
  const openPicker = ()=> setOpen(true);
  const closePicker = ()=> setOpen(false);

  const onUploadAvatar = async() => {
    try {
       await DocumentPicker.pickSingle({
        mode:'open',
        type:DocumentPicker.types.images
      });
    } catch (error) {
      console.log('Error upload image: ', error);
    }
  };

  return {
    currentUser,
    goBack,
    firstnameRef,
    lastnameRef,
    control,
    errors,
    onFocusFirstname,
    onFocusLastname,
    open,
    openPicker,
    closePicker,
    formatStringDate,
    addressRef,
    onFocusAddress,
    onUploadAvatar
  };
};

export default useEditProfile;
