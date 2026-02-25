import { Routes, Route } from "react-router-dom";
import GradientBackground from "./components/background/GradientBackground";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import useTheme from "./hooks/useTheme";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Pass theme control to Navbar later */}
      <GradientBackground />
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
