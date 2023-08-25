import React from "react";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./Presentation.css"


const Presentation = () => {
  return (
    <>
      <NavHeader />
      <div className="PresentationDiv">
        <h1 className="PresentationTitle">L'expertise de Presentation : la construction de stratégies data</h1>
        <p className="PresentationInfos">
            Presentation est né de la volonté de proposer une alternative française aux solutions de traitement de données,
            pour que la data s’exprime avec éthique et intelligence, au service de la population, et dans le respect de la culture française de liberté publique.

            Engagés dans l’innovation au service des territoires, nous fiabilisons et exploitons la richesse de l’open data,
            nous accompagnons nos clients dans la valorisation de leur patrimoine de données et nous proposons des dispositifs participatifs de création de données.

        </p>
      </div>
    </>
  );
};

export default Presentation;