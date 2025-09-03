import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import SignUp from "./pages/Login/SignUp"
import Login from "./pages/Login/Login"
import ShowDetails from "./pages/Home/ShowDetails"
import Admin from "./pages/Admin/Admin"


export default function App (){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/home/show/:id" element={<ShowDetails/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

