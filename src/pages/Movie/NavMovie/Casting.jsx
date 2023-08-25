import { useLocation } from "react-router-dom";

const Casting = () => {
  const location = useLocation();
  const { from } = location.state;

  console.log(from);

  return <div>{from}</div>;
};

export default Casting;
