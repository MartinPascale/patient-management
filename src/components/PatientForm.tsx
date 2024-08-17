import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
  const [name, setName] = useState(initialData?.name || '');
  const [avatar, setAvatar] = useState(initialData?.avatar || '');
  const [description, setDescription] = useState(
    initialData?.description || '',
  );
  const [website, setWebsite] = useState(initialData?.website || '');
  const [createdAt] = useState(
    initialData?.createdAt || new Date().toISOString(),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      name,
      avatar,
      description,
      website,
      createdAt,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
      <TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default PatientForm;
