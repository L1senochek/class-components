import React, { useState } from 'react';
import styles from './settings.module.css';
import IconSettings from '../Icons/IconSettings/IconSettings';
import SettingsTheme from '../SettingsTheme/SettingsTheme';

interface ISettings {
  parentClass?: string;
}

const Settings: React.FC<ISettings> = ({ parentClass }): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      className={`${styles['settings']}${parentClass ? ` ${parentClass}` : ''}`}
    >
      <div
        className={`${styles['settings__btn']}${
          isMenuOpen ? ` ${styles['open']}` : ''
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={() => setIsMenuOpen(true)}
      >
        <IconSettings />
      </div>
      <div
        className={`${styles['settings__menu']}${
          isMenuOpen ? ` ${styles['open']}` : ''
        }`}
      >
        <SettingsTheme />
      </div>
    </div>
  );
};

export default Settings;
