import {object, ref, string} from 'yup';
import { IChangePasswordFormValues } from './model';

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const errorPassword =
  'Mật khẩu phải có ít nhất một chữ cái in hoa, 1 chữ thường, 1 ký tự số và 1 ký tự đặc biệt';

export const validationChangePasswordSchema = object<IChangePasswordFormValues>().shape({
  oldPassword: string()
    .trim()
    .required(`Mật khẩu không được để trống`),
    newPassword: string()
    .trim()
    .required(`Mật khẩu không được để trống`)
    .min(8, `Mật khẩu quá ngắn`)
    .max(30, `Mật khẩu quá dài`)
    .matches(new RegExp(regexPassword), errorPassword),
  confirmNewPassword: string()
    .trim()
    .required(`Nhập lại mật khẩu không được để trống`)
    .oneOf(
      [ref('newPassword'), ''],
      `Không trùng khớp với mật khẩu đã nhập ở trên`,
    ),
});
