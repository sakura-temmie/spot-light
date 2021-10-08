import EditHeading from "./EditHeading";
import EditSentence from "./EditSentence";

const EditText = ({ name, text }) => {
  return (
    <div className="w-1/2 h-52">
      <EditHeading title={name} />
      <EditSentence text={text} />
    </div>
  )
}

export default EditText
