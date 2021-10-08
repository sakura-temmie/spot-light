import ProfileHeading from "./ProfileHeading";
import ProfileSentence from "./ProfileSentence";

const ProfileText = ({ name, text }) => {
  return (
    <div className="w-1/2 h-52">
      <ProfileSentence text={text} />
    </div>
  )
}

export default ProfileText
