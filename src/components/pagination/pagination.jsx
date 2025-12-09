import styles from "./Pagination.module.css";
import arrowUp from "../../assets/grafisk/arrowUp.svg";
import arrowDown from "../../assets/grafisk/arrowDown.svg";

export default function Pagination({ page, setPage, maxPage }) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 0))}
        disabled={page === 0}
        className={styles.button}
        aria-label="Previous page"
      >
        <img src={arrowUp} alt="" />
      </button>

      <button
        onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
        disabled={page === maxPage}
        className={styles.button}
        aria-label="Next page"
      >
        <img src={arrowDown} alt="" />
      </button>
    </div>
  );
}
