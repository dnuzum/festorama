angular.module('FestivalCtrls', ['FestivalServices'])
.controller('FestCtrl', ['$scope', 'Festival', function($scope, Festival) {
  $scope.festivals = [];

  Festival.query(function success(data) {
    $scope.festivals = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deleteFestival = function(id, festivalsIdx) {
    Festival.delete({id: id}, function success(data) {
      $scope.festivals.splice(festivalsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Festival', function($scope, $stateParams, Festival) {
  $scope.festival = {};

  Festival.get({id: $stateParams.id}, function success(data) {
    $scope.festival = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Festival', function($scope, $location, Festival) {
  $scope.festival = {
    name: '',
    description: '',
    date: '',
    photo: '',
    url: ''
  };

  $scope.createFestival = function() {
    Festival.save($scope.festival, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('NavCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
  $scope.Auth = Auth;

  $scope.logout = function() {
    //to implement
    Auth.removeToken();
    $state.reload();
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };
  $scope.userSignup = function() {
    //to implement
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    //to implement
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $location.path('/');
    }, function error(res) {
      console.log(res);
    })
  }
}]);