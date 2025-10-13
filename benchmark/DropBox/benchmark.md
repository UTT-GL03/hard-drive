# Déclaration environnementale de ce site web

*Mesure effectuée le 13 octobre 2025.*

## Niveau Écoconception du site web

- Grade : F
- Note écoindex: 12.4 / 100
- Consommation d’eau moyenne rapportée à 1 000 utilisateurs : ≈ 41.4 L (soit environ 4 packs d’eau minérale).
- Émission moyenne de Gaz à Effet de Serre (GES) rapportée à 1 000 utilisateurs : ≈ 2.75 kg CO₂e (soit un trajet d’environ 10 km en voiture thermique).*

## Méthode d'évaluations

De part les scénarios de test que nous avons choisi, nous n'avons pas pu utiliser l'annalyse automatique d'[EcoIndex App](https://github.com/cnumr/EcoindexApp). Nous avons donc du utiliser une extension Chrome qui s'appelle [GreenIt-Analysis](https://chromewebstore.google.com/detail/greenit-analysis/mofbfhffeklkbebfclfaiifefjflcpad) pour pouvoir importer et exporter des documents correctement. 

Pour cela, nous avons calculé manuellement l'impact environnemental de ce site, en se basant toujours sur l'Écoindex proposé par le collectif GreenIt

A des fins de synthèse et pour faciliter le calcul, nous allons nous baser sur les critères suivants : 
- Nombre de requêtes
- La taille des requêtes (en kb)
- Le nombre de noeuds dans le DOM
- Consommation d'eau pour 1 000 utilisateurs
- Émission de GES pour 1 000 utilisateurs

Avec ces données, nous pourrons calculer l'écoindex des parcours via cette [formule](https://github.com/cnumr/GreenIT-Analysis/blob/acc0334c712ba68939466c42af1514b5f448e19f/script/ecoIndex.js#L19-L44) que nous pouvons retrouver sur le dépôt Github de GreenIt-Analysis.

## Evaluation de l'impact pour 2 parcours utilisateurs sur le site

### Parcours 1 : Importation d'un fichier dans le drive

| Action | url | Grade | Ecoindex | GES (g CO₂e) | Eau (cL) | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM |
| ----------- | --- | --- | ----------- | ----------- | ----------- | ----------- | ----------- | --- |
| Accès page d'accueil | https://www.dropbox.com/home | F | 14.54 | 2.71 | 4.06 | 459 | 6131 | 1139 |
| Import d'un document | https://www.dropbox.com/home | F | 12.63 | <font color="red">+0.04</font> (2.75) | <font color="red">+0.06</font> (4.12) | <font color="red">+43</font> (502) | <font color="red">+43</font> (6174) | <font color="red">+130</font> (1269) |
| Retour à la page d'accueil | https://www.dropbox.com/home | F | 12.62 | <font color="red">+0.00</font> (2.75) | <font color="red">+0.00</font> (4.12) | <font color="red">+6</font> (508) | <font color="red">+0</font> (6174) | <font color="red">+0</font> (1269) |

- Consommation d'eau rapportée à 1 000 utilisateurs (en litres) : 41.4
- Émission de GES rapportée à 1 000 utilisateurs (kilos CO2e) : 2.75

### Parcours 2 : Exportation d'un fichier dans le drive

| Action | url | Grade | Ecoindex | GES (g CO₂e) | Eau (cL) | Nombre de requêtes | Taille des requêtes (Ko) | Taille du DOM |
| ----------- | --- | --- | ----------- | ----------- | ----------- | ----------- | ----------- | --- |
| Accès page d'accueil | https://www.dropbox.com/home | F | 12.88 | 2.74 | 4.11 | 456 | 5948 | 1255 |
| Export d'un document | https://www.dropbox.com/home | F | 12.15 | <font color="red">+0.02</font> (2.76) | <font color="red">+0.03</font> (4.14) | <font color="red">+23</font> (479) | <font color="red">+32</font> (5980) | <font color="red">+63</font> (1318) |
| Retour à la page d'accueil | https://www.dropbox.com/home | F | 12.14 | <font color="red">+0.00</font> (2.76) | <font color="red">+0.00</font> (4.14) | <font color="red">+5</font> (484) | <font color="red">+0</font> (5980) | <font color="red">+0</font> (1318) |

- Consommation d'eau rapportée à 1 000 utilisateurs (en litres) : 41.4
- Émission de GES rapportée à 1 000 utilisateurs (kilos CO2e) : 2.75
