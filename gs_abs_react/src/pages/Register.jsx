import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, token, status, error} = useSelector(state => state.auth);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmation] = useState("");
    
    useEffect(() => {
        if(user && status === "succeeded"){
          navigate('/formateur');
        }
    }, [status])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({nom, prenom, email, role, password, password_confirmation}));
    }
    return (
        
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Créer un compte</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                      <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">Nom</label>
                      <div className="mt-2">
                        <input type="nom" name="nom" id="nom" required onChange={(e) => setNom(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                      {error?.nom && <p className="text-red-500 font-semibold">{error.nom[0]}</p>}
                  </div>
                  <div>
                      <label htmlFor="prenom" className="block text-sm/6 font-medium text-gray-900">Prènom</label>
                      <div className="mt-2">
                        <input type="prenom" name="prenom" id="prenom" required onChange={(e) => setPrenom(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                      {error?.prenom && <p className="text-red-500 font-semibold">{error.prenom[0]}</p>}
                  </div>
                  <div>
                      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                      <div className="mt-2">
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                      {error?.email && <p className="text-red-500 font-semibold">{error.email[0]}</p>}
                  </div>
                  <div>
                      <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                      <div className="mt-2">
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                      {error?.password && <p className="text-red-500 font-semibold">{error.password[0]}</p>}
                  </div>
                  <div>
                      <label htmlFor="confirmation-password" className="block text-sm/6 font-medium text-gray-900">Confirmer Password</label>
                      <div className="mt-2">
                        <input type="password" name="confirmation-password" id="confirmation-password" onChange={(e) => setConfirmation(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                      </div>
                  </div>
                  <div>
                      <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">Role</label>
                      <div className="flex items-center mt-2 mb-4">
                          <input id="htmlFormateur" type="radio" name="role" value="formateur" onChange={(e) => setRole(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <label htmlFor="formateur" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Formateur</label>
                      </div>
                      <div className="flex items-center">
                          <input id="surveillant" type="radio" name="role" value="surveillant" onChange={(e) => setRole(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <label htmlFor="surveillant" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Surveillant</label>
                      </div>
                      {error?.role && <p className="text-red-500 font-semibold">{error.role[0]}</p>}
                  </div>
              </div>
              <div className="mt-5">
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">S'inscrire</button>
              </div>
          </form>
      </div>
    </div>
    )
}