import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  avatar: yup
    .string()
    .url('Avatar must be a valid URL')
    .required('Avatar is required'),
  description: yup.string().required('Description is required'),
  website: yup
    .string()
    .url('Website must be a valid URL')
    .required('Website is required'),
});
