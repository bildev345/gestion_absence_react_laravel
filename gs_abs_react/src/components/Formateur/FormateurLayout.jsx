import { Outlet } from 'react-router-dom';
import {FormateurHeader} from './FormateurHeader';
import { Footer } from '../Footer';
import { checkAuth } from '../../lib/utilis';

export const loader = ({request}) => {
    return checkAuth(request , "formateur");
}
export const FormateurLayout = () => {
    return (
        <div>
            <FormateurHeader/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}