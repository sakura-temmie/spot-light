import Image from "next/image";
import testImg from "../../public/test01.jpg";
import EditImageButton from "./EditImageButton";

const EditImage = () => {


  return (
    <div className="w-1/2 relative">
      <Image
        className="object-contain h-48 w-full"
        src={testImg}
        alt="main Image"
      />
      <EditImageButton />
    </div>
  );
};

export default EditImage;
