import { Spin } from "antd";
import styles from "./styles.module.css";

export function LoaderContainer() {
  return (
    <div className={styles.container}>
      <Spin size="large" />
    </div>
  );
}
