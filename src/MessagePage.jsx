import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import ShareButtons from "./ShareButtons";
const MessagePage = () => {
  const { name } = useParams();
  console.log(name);
  const decodedName = decodeURIComponent(name);
  // Decrypt using AES
  const bytes = CryptoJS.AES.decrypt(decodedName, import.meta.env.VITE_SECRET);

  const decryptedName = bytes.toString(CryptoJS.enc.Utf8);
  console.log(decryptedName);
  console.log("Message");

  return (
    <>
      <div>
        {decryptedName
          .toUpperCase()
          .split("")
          .map((char, index) => (
            <span key={index}>
              {char}
              {index < decryptedName.length - 1 ? " + " : " = 7"}
            </span>
          ))}
        <ShareButtons shareUrl={`http://localhost:3000/${name}`}></ShareButtons>
        <h1>THALA FOR A REASON</h1>
      </div>
    </>
  );
};

export default MessagePage;
