# Authors

- [MEZIERE Evan](https://github.com/nocxxy)
- [CHEVALIER Clément](https://github.com/chevalier-clement)

# Objectif du projet


# Ressources du projet
- 📂 `.github`
    - 📂 `workflows` : Pipelines CI du projet
        - [📄 `build-backend.yml`](./.github/workflows//build-backend.yml) : Pipeline chargée de build et de publier l'image du backend
        - [📄 `build-fronted.yml`](./.github/workflows//build-frontend.yml) : Pipeline chargée de build et de publier l'image du frontend
- 📂 `backend` : Les fichiers sources du backend du projet
- 📂 `doc` : La documentation du projet
- 📂 `frontend` : Les fichiers sources du frontend du projet
- 📂 `k8s` : Les fichiers de déploiement du projet
- 📄 `.gitignore`
- 📄 `README.md`
- 📄 `TODO.md` : Liste des tâches à faire du projet

# Installation 

## Prérequis
- minikube
- kubectl
- docker

## Clone
```bash
git clone https://github.com/nocxxy/info910.git
```

## Setup
```bash
minikube start
```

```bash
minikube addons enable ingress
```

```bash
kubectl create -f k8s
```

```bash
minikube tunnel
```

## Accès

http://localhost


