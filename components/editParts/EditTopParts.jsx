import EditImage from "./EditImage";
import EditText from "./EditText";
import EditDetail from "./EditDetail";

const EditTopParts = ({name, text, editCost, editSchedule}) => {
  return (
    <>
      <div className="flex space-x-4 justify-center">
        <EditText name={name} text={text} />
        <EditImage />
      </div>
      <div className="flex space-x-4 justify-center">
        <EditDetail text={editCost} />
        <EditDetail text={editSchedule} />
      </div>
    </>
  );
};

export default EditTopParts;
