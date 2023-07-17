import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import './global.css'
import { queryClient } from './services/queryCliente'
import { QueryClientProvider } from '@tanstack/react-query'

const App = () => (

  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  </QueryClientProvider>
);

export default App;