En cours de dev. 
Les uses cases sont les points d'entrées et contiennent la logique d'orchestration. (Injection des dépendances, récupération de l'aggrégat...)
Toutes la logique métier est quant à elle dans les entités du domaine. 
Les entités du domaine sont indépendantes du framework pas d'utilisation de @Inject par exemple 

J'utilise TypeOrm comme ORM mais je cantonne strictement son utilisation dans la couche d'infrastructure pour ne pas avoir de code propre au stokage de données dans la logique métier.  
J'expose les données de mon aggrégat via le "pattern memento" pour éviter d'avoir des getters dans l'objet. Le pattern memento se situe dans la couche d'infrastructure. En faisant comme ça je peux me consacrer à l'écriture de test unitaire qui ne teste que de la logique métier


Tests 

To run use case test put ENV variable to testing and run: 

npm run test src/meeting/application

To run infrastructure test put ENV variable to prod and run : 

npm run test src/meeting/application


