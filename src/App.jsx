import WebcamComponent from "./components/webcam/webcam";
import styles from "./App.module.css";


export default function App() {
  return (
    <div className={styles.app}>
      <WebcamComponent />
    </div>
  )
}