import {number, object, string} from 'yup';
import {IBranchFormValues} from './model';

export const validationSchema = object<IBranchFormValues>().shape({
  branchName: string().trim().required(`Tên chi nhánh không được để trống`),
  openTime: string().trim().required(`Thời gian mở cửa không được bỏ trống`),
  closeTime:string().trim().required(`Thời gian đóng cửa không được bỏ trống`),
  address: string().trim().required('Địa chỉ chi nhánh không được để trống'),
  description: string(),
})