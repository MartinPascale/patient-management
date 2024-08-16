import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDeletePatient } from '../hooks/usePatients';

interface Patient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
}

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
}

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme?.primary.dark};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme?.background.accent};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: flex-start;

  @media (min-width: 850px) {
    margin-bottom: 16px;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

const Details = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: transparent;
  color: ${({ theme }) => theme?.primary.default};
  border: 1px solid ${({ theme }) => theme?.primary.default};
  border-radius: 12px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: ${({ theme }) => theme?.primary.default};
    color: ${({ theme }) => theme?.primary.dark};
  }
`;

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const deletePatientMutation = useDeletePatient();

  const onDelete = (patient: Patient) => {
    deletePatientMutation.mutate(patient.id);
  };

  return (
    <Card
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <Avatar src={patient.avatar} alt={patient.name} />
      <div>
        <span>{patient.name}</span>
        <p>Created At: {new Date(patient.createdAt).toLocaleDateString()}</p>
        {isExpanded && (
          <Details>
            <p>{patient.description}</p>
            <p>
              Website:{' '}
              <a
                href={patient.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {patient.website}
              </a>
            </p>
            <Button onClick={() => onEdit(patient)}>Edit</Button>
            <Button onClick={() => onDelete(patient)}>Delete</Button>
          </Details>
        )}
      </div>
    </Card>
  );
};

export default PatientCard;
