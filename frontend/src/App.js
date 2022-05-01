import "./App.css";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import BudgetList from "./components/BudgetList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddBudget from "./components/AddBudget";
import BarChart from "./components/BarChart";

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
        <Routes>
          <Route path="/" element={<BudgetList />}></Route>
          <Route path="/add" element={<AddBudget />}></Route>
          <Route path="/chart" element={<BarChart />}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
