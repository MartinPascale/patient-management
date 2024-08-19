import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  avatar: yup
    .string()
    .trim()
    .url('Avatar must be a valid URL')
    .required('Avatar is required'),
  description: yup.string().trim().required('Description is required'),
  website: yup
    .string()
    .trim()
    .url('Website must be a valid URL')
    .required('Website is required'),
});
