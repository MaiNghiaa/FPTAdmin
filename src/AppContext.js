// AppContext.js
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [basename, setBasename] = useState(""); // Cung cấp một giá trị mặc định ở đây nếu cần

  return (
    <AppContext.Provider value={{ basename, setBasename }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
