import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../api/contacts";
import { Contact } from "../types/contact.types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";

interface CreateContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateContactForm({
  isOpen,
  onClose,
}: CreateContactFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<
    Partial<Contact> & { properties: NonNullable<Contact["properties"]> }
  >({
    properties: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      company: "",
      jobtitle: "",
      city: "",
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFormData({
          properties: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            company: "",
            jobtitle: "",
            city: "",
          },
        });
      }, 1500);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContactMutation.mutate(formData.properties);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      properties: {
        ...prev.properties,
        [name]: value,
      },
    }));
  };

  const inputClasses =
    "pl-10 block w-full rounded-xl bg-white border border-gray-200 text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                {showSuccess ? (
                  <div className="p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircleIconSolid className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      Contact Created Successfully!
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      The new contact has been added to your HubSpot CRM.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-primary/5 px-6 py-4 border-b border-gray-200">
                      <Dialog.Title
                        as="div"
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <UserIcon className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Create New Contact
                          </h3>
                        </div>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500 transition-colors"
                          onClick={onClose}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </Dialog.Title>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="firstname"
                              id="firstname"
                              value={formData.properties.firstname}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="John"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="lastname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="lastname"
                              id="lastname"
                              value={formData.properties.lastname}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.properties.email}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.properties.phone}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Company
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="company"
                            id="company"
                            value={formData.properties.company}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="Acme Inc."
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="jobtitle"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Job Title
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="jobtitle"
                            id="jobtitle"
                            value={formData.properties.jobtitle}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="Senior Manager"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.properties.city}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="New York"
                          />
                        </div>
                      </div>

                      {createContactMutation.isError && (
                        <div className="rounded-lg bg-red-50 p-4 flex items-start">
                          <ExclamationCircleIcon className="h-5 w-5 text-red-400 mt-1 mr-2" />
                          <div>
                            <h3 className="text-sm font-medium text-red-800">
                              Error creating contact
                            </h3>
                            <p className="text-sm text-red-700 mt-1">
                              {createContactMutation.error instanceof Error
                                ? createContactMutation.error.message
                                : "An unexpected error occurred"}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary inline-flex items-center"
                          disabled={createContactMutation.isPending}
                        >
                          {createContactMutation.isPending ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Creating...
                            </>
                          ) : (
                            <>
                              <CheckCircleIcon className="h-4 w-4 mr-2" />
                              Create Contact
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
