const PointSentence = ({nom, top, text1, text2}) => {
  return (
    <>
      <div className="flex mt-4">
        <div className="flex flex-col rounded-full h-40 w-40 flex items-center border-yellow-300 font-serif justify-center border border-orange-400">
          <p>POINT</p>
          <p className="text-4xl">{nom}</p>
        </div>
        <div className="pt-5 ml-6 text-gray-500">
          <span className="text-2xl border-b-2 px-4 pb-1">{top}</span>
          <div className="mt-4 pl-4">
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PointSentence
