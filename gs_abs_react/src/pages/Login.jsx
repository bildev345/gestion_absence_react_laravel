import { loginUser } from "../api/auth";
import { cn } from "../lib/utilis";
import { 
  Form,
  redirect,
  useActionData, 
  useLoaderData, 
  useNavigation, 
} from "react-router-dom";

export const loader = ({request}) => {
  return new URL(request.url).searchParams.get("message");
}

export const action = async({request}) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try{
     const data = await loginUser({email, password});
     const pathname = new URL(request.url).searchParams.get("redirectTo") || `/${data.user.role}`;
     localStorage.setItem('token', data.token);
     //localStorage.setItem('user', JSON.stringify(data.user));
     return redirect(pathname);  
  }catch(err){
    return err.message
  }
}

export const Login = () => {
  const loaderMsg = useLoaderData();
  const {state} = useNavigation();
  const errorMsg = useActionData();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {loaderMsg &&
                <h4 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-red-500">
                  {loaderMsg}
                </h4>
            }
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form method="post" className="space-y-6" replace>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled = {state === "submitting"}
                className={cn(
                    "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs",
                    state === "submitting" ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                {state === "submitting" ? 'connexion en cours...' : 'Se connecter'}
              </button>
            </div>
            {<div>{errorMsg && (<div className="text-center text-red-500 font-semibold">{errorMsg}</div>)}</div>}
          </Form>
        </div>
      </div>
    </>
  )
}