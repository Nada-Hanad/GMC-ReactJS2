import { useContext, useState } from "react";
import UserFavsContext from "./userFavsContext";

export function UserFavsProvider({ children }) {
  const [favs, setFavs] = useState([]);
  return (
    <UserFavsContext.Provider value={{ favs, setFavs }}>
      {children}
    </UserFavsContext.Provider>
  );
}

export const useUserFavoritesContext = () => useContext(UserFavsContext);
