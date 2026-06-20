import React from 'react';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { AppModals } from './AppModals';
import { Dashboard } from '../dashboard/Dashboard';
import { FilterBar } from '../filters/FilterBar';
import { TransactionList } from '../transactions/TransactionList';

export const AppShell: React.FC = () => {
  return (
    <>
      <AppHeader />
      <main className="app-main">
        <Dashboard />
        <FilterBar />
        <TransactionList />
      </main>
      <AppFooter />
      <AppModals />
    </>
  );
};
