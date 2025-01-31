import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Contact from "./Components/contact";
import About from "./Components/about";
import Hotels from "./Components/hotels";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/About" element={<About />} />
        <Route path="Services" element={<></>} />
        <Route path="/Contact-Us" element={<Contact />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="Dashboard" element={<></>} />
        <Route path="work" element={<></>} />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
