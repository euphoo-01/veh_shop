import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#5AAAE6",
    secondary: "#818181",
    error: "#FFC2C2",
    "on-background": "#171717",
    "on-surface": "#171717",
  },
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#1D1D1D",
    surface: "#1D1D1D",
    primary: "#3F739B",
    secondary: "#656565",
    error: "#B77777",
    "on-background": "#FFFFFF",
    "on-surface": "#FFFFFF",
  },
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
});
