import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="w-screen h-screen min-h-screen text-white bg-green-700">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
