angular.module('eddieTimes', [])
.controller('mainController', ['$scope', function($scope){

	$scope.test='Eddie Times';

	$scope.posts = [
		{title: 'post 1', upvote: 3}
		, {title: 'post 2', upvote: 8}
		, {title: 'post 3', upvote: 9}
		, {title: 'post 4', upvote: 10}
		, {title: 'post 5', upvote: 2}
	];

	//FUNCTIONS
	
	//Add Post
	$scope.addPost = function(){
		
		if ($scope.title === ''){
			return ;
		}

		$scope.posts.push({
			title: $scope.title,
			upvote: 0
		});
		
		$scope.title = '';
	};

	//Vote Up
	$scope.incrementUpvote = function(post){
		post.upvote += 1;
	};

}]);