
var Space = (function(){
  var Space = function(){
    this.id = 0;
    this.info = "Space:" + this.id;
    this.blocks = new Array();
    this.items = new Array();
  };

  Space.prototype.add_block = function(block) {
    if (!(block.pos in this.blocks)) {
      this.blocks[block.pos] = new Array();
    };
    if (block.index < 0) {
      this.blocks[block.pos].push(block);
      block.index = this.blocks[block.pos].length - 1;
    };
  };

  Space.prototype.remove_block = function(block) {
    if (block.pos in this.blocks) {
      if (block.index >= 0 && this.blocks[block.pos][block.index].id == block.id) {
        this.blocks[block.pos].splice(block.index, 1);
        block.index = -1;
      };
    };
  };

  Space.prototype.add_item = function(item) {
    if (!(item.pos in this.items)) {
      this.items[item.pos] = new Array();
    };
    if (item.index < 0) {
      this.items[item.pos].push(item);
      item.index = this.items[item.pos].length - 1;
    };
  };

  Space.prototype.remove_item = function(item) {
    if (item.pos in this.items && item.index >= 0) {
      if (this.items[item.pos][item.index].id == item.id) {
        this.items[item.pos].splice(item.index, 1);
        item.index = -1;
      };
    };
  };

  Space.prototype.place_item = function(item, pos) {
    if (item.index >= 0 ) this.remove_item(item);
    item.pos = pos;
    this.add_item(item);
  };

  Space.prototype.move_item = function(item, offset, allow_collision = true) {
    var colliding = false;
    if (allow_collision) {
      colliding = item.pos in this.blocks && this.blocks[item.pos].length > 0;
      if (!colliding && item.pos in this.items) {
        for(var i = 0, l = this.items[item.pos].length; i < l; i++) {
          if (this.items[item.pos][i].collides(item)) {
            colliding = true;
            break;
          };
        };
      };
    };
    if (!colliding) {
      this.place_item(item, [item.pos[0] + offset[0], item.pos[1] + offset[1], item.pos[2] + offset[2]]);
    };
  };

  Space.prototype.move_compound = function(compound, offset, allow_collision = true) {
    var colliding = false;
    if (allow_collision) {
      for (var i = 0, l = compound.items.length; i < l; i++){
        var item = compound.items[i];
        colliding = item.pos in this.blocks && this.blocks[item.pos].length > 0;
        if (!colliding && item.pos in this.items) {
          for(var i = 0, l = this.items[item.pos].length; i < l; i++) {
            if (this.items[item.pos][i].collides(item)) {
              colliding = true;
              break;
            };
          };
        };
        if (colliding) break;
      };
    };
    if (!colliding) {
      for (var i = 0, l = compound.items.length; i < l; i++){
        var item = compound.items[i];
        this.place_item(item, [item.pos[0] + offset[0], item.pos[1] + offset[1], item.pos[2] + offset[2]]);
      };
    };
  };
  return Space
}());

var Block = (function(){
  var Block = function(){
    this.id = 0;
    this.index = -1;
    this.info = "Block:" + this.id;
    this.pos = [0, 0, 0];
  };
  return Block
}());

var Item = (function(){
  var Item = function(){
    this.id = 0;
    this.index = -1;
    this.info = "Item:" + this.id;
    this.pos = [0, 0, 0];
    this.shape = 0;
  };

  Item.prototype.set_shape = function(occupies){
    this.shape = 0;
    for (var i = 0, l = occupies.length; i < l; i++) {
      this.shape += 1 << occupies[i];
    };
  };

  Item.prototype.collides = function(item){
    return (item.id != this.id && item.shape & this.shape);
  };

  return Item
}());

var Compound = (function(){
  var Compound = function(){
    this.id = 0;
    this.info = "Compound:" + this.id;
    this.items = Array();
  };

  Compound.prototype.add_item = function(item) {
    if (!(item in this.items)) this.items.push(item);
  };

  return Compound
}());

export {Space, Block, Item, Compound, }
