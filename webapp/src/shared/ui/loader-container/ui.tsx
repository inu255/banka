import { Spin } from "antd";
import styles from "./styles.module.css";

type Props = {
  height?: string | number;
};

export function LoaderContainer({ height = "100vh" }: Props) {
  return (
    <div className={styles.container} style={{ height }}>
      <Spin size="large" />
    </div>
  );
}
