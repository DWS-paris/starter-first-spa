/* 
    Declaration
    Define all needed variables
*/
    // Declare variables for "loadPostList" function
    let postListTag = null;
    let postListCollection = null;

    // Declare varaibles for "loadSinglePost" function
    let singlePostTag = null;
    let singlePostObject = null;

    // Declare varaibles for "addPostComment" function
    let addCommentFormTag = null;
//


/* 
    Functions
    Define all needed fonctions
*/
    /* 
        Function: loadPostList
        - define variable to display post list
        - define variable to bind post values
        - send GET request to the API
        - display post title inside the DOM
    */
        const loadPostList = () => {
            // Define function variables
            postListTag = document.querySelector('#post-list ul');
            postListCollection = [];

            // Clear postListTag
            postListTag.innerHTML = '';

            // Send GET request to "http://localhost:3000/posts" URL
            ASYNCfetch(
                'http://localhost:3000/posts', //=> URL to fetch
                'GET', //=> HTTP method
                null, //=> Data is needed for "POST" or "PUT"
            )
            .then( resolvedPromise => {
                // Update "postListCollection" value
                postListCollection = resolvedPromise;

                // Display post title inside the DOM
                for( let post of postListCollection ){
                    // Create liste item tag
                    let listItem = document.createElement('li');

                    // Add content in the list item
                    listItem.innerHTML = `
                        <b>${ post.id }</b> <span>${ post.title }</span>
                    `;

                    // Call function to display one single post
                    loadSinglePost( listItem, post.id );

                    // Display list item inside the DOM
                    postListTag.appendChild( listItem );
                }
            })
            .catch( rejectedPromise => {
                console.log('[DEBUG] ASYNCfetch ERROR:', rejectedPromise)
            })
        };
    //

    /* 
        Function loadSinglePost
        - define variable to display single post
        - bind click on each list item
        - send GET request to the API
        - display single post inside the DOM
    */
        const loadSinglePost = ( tag, id ) => {
            // Define function variables
            singlePostTag = document.querySelector('#single-post article');

            // Clear artcile
            singlePostTag.innerHTML = '';

            // Bind clieck event on the HTML tag
            tag.addEventListener('click', async () => {
                // Use try/catch
                try {
                    // Send GET request to "http://localhost:3000/posts/:id" URL
                    const singleArticle = await ASYNCfetch(
                        'http://localhost:3000/posts/' + id, //=> URL to fetch
                        'GET', //=> HTTP method
                        null, //=> Data is needed for "POST" or "PUT"
                    )

                    // Send GET request to "http://localhost:3000/comments?isPartOf=:id" URL
                    const commentsArticle = await ASYNCfetch(
                        'http://localhost:3000/comments?isPartOf=' + id, //=> URL to fetch
                        'GET', //=> HTTP method
                        null, //=> Data is needed for "POST" or "PUT"
                    )

                    console.log('[DEBUG] Single post', {singleArticle, commentsArticle})

                    // TODO: Display article
                    // TODO: Display comment list
                    // TODO: Display comment form

                    // Call function addPostComment
                    addPostComment( id );
                } 
                catch ( tryCatchError ) {
                    console.log('[DEBUG] try/catch', tryCatchError)
                }
            })
        };
    //

    /* 
        Function addPostComment
        - define variable to bind form submit
        - bind form submit event
        - check form value
        - send POST request to create new comment
    */
        const addPostComment = ( postId ) => {
            // Define variable to bind form submit
            addCommentFormTag = document.querySelector('.add-comment-form')

            // Bind form submit event
            addCommentFormTag.addEventListener('submit', (event) => {
                // Stop submit event
                event.preventDefault();

                // TODO: Check form value

                // Send POST request to "http://localhost:3000/comments" URL
                ASYNCfetch(
                    'http://localhost:3000/comments', //=> URL to fetch
                    'POST', //=> HTTP method
                    {
                        isPartOf: postId,
                        content: document.querySelector('[name="comment"]').value
                    }, //=> Data is needed for "POST" or "PUT"
                )
                .then( resolvedPromise => {
                    console.log('[DEBUG] New comment', resolvedPromise)
                })
                .catch( rejectedPromise => {
                    console.error('[DEBUG] Fetch error', rejectedPromise)
                })
            })
        };
    //
//


/* 
    Launch
    Start user interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Display post list
        loadPostList();
    })
//