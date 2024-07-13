import {boolean, number, object, string} from 'yup';
import { FormInfoUserValues } from './model';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const validationSchema = object<FormInfoUserValues>().shape({
  firstname: string().trim().required(`Họ nhân viên không được để trống`),
  lastname: string().trim().required(`Tên nhân viên không được để trống`),
  email:string().trim().required(`Email không được để trống`).matches(new RegExp(regexEmail), 'Email không đúng định dạng'),
  birthday: string().trim().required('Ngày sinh không để trống'),
  password: string().trim().required('Mật khẩu không được để trống'),
  address: string(),
  workPlace: number().required('Nơi làm việc không được để trống'),
  timeStartWork: string().trim().required('Ngày bắt đầu làm việc không được để trống'),
  typeAccount: string().trim().required()
})