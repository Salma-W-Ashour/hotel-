import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="About" element={<></>} />
        <Route path="Services" element={<></>} />
        <Route path="Contact-us" element={<></>} />
        <Route path="Dashboard" element={<></>} />
        <Route path="work" element={<></>} />
        <Route path="*" element{<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
