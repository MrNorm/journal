import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  body: '#F5F5F3',
  text: '#2E3531',
  accent: '#7B717C',
  mainBrand: '#8E858F'
}

export const darkTheme = {
  body: '#2E3531',
  text: '#F5F5F3',
  accent: '#888089',
  mainBrand: '#8E858F'
}

export const GlobalStyles = createGlobalStyle`
  :root {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.50s linear, color 0.50s linear;

    font-family: 'Roboto Slab', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 2.5rem);
  }

  h2 {
    font-size: 1.5rem
  }

  p {
    font-size: 0.9rem;
    line-height: 1.5rem;
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }
`