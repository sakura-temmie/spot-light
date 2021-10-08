import Link from "next/link";

const EditButton = ({ path, title }) => {
  return (
    <Link href={path}>
      <div className="flex justify-end m-4">
        <a className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded w-40 cursor-pointer">
          {title}
        </a>
      </div>
    </Link>
  );
}

export default EditButton
