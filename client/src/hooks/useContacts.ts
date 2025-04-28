import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "../api/contacts";
import { Contact } from "../types/contact.types";
import { PaginatedResponse } from "../types/common.types";

export const useContacts = (page = 1, limit = 9) => {
  return useQuery<PaginatedResponse<Contact>, Error>({
    queryKey: ["contacts", page, limit],
    queryFn: () => fetchContacts({ page, limit }),
  });
};
