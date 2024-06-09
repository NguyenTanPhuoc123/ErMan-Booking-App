import {object, string} from 'yup';

const regexPhone = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/;
export const validationSchema = object().shape({
  phone: string().trim().required(`Số điện thoại không được để trống`).matches(new RegExp(regexPhone), 'Số điện thoại không đúng định dạng')
});
