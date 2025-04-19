import { useState } from 'react';
import {
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Contact } from '../types/contact.types';
import ContactModal from './ContactModal';

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
}

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    properties: {
      firstname,
      lastname,
      email,
      phone,
      company,
      jobtitle,
    },
  } = contact;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDelete();
    }
  };

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
                  {[firstname, lastname].filter(Boolean).join(' ') || 'Unknown Contact'}
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