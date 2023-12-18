import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessagePage from "./MessagePage";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<MessagePage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
