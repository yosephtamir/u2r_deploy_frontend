import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'

import { MainLayoutContextProvider } from "@/context/LayoutContext";
import store from "@/app/store";
import '../styles/globals.css';

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
 
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}


const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    const AnyComponent = Component as any;

    return (
        <>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <MainLayoutContextProvider>
                        <AnyComponent {...pageProps} />
                    </MainLayoutContextProvider>
                </Provider>
            </QueryClientProvider>
            <ToastContainer />
        </ThemeProvider>
        </>
    );
}
