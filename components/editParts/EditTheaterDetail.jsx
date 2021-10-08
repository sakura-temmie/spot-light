import EditTitle from "./EditTitle";
import EditSentence from "./EditSentence";
import EditButton from "./EditButton";

const ProfileTheaterDetail = ({detail}) => {

  return (
    <>
      <div className="h-80 p-5">
        <div className="flex justify-center items-center w-100% m-3 p-2 shadow-md text-center text-base">
          <EditTitle title={"劇場情報"} />
        </div>
        <EditSentence text={detail} />
        <EditButton title={"保存"} />
      </div>
    </>
  );
};

export default ProfileTheaterDetail;
