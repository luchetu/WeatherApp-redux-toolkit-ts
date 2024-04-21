import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from './Language.module.scss';


interface LanguageSwitcherProps {

  handleLanguageChange: (language: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ handleLanguageChange, isOpen, setIsOpen }) => {

  const currentLanguage = useSelector((state: any) => state.language.currentLanguage);


  return (
    <div className={styles.LanguageSwitcher}>
      <div className={styles.dropdown}>
        <button className={styles.LanguageSwitcherButton} onClick={() => setIsOpen(!isOpen)}>
          {currentLanguage === 'en' ? 'English' : currentLanguage === 'fr' ? 'French' : 'Swahili'}
          <FaAngleDown />
        </button>
        {isOpen && (
          <div className={styles.dropdownContent}>
            <button onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('sw')}>Swahili</button>
            <button onClick={() => handleLanguageChange('fr')}>French</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
