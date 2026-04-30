Projet CI/CD - Industrialisation et Déploiement

## 📌 Description
Ce projet a pour objectif d’industrialiser le déploiement d’une application web statique en utilisant Docker et une pipeline CI/CD avec GitHub Actions.  
Il permet d’automatiser les étapes de test, de validation et de déploiement afin d’assurer un flux de travail rapide, fiable et reproductible.

---

## 🧱 Structure du projet

app/
├── html/ # Pages HTML
├── css/ # Fichiers CSS
├── js/ # Scripts JavaScript
├── images/ # Images du site
│
├── Dockerfile # Configuration Docker
├── nginx.conf # Configuration serveur Nginx
│
.github/
└── workflows/
├── ci.yml # Intégration continue
└── cd.yml # Déploiement continu