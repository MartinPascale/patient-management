import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Patient } from '../types/Patient';
import { useToast } from '../contexts/ToastContext';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const { data } = await axios.get<Patient[]>(API_URL);
    return data;
  } catch (error) {
    throw new Error('Error fetching patients');
  }
};

export const usePatients = () => {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
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
        return [...old, newPatient];
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
