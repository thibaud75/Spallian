import { useLocation } from "react-router-dom";

const Notes = () => {
  const location = useLocation();
  const { from } = location.state;

  console.log(from);

  return <div>{from}</div>;
};

export default Notes;