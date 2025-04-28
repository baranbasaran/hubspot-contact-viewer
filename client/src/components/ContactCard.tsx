import { useState } from "react";
import {
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Contact } from "../types/contact.types";
import ContactModal from "./ContactModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact } from "../api/contacts";

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
}

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteContact(contact.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      onDelete();
    },
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteMutation.mutate();
    }
  };

  const {
    properties: {
      hs_full_name_or_email,
      email,
      phone,
      company,
      jobtitle,
      city,
      state,
      country,
      createdate,
      lastmodifieddate,
      lifecyclestage,
      website,
    },
  } = contact;

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <UserIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {hs_full_name_or_email || "Unknown Contact"}
                </h3>
                {jobtitle && (
                  <p className="text-sm text-gray-500">{jobtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete contact"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            {company && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                <span>{company}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ContactModal
        contact={contact}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
