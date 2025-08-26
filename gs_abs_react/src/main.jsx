import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserContext from './contexts/UserContext.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient;


createRoot(document.getElementById('root')).render(
  <UserContext>
    <QueryClientProvider client={queryClient}>
      <App /> 
    </QueryClientProvider>
  </UserContext>  
)
