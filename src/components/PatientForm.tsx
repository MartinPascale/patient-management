import { useFormik } from 'formik';
import styled from 'styled-components';
import { validationSchema } from '../utils/PatientSchema';
import Button from './ui/Button';
import FormField from './ui/FormField';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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

  const isDisabled = !formik.isValid || !formik.dirty;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div>{initialData ? 'Edit Patient' : 'Create Patient'}</div>
      <div>
        <FormField
          name="name"
          placeholder="Name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          touched={formik.touched.name}
        />
        <FormField
          name="avatar"
          placeholder="Avatar URL"
          label="Avatar"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.avatar}
          touched={formik.touched.avatar}
        />
        <FormField
          name="description"
          placeholder="Description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description}
          touched={formik.touched.description}
          as="textarea"
        />
        <FormField
          name="website"
          placeholder="Website"
          label="Website"
          value={formik.values.website}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.website}
          touched={formik.touched.website}
        />
      </div>
      <Button type="submit" disabled={isDisabled}>
        Submit
      </Button>
    </Form>
  );
};

export default PatientForm;
