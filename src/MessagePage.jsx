import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import ShareButtons from "./ShareButtons";

const MessagePage = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);

  // Decrypt using AES
  const bytes = CryptoJS.AES.decrypt(decodedName, import.meta.env.VITE_SECRET);
  const decryptedName = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    const video = videoRef.current;

    const playVideo = () => {
      // Start playing the video
      video.play().catch((error) => {
        // Handle the error
        console.error("Error playing video:", error);
      });

      // Set the flag to indicate that the video has started
      setVideoStarted(true);
    };

    // If the user interacts with the page, start the video
    document.addEventListener("click", playVideo);

    // Cleanup: Remove the click event listener
    return () => {
      document.removeEventListener("click", playVideo);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 object-cover w-full h-full"
        src="https://firebasestorage.googleapis.com/v0/b/link-sync-64286.appspot.com/o/video%2FMSD.mp4?alt=media&token=668ef190-09aa-431c-b521-9df79e324e3f"
        autoPlay={videoStarted} // Autoplay only when the flag is true
        loop
      ></video>
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white relative z-10">
        <div className="max-w-md w-full p-8 bg-transparent rounded-md shadow-md text-center">
          {decryptedName && (
            <div style={{ whiteSpace: "nowrap" }}>
              <span className="">
                {decryptedName
                  .toUpperCase()
                  .split("")
                  .map((char, index) => (
                    <span
                      key={index}
                      className="text-white font-bold text-3xl mx-1"
                    >
                      {char}
                      {index < decryptedName.length - 1 ? " + " : " = 7"}
                    </span>
                  ))}
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-row justify-evenly">
            <ShareButtons shareUrl={window.location.href} />
          </div>

          <h1 className="text-4xl font-extrabold mt-8">THALA FOR A REASON</h1>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
