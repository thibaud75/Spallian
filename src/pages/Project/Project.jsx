import React from "react";
import NavHeader from "../../components/NavHeader/NavHeader";
import { Link } from "react-router-dom";
import "./Project.css";


const Project = () => {
  return (
    <>
      <NavHeader />
      <div className="ProjectDiv">
        <h1 className="Title TitleMain">Le projet</h1>
        <p className="ProjectParagraph">Le but du projet était de créer une application React rapide qui fait appel à une API et en affiche les résultats. Le choix de l'API étant libre,
        j'ai choisi une API de cinéma <Link to = "https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">Omdbapi</Link> car le cinéma est une de mes passions.</p>

        <p className="ProjectParagraph">J'ai utilisé React Router pour la navigation et ses outils comme Outlet ou useLocation, j'ai utilisé fetch pour réaliser mes requête API et non pas React Query, bien que j'ai lu la documentation, car je ne l'ai jamais utilisé et que
        je suis donc plus à l'aise avec fetch ou Axios. J'ai utilisé les hooks de React (useState et useEffect), du CSS et j'ai refacto mon code de la manière à ce qu'il soit le plus
        clair possible: un dossier router, un dossier components, un dossier pages ainsi qu'un dossier assets.</p>

        <p className="ProjectParagraph">Dans un premier temps on rentre un film dans la barre de recherche. Une requête à l'API va s'effectuer: si la recherche
        aboutie alors une liste de tous les films va s'afficher, sinon un message expliquant à l'utilisateur qu'aucun film n'a été trouvé apparâit. C'est donc une requête par 
        champs de saisie (by Search). Dans un second temps, l'utilisateur peut cliquer sur l'affiche du film pour en consulter les informations. A cet endroit, il va pouvoir 
        regarder les informations suivantes: le casting, les critiques de la presse ainsi que le synopsis. C'est une deuxième requête API: une requête par ID.
         </p>
        <p className="ProjectParagraph">J'ai repris certains éléments du site de <Link to = "https://www.spallian.com/" target="_blank" rel="noopener noreferrer">Spallian</Link> comme le logo ou les couleurs principales.
        J'espère que mon site est convivial et réactif et que vous passerez un agréable moment!</p>

        <p className="ProjectParagraph"><strong>Thibaud Delvert</strong></p>
      </div>
    </>
  );
};

export default Project;