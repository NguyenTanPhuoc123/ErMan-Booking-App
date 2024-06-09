import {object, ref, string} from 'yup';

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const errorPassword =
  'Mật khẩu phải có ít nhất một chữ cái in hoa, 1 chữ thường, 1 ký tự số và 1 ký tự đặc biệt';
export const validationSchema = object().shape({
  firstname: string().trim().required(`Họ không được để trống`),
  lastname: string().trim().required(`Tên không được để trống`),
  password: string()
    .trim()
    .required(`Mật khẩu không được để trống`)
    .min(8, `Mật khẩu quá ngắn`)
    .max(30, `Mật khẩu quá dài`)
    .matches(new RegExp(regexPassword), errorPassword),
  confirmPassword: string()
    .trim()
    .required(`Nhập lại mật khẩu không được để trống`)
    .oneOf(
      [ref('password'), ''],
      `Không trùng khớp với mật khẩu đã nhập ở trên`,
    ),
});
