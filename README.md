<h1 align="center">My Events</h1>
<p align="center">service pouvant lister des évenements à partir d'une API publique et organiser des sorties entre amis</p>
<p align="center">projet de groupe réalisé avec <a href="https://github.com/CorentinNrd" target="_blank"><strong>Corentin Nordmann</strong></a> dans le cadre de notre formation à la Web@cadémie by Epitech</p>

<img src="./img_readme_home.png" />
<div align="center">
<h2>Les technos</h2>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<p>API => <a href="https://public.opendatasoft.com/explore/dataset/evenements-publics-cibul/table/?disjunctive.tags&disjunctive.placename&disjunctive.city">OpenAgenda</a></p>
 </div>

<h2 align="center">Installation</h2>
Clonez ce dépot, l'application se divise en plein de sous-dossiers: c'est le dossier "client" qui va accueillir la partie React JS et le reste sera la partie serveur + base de donnée Node + MongoDB <br>
Placez vous dans client et faites <code>npm install</code> ensuite remontez d'un dossier et placez vous dans my_events et refaites <code>npm install</code>. Vous avez récupéré toutes les dépendances nécéssaires au bon fonctionnement du projet.<br>
<h3>La connexion à la bdd</h3>
Commencez par créer un fichier .env à la racine de l'app que vous ajouterez immédiatement à votre .gitignore. Ce fichier comportement votre URL de connexion MongoDB ainsi que votre port. Ceux ci devraient ressembler à quelque chose comme ça: <br>
<code>MONGO_URL = mongodb+srv://<i>ton_nom_de_user</i>:<i>ton_motdepasse</i>@cluster0.ylayl.mongodb.net/<i>ton_nom_de_db</i></code><br>
<code>PORT=XXXX</code><br>
Une fois terminé placez vous dans le dossier client et recréez un .env mais cette fois ci il accueillera votre url d'api facebook et votre url d'api météo. Par convention, les deux noms de variables doivent commencer par <code>REACT_APP_</code><br>
Ainsi j'ai respectivement nommé les miennes <code>REACT_APP_API_FACEBOOK="xxxxxxxxxxxx"</code> et <code>REACT_APP_API_WEATHER="xxxxxxxxxxxxx”</code><br>
Vous voilà prêt à utiliser <strong>My events</strong> ! <br>

NB: nous n'avons pas choisi de mettre l'url de l'api OpenAgenda car elle est publique dans tous les cas.

<h2 align="center">Présentation du projet</h2>
<div align="justify">
  <p>Lister les évènements d'un agenda public, dans un premier temps par votre position (par défaut Paris) avec possibilité de filtrer la liste par type d'évènement    ou par lieu. Par ailleurs, chaque événement est détaillé sur une page dédiée avec la possibilité de détailler d'organiser des sorties entre amis</p>
  <p>Le site se présente en single page application, 100% responsive (bureau, tablette, téléphone)</p>
  <img src="./rwd.png" width="400px" height="auto" alt="rwd"/>
 </div>

<h3>Réseau social</h3>
<p>Pour ce projet nous n'avons pas implémenté de connexion ou inscription classique, mais la possibilité de le faire via Facebook (uniquement pour le moment) chaque utilisateur a la possibilité de choisir un petit texte descriptif sur sa page profil et d'accéder à toutes les sorties qu'il a organisé ou auxquelles il participe privées ou publiques</p>

<h3>Les sorties</h3>
<p>Une fois le compte créé, l’utilisateur pourra créer des “sorties” à partir des événements récupérés sur l’api
d’OpenAgenda, puis il peut inviter des amis (d’autres utilisateurs, en indiquant leur pseudo) à cette “sortie”.
Une sortie se caractérise par :</p>
<ul>
  <li>Un “événement”OpenAgenda".</li>
<li>Un organisateur (un utilisateur de votre service).</li>
<li>Une visibilité (publique / privé, définie par l’organisateur).</li>
<li>Des participants (d’autres utilisateurs de votre service).</li>
<li>Chaque “sortie” a une page spéciale permettant aux participants d’échanger.</li>
<li>Cette page comporte une carte indiquant le lieu de la sortie, ainsi qu’un mur de message sur lequel
chaque participant à ladite sortie pourra écrire.</li>
  <li>Par ailleurs veuillez noter que :</li>
 <ul>
    <li>Plusieurs sorties se rapportant à un même “événement OpenAgenda” mais organisées par différents
    utilisateurs peuvent être créées (quelle que soit la visibilité de chacune des sorties).</li>
    <li>Pour une “sortie privée” les participants doivent être ajoutés exclusivement par l’organisateur, pour
    une sortie publique, tout le monde peut s’y ajouter librement.</li>
    <li>Tous les utilisateurs peuvent se retirer d’une sortie (quelle que soit la visibilité de la sortie), si
    cet utilisateur est l’organisateur, alors la sortie est annulée.</li>
    Sur le profil des utilisateurs on retrouvera une liste des sorties publiques auxquelles ils participent, si
    l’on visite son propre profil, toutes les sorties auxquelles il participe seront listées.</li>
  </ul>
</ul>
<p>NB: nous avons implémenté une petite fenêtre météo sur la page d'une sortie organisée qui affiche le temps local du lieu de la sortie</p>
