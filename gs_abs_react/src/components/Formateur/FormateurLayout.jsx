import { Outlet, useLoaderData } from 'react-router-dom';
import { Footer } from '../Footer';
import { checkAuth } from '../../lib/utilis';
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { loadUser } from '../../features/authSlice';
import { Header } from '../Header';
import { FormateurSidebar } from './FormateurSidebar';

export const loader = ({request}) => {
    return checkAuth(request , "formateur");
}
export const FormateurLayout = () => {
    const {user, token} = useLoaderData();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
       if(user && token){
          dispatch(loadUser({user, token}))
       }
    }, [user, token, dispatch])


    return (
        <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900'>
            <Header
                setSidebarOpen = {setSidebarOpen} 
            />
            <div className="flex flex-1">
                <FormateurSidebar
                   sidebarOpen = {sidebarOpen}
                   setSidebarOpen = {setSidebarOpen}
                />
                {sidebarOpen && (
                    <div 
                        className='fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden'
                        onClick={() => setSidebarOpen(false)}
                    >
                        
                    </div>
                )}
                <main className='flex-1 p-6 overflow-auto'>
                    <div className='max-w-7xl mx-auto'>
                        <Outlet/>
                    </div> 
                </main>
            </div>
            <Footer/>
        </div>
    )
}