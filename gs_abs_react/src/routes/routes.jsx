import { Login, loader as loginLoader, action as loginAction } from "../pages/Login";
import { Home } from "../pages/Home";
import { GuestLayout } from "../components/GuestLayout";
import { FormateurLayout, loader as formateurLoader } from "../components/Formateur/FormateurLayout";
import { FormateurDashboard } from "../pages/Formateur/FormateurDashboard";
import { FaireAbsence } from "../pages/Formateur/FaireAbsence";
import { GroupesAffectes } from "../pages/Formateur/GroupesAffectes";
import { SurveillantLayout, loader as surveillantLoader } from "../components/Surveillant/SurveillantLayout";
import { SurveillantDashboard } from "../pages/Surveillant/SurveillantDashboard";
import { Affecter} from "../pages/Surveillant/Affecter";
import { ListeAbsences } from "../pages/Surveillant/ListeAbsences";
import { ListeAffectations } from "../pages/Surveillant/ListeAffectations";
import { ListeGroupes } from "../pages/Surveillant/ListeGroupes";
import { ListeStagiaires } from "../pages/Surveillant/ListeStagiaires";
import { Unauthorized } from "../pages/Unauthorized";
import { NotFound } from "../pages/NotFound";

export const routes = [
    {
       path : "/",
       element : <GuestLayout/>,
       children : [
           {
                index : true,
                element : <Home/>
           },
           {
                path : "login",
                element : <Login/>,
                loader : loginLoader,
                action : loginAction,
           },
       ]  
    },
    {
        path : "/formateur",
        element : <FormateurLayout/>,
        loader : formateurLoader,
        children : [
            {
                index : true,
                element : <FormateurDashboard/>
            },
            {
                path : "faireAbs",
                element : <FaireAbsence/>
            },
            {
                path : "groupesAffectes",
                element : <GroupesAffectes/>
            }
        ]
    },
    {
        path : "/surveillant",
        element : <SurveillantLayout/>,
        loader : surveillantLoader,
        children : [
            {
                index : true,
                element : <SurveillantDashboard/>
            },
            {
                path : "affecter",
                element : <Affecter/>
            },
            {
                path : "listeAbs",
                element : <ListeAbsences/>
            },
            {
                path : "listeAff",
                element : <ListeAffectations/>
            },
            {
                path : "listeGr",
                element : <ListeGroupes/>
            },
            {
                path : "listeSt",
                element : <ListeStagiaires/>
            }
        ]

    },
    {
        path : "/unauthorized",
        element : <Unauthorized/>
    },
    {
        path : "/notFound",
        element : <NotFound/>
    }
]