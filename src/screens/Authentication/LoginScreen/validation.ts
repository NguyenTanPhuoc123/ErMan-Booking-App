import { object, string } from 'yup';

export const validationSchema = object().shape({
  phone: string()
    .trim()
    .required(`Số điện thoại là bắt buộc`)
    .min(10, `Không đúng định dạng`)
    .max(10, `Không đúng định dạng`)
    .matches(/^[0-9]+$/, `Không đúng định dạng`),
    password: string()
    .trim()
    .required(`Không được để trống`)
    .min(8, `Quá ngắn`)
    .max(32, `Quá dài`)
    .matches(/^(?=.*\d).+$/, `Phải có ít nhất 1 số`)
    .matches(/.*[!@#$%^&*(),.?":{}|<>].*$/, `Phải có ký tự đặt biệt`)
});
