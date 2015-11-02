'use strict';

restaurantApp.controller('TriviaController',
     ['$rootScope', '$scope', '$http',
     function ($rootScope, $scope, $http) {
         $scope.questions = [
             {
                 id: 1,
                 question: "Is Java and Javascript the same thing?",
                 option1: "Yes",
                 option2: "No",
                 option3: "Hey, it a butterfly!",
                 answer: "1"
             },
             {
             id: 2,
             question: "Which one came first?",
             option1: "c++",
             option2: "c",
             option3: "Java",
             answer: "2"
             },
           {
               id: 3,
               question: "Why do they call programming errors bugs?",
               option1: "Someone found a moth in one of a the machince",
               option2: "Someone hated bugs and Programming errors",
               option3: "It not called bugs!",
               answer: "1"
           }   

         ]
     }]);