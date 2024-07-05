import {object, string} from 'yup';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validationSchema = object().shape({
  email: string()
    .trim()
    .required(`Email không được để trống`)
    .matches(new RegExp(regexEmail), 'Email không đúng định dạng'),
  password: string().trim().required(`Mật khẩu không được để trống`),
});
