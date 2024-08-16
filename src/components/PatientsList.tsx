import React from 'react';
import styled from 'styled-components';
import { usePatients } from '../hooks/usePatients';
import PatientCard from './PatientCard';
import { Patient } from '../types/Patient';

const Container = styled.div`
  margin: 80px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const CardWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;

  @media (min-width: 850px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (min-width: 1280px) {
    flex: 1 1 calc(33% - 16px);
  }
`;

interface PatientListProps {
  searchQuery: string;
  onEditPatient: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({
  searchQuery,
  onEditPatient,
}) => {
  const { data: patients, isLoading, error } = usePatients();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading patients.</p>;

  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Container>
      {filteredPatients?.map((patient) => (
        <CardWrapper key={patient.id}>
          <PatientCard patient={patient} onEdit={onEditPatient} />
        </CardWrapper>
      ))}
    </Container>
  );
};

export default PatientList;
