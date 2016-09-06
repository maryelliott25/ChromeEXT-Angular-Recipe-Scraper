angular.module('app').controller('MainController', function($scope){

  $scope.init = function () {
    parent.postMessage('created', '*');
  }

  $scope.init();

  $scope.recipeTitle = 'Recipe Title';

  $scope.ingredients = [];

  $scope.instructions = [];

  chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'page title') {
      $scope.recipeTitle = message.resource;
      $scope.$digest();
    } else if (message.type === 'ingredients') {
      console.log(message.resource);
      for (i=0; i<message.resource.length; i++) {
        $scope.ingredients.push(message.resource[i]);
      }
      $scope.$digest();
    } else if (message.type === 'instructions') {
      for (i=0; i<message.resource.length; i++) {
        $scope.instructions.push(message.resource[i]);
      }
      $scope.$digest();
    }
  });

  $scope.setIngredients = function () {
    console.log('Clicked in Ingredients');
    parent.postMessage('Clicked In Ingredients', '*');
  }

  $scope.setInstructions = function () {
    console.log('Clicked in Instructions');
    parent.postMessage('Clicked In Instructions', '*');
  }

  $scope.removeIngredient = function (index) {
    console.log('clicked remove button');
    $scope.ingredients.splice(index, 1);
  }

  $scope.clearIngredients = function () {
    $scope.ingredients.length = 0;
  }

  $scope.clearInstructions = function () {
    $scope.instructions.length = 0;
  }

});