import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";

import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";

import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;