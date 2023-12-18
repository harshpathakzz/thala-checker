import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import msImage from "../public/ms.png"; // Update the path accordingly

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    const trimmedInput = inputValue.replace(/\s/g, "");

    // Encrypt using AES
    if (trimmedInput.length === 0) return alert("Please enter valid input");

    const isThalla = trimmedInput.length === 7;
    const isNumericInputWithSum7 =
      trimmedInput.length < 7 &&
      /^\d+$/.test(trimmedInput) &&
      trimmedInput
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0) === 7;

    if (!isThalla && !isNumericInputWithSum7) {
      return alert("Invalid input");
    }

    const encrypted = CryptoJS.AES.encrypt(
      trimmedInput,
      import.meta.env.VITE_SECRET
    ).toString();

    const link = `/${encodeURIComponent(encrypted)}`;

    setGeneratedLink(link);
    navigate(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-800">
      <div className="max-w-md w-full p-6 bg-yellow-500 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-blue-900 mb-6">
          THALA CHECKER
        </h1>
        {/* Popup Content */}
        {showPopup && (
          <div className="bg-white p-4 mb-4 rounded-md">
            <p className="text-sm text-gray-700">
              Welcome to Thala Checker! Please provide an input with a sum of 7
              or a length of 7 for Thala for a resaon.
            </p>
            <button
              className="mt-2 bg-blue-800 text-yellow-500 p-2 rounded-md hover:bg-blue-1000"
              onClick={handleClosePopup}
            >
              Got it!
            </button>
          </div>
        )}
        <img src={msImage} alt="MS Dhoni" className="mb-4 w-full" />
        <input
          className="mt-1 p-2 w-full border rounded-md text-gray-800"
          placeholder="MSDhoni"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-800 text-yellow-500 p-2 rounded-md hover:bg-blue-1000"
          onClick={handleSubmit}
        >
          Check
        </button>
        {generatedLink && (
          <a
            className="block mt-4 text-purple-900 hover:underline"
            href={generatedLink}
          >
            Click to see message
          </a>
        )}
      </div>
    </div>
  );
}

export default Home;
