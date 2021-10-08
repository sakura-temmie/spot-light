
const EditSelectParts = ({ title, optionData }) => {
  return (
    <div className="w-1/4 m-3 border text-center">
      <p className="w-100% m-3 p-2 shadow-md text-center text-base">{ title }</p>
      <select>
        {optionData.map((data, index) => (
          <option value={data.value} key={index}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EditSelectParts
