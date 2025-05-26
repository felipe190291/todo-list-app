import { useUserStore } from "@/store/user/userStore";

const DasdBoardTitle = () => {
  const userName = useUserStore((state) => state.name);
  return (
    <div className="flex text-center justify-center mb-5">
      <h1
        className="font-bold text-xl text-black dark:text-white"
        data-testid="title-dashboard"
      >
        Dashboard {userName ?? ""}
      </h1>
    </div>
  );
};
export default DasdBoardTitle;
