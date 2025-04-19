import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MagnifyingGlassIcon, UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Contact, ApiResponse, ErrorResponse } from '../types/contact.types'
import ContactCard from './ContactCard'

const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const { data } = await axios.get<ApiResponse<Contact[]>>('http://localhost:3001/api/contacts')
    if (!data.success) {
      throw new Error('Failed to fetch contacts')
    }
    return data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse
      throw new Error(errorResponse?.error || error.message)
    }
    throw error
  }
}

export default function ContactList() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  
  const { 
    data: contacts = [], 
    isLoading, 
    error, 
    refetch,
    isError 
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
    retry: 2,
    retryDelay: 1000,
  })

  const handleContactDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ['contacts'] })
  }

  const filteredContacts = contacts.filter(contact => {
    const searchTermLower = searchTerm.toLowerCase()
    return (
      contact.properties.firstname?.toLowerCase().includes(searchTermLower) ||
      contact.properties.lastname?.toLowerCase().includes(searchTermLower) ||
      contact.properties.email?.toLowerCase().includes(searchTermLower) ||
      contact.properties.company?.toLowerCase().includes(searchTermLower)
    )
  })

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200/60 rounded-xl" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200/60 rounded-lg w-1/3 mb-3" />
                <div className="h-3 bg-gray-200/60 rounded-lg w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-error/10 border border-error/20 rounded-xl p-6 text-center">
        <div className="text-error font-medium">
          {error instanceof Error ? error.message : 'Failed to fetch contacts'}
        </div>
        <p className="text-sm text-error/70 mt-1">
          There was an error connecting to the server. Please check your connection and try again.
        </p>
        <button 
          onClick={() => refetch()} 
          className="mt-4 btn btn-error-outline flex items-center justify-center mx-auto"
        >
          <ArrowPathIcon className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 min-w-[260px] relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            className="pl-10 w-full input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => refetch()} 
          className="btn btn-outline"
          title="Refresh contacts"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-gray-200/80">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No contacts found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-500 mb-4">
            Showing <span className="font-medium text-gray-700">{filteredContacts.length}</span> contacts
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleContactDeleted}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 