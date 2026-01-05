# Réduction de l'impact écologique d'un service numérique de partage de documents

## Choix du Sujet

En tant qu’étudiants et futurs ingénieurs, le partage de documents de travail est une pratique très courante. L’essor du numérique a par ailleurs entraîné une augmentation significative de l’utilisation de ces services, et donc de la quantité de documents échangés. Il nous paraît donc pertinent de proposer une solution capable de répondre à cette demande croissante, tout en prenant en compte son impact sur l’environnement et en le limitant le plus possible.

## Utilité Sociale

Le partage de documents numériques joue un rôle central dans notre société actuelle. Il constitue un outil essentiel pour la collaboration, la transmission des savoirs et l’efficacité au travail. Dans un contexte où l’enseignement, la recherche et la vie professionnelle reposent de plus en plus sur la circulation rapide et fluide de fichiers, un service de partage de documents représente un vecteur incontournable de coopération.

Au-delà de la simple commodité, son utilité sociale est multiple.

* Dans l’éducation, il permet aux étudiants, enseignants et chercheurs d’échanger facilement cours, supports pédagogiques et résultats de travaux, favorisant ainsi la diffusion des connaissances.

* Dans le monde professionnel, il soutient le travail collaboratif, en particulier dans un contexte de télétravail et d’équipes réparties géographiquement.

* Dans la sphère personnelle et associative, il rend possible la mise en commun de projets, la coordination d’événements ou encore le partage de ressources utiles au quotidien.

Le partage numérique de documents contribue donc directement à la réduction des inégalités d’accès à l’information : chacun peut consulter, modifier ou enrichir un fichier sans avoir besoin de moyens matériels lourds, coûteux ou polluants (impressions papier, déplacements physiques, envoi postal).

## Effet de la numérisation

Avant la création du numérique, le partage de documents reposait sur des moyens matériels : impressions papier, photocopies, envois postaux ou déplacements physiques pour transmettre l’information. Ces pratiques avaient un coût élevé, tant en ressources qu’en temps :

* Consommation de papier : chaque échange nécessitait plusieurs copies imprimées, contribuant à la déforestation, à l’utilisation d’eau et de produits chimiques pour la fabrication du papier.

* Envoi postal : le transport des documents par courrier ou messagerie impliquait une logistique élevée (véhicules, carburants, emballages), avec une empreinte carbone importante.

* Déplacements physiques : réunions ou échanges nécessitaient parfois de se déplacer pour remettre ou consulter un document, ce qui générait des émissions supplémentaires liées aux transports.

* Stockage matériel : conserver les documents exigeait des classeurs, armoires et espaces dédiés, eux-mêmes producteurs de déchets et limités en capacité.

La numérisation a transformé cette dynamique :

* Un fichier numérique peut être dupliqué et diffusé instantanément sans consommation supplémentaire de papier ni de carburant.

* Le stockage dématérialisé réduit la nécessité d’espaces physiques et facilite l’archivage.

* La rapidité et la facilité de transmission renforcent l’efficacité des échanges, permettant à des millions de personnes d’accéder à l’information quasi simultanément.

Ainsi, la numérisation représente une rupture majeure : elle diminue fortement l’usage de ressources matérielles traditionnelles (papier, transport, logistique) et démocratise l’accès au savoir.

## Scénarios d’usage et impacts

Nous partons de l'hypothèse que l'utilisateur du drive accède plusieurs fois par jour sur son interface pour importer et exporter des fichiers. Pour cette raison, nous prendrons en compte l'accès aux fichiers une seconde fois après chaque exportation/importation pour voir l'effet du cache.

### Scénario 1 : Importation d'un fichier dans le drive

- L'utilisateur accède à son drive
- Il clique sur le bouton pour importer un fichier
- Il choisit le fichier et valide l'importation
- L'utilisateur se retrouve nouveau sur la page d'accueil de son drive

### Scénario 2 : Exportation d'un fichier dans le drive

- L'utilisateur accède à son drive
- Il sélectionne le fichier qu'il souhaite télécharger
- Il clique sur le bouton télécharger pour récupérer le fichier
- L'utilisateur se retrouve nouveau sur la page d'accueil de son drive

### Scénario 3 : Navigation dans le drive

- L'utilisateur accède à son drive
- Il scroll pour trouver le dossier souhaité
- Il clique sur un dossier pour accéder à son contenu

## Impact de l'exécution des scénarios auprès de différents services concurrents

Nous avons choisi de comparer l'impact des scénarios pour les services de stockage de documents en ligne les plus utilisés et connus du grand public. Pour cela, nous avons choisi Google Drive, Microsoft OneDrive et DropBox.

Et, pour calculer l'impact de ces scénarios, nous avons dû calculer à la main les scores et classes écoindex des services. Vous pouvez retrouver plus de détails sur comment nous avons réalisé les mesures dans la partie benchmark, accessible dans les liens du tableau ci-dessous.

| Service            | Score (sur 100) | Classe | Détail des mesures                          |
|--------------------|-----------------|--------|---------------------------------------------|
| Google Drive       | 5.7             | G      | [...](./benchmark/GoogleDrive/benchmark.md) |
| Microsoft OneDrive | 16.2            | F      | [...](./benchmark/Microsoft/benchmark.md)   |
| DropBox            | 12.4            | F      | [...](./benchmark/DropBox/benchmark.md)     |

### Analyse des résultats

Pour la majorité des services, nous pouvons constater que nous obtenons un score qui est très bas. Cela peut s'expliquer par plusieurs facteurs divers. Nous avons effectué les tests sur nos comptes personnels pour Google et Microsoft. Ces comptes contiennent ainsi déjà beaucoup de données. Le nombre de requêtes et d'éléments du DOM étant relatif au nombre de fichiers stockés sur notre compte, les mauvais résultats peuvent s'expliquer de cette manière.

Malgré cela, nous avons donc décidé d'intégrer un service que nous n'avions jamais utilisé, ici Dropbox. Cela nous permet de confirmer que les très mauvais résultats peuvent s'expliquer par la quantité de données stockées sur le service. Cependant, nous pouvons tout de même constater que les scores obtenus pour un service vide sont toujours très bas. Cela peut s'expliquer par la quantité d'éléments graphiques qui s'affichent à l'écran pour une simple action (pop-up de confirmation, animation, ...) ou encore par les nombreux traqueurs qui s'installent au chargement de la page.


## Modèle économique

Comme nous l’avons observé précédemment, une part importante de l’impact environnemental d’un service numérique découle directement de son modèle économique. En effet, ce modèle conditionne le volume de données échangées, le nombre d’utilisateurs actifs, les pratiques de stockage et la fréquence des sollicitations réseau. Il est donc nécessaire d’analyser les principaux acteurs du partage de documents afin d’en déduire les leviers possibles de sobriété.

| Service            | Accès gratuit  | Abonnement Payant                                                 | Répartition des revenus                                     |
|--------------------|----------------|-------------------------------------------------------------------|-------------------------------------------------------------|
| Google Drive       | 15 Go gratuits | 100 Go à 2 €/mois / 2 To à 10 €/mois                              | Freemium (publicités indirectes via l’écosystème Google)    |
| Microsoft OneDrive | 5 Go gratuits  | 100 Go à 2 €/mois / 1 To à 10 €/mois / 6 To à 13 €/mois (famille) | Freemium (abonnement Microsoft 365, intégration écosystème) |
| DropBox            | 2 Go gratuits  | 2 To à partir de 12 €/mois / 3 To à 20 €/mois                     | Freemium (abonnement pur, sans publicité)                   |

Tab. 1 : Offres des principaux services de partage de documents (particuliers).

Ces offres présentent des caractéristiques communes :

* Un accès gratuit limité, financé par d’autres activités (publicité, intégration logicielle, collecte de données).

* Des formules payantes permettant un stockage accru et la suppression des restrictions.

* Une forte incitation à l’abonnement, souvent couplée à d’autres services du même groupe (Gmail, Office, etc.).

Les différences se situent surtout dans la nature des revenus et leur dépendance à la donnée utilisateur :

* Google Drive et OneDrive tirent parti d’écosystèmes complets (publicité ciblée, synchronisation, analyse de l’usage), ce qui alourdit indirectement l’empreinte carbone liée au suivi et à la personnalisation.

* Dropbox, reposant uniquement sur un modèle par abonnement, se montre plus neutre sur le plan de la collecte de données, mais nécessite un volume d’utilisateurs payants élevé pour rester viable.

Le seul modèle alternatif identifié est celui de **Nextcloud**, totalement gratuit mais reposant sur des **dons** et des **services d’hébergement professionnels** proposés par des partenaires. Il est probable que la maintenance plus limitée de sa plateforme publique (par rapport à un service grand public tel que Google Drive) nécessite une équipe technique plus réduite.

| **Source possible de revenus**                                            | **Montant unitaire** | **Quantité nécessaire pour financer un salaire¹** |
|---------------------------------------------------------------------------|----------------------|---------------------------------------------------|
| Abonnement (2 €/mois)                                                     | 24 €/an              | 500                                               |
| Affichage d’une publicité (régie tierce)                                  | 0,00046 €²           | 26 000 000                                        |
| Diffusion d’une publicité (régie intégrée)                                | 10 000 €³            | 1,2                                               |
| Vente de services complémentaires (hébergement sécurisé, support premium) | 200 €⁴               | 60                                                |

**Tab. 2 : Sources de revenus possibles pour un service de stockage en ligne.**

L’étude de l’offre des services cloud destinés au grand public (cf. Tab. 2) nous a permis d’identifier les principales sources de revenus utilisées. Associées à un bref état de l’art (cf. Tab. 3), nous avons pu établir que :

- la **revente ou l’exploitation des données d’usage** n’est pas une source de revenu directe, mais elle alimente le ciblage publicitaire ;  
- les deux modèles de publicité les plus courants sont le **revenu pour mille vues (RPM)** et le **revenu par clic (CPC)** ; le second domine pour les régies tierces, tandis que le premier sert surtout à estimer les revenus moyens ;  
- une **régie intégrée** (bandeaux internes, partenariats directs) génère des revenus bien plus élevés qu’une régie tierce ;  
- un **modèle par abonnement** est celui qui assure la meilleure stabilité financière pour un service cloud.  

**Par conséquent**, pour limiter les coûts et l’impact écologique liés au trafic publicitaire, nous proposons de :

- renoncer aux publicités gérées par des régies tierces,  
- adopter un **modèle hybride**, basé principalement sur les **abonnements**,  
- le compléter par un **bandeau publicitaire interne** réservé aux utilisateurs non abonnés,  
- et explorer un **modèle de dons** pour les utilisateurs particuliers souhaitant soutenir la version gratuite du service.

---

¹ Hypothèse basée sur un salaire brut annuel de 12 000 € et une marge opérationnelle de 20 %.  
² [Source : Google AdSense — définition et calcul du RPM](https://support.google.com/adsense/answer/112032?hl=fr)  
³ [Source : Estimations de campagnes à régie intégrée — Le Figaro / régies médias françaises](https://www.lefigaro.fr/medias/)  
⁴ [Source : Étude de prix de services premium cloud (Nextcloud / ownCloud / Pydio)](https://nextcloud.com/pricing/)

## Maquette de l'interface et échantillon de données

Au vu des différents services comparés, des exigences environnementales exprimées précédemment et des scénarios d’usage retenus, nous avons défini pour notre prototype une maquette de l'interface et un échantillon de données réalistes.

Les ressources numériques présentes sur notre application seront de deux types principaux :
  - un dossier ou un répertoire (avec une HTTP-URI ayant pour chemin / pour la racine ou /folder/{name} pour un dossier spécifique) ;
  - un document (avec pour chemin /document/{id} pour accéder à un fichier particulier).

### Maquettes

Maquette 1 : page d’inscription / connexion
Interface permettant de créer un compte, se connecter et gérer l’authentification.
![](./docs/mockup_registration.png)
Fig.1 : Maquette de la page d’inscription / connexion.

Maquette 2 : page principale de l’application
Gestion des fichiers et dossiers, accès rapide aux fichiers récents, possibilité d’importer, exporter et partager des fichiers.
![](./docs/mockup_app.png)
Fig.2 : Maquette de la page principale avec listes de dossiers et fichiers.

## Implémentation du scénario prioritaire

### Étape de prototypage : Données chargées de manière statique

Pour cette première version du prototype (v1.0.0) :

* L'échantillon de données est encore chargé directement dans le code de manière statique.

* Les fonctionnalités implémentées sont uniquement celles nécessaires pour suivre le scénario prioritaire : la gestion des fichiers dans le drive (importation, exportation, navigation dans les dossiers).

* Ce scénario nécessite de pouvoir naviguer entre deux types de page : la page principale du drive et les pages de contenu d’un dossier ou d’un document.

Nous avons développé la page principale du drive pour qu'elle affiche l'échantillon de fichiers et dossiers sous une forme proche de la maquette initiale (cf. Fig. 2).

![Prototype de la page principale du drive – Fig.3](./docs/main_page_screenshot.png)
Prototype de la page principale du drive – Fig.3

Pour l'instant, nous n'avons choisi aucun framework. L'objectif est de limiter l'impact environnemental lié au frontend. Dans la suite du projet, nous évaluerons si l'utilisation d'un framework plus complet (Bootstrap, MaterialUI, etc.) est acceptable.

Nous avons décidé de ne pas inclure de fichiers volumineux ou d’aperçus générés (images) afin de réduire le nombre de requêtes et la taille totale des pages.

Le problème de cette application est que le chargement des données dépend des fichiers présents dans le drive et importés par l’utilisateur. Si ce dernier ajoute des fichiers volumineux, le score EcoIndex peut chuter drastiquement. Pour limiter cet impact, le projet restreindra les fichiers autorisés aux formats PDF, DOCX et TXT uniquement.

Pour l’implémentation des scénarios, nous avons remarqué qu’il y en a un que nous ne pouvons pas réellement évaluer : l’importation des fichiers. En effet, avec les outils utilisés pour calculer la consommation des requêtes, nous ne sommes pas en mesure de mesurer l’impact lorsque l’utilisateur navigue dans son explorateur de fichiers pour sélectionner un document à importer.

Dans l'état actuel du prototype, on peut des a présent avoir une idée sur l'impact environnemental de notre frontend. Cela nous permettra de faire des choix éclairés pour la suite du projet. Elle nous permet également de voir la différence entre une plateforme de développement et la plateforme de pré-production.

|                       | EcoIndex | GES (gCO2e) | Taille du DOM | Requêtes | Taille de la page (ko) |
|-----------------------|---------:|------------:|--------------:|---------:|-----------------------:|
| Mode "développement"  |  66 C 🟨 |        1,68 |           145 |       54 |                   7995 |
| Mode "pré-production" |  74 B 🟩 |        1,52 |           136 |       21 |                   5328 |

Tab 3 : Évaluation de l'impact du prototype de la page d'accueil du drive.

### Pages des dossiers

Les pages des dossiers ont pour HTTP-URI`/{id}`. Nous avons de mettre un public uuid pour chaque dossier. Cela permettra aux utilisateurs de pouvoir modifier le nom du dossier sans que cela n'impacte l'URL.

![Prototype de la page d'un dossier – Fig.4](/docs/folder_page_screenshot.png)
Prototype de la page d'un dossier – Fig.4

Avec l'implémentation actuelle, nous avons pu obtenir les scores EcoIndex suivants :

| Étape                                       | EcoIndex | GES (gCO₂e) | Taille du DOM | Requêtes | Taille de la page (Ko) |
|---------------------------------------------|---------:|------------:|--------------:|---------:|-----------------------:|
| 1. Arrivée sur la page d’accueil            |  72 B 🟩 |        1.56 |            91 |       37 |                   6394 |
| 2. Choisir et voir les détails d’un dossier |  73 B 🟩 |        1.55 |            70 |       38 |                   6396 |
| 3. Naviguer dans le dossier                 |  72 B 🟩 |        1.56 |            80 |       38 |                   6395 |
| 4. Revenir à la page d’accueil              |  73 B 🟩 |        1.57 |            91 |       38 |                   6396 |

Tab 4 : Évaluation de l'impact du scénario de "navigation dans un dossier" dans le prototype v1.0.0.

Nous pouvons constater que les scores EcoIndex sont très bons pour ce scénario. Mais nous ne pouvons bien evidemment pas les comparer avec les services concurrents, car dans cette version du prototype, les données sont chargées de manière statique.

### Étape de prototypage : Données statiques chargées de manière dynamique

Pour cette deuxième version du prototype (v1.0.1), nous avons mis en place un chargement dynamique des données qui sont encore statiques (fichiers JSON). Nous avons également implémenté un backend minimaliste en Express.js pour les fonctionnalités d'importation et d'exportation de fichiers.

Pour ce qui est de l'impact environnemental, nous avons pu obtenir les scores EcoIndex et les résultats sont globalement similaires à la version précédente.

#### Mesures de la consommation énergétique lors du passage à l'échelle
Maintenant que notre prototype est réaliste en termes de nombre de requêtes nous pouvons simuler les effets du passage à l’échelle.

Dans notre cas qui concerne un drive de stockage la montée en charge ne provient pas du nombre d’utilisateurs mais du volume de fichiers à gérer. Les fonctionnalités prévues reposent sur la création l’organisation et la consultation de documents ce qui implique une croissance continue du nombre d’éléments stockés. Cette exigence fonctionnelle est coûteuse d’un point de vue environnemental mais elle contribue directement à l’utilité même de la plateforme qui doit permettre d’organiser et retrouver l’information efficacement.

L’augmentation du volume est linéaire : en passant progressivement à 3000 documents et 50 dossiers la structure du drive devient plus dense et impose davantage d’opérations d’accès de tri et de rendu côté interface.

Évolution de l’EcoIndex lors du passage à l’échelle
Les mesures générées automatiquement durant l’intégration continue avant et après la simulation du passage à l’échelle traduisent clairement (cf. Tab.X) l’augmentation du poids des téléchargements ainsi que du nombre d’éléments affichés sur la page principale du drive.

##### Mesures de l’impact environnemental (v1.0.1)


| Étape                                       |                       EcoIndex |               GES (gCO₂e) |           Taille du DOM |             Requêtes |   Taille de la page (Ko) |
|---------------------------------------------|-------------------------------:|--------------------------:|------------------------:|---------------------:|-------------------------:|
| 1. Arrivée sur la page d’accueil            | <del>72 B 🟩</del><br/>26 E 🟧 |  <del>1.56</del><br/>2.49 | <del>91</del><br/>11093 | <del>37</del><br/>	54 | <del>6394</del><br/>1064 |
| 2. Choisir et voir les détails d’un dossier | <del>73 B 🟩</del><br/>61 C 🟨 |  <del>1.55</del><br/>1.78 |   <del>70</del><br/>267 | <del>38</del><br/>56 | <del>6396</del><br/>1065 |
| 3. Naviguer dans le dossier                 | <del>72 B 🟩</del><br/>61 C 🟨 |  <del>1.56</del><br/>1.78 |   <del>80</del><br/>267 | <del>38</del><br/>56 | <del>6395</del><br/>1065 |
| 4. Revenir à la page d’accueil              | <del>73 B 🟩</del><br/>25 F 🟥 | <del>1.57</del><br/> 2.51 | <del>91</del><br/>11093 | <del>38</del><br/>57 | <del>6396</del><br/>1065 |

Tab 5 : Évaluation de l'impact du scénario de "navigation dans un dossier" dans le prototype v1.0.1.

Les résultats mettent en évidence une dégradation importante de l’EcoIndex lors du passage à l’échelle. Cette baisse est principalement due à la croissance du nombre d’éléments affichés dans le drive. Avec 3000 documents et 50 dossiers la taille du DOM augmente fortement ce qui alourdit le rendu initial et impacte directement la note finale.

Deux facteurs expliquent cette évolution :

* l’augmentation massive de la taille du DOM sur la page d’accueil qui devient l’élément le plus coûteux du scénario

* la hausse du nombre de requêtes sur les chargements complets lorsque les ressources ne sont pas encore en cache

À l’inverse la navigation interne dans les dossiers reste moins coûteuse. Une fois les ressources mises en cache les requêtes diminuent et les tailles de page reviennent à des valeurs proches de la version initiale ce qui explique les notes EcoIndex plus élevées sur les étapes 2 et 3.

L’écart global entre v1.0.0 et v1.0.1 reste cohérent avec un prototype soumis à une montée en charge importante. Le coût environnemental provient avant tout de la densité structurelle du drive plutôt que des interactions réseau qui restent limitées lors de la navigation interne.


## Mesure de la consommation énergétique liée à la consultation

Le logiciel GreenFrame est capable d'estimer, pour les différents composants de l'architecture, la consommation énergétique :
- du CPU (à partir du temps de calcul),
- de la mémoire vive (à partir de la taille des données mémorisées),
- du disque (à partir de la taille des données lues et écrites),
- du réseau (à partir de la taille des données reçues et envoyées),
- pour le navigateur uniquement, de l'écran (à partir du temps d'exécution du scénario).

Ainsi, nous allons mesurer la consommation de ces éléments pour l'ensemble des composants de notre application(navigateur, serveur web static et serveur web dynamique)


| (a)                             | cpu (Wh)  | mem (Wh)  | disk (Wh) | network (Wh) | screen (Wh) | total (Wh) |
|---------------------------------|-----------|-----------|-----------|--------------|-------------|------------|
| Navigateur                      | 0.040     | 0.00013   | 0.0       | 0.013        | 0.012       | 0.18       |
| Serveur web dynamique (backend) | 0.000018  | 0.000046  | 0.0       | 0.000031     | 0.0         | 0.00025    |
| Serveur web static (frontend)   | 0.0000069 | 0.0000078 | 0.0       | 0.0095       | 0.0         | 0.0095     |

| (b)                             | cpu (Wh)  | mem (Wh)  | disk (Wh) | network (Wh) | screen (Wh) | total (Wh) |
|---------------------------------|-----------|-----------|-----------|--------------|-------------|------------|
| Navigateur                      | 0.037     | 0.00021   | 0.0       | 0.020        | 0.10        | 0.16       |
| Serveur web dynamique (backend) | 0.000077  | 0.000039  | 0.0       | 0.000027     | 0.0         | 0.00014    |
| Serveur web static (frontend)   | 0.0000047 | 0.0000066 | 0.0       | 0.0095       | 0.0         | 0.0095     |

Tab 6 : Estimation de la consommation énergétique de la consultation de la page d'accueil du drive (premier tableau) et d'un dossier en particulier (second tableau).

Par rapport à ce que pouvait laisser penser l'EcoIndex, les résultats indiquent que la consommation due à la consultation de l'index (avec ses 3500 fichiers) est équivalente à celle d'un dossier. Autrement dit, l'affichage en lui même de ces données en grand nombre est négligeable par rapport à la transmission de ces données sur le réseau.

Par contre, l'affichage de ces données a bien un impact indirect : en augmentant le temps de recherche d'un fichier/dossier, il a un effet déterminant sur le temps d'éclairage de l'écran. De fait, les trois éléments ayant le plus d'impact sont ici :
- l'écran du client,
- le réseau du client,
- le réseau du serveur web static.

## Effet de l'introduction d'une base de données

Afin de réduire l'impact énérgétique du réseau, nous stockons désormais les données de l'application (v2.0.0) dans une base de données (CouchDB). 

| (a)                             | cpu (Wh)                | mem (Wh)                | disk (Wh) | network (Wh)         | screen (Wh)    | total (Wh)                       |
|---------------------------------|-------------------------|-------------------------|-----------|----------------------|----------------|----------------------------------|
| Navigateur                      | ~~0.040~~ 0.029         | ~~0.00013~~ 0.00016     | 0.0       | ~~0.013~~ 0.021      | ~~0.012~~0.069 | ~~0.18~~ 0.12       |
| Serveur web dynamique (backend) | ~~0.000018~~ 0.000035   | ~~0.000046~~ 0.000031   | 0.0       | ~~0.000031~~ 0.00012 | 0.0            | ~~0.00025~~ 0.00019 |
| Serveur web static (frontend)   | ~~0.0000069~~ 0.0000054 | ~~0.0000078~~ 0.0000082 | 0.0       | 0.0095               | 0.0            | 0.0095                           |
| Base de données                 | 0.00021                 | 0.000061                | 0.0       | 0.000080             | 0.0            | 0.00035                          |



| (b)                             | cpu (Wh)                | mem (Wh)                | disk (Wh) | network (Wh)         | screen (Wh)    | total (Wh)                 |
|---------------------------------|-------------------------|-------------------------|-----------|----------------------|----------------|----------------------------|
| Navigateur                      | ~~0.037~~ 0.029         | ~~0.00021~~ 0.00016     | 0.0       | ~~0.020~~ 0.021      | ~~0.10~~ 0.069 | ~~0.16~~ 0.12 |
| Serveur web dynamique (backend) | ~~0.000077~~ 0.000029   | ~~0.000039~~ 0.000030   | 0.0       | ~~0.000027~~ 0.00012 | 0.0            | ~~0.00014~~ 0.00018        |
| Serveur web static (frontend)   | ~~0.0000047~~ 0.0000037 | ~~0.0000066~~ 0.0000080 | 0.0       | 0.0095               | 0.0            | 0.0095                     |
| Base de données                 | 0.00019                 | 0.000060                | 0.0       | 0.000080             | 0.0            | 0.00033                    |

Tab.7: Effet sur la consommation énergétique de l'introduction d'une base de données dans l'application, lors de la consultation de la page d'accueil du drive (premier tableau) et d'un dossier en particulier (second tableau).


L'introduction d'une base de données nous permet donc de légèrement réduire la consommation totale du navigateur et de notre serveur backend sur mesure. En effet, nous ne constatons qu'une légère différence de réduction de notre consommation car les fichiers de notre drive sont toujours stocké dans notre back-end. De plus, la consommation de la base de donnée est très minime car elle ne contient que l'indexation de nos fichiers (fichier JSON). L'ajout de fonctionnalités qui permettront de charger des fichiers en différé aura un plus grand impact sur la consommation.


## Limitation du nombre d’éléments affichés

Dans un gestionnaire de fichiers classique, afficher l’ensemble des fichiers et dossiers d’un espace de stockage peut rapidement devenir coûteux en termes de performances, notamment lorsque la volumétrie augmente. Charger tous les éléments en une seule fois entraînerait une consommation inutile de ressources côté client comme côté serveur.

Dans le cadre de l’application Hard-Drive, nous avons fait le choix de limiter l’affichage aux fichiers et dossiers appartenant uniquement au dossier actuellement consulté par l’utilisateur. Deux stratégies étaient envisageables :

* charger l’ensemble de l’arborescence dès le départ,

* charger uniquement les éléments du dossier courant, puis charger les autres éléments à la demande lors de la navigation.

La seconde stratégie a été retenue, car elle permet de garantir une expérience utilisateur constante, quel que soit le nombre total de fichiers stockés.

Chaque dossier est ainsi consulté indépendamment, et les fichiers sont récupérés de manière paginée. Les éléments non visibles ne sont ni chargés en mémoire ni transférés depuis la base de données. Lorsqu’un utilisateur change de dossier ou de page, une nouvelle requête ciblée est effectuée.

Cette approche permet de conserver des performances stables, de réduire les échanges réseau et de limiter la charge sur le serveur et la base de données. La consommation de ressources devient alors indépendante de la volumétrie globale des fichiers, et dépend uniquement du nombre d’éléments affichés à l’écran.

L’enjeu pour les évolutions futures de l’application sera de maintenir cette sobriété tout en ajoutant de nouvelles fonctionnalités, sans remettre en cause le chargement progressif des données.

![](./docs/page_chargement_progressif.png)
Fig.5 : Schéma illustrant le chargement progressif des fichiers dans un dossier (copie d'écran).


| Composant                       | CPU (Wh)                | Mémoire (Wh)            | Disque (Wh) | Réseau (Wh)           | Écran (Wh)      | Total (Wh)          |
|---------------------------------|-------------------------|-------------------------|-------------|-----------------------|-----------------|---------------------|
| Navigateur                      | ~~0.030~~ 0.059         | ~~0.00018~~ 0.00016     | ~~0.0~~ 0.0 | ~~0.021~~ 0.021       | ~~0.071~~ 0.069 | ~~0.12~~ 0.15       |
| Serveur web dynamique (backend) | ~~0.000046~~ 0.00047    | ~~0.000020~~ 0.000013   | ~~0.0~~ 0.0 | ~~0.000035~~ 0.000053 | ~~0.0~~ 0.0     | ~~0.00010~~ 0.00053 |
| Serveur web static (frontend)   | ~~0.0000042~~ 0.0000075 | ~~0.0000046~~ 0.0000028 | ~~0.0~~ 0.0 | ~~0.0095~~ 0.0095     | ~~0.0~~ 0.0     | ~~0.0095~~ 0.0095   |
| Base de données                 | ~~0.0~~ 0.00079         | ~~0.0~~ 0.000048        | ~~0.0~~ 0.0 | ~~0.000029~~ 0.000029 | ~~0.0~~ 0.0     | ~~0.00087~~ 0.00087 |

Tab.8: Effet sur la consommation énergétique de la limitation du nombre d’éléments affichés dans l'application, lors de la consultation de la page d'accueil du drive.

L'implémentation du chargement progressif des fichiers dans un dossier permet de réduire significativement la consommation énergétique totale de l'application. En effet, en ne chargeant que les éléments nécessaires à l'affichage courant, nous limitons les échanges réseau et la charge sur le serveur backend. Cela se traduit par une diminution notable de la consommation CPU et mémoire, tant côté client que côté serveur

## Améliorations et évolutions du projet

Après avoir réalisé les différentes étapes du projet, nous avons identifié plusieurs pistes d’amélioration et d’évolution possibles pour notre service de partage de documents numériques à impact écologique réduit.

### Système de rétention des fichiers

Notre plus grande amélioration que nous avons décider est de mettre en place un système de retention des fichiers lors de leurs imporatation. En effet, dans l'état actuel du projet, les fichiers importés restent indéfiniment stockés sur le serveur, ce qui peut entraîner une accumulation de données inutiles et une augmentation de l'empreinte écologique du service. Pour remédier à cela, nous proposons de mettre en place une politique de rétention des fichiers, qui permettrait de supprimer automatiquement les fichiers après une certaine période d'inactivité ou de non-utilisation. Cette politique pourrait être personnalisable par les utilisateurs, qui pourraient choisir la durée de rétention qui leur convient le mieux en fonction de leurs besoins. Par exemple, un utilisateur pourrait choisir de conserver ses fichiers pendant une semaine, un mois ou un an, en fonction de la fréquence à laquelle il utilise le service. Cette approche permettrait de réduire la quantité de données stockées sur le serveur, ce qui contribuerait à diminuer l'empreinte écologique du service. De plus, cela encouragerait les utilisateurs à adopter des pratiques de gestion de fichiers plus responsables, en les incitant à supprimer régulièrement les fichiers dont ils n'ont plus besoin.

<img src=./docs/upload_file_component.png width="300" style="display:block;margin-left:auto;margin-right:auto;"/>

Fig.6 : Schéma illustrant le fonctionnement du système de rétention des fichiers.


### Ajout d'un bouton de suppression de fichiers

Une autre amélioration que nous avons envisagée est l'ajout d'un bouton de suppression de fichiers dans l'interface utilisateur. Actuellement, les utilisateurs ne disposent pas d'une option simple pour supprimer les fichiers qu'ils n'utilisent plus, ce qui peut entraîner une accumulation de données inutiles sur le serveur. En intégrant un bouton de suppression directement dans l'interface, nous permettrions aux utilisateurs de gérer plus efficacement leurs fichiers et de libérer de l'espace de stockage. Ce bouton pourrait être placé à côté de chaque fichier ou dossier, offrant ainsi une accessibilité rapide et intuitive. Lorsqu'un utilisateur clique sur ce bouton, une confirmation pourrait être demandée pour éviter les suppressions accidentelles. Cette fonctionnalité encouragerait les utilisateurs à adopter des pratiques de gestion de fichiers plus responsables, en les incitant à supprimer régulièrement les fichiers dont ils n'ont plus besoin. En réduisant la quantité de données stockées sur le serveur, cette amélioration contribuerait également à diminuer l'empreinte écologique du service.

![](./docs/delete_button.png)
Fig.7 : Schéma illustrant le bouton de suppression de fichiers dans l'interface utilisateur.

### Analyse des impacts

Notre objectif avec ces ajouts est qu’ils n’aient aucun impact supplémentaire et qu’ils n’introduisent pas de surcoût environnemental. Nous avons donc analysé l’impact de ces deux fonctionnalités.

| Étape                                       | EcoIndex | GES (gCO₂e) | Taille du DOM | Requêtes | Taille de la page (Ko) |
|---------------------------------------------|---------:|------------:|--------------:|---------:|-----------------------:|
| 1. Arrivée sur la page d’accueil            |  73 B 🟩 |        1.52 |            130 |       22 |                   5531 |
| 2. Choisir et voir les détails d’un dossier |  74 B 🟩 |        1.52 |            95 |       26 |                   5534 |
| 3. Naviguer dans le dossier                 |  74 B 🟩 |        1.52 |            95 |       26 |                   5534 |
| 4. Revenir à la page d’accueil              |  72 B 🟩 |        1.54 |            130 |       28 |                   5535 |

Tab.9 : Évaluation de l'impact du scénario de "navigation dans un dossier" dans le prototype v2.0.0.


| a. Composant          | cpu (Wh)    | mem (Wh)    | disk (Wh) | network (Wh) | screen (Wh) | total (Wh) |
|-----------------------|-------------|-------------|-------------|-------------|------------|-------------|
| Navigateur   | 0.058     | 0.00016   | 0.0     | 0.021      | 0.068     | 0.15     |
| Backend | 0.00011   | 0.000013  | 0.0     | 0.000097   | 0.0       | 0.00022  |
| Frontend | 0.0000073 | 0.0000028 | 0.0     | 0.0095     | 0.0       | 0.0095   |
| Base de données      | 0.00070   | 0.000045  | 0.0     | 0.000070   | 0.0       | 0.00082  |

Tab.10: Estimation de la consommation énergétique de la consultation de la page d'accueil du drive


| b. Composant   | cpu (Wh)    | mem (Wh)    | disk (Wh) | network (Wh) | screen (Wh) | total (Wh) |
|----------------|-------------|-------------|-----------|-------------|-------------|------------|
| Navigateur     | 0.059     | 0.00016   | 0.0     | 0.021      | 0.068     | 0.15     |
| Backend  | 0.000052  | 0.000014  | 0.0     | 0.000078   | 0.0       | 0.00014  |
| Frontend | 0.0000067 | 0.0000029 | 0.0     | 0.0095     | 0.0       | 0.0095   |
| Base de données       | 0.00069   | 0.000046  | 0.0     | 0.000050   | 0.0       | 0.00079  |

Tab.11: Estimation de la consommation énergétique de la consultation d'un dossier particulier dans le drive

L'analyse des impacts de ces deux nouvelles fonctionnalités montre qu'elles n'ont pas d'impact significatif sur les performances environnementales de l'application. Les scores EcoIndex restent élevés, indiquant une bonne optimisation de l'interface utilisateur. De plus, la consommation énergétique totale de l'application reste stable, avec seulement de légères variations dues à l'ajout des nouvelles fonctionnalités.

## Auteurs

* Antoine MAZEAU
* Rémy Kinzelin
