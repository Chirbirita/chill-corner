import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WrapperContainer from './components/WrapperContainer'
import BGContext from './components/BGContext'
import SecondsContext from './components/SecondsContext';
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
  const background = useState('src/assets/images/random.jpg')
  const seconds = useState()
  return (
    <QueryClientProvider client={queryClient}>
      <BGContext.Provider value={background}>
        <SecondsContext.Provider value={seconds}>
          <div className='w-full'>
            <Signin />

          </div>
        </SecondsContext.Provider>
      </BGContext.Provider>
    </QueryClientProvider>
  )

}
