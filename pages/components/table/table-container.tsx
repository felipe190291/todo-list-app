const TableContainer: React.FC<any> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col "></div>
      <div className="align-middle inline-block min-w-full max-h-[65vh]">
        <table className="min-w-full divide-y divide-gray-light dark:divide-gray-darker relative">
          {children}
        </table>
      </div>{" "}
    </div>
  );
};
export default TableContainer;
