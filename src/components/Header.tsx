import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 ">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <Link to={"/"}>
          <img
            src={isDark ? "/logo.png" : "/logo2.png"}
            alt="Klimate Logo"
            className="h-14"
          />
        </Link>
        <div className="flex gap-4">
          <CitySearch />

          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            } `}
          >
            {isDark ? (
              <Sun className="text-yellow-500 rotate-0 transition-all h-6" />
            ) : (
              <Moon className="text-blue-500 rotate-0 transition-all h-6" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
