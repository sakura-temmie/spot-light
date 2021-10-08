import ProfileTitle from "./ProfileTitle";
import ProfileSentence from "./ProfileSentence";

const ProfileTheatreDetail = ({detail}) => {
  return (
    <>
      <div className="h-80 p-5">
        <div className="flex justify-center items-center w-100% m-3 py-2  text-center text-base">
          <p className="w-full border-b py-4">劇場情報</p>
        </div>
        <ProfileSentence text={detail} />
      </div>
    </>
  );
};

export default ProfileTheatreDetail;
