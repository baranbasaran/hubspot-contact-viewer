import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '../api/contacts';
import { IContact } from '../types/contact.types';

export const useContacts = () => {
  return useQuery<IContact[], Error>({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });
}; 