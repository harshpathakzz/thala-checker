import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const MessagePage = () => {
  const { name } = useParams();
  console.log(name);
  // Decrypt using AES
  const bytes = CryptoJS.AES.decrypt(name, "secret key 123");
  const decryptedName = bytes.toString(CryptoJS.enc.Utf8);
  console.log(decryptedName);
  console.log("Message");

  return <div>My name is {decryptedName}</div>;
};

export default MessagePage;
