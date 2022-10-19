/* 
    Declaration
    Define all needed variables
*/
    // Declare variable for "initNavigation" function
    let burgerBuactiveViewtton = null;
    let burgerButton = null;
    let burgerNavigation = null;
    let navigationLinks = null;

    // Declare variable for "updateActiveView" function
    let appSections = null;

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
        - define variable to display navigation
        - bind click event on burger menu
            - toggle "is-active" on navigation links
        - bind click event on navigation links
            - set active view
            - close burger menu
    */
        const initNavigation = () => {
            // Bind HTML tag
            burgerBuactiveViewtton = '#home';
            burgerButton = document.querySelector( '.navbar-burger' );
            burgerNavigation = document.querySelector( '.navbar-menu' );
            navigationLinks = document.querySelectorAll( '.navbar-item' );

            // Bind click event on burger button
            burgerButton.addEventListener( 'click', () => {
                // Toggle classe "is-active"
                burgerNavigation.classList.toggle('is-active');
                burgerButton.classList.toggle('is-active');
            });

            // Get each navigation link
            for( let link of navigationLinks ){
                // Bind click event on navigation link
                link.addEventListener( 'click', (event) => {
                    // Prevent event default
                    event.preventDefault();

                    // Update active view
                    updateActiveView( link.getAttribute('href') );

                    // Close burger menu
                    burgerNavigation.classList.remove('is-active');
                    burgerButton.classList.remove('is-active');
                });
            }
        };
    //

     /* 
        Function: updateActiveView
        - define variable to display active section
        - get all section
        - add or remove "active" classe
    */
        const updateActiveView = ( view ) => {
            // Bind HTML tag
            appSections = document.querySelectorAll( '.section' );

            // Toggle active section
            document.querySelector( `.section.active` ).classList.remove('active')
            document.querySelector( view ).classList.add('active');

            // Toggle navigation link
            document.querySelector( `.navbar-item.active` ).classList.remove('active')
            document.querySelector( `[href="${ view }"]` ).classList.add('active');
        }
    //

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

    /* 
        Function: initApp
        A better way to start application is to call one function
    */
        const initApp = () => {
            // Init navigation
            initNavigation();

            // Display post list
            loadPostList();
        };
    //
//


/* 
    Launch
    Start user interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Init application
        initApp();
    })
//