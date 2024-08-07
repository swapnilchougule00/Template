import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
// import { ToggleBtn } from "./themeProvider/ToggleBtn";
// import { useAppStore } from "@/store/store";

function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

  // const setIsOpenInvite = useAppStore((state) => state.setIsOpenInvite);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursString = hours.toString().padStart(2, "0");

      const day = now.toLocaleString("en", { weekday: "short" });
      const month = now.toLocaleString("en", { month: "short" });
      const date = now.getDate();
      const year = now.getFullYear();

      setCurrentTime(`${hoursString}:${minutes} ${ampm}`);
      setCurrentDate(`${day}, ${date} ${month} ${year}`);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full h-fit px-6 py-2 flex justify-end  gap-2 bg-white dark:bg-zinc-900 shadow-lg border-b   items-center bg-   ">
      {/* <ToggleBtn /> */}
      <div className="flex justify-center gap-4 items-center">
        <div className="main-header-date-time  text-right">
          <h3 className="text-xl">
            <span>{currentTime}</span>
          </h3>
          <span className="text-sm">
            <span id="date">{currentDate}</span>
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full dark:bg-slate-600 bg-slate-300 flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Header;
