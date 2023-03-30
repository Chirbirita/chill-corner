import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Signin from './components/Signin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

export default function App() {
  const seconds = useState()
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full mx-auto overflow-scroll border border-3 flex items-center justify-center h-screen py-3'>
        <Signin />
      </div>
    </QueryClientProvider>
  )

}
