
(function () {
    var app = angular.module('messageBoard', ['ngRoute','ngAnimate']).config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode(true);
    }]);
  

	app.controller('PostController', function ($scope, $route, $routeParams, $location, $http) {
    	
    	$http.get('board').
            success(function (data) {
            $scope.posts = data;
        });

        $scope.addNewPost = function (name, message) {
            var data = {};
            data.name = name;
            data.message = message;
            $http.post('board/add', JSON.stringify(data)).
                success($scope.update);
            clearForm();
        }

        $scope.update = function () {
            $http.get('board').
                success(function (data) {
                $scope.posts = data;
            });
        };

        $scope.commentOnPost = function (postId, comment) {
            var data = JSON.stringify({postId: postId, comment:comment});
            $http.post('board/comment', data).
                success($scope.update);
        }

        $scope.likePost = function (postId) {
            var data = JSON.stringify({postId: postId});
            $http.post('board/like', data).
                success($scope.update);
        }

    	$scope.data = {
            repeatSelect: null,
       	    availableOptions: []
    	};
  });
})();




var clearForm = function() {
    $('#name_field').val('');
    $('#message_field').val('');
    $('.counter').text('140');
    $('.btn').addClass('disabled');
}

var main = function() {

  $('#message_field').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);
  
    if(charactersLeft < 0) {
      $('.btn').addClass('disabled'); 
    }
    else if(charactersLeft == 140) {
      $('.btn').addClass('disabled');
    }
    else {
      $('.btn').removeClass('disabled');
    }
  });
  
  $('.btn').addClass('disabled');
}

$(document).ready(main);
