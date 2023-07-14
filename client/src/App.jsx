import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Auth from "./components/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/auth" Component={Auth} />
    </Routes>
  );
}

export default App;
