import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Contact } from "../types/contact.types";
import { PaginatedResponse } from "../types/common.types";
import ContactCard from "./ContactCard";
import { fetchContacts } from "../api/contacts";

const ITEMS_PER_PAGE = 9;

export default function ContactList() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: contactsData,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery<PaginatedResponse<Contact>>({
    queryKey: ["contacts", currentPage],
    queryFn: () => fetchContacts({ page: currentPage, limit: ITEMS_PER_PAGE }),
  });

  const { items: contacts = [], total = 0 } = contactsData || {
    items: [],
    total: 0,
  };
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleContactDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
  };

  const filteredContacts = contacts.filter((contact: Contact) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      contact.properties.hs_full_name_or_email
        ?.toLowerCase()
        .includes(searchTermLower) ||
      contact.properties.email?.toLowerCase().includes(searchTermLower) ||
      contact.properties.company?.toLowerCase().includes(searchTermLower)
    );
  });

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

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
    );
  }

  if (isError) {
    return (
      <div className="bg-error/10 border border-error/20 rounded-xl p-6 text-center">
        <div className="text-error font-medium">
          {error instanceof Error ? error.message : "Failed to fetch contacts"}
        </div>
        <p className="text-sm text-error/70 mt-1">
          There was an error connecting to the server. Please check your
          connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 btn btn-error-outline flex items-center justify-center mx-auto"
        >
          <ArrowPathIcon className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    );
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No contacts found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-500 mb-4">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {filteredContacts.length}
            </span>{" "}
            of <span className="font-medium text-gray-700">{total}</span>{" "}
            contacts
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact: Contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleContactDeleted}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * ITEMS_PER_PAGE, total)}
                    </span>{" "}
                    of <span className="font-medium">{total}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === i + 1
                            ? "z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
