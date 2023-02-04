import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { GlobalStyled } from "./assets/style/GlobalStyles";
import store from "./store/configureStore";
import { theme } from "./assets/style/theme";
import { ThemeProvider } from "styled-components";
const root = ReactDOM.createRoot(document.getElementById("app-root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyled />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
