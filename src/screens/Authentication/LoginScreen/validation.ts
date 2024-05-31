import * as yup from "yup";

export const validationSchema = yup.object().shape({phone:yup.string().required(),password:yup.string().required()})
