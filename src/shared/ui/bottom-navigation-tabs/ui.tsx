import React from "react";
import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { Typography } from "antd";

type TabItem = {
  key: string;
  icon: ReactNode;
  label: string;
};

type BottomNavigationTabsProps = {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
};

export const BottomNavigationTabs: React.FC<BottomNavigationTabsProps> = ({
  tabs,
  activeKey,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <div
              key={tab.key}
              className={`${styles.tabItem} ${isActive ? styles.active : ""}`}
              onClick={() => onChange(tab.key)}
            >
              <div className={styles.icon}>{tab.icon}</div>
              <div>
                <Typography.Text className={styles.label}>{tab.label}</Typography.Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
