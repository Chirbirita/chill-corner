import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WrapperContainer from './components/WrapperContainer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WrapperContainer />
    </QueryClientProvider>
  )

}
