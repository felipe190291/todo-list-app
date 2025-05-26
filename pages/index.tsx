import { Inter } from "next/font/google";
import Head from "next/head";
import Login from "./components/login/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | Todo List App</title>
      </Head>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Login />
        </div>
      </main>
    </>
  );
}
