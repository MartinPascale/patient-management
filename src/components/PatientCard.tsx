import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

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
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 225px;

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
  width: 100%;
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

const ShowMoreButton = styled(Button)`
  width: 100%;
  justify-self: end;
`;

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = `${patient.description.slice(0, 100)}...`;

  return (
    <Card
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <Avatar src={patient.avatar} alt={patient.name} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <span>{patient.name}</span>
          <div>
            Created At: {new Date(patient.createdAt).toLocaleDateString()}
          </div>
        </div>
        <Button onClick={() => onEdit(patient)}>Edit</Button>
      </div>
      <p>{isExpanded ? patient.description : shortDescription}</p>
      {isExpanded && (
        <Details>
          <p>
            Website:{' '}
            <a href={patient.website} target="_blank" rel="noopener noreferrer">
              {patient.website}
            </a>
          </p>
        </Details>
      )}
      <ShowMoreButton onClick={() => setIsExpanded(!isExpanded)}>
        Show {isExpanded ? 'Less' : 'More'}
      </ShowMoreButton>
    </Card>
  );
};

export default PatientCard;
