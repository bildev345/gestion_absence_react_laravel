import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleRoute from "./components/RoleRoute"
import { SurveillantLayout } from "./pages/Surveillant/SurveillantLayout"
import { FormateurLayout } from "./pages/Formateur/FormateurLayout"
import { Unauthorized } from "./pages/Unauthorized"
import { NotFound } from "./pages/NotFound"

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<ProtectedRoute/>}>
            <Route path="/surveillant/*" element={
              <RoleRoute allowed={['surveillant']}>
                  <SurveillantLayout/>
              </RoleRoute>
            } />
            <Route path="/formateur/*" element={
              <RoleRoute allowed={['formateur']}>
                  <FormateurLayout/>
              </RoleRoute>
            } />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
  )
}

export default App
