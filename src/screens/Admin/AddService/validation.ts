import {number, object, string} from 'yup';
import {IServiceFormValues} from './model';

export const validationSchema = object<IServiceFormValues>().shape({
  serviceName: string().trim().required(`Tên dịch vụ không được để trống`),
  time: number().required(`Thời gian thực hiện không được bỏ trống`),
  price: number().required(`Giá không được để trống`),
  description: string(),
});
