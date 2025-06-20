import React, { createContext, useState } from 'react';

export const UserDataInfo = createContext();

export const UserDataInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserDataInfo.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataInfo.Provider>
  );
};
