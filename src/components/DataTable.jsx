import { useState, useRef, useCallback, useEffect } from "react";

function DataTable({
  data,
  currentPage,
  setCurrentPage,
  linesPerPage,
  loading,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  const shouldDisplayTable = data.length > 0;

  const handleScroll = useCallback(() => {
    const table = tableRef.current;
    if (table) {
      const { scrollHeight, scrollTop, clientHeight } = table;
      if (scrollHeight - scrollTop <= clientHeight) {
        // User has reached the bottom of the table, load more data.
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  }, []);

  // Attach the scroll event listener to the table.
  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      table.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (table) {
        table.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const startIndex = (currentPage - 1) * linesPerPage;
  const endIndex = startIndex + linesPerPage;
  const filteredData = data
    .filter((line) => line.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, endIndex); // Load only up to the endIndex.

  return (
    <>
      <div>
        <input
          type="text"
          id="search-input"
          placeholder="Search for anything"
          className="focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-sky-500
                                  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                  block w-96 p-2.5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 mt-20 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div
        ref={tableRef}
        style={{
          overflowY: "scroll",
          display: shouldDisplayTable ? "flex" : "none",
        }}
        className="rounded-lg p-5 h-full flex justify-center items-start bg-gray-50"
      >
        <table>
          <tbody>
            {filteredData.map((line, index) => (
              <tr key={index} className="border-solid border-2 border-sky-500">
                <td className="p-2 whitespace-pre">
                  {index}) {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
