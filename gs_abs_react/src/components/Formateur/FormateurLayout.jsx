import { Outlet } from 'react-router-dom';
import {FormateurHeader} from './FormateurHeader';
import { Footer } from '../Footer';

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