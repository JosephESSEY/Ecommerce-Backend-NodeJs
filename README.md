# E-Commerce Backend API (MVC)

Ce projet est une API RESTful pour une application e-commerce, construite avec **Node.js**, **Express**, et **PostgreSQL**, suivant l'architecture **MVC (Model-View-Controller)**. Il gère l'ensemble du backend : produits, utilisateurs, commandes, panier, authentification, etc.

---

## Fonctionnalités principales

* Authentification JWT (connexion, inscription, rôles)
*  Gestion du panier
* Produits et catégories
* Commandes, paiements
* Historique des commandes / factures
* Administration et gestion utilisateurs
*  Gestion des images produits
* API REST bien structurée (MVC)

---

## Stack technique

| Technologie        | Description                   |
| ------------------ | ----------------------------- |
| **Node.js**        | Serveur JavaScript            |
| **Express**        | Framework REST API            |
| **PostgreSQL**     | Base de données relationnelle |
| **JWT**            | Authentification              |
| **Bcrypt**         | Hash des mots de passe        |
| **Dotenv**         | Variables d'environnement     |
| **Jest**           | Tests unitaires               |
| **Postman**        | Test des routes API           |
| **GitHub Actions** | Intégration continue          |

---

##  Lancement du projet en local

1. **Cloner le repo**

```bash
git clone https://github.com/JosephESSEY/Ecommerce-Backend-NodeJs.git
cd Ecommerce-Backend-NodeJs
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

```bash
cp .env.example .env
```

4. **Lancer le serveur en mode dev**

```bash
npm run dev
```

5. **Tester avec Postman**
   API : `http://localhost:5000`

---

## Structure MVC

```bash
src/
├── controllers/     # Logique des routes (business logic)
├── routes/          # Fichiers de routes Express
├── models/          # Modèles Sequelize (DB)
├── middlewares/     # Auth, validation, erreurs
├── utils/           # Fonctions utilitaires
└── config/          # Connexion DB, config globale
```

---

## Sécurité

* Passwords hachés (bcrypt)
* JWT sécurisés (expiration, rôles)
* Middleware de validation des entrées (Joi)
* Helmet, rate limiting, CORS

---

## Intégration continue (CI)

* GitHub Actions lance les tests à chaque push sur `develop` ou `main`
* Merges interdits sans tests réussis
* Pushs directs interdits sur `main` et `develop`

---

## Contribuer

1. Fork ce repo
2. Crée une branche `feature/<nom>`
3. Commit ton code avec des messages clairs
4. Push et ouvre une Pull Request vers `develop`

---

## Licence

MIT

---

## Liens utiles

* [Wiki du projet](https://github.com/JosephESSEY/Ecommerce-Backend-NodeJs/wiki) *(bientôt)*
* [Board GitHub Project](https://github.com/users/JosephESSEY/projects/3)
* [Collection Postman](./postman_collection.json) *(bientôt)*

```
