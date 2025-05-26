import Navbar from "./header/navbar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <main className="relative flex items-center justify-center flex-col bg-white text-black dark:bg-gray-900">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="w-full min-h-screen">
            <Navbar />
            <section className="relative flex items-start justify-between w-full  gap-8 overflow-hidden ">
              {children}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
