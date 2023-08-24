import { useLocation } from "react-router-dom";

const Critiques = () => {
  const location = useLocation();
  const { from } = location.state;

  console.log(from);

  return (
    <div>
      {from.map((elem, index) => {
        return (
          <div key={index}>
            <p>Source: {elem.Source}</p>
            <p>Rating: {elem.Value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Critiques;