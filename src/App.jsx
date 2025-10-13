import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Service from "./pages/Service.jsx";
import PinterestGallery from "./components/PinterestGallery.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
