import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MessagePage from "./MessagePage";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Analytics />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<MessagePage />} />
          <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
