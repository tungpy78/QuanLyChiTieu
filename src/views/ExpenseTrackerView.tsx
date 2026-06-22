import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Modals } from '../components/layout/Modals';
import { DashboardView } from '../modules/dashboard/views/DashboardView';
import { TransactionFilter } from '../modules/transactions/components/TransactionFilter';
import { TransactionsView } from '../modules/transactions/views/TransactionsView';

export const ExpenseTrackerView: React.FC = () => {
  return (
    <>
      <Header />
      <main className="app-main">
        <DashboardView />
        <TransactionFilter />
        <TransactionsView />
      </main>
      <Footer />
      <Modals />
    </>
  );
};
