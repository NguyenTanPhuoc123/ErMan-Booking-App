import {boolean, object, string} from 'yup';
import { User } from '../../../modules/user/model';

export const validationSchema = object<User>().shape({
  avatar: string().required(`Lỗi ảnh đại diện`),
  firstname: string().trim().required(`Họ không được để trống`),
  lastname: string().trim().required(`Tên không được để trống`),
  gender: boolean().required(`Lỗi giới tính`),
  birthday: string().required(`Lỗi ngày sinh`),
  address: string().trim().required(`Địa chỉ không được để trống`),
});
