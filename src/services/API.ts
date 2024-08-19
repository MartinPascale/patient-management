import axios from 'axios';
import { Patient } from '../types/Patient';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const { data } = await axios.get<Patient[]>(API_URL);
    return data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  } catch (error) {
    throw new Error('Error fetching patients');
  }
};
