# Authors

- [MEZIERE Evan](https://github.com/nocxxy)
- [CHEVALIER Clément](https://github.com/chevalier-clement)

# Objectif du projet

Ce projet a pour but de déployer une application simple en utilisation des mécanismes de **DevOps** à travers **Kubernetes**.

L'application se base sur :
- Un frontend
- Un backend
- Une base de données
- Un secret Kubernetes pour les identifiants
- Un volume persistant pour les données
- Un ingress pour le routage


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

### Frontend
http://localhost

### API (backend)

**URL de base**  
`http://localhost/api`

---

## Health Check

**GET** `/api/health`  
Vérifie que le backend est opérationnel.

**Response**
```
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## Get Counter

**GET** `/api/counter`  
Récupère la valeur actuelle du compteur. Si aucun compteur n’existe, il est initialisé à 0.

**Response**
```
{
  "count": 42
}
```

---

## Increment Counter

**POST** `/api/counter`  
Incrémente la valeur du compteur. Si aucun compteur n’existe, il est créé avec une valeur de 1.

**Response**
```
{
  "count": 43
}
```



