import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import BudgetList from "./components/BudgetList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <BudgetList />
      </ThemeProvider>
    </div>
  );
}

export default App;
