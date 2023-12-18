import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const ShareButtons = ({ shareUrl }) => {
  return (
    <div className="flex space-x-4">
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon
          size={32}
          round
          className="text-green-500 hover:text-green-700"
        />
      </WhatsappShareButton>

      <TwitterShareButton url={shareUrl}>
        <TwitterIcon
          size={32}
          round
          className="text-blue-500 hover:text-blue-700"
        />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon
          size={32}
          round
          className="text-indigo-500 hover:text-indigo-700"
        />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
