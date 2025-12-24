'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { AuthGuard } from '@/components/admin/AuthGuard';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { RegistrationTable } from '@/components/admin/RegistrationTable';
import { createBrowserClient } from '@/lib/supabase';
import { RegistrationData } from '@/types/registration';
import { events } from '@/lib/events';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [registrations, setRegistrations] = useState<{
    [key: string]: RegistrationData[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistrations() {
      setIsLoading(true);
      try {
        const supabase = createBrowserClient();
        const allRegistrations: { [key: string]: RegistrationData[] } = {};

        for (const event of events) {
          const { data, error } = await supabase
            .from(event.tableName)
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error(`Error fetching ${event.name}:`, error);
            toast.error(`Failed to load ${event.name} registrations`);
            allRegistrations[event.tableName] = [];
          } else {
            allRegistrations[event.tableName] = data || [];
          }
        }

        setRegistrations(allRegistrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        toast.error('Failed to load registrations');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Registration Dashboard
            </h1>
            <p className="text-gray-600">
              View and manage all event registrations
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-2 overflow-x-auto">
                {events.map((event, index) => {
                  const count = registrations[event.tableName]?.length || 0;
                  return (
                    <button
                      key={event.slug}
                      onClick={() => setActiveTab(index)}
                      className={`flex items-center gap-3 px-6 py-4 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
                        activeTab === index
                          ? 'border-amber-600 text-amber-600 bg-amber-50/50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{event.name}</span>
                      <span
                        className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold ${
                          activeTab === index
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent mb-4"></div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Loading registrations...
                </p>
                <p className="text-gray-500">Please wait while we fetch the data</p>
              </div>
            </div>
          ) : (
            <RegistrationTable
              registrations={
                registrations[events[activeTab].tableName] || []
              }
              eventName={events[activeTab].name}
            />
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
