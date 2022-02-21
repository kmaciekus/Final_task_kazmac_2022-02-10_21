import { createContext, useContext } from "react";

export const MenuContext = createContext({
    toggleMenu: false,
    setToggleMenu: (auth) => {}
});

export const useMenu = () => useContext(MenuContext);