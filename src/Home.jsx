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
    <div>
      <h1>Generate Personalized Link</h1>

      <label>
        Enter your name:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>

      <button onClick={handleSubmit}>Generate Link</button>

      {generatedLink && <a href={generatedLink}>Click to see message</a>}
    </div>
  );
}

export default Home;
