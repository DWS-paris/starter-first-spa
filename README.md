# Projet : Start first app

*Support de cours pour la création d'une application web*

![](https://i.imgur.com/dc0PCL4.png)

> &copy; [Julien Noyer](https://www.linkedin.com/in/julien-n-21219b28/) - All rights reserved for educational purposes only

---

## Présentation

Le répertoire suivant vous donne accès à un code de départ pour réaliser une application web de type "**[Single Page Application](https://hackmd.io/@teach-supports/webapp-support)**" en utilisant les téchologie HTML, CSS et Javascript ES6. Ce répertoire débuté lors de sessions de cours présente différentes fonctionnalités ainsi que des commentaires préfixé par le mot cléf "**TODO**" pour vous indiquer les fcontionnalités à développer.

<br>

## Configuration du projet

Afin de vous simplifier l'utilisation de "**[LiveServer](https://www.npmjs.com/package/live-server)**" et "**[JSONserver](https://www.npmjs.com/package/json-server)**" les deux modules ont été instalé dans ce répertoire, pour les instllé sur votre machine locale vous devez taper la commande suivante : 

```bach
npm install
```

> Si vous les avez au préalable installé globalement cette commande est inutile


<br>

## Lancement du projet

Une fois les modules installés vous pouvez lancer les scripts du fichier **[package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)** qui vous permettent de lancer votre server d'API et votre application : 

```bash
# Lancer le server d'API
npm run data

# Lancer l'application
npm run start
```

> Ces commandes doivent être tapées dans deux invites différents


Afin de vous permettre de manipuler et de mieux appréhender les techniques que nous avons abordé, vous devez réaliser les étapes suivantes : 

- En tant que USER je peux voir le liste des articles
- En tant que USER je peux créer un article
- En tant que USER quand je créé un article il s'ajoute dans la liste des articles
- En tant que USER je peux cliquer sur un article pour l'afficher
- En tant que USER quand je lis un article je peux lire les commentaires de l'article
- En tant que USER quand je lis un article je peux le commenter
- En tant que USER quand je commente un article il s'ajoute automatiquement dans la liste des commentaires
- En tant que USER j'ai accès à un menu "burger"
- En tant que USER j'ai accès à deux liens dans la navigation : "Home" et "Add post"
- En tant que USER quand je clic sur le lien "Home" j'affiche uniquement la liste des articles
- En tant que USER quand je clic sur le lien "Add post" j'affiche uniquement le formulaire


Et pour les plus téméraires :

- En tant que USER je peux créer un compte personnel contenant : nom, email et password
- En tant que USER si je ne suis pas connecté j'ai accès à un formulaire de connexion
- En tant que USER je peux me connecter avec mon email et mon password
- En tant que USER quand je suis connecté je n'affiche que les articles dont je suis l'auteur
- En tant que USER connecté si je recharge la page je suis toujours connecté
- En tant que USER connecté je peux me déconnecter avec un lien "Logout" dans la navigation