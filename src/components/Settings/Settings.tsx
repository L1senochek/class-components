import React, { useState } from 'react';
import styles from './settings.module.css';
import IconSettings from '../Icons/IconSettings/IconSettings';
import SettingsTheme from '../SettingsTheme/SettingsTheme';
import ISettings from '../../model/Settings';

const Settings: React.FC<ISettings> = ({ parentClass }): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      className={`${styles['settings']}${parentClass ? ` ${parentClass}` : ''}`}
      onMouseLeave={() => setIsMenuOpen(false)}
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
