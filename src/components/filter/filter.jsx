import styles from "./filter.module.css";
import filterImg1 from "/src/assets/img.png";
import filterImg2 from "/src/assets/img2.png";
import filterImg3 from "/src/assets/christmasOrnaments_640x480.png";
import filterImg4 from "/src/assets/grinchBorder_640x480.png";

export default function FilterComponent({ onSelectFilter }) {
  return (
    <section>
      <div className={styles.filter}>
        <img
          src={filterImg1}
          onClick={() => onSelectFilter(filterImg1)}
          alt="Filter"
        />
      </div>

      <div className={styles.filter}>
        <img
          src={filterImg2}
          onClick={() => onSelectFilter(filterImg2)}
          alt="Filter"
        />
      </div>

      <div className={styles.filter}>
        <img
          src={filterImg3}
          onClick={() => onSelectFilter(filterImg3)}
          alt="Filter"
        />
      </div>

      <div className={styles.filter}>
        <img
          src={filterImg4}
          onClick={() => onSelectFilter(filterImg4)}
          alt="Filter"
        />
      </div>
    </section>
  );
}
