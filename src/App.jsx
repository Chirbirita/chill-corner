import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Signin from './components/Signin';
import SideBar from './components/SideBar';
import MainBody from './components/MainBody';

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
        <SideBar/>
        <MainBody/>
      </div>
    </QueryClientProvider>
  )

}
