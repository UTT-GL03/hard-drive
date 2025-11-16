# Déclaration environnementale de ce site web

*Mesure effectuée le 29 septembre 2025.*

## Niveau Écoconception du site web 

- Grade : G
- Note écoindex: 5.7 / 100
- Consommation d’eau moyenne rapportée à 1 000 utilisateurs : ≈ 43 L (soit environ 4 packs d’eau minérale).
- Émission moyenne de Gaz à Effet de Serre (GES) rapportée à 1 000 utilisateurs : ≈ 2.9 kg CO₂e (soit un trajet d’environ 11 km en voiture thermique).*

## Méthode d'évaluations

De part les scénarios de test que nous avons choisi, nous n'avons pas pu utiliser l'annalyse automatique d'[EcoIndex App](https://github.com/cnumr/EcoindexApp). Nous avons donc du utiliser une extension Chrome qui s'appelle [GreenIt-Analysis](https://chromewebstore.google.com/detail/greenit-analysis/mofbfhffeklkbebfclfaiifefjflcpad) pour pouvoir importer et exporter des documents correctements. 

Pour cela, nous avons calculer manuellement l'impact environnemental de ce site, en se basant toujours sur l'Écoindex proposé par le collectif GreenIt

A des fin de synthèse et pour faciliter le cacul, nous allons nous baser sur les critères suivants : 
- Nombre de requêtes
- La taille des requêtes (en kb)
- Le nombre de noeud dans le DOM
- Consommation d'eau pour 1000 utilisateurs
- Émission de GES pour 1000 utilisateurs

Avec ces données, nous pourrons calculer l'écoindex des parcours via cette [formule](https://github.com/cnumr/GreenIT-Analysis/blob/acc0334c712ba68939466c42af1514b5f448e19f/script/ecoIndex.js#L19-L44) que nous poubons retrouver sur le dépôt Github de GreenIt-Analysis.

## Evaluation de l'impact pour 3 parcours utilisateurs sur le site

### Parcours 1 : Importation d'un fichier dans le drive

| Action | url | Grade | Ecoindex | GES (g CO₂e) | Eau (cL) | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM |
| ----------- | --- | --- | ----------- | ----------- | ----------- | ----------- | ----------- | --- |
| Accès page d'accueil | https://drive.google.com/drive/u/0/home | G | 7.12 | 2.86 | 4.29 | 214 | 5962 | 4514 |
| Import d'un document | https://drive.google.com/drive/u/0/home | G | 5.62 | <font color="red">+0.03</font> (2.89) | <font color="red">+0.04</font> (4.33) | <font color="red">+61</font> (275) | <font color="red">+515</font> (6477) | <font color="red">+186</font> (4700) |
| Retour à la page d'accueil | https://drive.google.com/drive/u/0/home | G | 5.35 | <font color="red">+0.00</font> (2.89) | <font color="red">+0.01</font> (4.34) | <font color="red">+26</font> (301) | <font color="red">+381</font> (6858) | <font color="red">+1</font> (4701) |

- Consommation d'eau rapportée à 1 000 utilisateurs (en litres) : 43.2
- Émission de GES rapportée à 1 000 utilisateurs (kilos CO2e) : 2.88

### Pacours 2 : Exportation d'un fichier dans le drive

| Action | url | Grade | Ecoindex | Nombre de requêtes | Taille des requêtes | Taille du DOM |
| ----------- | --- | --- | ----------- |----------- | ----------- | --- |
| Accès page d'accueil | https://drive.google.com/drive/u/0/home | G | 7.10 | 215 | 5959 | 4515 |
| Import d'un document | https://drive.google.com/drive/u/0/home | G | 6.34 | <font color="red">+29</font> (244) | <font color="red">+401</font> (6360) | <font color="red">+129</font> (4644) |
| Retour à la page d'accueil | https://drive.google.com/drive/u/0/home | G | 6.02 | <font color="red">+14</font> (258) | <font color="red">+23</font> (6383) | <font color="green">-30</font> (4614) |

- Consommation d'eau rapportée à 1 000 utilisateurs (en litres) : 43.1
- Émission de GES rapportée à 1 000 utilisateurs (kilos CO2e) : 2.87

### Parcours 3 : Navigation dans le drive

| Action              | URL                                                                                | Grade | Ecoindex | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM |
| ------------------- | ---------------------------------------------------------------------------------- | ----- | -------- | ------------------ | ------------------------ | ------------- |
| Accès à son drive   | [https://drive.google.com/drive/my-drive](https://drive.google.com/drive/my-drive) | G     | 7.54     | 193                | 7029                     | 6705          |
| Scroll dans la page | [https://drive.google.com/drive/my-drive](https://drive.google.com/drive/my-drive) | G     | 6.94     | 206                | 7031                     | 6705          |
| Accès au dossier    | [https://drive.google.com/drive/my-drive](https://drive.google.com/drive/my-drive) | F     | 10.47    | 217                | 7034                     | 1630          |
