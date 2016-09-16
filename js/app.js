(function(){
'use strict';
  var list = [
    {name: "screwdriver",    quantity: 4},
    {name: "saw",            quantity: 1},
    {name: "perforator",     quantity: 1},
    {name: "hammer",         quantity: 3},
    {name: "axe",            quantity: 2},
    {name: "cordless drill", quantity: 5}
  ]
  angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController (ShoppingListCheckOffService) {
      var toBuy = this;
      toBuy.toBuyList = ShoppingListCheckOffService.getItems();
      toBuy.moveItem = function(itemIndex) {
        ShoppingListCheckOffService.moveItem(itemIndex)
      }
    }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
      var bougth = this;
      bougth.bougthList = ShoppingListCheckOffService.movedItems();
      bougth.retrieveItem = function(itemIndex) {
        ShoppingListCheckOffService.retrieveItem(itemIndex)
      }
    }

  function ShoppingListCheckOffService(){
    var service = this;
    var toBuyList = list;
    var movedItems = [];
    service.retrieveItem = function(itemIndex) {
      toBuyList.push(movedItems[itemIndex]);
      movedItems.splice(itemIndex,1);
    }
    service.moveItem = function(itemIndex){
      movedItems.push(toBuyList[itemIndex]);
      toBuyList.splice(itemIndex,1);
    }
    service.getItems = function (){
      return toBuyList;
    }
    service.movedItems = function (){
      return movedItems;
    }
  }
})();
