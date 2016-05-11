//MODULE
var eddieTimesApp = angular.module('eddieTimes', ['ui.router']);

//ROUTER CONFIG
eddieTimesApp.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider){

		$stateProvider.state('home', {
			url: '/home',
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.state('post', {
			url:'/post/{id}',
			templateUrl:'pages/post.html',
			controller: 'postController'
		})

		$urlRouterProvider.otherwise('home');

	}
]);

//CONTROLLER
eddieTimesApp.controller('mainController', [
	 '$scope',
	 'postsFactory' ,
	function($scope, postsFactory){

	$scope.test='Eddie Times';

	$scope.posts = postsFactory.posts;
	
	//Add Post
	$scope.addPost = function(){
		
		if ( !$scope.title||$scope.title === '' ){
			return ;
		}

		$scope.posts.push({
			title: $scope.title ,
			link: $scope.link ,
			upvote: 0 ,
			comments: [] 			]
		});
		
		$scope.title = '';
		$scope.link = '';
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

eddieTimesApp.factory('postsFactory',[function(){
	var postsObj = {
		posts: []
	}

	return postsObj;

}]);