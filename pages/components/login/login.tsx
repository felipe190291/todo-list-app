import { useUserStore } from "@/store/user/userStore";
import { buttonClass, inputClass } from "@/types/themeTypes";
import { useRouter } from "next/navigation";
export default function Login() {
  const setName = useUserStore((state) => state.setName);
  const router = useRouter();
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    setName(name as string);
    router.push("/dashboard");
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-black dark:text-white">
            Bienvenido a Todo List
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-black dark:text-white"
                >
                  Nombre
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={inputClass}
                  data-testid="input-name"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                data-testid="button-send"
                className={buttonClass}
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
