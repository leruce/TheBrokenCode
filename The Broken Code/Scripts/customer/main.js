 (function () {
     'use strict';
 
     angular
          .module('app')
          .controller('Main', main);
 
     function main() {
          var vm = this;
          vm.food = 'pizza';

          vm.entrees = [
               { 
                    name: 'steak', 
                    calories: 100
               },
               {
                    name: 'lobster',
                    calories: 150
               },
               {
                    name: 'curry',
                    calories: 200
               },
               {
                    name: 'salmon',
                    calories: 250
               },
          ];
     }

 
})();