import { faLeftLong, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";

function ButtonTheme() {
  const { toggleTheme, theme } = useThemeSwitcher();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative  rounded-full flex items-center px-1 transition-colors duration-300 ${
        !isDark ? "bg-gray-light" : "bg-pd-dark"
      }`}
    >
      <div className="flex justify-between w-full z-10 text-sm px-1">
        <FontAwesomeIcon
          icon={isDark ? faSun : faMoon}
          title={isDark ? "Modo claro" : "Modo oscuro"}
          className={`w-4 h-auto ${
            isDark ? "text-pd-dark" : "text-gray-light"
          }`}
        />
      </div>
    </button>
  );
}

function ActionIcons() {
  return (
    <nav>
      <section className="flex items-center gap-4 h-6 w-auto ">
        <ButtonTheme />
      </section>
    </nav>
  );
}

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 left-0 w-full">
      <nav
        id="navbar"
        className={`px-4 py-4 sm:py-3 w-full flex items-center justify-between bg-black shadow-lg  dark:bg-primary text-white dark:text-white `}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon
            onClick={() => router.push("/")}
            icon={faLeftLong}
            className="w-4 h-auto text-pd-dark"
            title="Inicio"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold "> Todo App</span>
        </div>
        <div className="flex items-center gap-4 ">
          <ActionIcons />
        </div>
      </nav>
    </div>
  );
}
