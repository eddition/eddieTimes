//MODULE
var eddieTimesApp = angular.module('eddieTimesApp', ['ngRoute', 'ngResource']);


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
    
    .when('/posts/:id', {
        templateUrl: '/pages/post.htm',
        controller: 'postController'
    })
    
    .otherwise({
    	respondTo: '/'
    })
    
});

//CONTROLLER
eddieTimesApp.controller('mainController', [
	 '$scope',
	 'postsFactory',
	function($scope, postsFactory){

	$scope.test='Eddie Times';

	$scope.posts = postsFactory.posts;
	
	//Add Post
	$scope.addPost = function(){
		
		if ( !$scope.title||$scope.title === '' ){
			return ;
		}

	$scope.posts.push({
		title: $scope.title,
		link: $scope.link,
		upvote: 0
	})
		
		$scope.title = '';
		$scope.link = '';
	};

	//Load posts
	$scope.loadPosts = function(){
		$scope.$apply(function(){
			postsFactory.getItems();
		})
	};

	//Vote Up
	$scope.incrementUpvote = function(post){
		post.upvote += 1;
	};

}]);

eddieTimesApp.controller('postController', [
	'$scope',
	'$stateParams',
	'postsFactory',
	 function($scope, $stateParams, postsFactory){
	 	debugger;
	 	$scope.post = postsFactory.posts[$stateParams.id];

	 	$scope.addComment = function(){
	 		if($scope.body === ''){return;}

	 		$scope.post.comments.push({
	 			body: $scope.body,
	 			author: 'user',
	 			upvote: 0
	 		});

	 		$scope.body = '';
	 	}

	}
]);

//FACTORIES

eddieTimesApp.factory('postsFactory', ['$http', function($http){
	var postsObj = {
		posts: []
	};

	postsObj.getItems = function(){
		$http({
			method: 'GET',
			url: 'http://localhost:3000/posts'
		}).success(function(data, status){
			angular.copy(data.posts, postsObj.posts)
		}).error(function(data, status){
			console.log(data, status);
		})
	}

	return postsObj;

}]);