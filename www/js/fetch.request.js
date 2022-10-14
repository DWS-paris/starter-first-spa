/* 
Définition d'une fonction ASYNC/AWAIT
Cette fonction permet d'utiliser la nouvelle syntaxe ES6 avec l'API FETCH
*/
const ASYNCfetch = async (url, requestType, data = null) => {
    console.log(`${requestType} Requête FETCH en cours...`);

    // Définition du header de la requête
    let requestOptions = {
        method: requestType,
        headers: {
            'Content-type': 'application/json'
        }
    };

    // Ajouter les données dans les requêtes POST et PUT
    if( requestType === 'POST' || requestType === 'PUT' ){
        requestOptions.body = JSON.stringify(data);
    };

    // Lancer la requête FETCH
    const response = await fetch(url, requestOptions);

    // Vérification de la requête
    if( response.ok ){
        // Vérification du status de la requête
        switch(response.status){
            case 200:
                console.log(`Succès de la requête ${requestType} FETCH.`);
                // Extraire les données reçus au format JSON
                return Promise.resolve( await response.json() );
            break;

            case 201:
                console.log(`Succès de la requête ${requestType} FETCH.`);
                // Extraire les données crées au format JSON
                return Promise.resolve( await response.json() );
            break;

            default:
                console.log(`Erreur de traitement de la requête ${requestType} FETCH.`);
                // Renvoyer une Promesse
                return Promise.reject(response);
            break;
        };
    }
    else{
        // Récupérer le code erreur dans une Promesse
        return Promise.reject(response);
    };
};
//