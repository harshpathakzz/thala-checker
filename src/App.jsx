import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessagePage from "./MessagePage";
import Home from "./Home";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<MessagePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
