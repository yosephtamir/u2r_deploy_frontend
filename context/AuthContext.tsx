import React, { createContext, useContext, useState} from "react";
import { AuthContextProps } from '../@types';
import { AuthResponse } from '../@types';

const AuthContext = createContext<AuthContextProps>({} as any);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthResponse>();

    const handleAuth = (value: AuthResponse | undefined) => {
        setAuth(value);
    };

    const contextValue: AuthContextProps = {
        auth,
        handleAuth,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// use this hook in your component to have access to the AuthContext
export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return authContext;
};