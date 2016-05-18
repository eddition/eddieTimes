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

eddieTimesApp.controller('test', ['$scope','$routeParams','postsFactory',
	 function($scope, $routeParams, postsFactory){
	 	$scope.post = postsFactory.posts[$routeParams.id];
	 	$scope.test = function(){
	 		console.log('clicked')
	 	}

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