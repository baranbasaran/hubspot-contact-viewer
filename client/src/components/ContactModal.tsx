import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { 
  XMarkIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  PencilSquareIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { Contact } from '../types/contact.types'
import { updateContact } from '../api/contacts'
import { useQueryClient } from '@tanstack/react-query'

interface ContactModalProps {
  contact: Contact | null
  isOpen: boolean
  onClose: () => void
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const LifecycleStageColors: Record<string, { bg: string; text: string }> = {
  subscriber: { bg: 'bg-blue-50', text: 'text-blue-700' },
  lead: { bg: 'bg-purple-50', text: 'text-purple-700' },
  marketingqualifiedlead: { bg: 'bg-pink-50', text: 'text-pink-700' },
  salesqualifiedlead: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
  opportunity: { bg: 'bg-green-50', text: 'text-green-700' },
  customer: { bg: 'bg-teal-50', text: 'text-teal-700' },
  evangelist: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  other: { bg: 'bg-gray-50', text: 'text-gray-700' }
}

export default function ContactModal({ contact, isOpen, onClose }: ContactModalProps) {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!contact) return null

  const {
    id,
    properties: {
      firstname,
      lastname,
      email,
      phone,
      company,
      jobtitle,
      website,
      address,
      city,
      state,
      country,
      lifecyclestage,
      createdate,
      lastmodifieddate
    }
  } = contact

  const handleEditClick = () => {
    setFormData({
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
      phone: phone || '',
      company: company || '',
      jobtitle: jobtitle || '',
      website: website || '',
      address: address || '',
      city: city || '',
      state: state || '',
      country: country || '',
      lifecyclestage: lifecyclestage || ''
    })
    setIsEditing(true)
    setError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      await updateContact(id, formData)
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setIsEditing(false)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-left sm:ml-4 sm:mt-0 w-full">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 mb-8">
                      {isEditing ? 'Edit Contact' : 'Contact Details'}
                    </Dialog.Title>

                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <div className="mt-2 text-sm text-red-700">
                                  <p>{error}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {showSuccess && (
                          <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Success</h3>
                                <div className="mt-2 text-sm text-green-700">
                                  <p>Contact updated successfully!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                              First Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={formData.firstname || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                              Last Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={formData.lastname || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email
                            </label>
                            <div className="mt-2">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                              Company
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="company"
                                id="company"
                                value={formData.company || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="jobtitle" className="block text-sm font-medium leading-6 text-gray-900">
                              Job Title
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="jobtitle"
                                id="jobtitle"
                                value={formData.jobtitle || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                              Website
                            </label>
                            <div className="mt-2">
                              <input
                                type="url"
                                name="website"
                                id="website"
                                value={formData.website || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="lifecyclestage" className="block text-sm font-medium leading-6 text-gray-900">
                              Lifecycle Stage
                            </label>
                            <div className="mt-2">
                              <select
                                name="lifecyclestage"
                                id="lifecyclestage"
                                value={formData.lifecyclestage || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              >
                                <option value="">Select a stage</option>
                                <option value="subscriber">Subscriber</option>
                                <option value="lead">Lead</option>
                                <option value="marketingqualifiedlead">Marketing Qualified Lead</option>
                                <option value="salesqualifiedlead">Sales Qualified Lead</option>
                                <option value="opportunity">Opportunity</option>
                                <option value="customer">Customer</option>
                                <option value="evangelist">Evangelist</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                              Address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                value={formData.city || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                              State
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="state"
                                id="state"
                                value={formData.state || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                              Country
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="country"
                                id="country"
                                value={formData.country || ''}
                                onChange={handleChange}
                                className={inputClasses}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Basic Information */}
                          <div className="col-span-2">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Name</p>
                                  <p className="text-base">{[firstname, lastname].filter(Boolean).join(' ') || 'N/A'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Company & Role</p>
                                  <p className="text-base">{[company, jobtitle].filter(Boolean).join(' - ') || 'N/A'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Phone</p>
                                  <p className="text-base">{phone || 'N/A'}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Email</p>
                                  <p className="text-base">{email || 'N/A'}</p>
                                </div>
                              </div>
                              {website && (
                                <div className="flex items-center gap-2">
                                  <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500">Website</p>
                                    <p className="text-base">
                                      <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {website}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Location */}
                          <div className="col-span-2">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Location</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {address && (
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-base">{address}</p>
                                  </div>
                                </div>
                              )}
                              {city && (
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500">City</p>
                                    <p className="text-base">{city}</p>
                                  </div>
                                </div>
                              )}
                              {state && (
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500">State</p>
                                    <p className="text-base">{state}</p>
                                  </div>
                                </div>
                              )}
                              {country && (
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500">Country</p>
                                    <p className="text-base">{country}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* System Information */}
                          <div className="col-span-2">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">System Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Created</p>
                                  <p className="text-base">{formatDate(createdate)}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Last Modified</p>
                                  <p className="text-base">{formatDate(lastmodifieddate)}</p>
                                </div>
                              </div>
                              {lifecyclestage && (
                                <div className="flex items-center gap-2">
                                  <TagIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500">Lifecycle Stage</p>
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                      LifecycleStageColors[lifecyclestage.toLowerCase()]?.bg || 'bg-gray-50'
                                    } ${
                                      LifecycleStageColors[lifecyclestage.toLowerCase()]?.text || 'text-gray-700'
                                    }`}>
                                      {lifecyclestage}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            onClick={handleEditClick}
                          >
                            <PencilSquareIcon className="h-5 w-5 mr-2" />
                            Edit Contact
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={onClose}
                          >
                            Close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
} 