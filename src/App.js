import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="a"
          element={
            <div className="flex">
              <div className="grow h-14">01</div>
              <div className="grow-0 h-14">02</div>
              <div className="grow h-14">03</div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
