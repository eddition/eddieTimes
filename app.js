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
		});

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

	[
		{title: 'post 1', upvote: 3}
		, {title: 'post 2', upvote: 8}
		, {title: 'post 3', upvote: 9}
		, {title: 'post 4', upvote: 10}
		, {title: 'post 5', upvote: 2}
	];

	//FUNCTIONS
	
	//Add Post
	$scope.addPost = function(){
		
		if ( !$scope.title||$scope.title === '' ){
			return ;
		}

		$scope.posts.push({
			title: $scope.title
			, link: $scope.link
			, upvote: 0
		});
		
		$scope.title = '';
		$scope.link = '';
	};

	//Vote Up
	$scope.incrementUpvote = function(post){
		post.upvote += 1;
	};

}]);

eddieTimesApp.factory('postsFactory',[function(){
	var postsObj = {
		posts: []
	}

	return postsObj;

}]);