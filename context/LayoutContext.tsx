import React, { createContext, useState } from "react";

const MainLayoutContext = createContext({} as any);
export default MainLayoutContext;

export function MainLayoutContextProvider({ children }: { children: React.ReactNode }) {
    const [activePage, setActivePage] = useState('home');

    const contextValue = {
        activePage,
        setActivePage,
    };

    return <MainLayoutContext.Provider value={contextValue}>{children}</MainLayoutContext.Provider>
}