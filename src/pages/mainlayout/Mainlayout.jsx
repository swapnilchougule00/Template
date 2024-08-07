import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, []);
  return (
    <div className=" w-full fixed h-screen">
      <Header />
      <ScrollArea className="w-full pb-14 overflow-auto h-full">
        <Outlet />
        <Footer />
      </ScrollArea>
    </div>
  );
}

export default MainLayout;
