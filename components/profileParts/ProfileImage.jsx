import Image from "next/image";
// import testImg from "../../public/test01.jpg"

const ProfileImage = ({ imgUrl }) => {

  return (
    <div className="bg-white p-4">
      <Image
        // className="object-contain h-48 w-full"
        src={imgUrl}
        alt="main Image"
        height="600"
        width="1000"
        objectFit="cover"
      />
    </div>
  );
};

export default ProfileImage;
