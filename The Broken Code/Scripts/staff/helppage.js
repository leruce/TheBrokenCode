app.controller("myNoteCtrl", function ($scope) {
     $scope.message = "";
     $scope.left = function () { return 400 - $scope.message.length; };
     $scope.clear = function () { $scope.message = ""; };
     $scope.save = function () { alert("Note Saved"); };
});