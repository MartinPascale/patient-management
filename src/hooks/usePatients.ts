import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Patient } from '../types/Patient';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

const fetchPatients = async (): Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(API_URL);
  return data;
};

export const usePatients = () => {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });
};

export const useAddPatient = () => {
  const queryClient = useQueryClient();

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
  });
};

export const useEditPatient = () => {
  const queryClient = useQueryClient();

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
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(['patients'], (old: Patient[] | undefined) => {
        if (!old) return [];
        return old.filter((patient) => patient.id !== id);
      });
    },
  });
};
