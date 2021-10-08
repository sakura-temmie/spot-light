import ProfileTitle from "./ProfileTitle";
import ProfileTag from "./ProfileTag";
import ProfileModal from "./ProfileModal";

const ProfileActorResults = (
  { title,
    theaterName,
    schedule,
    time,
    customer,
    actButton,
    actModalTitle,
    actModalText,
    castButton,
    castModalTitle,
    castModalText
  }
) => {
  return (
    <>
      <div className="justify-center items-center m-3 p-2 bg-white text-center text-base">
        <div className="flex justify-center items-center m-3 p-2 border-b text-center text-base">
          <ProfileTitle title={title} />
        </div>
        <div className="flex justify-between m-10">
          <div className="text-left">
            <p>劇場名：{theaterName}</p>
            <p>{schedule}</p>
          </div>
          <div className="flex">
            <div>
              <ProfileTag text="公演回数" />
              <span>{time} 回</span>
            </div>
            <div className="ml-3">
              <ProfileTag text="集客率" />
              <span>{customer}　％</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end m-4">
          <ProfileModal
            button={actButton}
            title={actModalTitle}
            text={actModalText}
          />
          <ProfileModal
            button={castButton}
            title={castModalTitle}
            text={castModalText}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileActorResults;
