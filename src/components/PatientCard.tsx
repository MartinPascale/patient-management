import { useState } from 'react';
import styled from 'styled-components';
import { Patient } from '../types/Patient';
import Avatar from './ui/Avatar';
import Button from './ui/Button';
import Card from './ui/Card';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
}

const Details = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = `${patient.description.slice(0, 200)} ${patient.description.length > 200 ? '...' : ''}`;

  return (
    <Card id="patient-card">
      <div style={{ display: 'flex', width: '100%' }}>
        <Avatar src={patient.avatar} name={patient.name} id="patient-avatar" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <span id="patient-name">{patient.name}</span>
          <div>
            Created At: {new Date(patient.createdAt).toLocaleDateString()}
          </div>
        </div>
        <Button
          variant="outlined"
          onClick={() => onEdit(patient)}
          id="edit-button"
        >
          Edit
        </Button>
      </div>
      <p>{isExpanded ? patient.description : shortDescription}</p>
      {isExpanded && (
        <Details id="patient-details">
          <p>
            Website:{' '}
            <a href={patient.website} target="_blank" rel="noopener noreferrer">
              {patient.website}
            </a>
          </p>
        </Details>
      )}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="text"
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
        }}
        id="expand-button"
      >
        Show {isExpanded ? 'Less' : 'More'}
      </Button>
    </Card>
  );
};

export default PatientCard;
