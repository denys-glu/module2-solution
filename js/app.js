(function(){
'use strict';
  // var list = [
  //   {name: "screwdriver",    quantity: 4},
  //   {name: "saw",            quantity: 1},
  //   {name: "perforator",     quantity: 1},
  //   {name: "hammer",         quantity: 3},
  //   {name: "axe",            quantity: 2},
  //   {name: "cordless drill", quantity: 5}
  // ]
  angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .controller('ToAddItemToTheList',ToAddItemToTheList)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToAddItemToTheList.$inject = ['ShoppingListCheckOffService'];
    function ToAddItemToTheList (ShoppingListCheckOffService) {
      var addItem = this;
      addItem.itemName = "";
      addItem.itemQuantity = "";

      addItem.addItem = function () {
        try{
          ShoppingListCheckOffService.addItem(addItem.itemName, addItem.itemQuantity);
          addItem.itemName = "";
          addItem.itemQuantity = "";
          addItem.errorMessage = "";
        }
        catch(error){
          addItem.errorMessage = error.message;
        }
      }

    }

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController (ShoppingListCheckOffService) {
      var toBuy = this;
      toBuy.toBuyList = ShoppingListCheckOffService.getItems();
      toBuy.moveItem = function(itemIndex) {
        ShoppingListCheckOffService.moveItem(itemIndex);
      }
      toBuy.removeItem = function(itemIndex) {
        ShoppingListCheckOffService.removeItem(itemIndex);
      }
    }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
      var bougth = this;
      bougth.bougthList = ShoppingListCheckOffService.movedItems();
      bougth.retrieveItem = function(itemIndex) {
        ShoppingListCheckOffService.retrieveItem(itemIndex);
      }
    }

  function ShoppingListCheckOffService(){
    var service = this;
    //var toBuyList = list;
    var toBuyList = [];
    var movedItems = [];
    service.addItem = function (itemName, itemQuantity) {
      if((itemName === "" && itemQuantity === "") ||
         (itemName === "" || itemQuantity === "") ||
         (itemName === undefined && itemQuantity === undefined)
        ) {
        throw new Error ("Please, enter items to buy. Thank you!");
      } else {
        var item = {
          name: itemName,
          quantity: itemQuantity
        };
        toBuyList.push(item);
        console.log(toBuyList);
      }

    };
    service.removeItem = function(itemIndex){
      toBuyList.splice(itemIndex,1);
      console.log(toBuyList);
    }
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
