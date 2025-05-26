// NotFound.js
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-16 h-screen text-center px-2">
      <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 h-20 w-20 text-gray-darkest" />
      <h1 className="text-4xl font-bold mb-4 flex items-center flex-wrap justify-center">
        404 - Página no encontrada
      </h1>
      <p className="text-lg mb-8">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link href="/">
        <p className="text-blue-500 underline">Volver a la página de inicio</p>
      </Link>
    </div>
  );
};

export default NotFound;
