import React from "react";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./Project.css";


const Project = () => {
  return (
    <>
      <NavHeader />
      <div className="ProjectDiv">
        <h1 className="Title TitleMain">project®</h1>
        <h2 className="Title TitleSecond">L'application citoyenne pour la préservation des espaces partagés</h2>
      </div>
    </>
  );
};

export default Project;