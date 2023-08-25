import { useLocation } from "react-router-dom";
import "../Movie.css";

const PressReview = () => {
  const location = useLocation();
  const { from } = location.state;

  console.log(from);

  return (
    <div>
      {from.map((elem, index) => {
        return (
          <div key={index} className="CritiqueDiv">
            <p>
              <strong>Source: </strong>
              {elem.Source}
            </p>
            <p>
              <strong>Ratings: </strong>
              {elem.Value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PressReview;
