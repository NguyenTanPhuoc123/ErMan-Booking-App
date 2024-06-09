import {object, string} from 'yup';

export const validationSchema = object().shape({
  phone: string().trim().required(`Số điện thoại không được để trống`),
  password: string().trim().required(`Mật khẩu không được để trống`),
});
