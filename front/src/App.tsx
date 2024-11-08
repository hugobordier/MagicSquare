import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";

const App = () => {
  return (
    <div className="w-screen h-full min-h-screen text-white bg-green-700">
      <Router>
        <Routes>
          <Route path="/" Component={GamePage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
