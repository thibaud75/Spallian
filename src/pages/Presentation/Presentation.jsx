import React from "react";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./Presentation.css"


const Presentation = () => {
  return (
    <>
      <NavHeader />
      <div className="PresentationDiv">
        <h1 className="PresentationTitle">Pourquoi Spallian ?</h1>
        <p className="PresentationInfos">Notre entretien téléphonique avec Florian s'est très bien déroulé et il m'a expliqué que Spallian recherchait
        un alternant fullstack afin de travailler sur Thelma: l'application citoyenne pour la préservation des espaces partagés. Habitant dans le centre de Paris,
        une application permettant de signaler les problèmes urbains comme les éclairages publics défectueux ou les dépôts sauvages mais également les feux en forêt ou la pollution
        de rivière dans les espaces naturels m'a rapidement interpellé.</p>
        <p className="PresentationInfos">Lorsque j'ai commencé mes recherches d'alternance, je me suis fixé trois critères: le projet, l'environnement de travail et les 
        technologies utilisées par la société. Il m'est arrivé de refuser des offres d'alternance car certains critères étaient trop éloignés de ce que je désirais (par exemple une
        startup où j'étais le seul développeur à travailler sur une architecture nocode). Travailler chez Spallian serait pour moi l'occasion de poursuivre mon apprentissage
        du développement dans une entreprise qui a du sens. Je partage vos valeurs d'indépendance, d'audace et d'innovation ainsi que d'éthique et de protection des données.</p>
        <p className="PresentationInfos">Le fait que votre offre soit fullstack est également important pour moi: je veux apprendre le maximum durant mes un an d'alternance (trois semaines
        en entreprise et une semaine en formation). Etant en reconversion après une licence de droit, de nombreuses expériences professionelles, puis deux formations fullstack et 
        de nombreux projets réalisés, j'ai désormais envie de travailler dans le monde du développement et d'apprendre de nouveaux environnements techniques.</p>
      </div>
    </>
  );
};

export default Presentation;