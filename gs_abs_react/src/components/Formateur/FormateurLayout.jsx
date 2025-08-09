import { Outlet, useLoaderData } from 'react-router-dom';
import { Footer } from '../Footer';
import { checkAuth } from '../../lib/utilis';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { loadUser } from '../../features/authSlice';
import { Header } from '../Header';

export const loader = ({request}) => {
    return checkAuth(request , "formateur");
}
export const FormateurLayout = () => {
    const {user, token} = useLoaderData();
    const dispatch = useDispatch();
    useEffect(() => {
       if(user && token){
          dispatch(loadUser({user, token}))
       }
    }, [])
    return (
        <div className='flex flex-col min-h-dvh'>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}