import { useState } from 'react';
import FilterComponent from '../filter/filter';
import LoginModal from '../login/Login';
import WebcamComponent from '../webcam/webcam';
import styles from './frontpageComp.module.css'
import { Link } from 'react-router-dom';

const FrontpageComp = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);

    return (
      <section className={styles.container}>
        <div className={styles.backgroundOverlay}>
        <h1>Skab Julemagien</h1>

        <div className={styles.content}>
          <div className={styles.filters}>
            <h3>Vælg din julemagi</h3>
            <FilterComponent
              onSelectFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
            />
          </div>

          <div className={styles.camera}>
            <WebcamComponent selectedFilter={selectedFilter}>
            </WebcamComponent>
          </div>

          <div className={styles.top3}>
            <h3>Top 3</h3>
            <div className={styles.imgTop}>Placeholder for top 1</div>
            <div className={styles.imgTop}>Placeholder for top 2</div>
            <div className={styles.imgTop}>Placeholder for top 3</div>
          </div>
        </div>

        <div className={styles.buttons}>

          <Link to="/gallery">
            <button className={styles.button}>Se nissernes billedbog</button>
          </Link>

          <button className={styles.button} onClick={() => setShowModal(true)}>
            Til julemandensværkssted
          </button>
          <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>
      </section>
    );
}

export default FrontpageComp
