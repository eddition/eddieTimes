//ROUTER CONFIG
eddieTimesApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: '/pages/home.htm',
        controller: 'mainController',
        resolve: {
        	postPromise: function(postsFactory){
        		console.log('fetching...');
        		return postsFactory.getItems();
        	}
        }
    })
    
    .when('/post/:id', {
        templateUrl: 'pages/post.htm',
        controller: 'test'
    });
    
});