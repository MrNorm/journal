import { useState } from "react"
import Head from 'next/head'
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../components/global-theme"

function Journal({ Component, pageProps }) {

    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light')
    }

    return (

        <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Head>
                <title>Oliver Northam - My thing on the internet.</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap" rel="stylesheet"></link>
            </Head>
            <button onClick={toggleTheme}>Switch Theme</button>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default Journal
