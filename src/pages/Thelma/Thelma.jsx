import React from "react";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./Thelma.css";


const Thelma = () => {
  return (
    <>
      <NavHeader />
      <div className="ThelmaDiv">
        <h1 className="Title TitleMain">thelma®</h1>
        <h2 className="Title TitleSecond">L'application citoyenne pour la préservation des espaces partagés</h2>
      </div>
    </>
  );
};

export default Thelma;