import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/authLayout/Login";
import Auth from "./pages/authLayout/Auth";
import MainLayout from "./pages/mainlayout/Mainlayout";
import Verify from "./pages/authLayout/Verify";

function App() {
  return (
    <div className=" w-full font-custom bg-gray-50 dark:bg-zinc-800 h-screen">
      <div className="w-full flex  h-full">
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="" element={<Login />} />
            <Route path="verify" element={<Verify />} />
          </Route>
          <Route path="/" element={<MainLayout />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
