angular.module('FestivalCtrls', ['FestivalServices'])
.controller('HomeCtrl', ['$scope', 'Festival', function($scope, Festival) {
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

  Recipe.get({id: $stateParams.id}, function success(data) {
    $scope.recipe = data;
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
.controller('NavCtrl', ['$scope', 'Auth', '$state', 'Alerts', function($scope, Auth, $state, Alerts) {
  $scope.Auth = Auth;

  $scope.logout = function() {
    //to implement
    Auth.removeToken();
    Alerts.add('success', 'Logged out!');
    $state.reload();
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Alerts', function($scope, $http, $location) {
  $scope.user = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };
  $scope.userSignup = function() {
    //to implement
    $http.post('/api/users', $scope.user).then(function success(res) {
      Alerts.add('success', 'Signed up!'),
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    //to implement
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      Alerts.add('success', 'You are logged in!');
      $location.path('/');
    }, function error(res) {
      console.log(res);
    })
  }
}])

.controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts) {
  $scope.alerts = Alerts;
  $scope.alerts = Alerts.get();
}]);
