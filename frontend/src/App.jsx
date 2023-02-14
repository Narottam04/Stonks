import { BrowserRouter } from "react-router-dom";

import "./App.css";

import AnimatedRoutes from "./Components/AnimatedRoutes";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <div className="App scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 bg-black">
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
