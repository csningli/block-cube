
var Space = (function(){
  var Space = function(){
    this.id = 0;
    this.info = function() {
      return "Space:" + this.id;
    };
    this.blocks = Array();
    this.items = Array();
    this.move = function(item, offset, allow_collision = true) {
    };
  };
  return Space
}());

var Block = (function(){
  var Block = function(){
    this.id = 0;
    this.info = function() {
      return "Block:" + this.id;
    };
    this.pos = [0, 0, 0];
  };
  return Block
}());

var Item = (function (){
  var Item = function (){
    this.id = 0;
    this.info = function () {
      return "Item:" + this.id;
    };
    this.pos = [0, 0, 0];
    this.shape = Array();
  };
  return Item
}());

var Group = (function (){
  var Group = function (){
    this.id = 0;
    this.info = function () {
      return "Group:" + this.id;
    };
    this.items = Array();
  };
  return Group
}());

export {Space, Block, Item, Group, }
