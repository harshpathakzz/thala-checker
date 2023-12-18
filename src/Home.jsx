import { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Encrypt using AES
    if (inputValue.length === 0) return alert("Please enter your name");

    const isThalla = inputValue.length === 7;
    const isNumericInputWithSum7 =
      inputValue.length < 7 &&
      /^\d+$/.test(inputValue) &&
      inputValue
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0) === 7;

    if (!isThalla && !isNumericInputWithSum7) {
      return alert("Invalid input");
    }

    const encrypted = CryptoJS.AES.encrypt(
      inputValue,
      import.meta.env.VITE_SECRET
    ).toString();

    const link = `/${encodeURIComponent(encrypted)}`;

    setGeneratedLink(link);
    navigate(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200">
      <div className="max-w-md w-full p-6 bg-blue-800 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-yellow-200 mb-6">
          THALA CHECKER
        </h1>

        <input
          className="mt-1 p-2 w-full border rounded-md text-black-700"
          placeholder="MSDhoni"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          className="mt-4 bg-yellow-500 text-blue-800 p-2 rounded-md hover:bg-yellow-600"
          onClick={handleSubmit}
        >
          Check
        </button>

        {generatedLink && (
          <a
            className="block mt-4 text-yellow-500 hover:underline"
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
