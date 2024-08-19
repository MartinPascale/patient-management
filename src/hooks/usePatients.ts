import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../contexts/ToastContext';
import { Patient } from '../types/Patient';
import { fetchPatients } from '../services/API';

export const usePatients = () => {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    refetchOnWindowFocus: false, // It is disabled to avoid loosing the data that is not persisted.
  });
};

export const useAddPatient = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<Patient, Error, Patient>({
    mutationFn: async (newPatient: Patient): Promise<Patient> => {
      return newPatient;
    },
    onSuccess: (newPatient) => {
      queryClient.setQueryData(['patients'], (old: Patient[] | undefined) => {
        if (!old) return [];
        return [newPatient, ...old];
      });
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });
};

export const useEditPatient = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<Patient, Error, Patient>({
    mutationFn: async (updatedPatient: Patient): Promise<Patient> => {
      return updatedPatient;
    },
    onSuccess: (updatedPatient) => {
      queryClient.setQueryData(['patients'], (old: Patient[] | undefined) => {
        if (!old) return [];
        return old.map((patient) =>
          patient.id === updatedPatient.id ? updatedPatient : patient,
        );
      });
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });
};
