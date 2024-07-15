import React, { useState } from 'react';
import styles from './settings-theme.module.css';

const SettingsTheme: React.FC = ({
  parentClass,
}: {
  parentClass?: string;
}): JSX.Element => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <div
      className={`${styles['settings']}${parentClass ? ` ${parentClass}` : ''}`}
    >
      <span className={styles['settings__item']}>light</span>
      <button
        role="switch"
        onClick={() => setDarkTheme(!darkTheme)}
        className={styles['settings__btn']}
      >
        <div
          className={`${styles['settings__switcher']} ${
            darkTheme ? styles.dark : styles.light
          }`}
        ></div>
      </button>
      <span className={styles['settings__item']}>dark</span>
    </div>
  );
};

export default SettingsTheme;
