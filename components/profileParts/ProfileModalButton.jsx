// import ProfileModal from "../../components/profileParts/ProfileModal";

const ProfileModalButton = ({ title }) => {
  return (
    <>
      <button className="mr-5 bg-transparent hover:bg-blue-700 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        {title}
      </button>
      {/* <ProfileModal title="aaaa" text="aaaa" /> */}
    </>
  );
};

export default ProfileModalButton;
