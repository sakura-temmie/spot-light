import ProfileImage from "./ProfileImage";
import ProfileButton from "./ProfileButton";

const MyProfileTopParts = ({ name, profile, img, cost, schedule, action, capacity}) => {
  return (
    <>
      <div className="flex flex-col space-x-4 justify-center">
        <div className="flex justify-between">
          <div>
            <p className="ml-10 text-gray-400">director</p>
            <p className="text-4xl ml-10 mb-10 mt-3">{name}</p>
          </div>

          {/* こちらのボタンをご利用ください */}
          {/* <div>
            <ProfileButton
              title={"個別相談する"}
              path={"/chat"}
              action={action}
            />
          </div> */}
          {/* ーーーーーーーーー */}
        </div>
        <ProfileImage imgUrl={img} />
      </div>
      <div className="flex space-x-4 justify-center">
        <div className="w-100% m-3 p-2 border-b text-center text-base">
          希望利用額（１週間）{cost}　万円
        </div>
        <div className="w-100% m-3 p-2 border-b text-center text-base">
          希望収容人数　{capacity}　人
        </div>
        <div className="w-100% m-3 p-2 border-b text-center text-base">
          空きスケジュール　{schedule}
        </div>
      </div>
    </>
  );
};

export default MyProfileTopParts;
