import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { lightTheme, darkTheme } from './theme';
import PatientList from './components/PatientsList';
import Modal from './components/Modal';
import PatientForm from './components/PatientForm';
import { Patient } from './types/Patient';
import { useAddPatient, useEditPatient } from './hooks/usePatients';
import Navbar from './components/NavBar';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addPatientMutation = useAddPatient();
  const editPatientMutation = useEditPatient();

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
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
    </ThemeProvider>
  );
};

export default App;
