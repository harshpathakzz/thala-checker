import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import ShareButtons from "./ShareButtons";
import VideoBG from "../public/MSD.mp4";

const MessagePage = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);

  // Decrypt using AES
  const bytes = CryptoJS.AES.decrypt(decodedName, import.meta.env.VITE_SECRET);
  const decryptedName = bytes.toString(CryptoJS.enc.Utf8);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-700 to-blue-800 text-white">
      <video src={VideoBG} autoPlay loop></video>
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md text-center">
        {decryptedName && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Decoded Name:</h2>
            <div className="flex flex-wrap items-center justify-center">
              {decryptedName
                .toUpperCase()
                .split("")
                .map((char, index) => (
                  <span
                    key={index}
                    className="text-indigo-700 font-semibold text-3xl mx-1"
                  >
                    {char}
                    {index < decryptedName.length - 1 ? " + " : " = 7"}
                  </span>
                ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <ShareButtons shareUrl={`http://localhost:3000/${name}`} />
        </div>

        <h1 className="text-4xl font-extrabold mt-8">THALA FOR A REASON</h1>
      </div>
    </div>
  );
};

export default MessagePage;
