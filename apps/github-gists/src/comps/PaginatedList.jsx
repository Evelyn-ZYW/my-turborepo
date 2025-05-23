import { useState } from "react";
import useGistsByPage from "../hooks/useGistsByPage";

const GISTS_PER_PAGE = 10;

export default function PaginatedList() {
  const { gists, loading, error } = useGistsByPage(1);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(gists.length / GISTS_PER_PAGE);

  const indexOfLastItem = currentPage * GISTS_PER_PAGE;
  const indexOfIfirstItem = indexOfLastItem - GISTS_PER_PAGE;
  const currentgists = gists.slice(indexOfIfirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <ul>
        {currentgists.map((item, index) => (
          <li key={index} className="single-line">
            <img src={item.owner.avatar_url} alt="" />
            <p>{Object.keys(item.files)[0]}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        {error && <div>{error}</div>}
        {loading && <div>Loading</div>}
      </div>
    </div>
  );
}
