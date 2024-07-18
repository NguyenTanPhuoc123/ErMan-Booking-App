import {boolean, object, string} from 'yup';
import {FormEditUser} from './useEditProfile';

export const validationSchema = object<FormEditUser>().shape({
  firstname: string().trim().required(`Họ không được để trống`),
  lastname: string().trim().required(`Tên không được để trống`),
  birthday: string().required(`Lỗi ngày sinh`),
  address: string().trim().required(`Địa chỉ không được để trống`),
});
