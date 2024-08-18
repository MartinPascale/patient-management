import { useFormik } from 'formik';
import styled from 'styled-components';
import { validationSchema } from '../utils/PatientSchema';
import Button from './ui/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.primary.dark};
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 200px;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.primary.dark};
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

interface Patient {
  id: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  createdAt: string;
}

interface PatientFormProps {
  initialData: Patient | null;
  onSubmit: (patient: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      avatar: initialData?.avatar || '',
      description: initialData?.description || '',
      website: initialData?.website || '',
      createdAt: initialData?.createdAt || new Date().toISOString(),
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        id: initialData?.id || Date.now().toString(),
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div>{initialData ? 'Edit Patient' : 'Create Patient'}</div>
      <div>
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.avatar && formik.errors.avatar && (
            <ErrorMessage>{formik.errors.avatar}</ErrorMessage>
          )}
        </div>
        <div>
          <TextArea
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <ErrorMessage>{formik.errors.description}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="website"
            placeholder="Website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.website && formik.errors.website && (
            <ErrorMessage>{formik.errors.website}</ErrorMessage>
          )}
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default PatientForm;
