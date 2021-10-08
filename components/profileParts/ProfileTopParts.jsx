import ProfileImage from "./ProfileImage";
import ProfileText from "./ProfileText";
// import ProfileDetail from "./ProfileDetail";
import ProfileSentence from "./ProfileSentence";

const ProfileTopParts = ({ name, profile, img, cost, schedule }) => {
  return (
    <>
      <div className="flex flex-col space-x-4 justify-center">
        <div className="flex items-center justify-between">
          <div>
            <p className="ml-10 text-gray-400">director</p>
            <p className="text-4xl ml-10 mb-10 mt-3">{name}</p>
          </div>
        </div>
        <ProfileImage imgUrl={img}/>
      </div>
      <div className="flex space-x-4 justify-center">
        <div className="w-100% m-3 p-2 border-b text-center text-base">
          希望利用額（１週間）{cost}　万円
        </div>
        <div className="w-100% m-3 p-2 border-b text-center text-base">
          空きスケジュール　{schedule}
        </div>
      </div>
    </>
  );
};

export default ProfileTopParts;
