import ProfileImage from "./ProfileImage";
import ProfileDetail from "./ProfileDetail";
import ProfileHeading from "./ProfileHeading";
import ProfileButton from "./ProfileButton";

const ProfileTheatreTop = ({
  title,
  capacity,
  station,
  cost,
  address,
  schedule,
  img,
  action,
}) => {
  return (
    <>
      <div style={{ width: "960px" }}>
        <div className="flex space-x-4 justify-between">
          <div>
            <p className="ml-10 text-gray-400">theater</p>
            <p className="text-4xl ml-10 mb-10 mt-3">{title}</p>
          </div>
          <div className="">
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ProfileImage imgUrl={img} />
        </div>
        <div className="w-2/3 h-52 m-auto">
          <div className="w-100% m-3 p-2 border-b text-center text-base">
            最大収容人数　：　{capacity}　人
          </div>
          <div className="w-100% m-3 p-2 border-b text-center text-base">
            最寄駅　：　{station}
          </div>
          <div className="w-100% m-3 p-2 border-b text-center text-base">
            利用金額　：　{cost}　万円
          </div>
        </div>
        <div className="flex space-x-4 justify-center">
          <div className="w-100% m-3 p-2 border-b text-center text-base">
            住所　【　{address}　】　
          </div>
          <div className="w-100% m-3 p-2 border-b text-center text-base">
            {schedule} ヶ月以降 対応可能
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTheatreTop;
