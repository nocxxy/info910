### Glossaire Kubernetes

- **Deployment** : Ressource qui gère le cycle de vie des pods, permet le déploiement, la mise à jour et la scalabilité d’une application.
- **Service** : Objet qui expose un ou plusieurs pods via une adresse réseau stable, facilitant la communication interne ou externe.
- **Ingress** : Contrôleur d’entrée HTTP qui route les requêtes vers les bons services selon le chemin ou le domaine.
- **Secret** : Stockage sécurisé de données sensibles (mots de passe, tokens) accessibles par les pods.
- **PersistentVolumeClaim (PVC)** : Requête de stockage persisté dans le cluster, utilisée pour conserver les données au-delà du cycle de vie des pods.

---

#### backend-deployment.yaml
Ce fichier est chargé de déployer la ressource backend en créant un pod à partir de l’image `ghcr.io/nocxxy/info910:backend-latest-dev`. Il configure une seule réplique, expose le port 5000, et injecte les variables d’environnement nécessaires pour se connecter à MongoDB via des secrets Kubernetes.

#### backend-service.yaml
Ce fichier définit un service interne nommé `backend-service` qui expose le backend sur le port 80 du cluster et redirige le trafic vers le port 5000 du conteneur. Il permet aux autres ressources du cluster de communiquer avec le backend via le nom du service.

#### frontend-deployment.yaml
Ce fichier déploie le frontend de l’application en créant un pod à partir de l’image `ghcr.io/nocxxy/info910:frontend-latest-dev`. Il définit une seule réplique, expose le port 80, et associe le pod au label `app: frontend` pour permettre sa découverte par les services.

#### frontend-service.yaml
Ce fichier définit un service interne nommé `frontend-service` qui expose le frontend sur le port 80 du cluster et redirige le trafic vers le port 80 du conteneur. Il permet aux autres composants du cluster d’accéder à l’interface utilisateur de l’application.

#### ingress.yaml
Ce fichier configure une ressource Ingress nommée `web-ingress` qui route les requêtes HTTP selon leur chemin : celles vers `/api` sont dirigées vers le service backend, et celles vers `/` vers le service frontend. Il permet d’exposer ces services via une seule entrée HTTP sur le domaine `localhost`.

#### mongodb-secret.yaml
Ce fichier crée un secret Kubernetes nommé `mongodb-secret` contenant les identifiants d’accès à MongoDB (`admin` / `password`). Ces données sensibles sont utilisées par le backend pour se connecter à la base de données sans les exposer directement dans les fichiers de configuration.

#### mongodb-deployment.yaml
Ce fichier déploie une instance MongoDB avec l’image officielle `mongo:7.0`, en exposant le port 27017. Les identifiants d’accès sont injectés via un secret Kubernetes, et les données sont persistées grâce à un volume monté sur `/data/db`, lié à une PersistentVolumeClaim nommée `mongodb-pvc`.

#### mongodb-pvc.yaml
Ce fichier crée une PersistentVolumeClaim nommée `mongodb-pvc` qui demande 1 Go de stockage avec un accès en lecture/écriture par un seul nœud. Il permet à MongoDB de stocker ses données de manière persistante dans le cluster Kubernetes.

#### mongodb-service.yaml
Ce fichier définit un service nommé `mongodb-service` qui expose MongoDB sur le port 27017 au sein du cluster. Il permet aux autres pods, comme le backend, d’accéder à la base de données via une adresse stable.
