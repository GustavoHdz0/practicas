import { createContext, useState, useContext, Children } from "react";
import { strings } from "../translations/strings";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const switchLanguage = (lang) => setLanguage(lang);

  const t = strings[language];

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
