import React from "react";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./Spallian.css"


const Spallian = () => {
  return (
    <>
      <NavHeader />
      <div className="SpallianDiv">
        <h1 className="SpallianTitle">L'expertise de Spallian : la construction de stratégies data</h1>
        <p className="SpallianInfos">
            Spallian est né de la volonté de proposer une alternative française aux solutions de traitement de données,
            pour que la data s’exprime avec éthique et intelligence, au service de la population, et dans le respect de la culture française de liberté publique.

            Engagés dans l’innovation au service des territoires, nous fiabilisons et exploitons la richesse de l’open data,
            nous accompagnons nos clients dans la valorisation de leur patrimoine de données et nous proposons des dispositifs participatifs de création de données.

        </p>
      </div>
    </>
  );
};

export default Spallian;