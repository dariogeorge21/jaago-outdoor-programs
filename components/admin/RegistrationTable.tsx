'use client';

import { useState, useMemo } from 'react';
import { RegistrationData } from '@/types/registration';
import { formatDate } from '@/lib/utils';
import { Input } from '@/components/ui/Input';

interface RegistrationTableProps {
  registrations: RegistrationData[];
  eventName: string;
}

type SortField = 'full_name' | 'email' | 'created_at';
type SortDirection = 'asc' | 'desc';

export function RegistrationTable({
  registrations,
  eventName,
}: RegistrationTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter registrations
  const filteredRegistrations = useMemo(() => {
    if (!searchQuery) return registrations;

    const query = searchQuery.toLowerCase();
    return registrations.filter(
      (reg) =>
        reg.full_name.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query)
    );
  }, [registrations, searchQuery]);

  // Sort registrations
  const sortedRegistrations = useMemo(() => {
    return [...filteredRegistrations].sort((a, b) => {
      let aValue: string | number = a[sortField] || '';
      let bValue: string | number = b[sortField] || '';

      if (sortField === 'created_at') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredRegistrations, sortField, sortDirection]);

  // Paginate
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedRegistrations.slice(start, start + itemsPerPage);
  }, [sortedRegistrations, currentPage]);

  const totalPages = Math.ceil(sortedRegistrations.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{eventName}</h2>
        <p className="text-gray-600">
          Total Registrations: {filteredRegistrations.length}
        </p>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-md"
        />
      </div>

      {paginatedRegistrations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchQuery
              ? 'No registrations match your search.'
              : 'No registrations yet.'}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:text-amber-600 transition-colors"
                    onClick={() => handleSort('full_name')}
                  >
                    Name <SortIcon field="full_name" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Phone
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:text-amber-600 transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    Email <SortIcon field="email" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    State
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Questions
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:text-amber-600 transition-colors"
                    onClick={() => handleSort('created_at')}
                  >
                    Date Registered <SortIcon field="created_at" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedRegistrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-900">{reg.full_name}</td>
                    <td className="py-4 px-4 text-gray-700">{reg.phone}</td>
                    <td className="py-4 px-4 text-gray-700">{reg.email}</td>
                    <td className="py-4 px-4 text-gray-700">{reg.state}</td>
                    <td className="py-4 px-4 text-gray-700 max-w-xs truncate">
                      {reg.questions}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {reg.created_at ? formatDate(reg.created_at) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

