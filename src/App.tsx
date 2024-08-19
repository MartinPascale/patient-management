import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from './components/Modal';
import Navbar from './components/NavBar';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientsList';
import { useToast } from './contexts/ToastContext';
import GlobalStyle from './GlobalStyle';
import { useAddPatient, useEditPatient } from './hooks/usePatients';
import { Patient } from './types/Patient';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addPatientMutation = useAddPatient();
  const editPatientMutation = useEditPatient();
  const { addToast } = useToast();

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (patient: Patient) => {
    if (editingPatient) {
      editPatientMutation.mutate(patient);
    } else {
      addPatientMutation.mutate({
        name: patient.name,
        avatar: patient.avatar,
        description: patient.description,
        website: patient.website,
        createdAt: new Date().toISOString(),
        id: uuidv4(),
      });
    }
    setIsModalOpen(false);
    addToast('Patient saved successfully', 'success');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar
        onSearch={handleSearch}
        onToggleTheme={toggleTheme}
        handleAddPatient={handleAddPatient}
      />
      <>
        <PatientList
          searchQuery={searchQuery}
          onEditPatient={handleEditPatient}
        />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PatientForm initialData={editingPatient} onSubmit={handleSubmit} />
        </Modal>
      </>
    </>
  );
};

export default App;
