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