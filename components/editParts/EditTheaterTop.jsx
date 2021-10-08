import EditImage from "./EditImage";
import EditDetail from "./EditDetail";
import EditHeading from "./EditHeading";

const ProfileTheaterTop = ({ title, capacity, station, cost, address, schedule }) => {
  return (
    <>
        <div className="flex space-x-4 justify-center">
          <div className="w-1/2 h-52">
            <EditHeading title={title} />
            <EditHeading title={capacity} />
            <EditHeading title={station} />
            <EditHeading title={cost} />
          </div>
          <EditImage />
        </div>
        <div className="flex space-x-4 justify-center">
          <EditDetail text={address} />
          <EditDetail text={schedule} />
        </div>
    </>
  );
};

export default ProfileTheaterTop;
