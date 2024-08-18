import styled from 'styled-components';
import { useToast } from '../contexts/ToastContext';
import { usePatients } from '../hooks/usePatients';
import { Patient } from '../types/Patient';
import PatientCard from './PatientCard';
import SkeletonLoader from './ui/Skeleton';

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
  const { data: patients, error, isLoading } = usePatients();
  const { addToast } = useToast();

  if (error) {
    addToast('Error loading patients', 'error');
    return <p>Error loading patients.</p>;
  }

  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return isLoading ? (
    <SkeletonLoader />
  ) : (
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
