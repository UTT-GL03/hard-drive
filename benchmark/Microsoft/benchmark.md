# Déclaration environnementale de ce site web

*Mesure effectuée le 29 septembre 2025.*

## Niveau Écoconception du site web 

- Grade : F
- Note écoindex: 16.2 / 100
- Consommation d’eau moyenne rapportée à 1 000 utilisateurs : ≈ 4 L (soit environ 4 packs d’eau minérale).
- Émission moyenne de Gaz à Effet de Serre (GES) rapportée à 1 000 utilisateurs : ≈ 2.64 kg CO₂e (soit un trajet d’environ 11 km en voiture thermique).*

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

## Evaluation de l'impact pour 2 parcours utilisateurs sur le site

### Parcours 1 : Importation d'un fichier dans le drive

| Date | Url | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM | GES (g CO₂e) | Eau (cL) | Ecoindex | Grade |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 29/09/2025 17:11:01 | https://uttroyes-my.sharepoint.com/ | 277 | 19023 | 1013 | 2.67 | 4.01 | 16.29 | F |
| 29/09/2025 17:10:45 | https://uttroyes-my.sharepoint.com/ | 274 | 19018 | 1029 | 2.68 | 4.02 | 16.04 | F |
| 29/09/2025 17:10:24 | https://uttroyes-my.sharepoint.com/ | 160 | 13621 | 980 | 2.58 | 3.87 | 20.93 | F |

- Consommation d'eau rapportée à 1 000 utilisateurs (en litres) : 3.97
- Émission de GES rapportée à 1 000 utilisateurs (kilos CO2e) : 2.64

### Parcours 2 : Exportation d'un fichier dans le drive

| Date | Url | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM | GES (g CO₂e) | Eau (cL) | Ecoindex | Grade |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 29/09/2025 17:18:03 | https://uttroyes-my.sharepoint.com/ | 263 | 18732 | 1012 | 2.67 | 4.00 | 16.61 | F |
| 29/09/2025 17:17:53 | https://uttroyes-my.sharepoint.com/ | 242 | 16159 | 1005 | 2.66 | 3.98 | 17.22 | F |
| 29/09/2025 17:17:37 | https://uttroyes-my.sharepoint.com/ | 171 | 13620 | 979 | 2.60 | 3.89 | 20.17 | F |

- Consommation d'eau rapportée à 1 000 utilisateurs (en litres) : 3.96
- Émission de GES rapportée à 1 000 utilisateurs (kilos CO2e) : 2.64

### Parcours 3 : Navigation dans le drive

| Date                | Url                                                                                    | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM | GES (g CO₂e) | Eau (cL) | Ecoindex | Grade |
| ------------------- | -------------------------------------------------------------------------------------- | -----------------: | -----------------------: | ------------: | -----------: | -------: | -------: | ----: |
| 16/11/2025 02:24:08 | https://uttroyes-my.sharepoint.com/shared |                314 |                    19334 |          1021 |         2.68 |     4.02 |    16.02 |     F |
| 16/11/2025 02:23:57 | https://uttroyes-my.sharepoint.com/shared |                248 |                    14768 |           852 |         2.59 |     3.89 |    20.49 |     F |
| 16/11/2025 02:23:50 | https://uttroyes-my.sharepoint.com/shared |                239 |                    14764 |           852 |         2.59 |     3.88 |    20.68 |     F |


