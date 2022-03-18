#M1 info - Projet SOR-SI

Le projet est divisé en 2 parties, le FRONT (partie visuelle) et le BACK (l'API Rest en node.js).

Récuperer le dossier du projet :
```sh
git clone <url git>

# ou

unzip M1_SORSI.zip
```

Pour le déploiement front

```sh
cd M1_SORSI/frontend
npm start
```

Pour le déploiement back
```sh
cd M1_SORSI/back
node src/server.js &
```

Attention : n'oubliez pas de modifier côté back dans le fichier /back/src/db/dbConfig.js de modifier les informations de connexion à la base de données.
Structure de la BDD à utiliser pour que l'application fonctionne :
![baseaaa](https://user-images.githubusercontent.com/47422931/159024067-35d1f581-8fbf-4916-80c3-db16fe2da81b.png)


Vous pouvez également modifier si vous le souhaiter la clé de sécurité du JWT via le fichier /back/src/jwt/jwtConfig.js

