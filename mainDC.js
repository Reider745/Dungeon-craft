/*
BUILD INFO:
  dir: core/dev
  target: mainDC.js
  files: 58
*/



// file: info.js

IMPORT("SoundAPI");
IMPORT("DungeonCraftAPI");
IMPORT("ToolType");
IMPORT("ToolLib");
IMPORT("TileRender");

IDRegistry.genItemID("debugTools"); 
Item.createItem("debugTools", "debug tool", {name: "axe", meta: 0}, {stack: 1, isTech: true});

IDRegistry.genItemID("debugTools2"); 
Item.createItem("debugTools2", "debug tool", {name: "stick", meta: 0}, {stack: 1, isTech: true});

Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id==ItemID.debugTools2){
var blockInfo = World.getBlock(coords.x, coords.y, coords.z);
Game.tipMessage("id: " + blockInfo.id + " : " + blockInfo.data + ";")
}
});

IDRegistry.genItemID("debugTools3"); 
Item.createItem("debugTools3", "debug tool", {name: "hoe", meta: 0}, {stack: 1, isTech: true});

var modeTool = 0;

Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id == ItemID.debugTools3&&!es(Player.get())){
if(modeTool==0){
    modeTool++;
    Game.tipMessage("§5mode: fillChest2");
}else{
    if(modeTool == 2){
        modeTool = 0;
        Game.tipMessage("§5mode: fillChest3");
    } 
    if(modeTool == 1){
        modeTool++;
        Game.tipMessage("§5mode: fillChest1");
    } 
    
}
}
if(item.id == ItemID.debugTools3&&es(Player.get())){
    Game.message("§2сундук заполнен");
    if(modeTool == 0){
        Structure3.fillChest(coords.x, coords.y, coords.z, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});
    }
    if(modeTool == 1){
    fillChest2.fillChest(coords.x, coords.y, coords.z, function(slot, x, y, z, id, data, count){
        let container = World.getContainer(x, y, z);
        if(id == 283){
            let extra = enchantAdd(0.2, "sword", 3);
             container.setSlot(slot, id, count, data, extra);
        }
    });
}
if(modeTool == 2){
    fillChest1(coords.x, coords.y, coords.z);
}
}
});


Callback.addCallback('DestroyBlockContinue', function (coords, block, player) {
if(block.id==BlockID.rityal1) {
World.getTileEntity(coords.x, coords.y, coords.z).drop();
} 
});

Callback.addCallback('DestroyBlockContinue', function (coords, block, player) {
if(block.id==BlockID.manaGenerator) {
World.getTileEntity(coords.x, coords.y, coords.z).drop();
} 
});

var boss1 = new Sound();
boss1.setSource("boss0.ogg");


var angel = new Sound();
angel.setSource("хранительРая.ogg");

var raiFinal = new Sound();
raiFinal.setSource("ФиналРая.ogg");

var ritual1 = new Sound();
ritual1.setSource("ritual1.mp3");

var ritual2 = new Sound();
ritual2.setSource("ritual2.mp3");


var ritual3 = new Sound();
ritual2.setSource("ritual3.mp3");

var sound = new Sound();
sound.setSource("sound.ogg");

var mana = 20000;

Callback.addCallback("LevelLoaded", function () {

Game.message("§3потпишись на группу вк https://vk.com/club186544580");

});

//1 beta
// 29.11.2019-1.1.2020

//1 pre-release
// 1.1.2020 - 21.5.2020

//pre-release 0.6.2
//4.8.2020


Saver.addSavesScope("BackpacksScope",
    function read(scope) {
        mana= scope.manaSaves || 20000;

    },

    function save() {
        return {
            manaSaves: mana,

        };
    }
);

var fillChest2 = new ItemGenerate();

fillChest2.addItem(264, 0.2, {max: 2});
fillChest2.addItem(266, 1, {max:4});
fillChest2.addItem(265, 0.5, {max:6});
fillChest2.addItem(283, 0.4, {max:1});
fillChest2.addItem(381, 0.2, {max:6});
fillChest2.addItem(399, 0.01, {max:1});
fillChest2.addItem(384, 0.2, {max:16});
fillChest2.addItem(322, 0.1, {max:1});
fillChest2.addItem(ItemID.godcol, 0.05, {max:1});
fillChest2.addItem(ItemID.Gem, 0.3, {max:1});
fillChest2.addItem(ItemID.Gem2, 0.08, {max:1});
fillChest2.addItem(ItemID.manysript1, 0.05, {max:1});


/*

var DungeonCoords = {
    getCoords: function (x, z){
        let min = Math.min(x, z);
        let max = Math.max(x, z);
        let xz = max - min;
        let result = {
            x: xz, 
            y: 0,
            z: xz
        };
        return result;
    }
};

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
    var coords = DungeonCoords.getCoords(chunkX, chunkZ);
    coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
    FileTools.WriteJSON (__dir__+"/debug/chank.json", coords, true);
    StructureGrobnisa.setStructure(coords.x, coords.y, coords.z);
});
*/






// file: command.js

Callback.addCallback("NativeCommand", function(str){
  cmd = str.split(" ");
  if(cmd[0] == "/mana"){
  if(cmd[1] == "set"){ 
   if(cmd[2]<=20000){
  mana = cmd[2];
    Game.message("§2установлено: " + cmd[2] + " количество маны");
}else {
Game.message("§4максимальное значения 20000");
} 
} 
Game.prevent();
} 
});

Callback.addCallback("NativeCommand", function(str){
  cmd = str.split(" ");
  if(cmd[0] == "/teleport"){
  if(cmd[1] == "EF"){ 
   Dimensions.transfer(Player.get(), EnchantedForest.id);
   Game.message("§2вы перемещены в зачерованные лес");
} 
if(cmd[1] == "rai"){ 
   Dimensions.transfer(Player.get(), EnchantedForest.id);
   Game.message("§2вы перемещены в рай");
} 
Game.prevent();
} 
});

Callback.addCallback("NativeCommand", function (str) {
  cmd = str.split(" ");
	if(cmd[0] == "/write"){
		blockArray = [];
		for(var x = Math.min(coordinates[0].x, coordinates[1].x); x<=Math.max(coordinates[0].x, coordinates[1].x);x++){
			for(var z = Math.min(coordinates[0].z, coordinates[1].z); z<=Math.max(coordinates[0].z, coordinates[1].z);z++){
				for(var y = Math.min(coordinates[0].y, coordinates[1].y); y<=Math.max(coordinates[0].y, coordinates[1].y);y++){
					if(World.getBlock(x,y,z).id!=0)blockArray.push({x:x-origin.x,y:y-origin.y,z:z-origin.z, id:World.getBlock(x,y,z).id, data: World.getBlock(x,y,z).data});
				}
			}
		}
		FileTools.WriteJSON (__dir__+"/json/" + cmd[1], blockArray, true);
   Game.message("§2структура успешно сохранина");
   Game.prevent();
	}
});

var useActive = false;
let path = __dir__ + "/debug/useItem.json";
var useActive2 = false;
let path2 = __dir__ + "/debug/useContainer.json";
Callback.addCallback("NativeCommand", function(str) {
cmd = str.split(" ");
if(cmd[0] == "/debug"){
if(cmd[1] == "addTool"){
let coords = Player.getPosition();
World.drop(coords.x, coords.y, coords.z, ItemID.debugTools2, 1);
World.drop(coords.x, coords.y, coords.z, ItemID.debugTools, 1);
World.drop(coords.x, coords.y, coords.z, ItemID.debugTools3, 1);
Game.message("§2выданы инструменты");
   Game.prevent();
}
if(cmd[1] == "addBlock"){
    let coords = Player.getPosition();
    World.drop(coords.x, coords.y, coords.z, BlockID.brickD2, cmd[2]);
    World.drop(coords.x, coords.y, coords.z, BlockID.board2, cmd[2]);
    World.drop(coords.x, coords.y, coords.z, BlockID.brickkey, cmd[2]);
    World.drop(coords.x, coords.y, coords.z, BlockID.brick3, cmd[2]);
    
    Game.message("§2выданы не разрушимые блоки");
    Game.prevent();
}
if(cmd[1] == "useItem"){
    if(cmd[2] == "true"){
        useActive = true;
        Game.message("§2включен режим useItem");
        Game.prevent();
    }else{
        if(cmd[2] == "write"){
            FileTools.WriteJSON(path, itemD, true);
            Game.message("§2сохранены данные useItem в файле useItem.json");
            Game.prevent();
        }else{
            if(cmd[2] == "false"){
                useActive = false;
                Game.message("§4выключен режим useItem");
                FileTools.WriteJSON(path, itemD, true);
                Game.prevent();
            }
        }
    }
}
if(cmd[1] == "useContainer"){
    if(cmd[2] == "true"){
        useActive2 = true;
        Game.message("§2включен режим useContainer");
        Game.prevent();
    }
    if(cmd[2] == "false"){
        useActive2 = false;
        Game.message("§4выключен режим useContainer");
        Game.prevent();
    }
}
}
});

let itemD = [];
Callback.addCallback("ItemUse", function(coords, item){
    if(useActive==true){
        Game.message("id: " + item.id + " data: " + item.data + " count: " + item.count + " extra: " + item.extra);
         itemD.push({item: item})
    }
    if(useActive2==true){
        let container = World.getContainer(coords.x, coords.y, coords.z);
        Game.message(container);
    }
});




// file: API/Recipes.js

var dungeonRuneCtol = {

    recipesRack: [],
	recipesAltar: [],

   recipesRackRecipe: function (recipe) {
        this.recipesRack.push(recipe);
    },

    getRackRecipe: function (id, data) {
        for (var key in this.recipesRack) {
            var recipe = this.recipesRack[key];
            if (recipe.input.id === id && recipe.input.data === data) {
                return recipe;
            }
        }
    },
	
	recipesAltarRecipe: function (recipe) {
        this.recipesAltar.push(recipe);
    },
	
   getAltarRecipe: function (input) {
         for (var i = 0; i < this.recipesAltar.length; i++) {

            if (input[0].id == this.recipesAltar[i].Source1.id) {
                if (input[0].data == this.recipesAltar[i].Source1.data) {
                    if (input[0].count >= this.recipesAltar[i].Source1.count) {

                        if (input[1].id == this.recipesAltar[i].Source2.id) {
                            if (input[1].data == this.recipesAltar[i].Source2.data) {
                                if (input[1].count >= this.recipesAltar[i].Source2.count) {
									
	 if (input[2].id == this.recipesAltar[i].Source3.id) {
                            if (input[2].data == this.recipesAltar[i].Source3.data) {
                                if (input[2].count >= this.recipesAltar[i].Source3.count) {
									
									 if (input[3].id == this.recipesAltar[i].Source4.id) {
                            if (input[3].data == this.recipesAltar[i].Source4.data) {
                                if (input[3].count >= this.recipesAltar[i].Source4.count) {
									
									 if (input[4].id == this.recipesAltar[i].Source5.id) {
                            if (input[4].data == this.recipesAltar[i].Source5.data) {
                                if (input[4].count >= this.recipesAltar[i].Source5.count) {
									
									 if (input[5].id == this.recipesAltar[i].Source6.id) {
                            if (input[5].data == this.recipesAltar[i].Source6.data) {
                                if (input[5].count >= this.recipesAltar[i].Source6.count) {
									
									 if (input[6].id == this.recipesAltar[i].Source7.id) {
                            if (input[6].data == this.recipesAltar[i].Source7.data) {
                                if (input[6].count >= this.recipesAltar[i].Source7.count) {
									
				 
									
                                    return this.recipesAltar[i];

                                
							
				 
								}
							}
									 }
								}
							}
									 }
								}
							}
									 }
								}
							}
									 }
								}
								
							}
	 }
								}
							}
						}
					}
				}
			}

        }
	  }, 
potionCraft: function (input1) {
 for (var i = 0; i < this.recipesAltar.length; i++) {

            if (input1[7].id == this.recipesAltar[i].slot2P.id) {
                if (input1[7].data == this.recipesAltar[i].slot2P.data) {
                    if (input1[7].count >= this.recipesAltar[i].slot2P.count) {

                        if (input1[8].id == this.recipesAltar[i].slot3P.id) {
                            if (input1[8].data == this.recipesAltar[i].slot3P.data) {
                                if (input1[8].count >= this.recipesAltar[i].slot3P.count) {
									
	 if (input1[9].id == this.recipesAltar[i].slot4P.id) {
                            if (input1[9].data == this.recipesAltar[i].slot4P.data) {
                                if (input1[9].count >= this.recipesAltar[i].slot4P.count) {
									

                                    return this.recipesAltar[i];

								}
								
							}
	 }
								}
							}
						}
					}
				}
			}

        }
}, 
recipesPotion: function (recipe) {
        this.recipesAltar.push(recipe);
    },
};




// file: API/RandomSetBlock.js



var BlockSet = {
RandomBlock: function (x, y, z, blockID1, data1, blockID2, data2) {
var random = Math.random()*1;

if(random<=0.51){
World.setBlock(x, y, z, blockID1, data1);
}else{
World.setBlock(x, y, z, blockID2, data2);
} 
}, 
RandomBlockSet3x3: function (reg) {
var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 

	this.RandomBlock(posX.x, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 
}, 

RandomBlockSet3x3Empty: function (reg) {
var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 

this.RandomBlock(posX.x+1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 
}, 


RandomBlockSet3x3WallZ: function (reg) {
	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
	this.RandomBlock(posX.x, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y-1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y+1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y-1, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y+1, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y-1, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y+1, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 

}, 



RandomBlockSet3x3WallX: function (reg) {
	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
	this.RandomBlock(posX.x, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y-1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y+1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y-1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y+1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x-1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y-1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y+1, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 

}, 


RandomBlockSet5x5: function (reg) {
var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
this.RandomBlock(posX.x, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+2, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x-2, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


this.RandomBlock(posX.x, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 
},

RandomBlockSet5x5Empty: function (reg) {
var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 


this.RandomBlock(posX.x+2, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x-2, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


this.RandomBlock(posX.x, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 
},

RandomBlockSet7x7: function (reg) {
var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
this.RandomBlock(posX.x, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x+2, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x-2, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


this.RandomBlock(posX.x, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


this.RandomBlock(posX.x+3, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x-3, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


this.RandomBlock(posX.x, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 

},
RandomBlockSet7x7Empty: function (reg) {
var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 

this.RandomBlock(posX.x+3, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+3, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x-3, posY.y, posZ.z, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z+1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z+2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z-1, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z-2, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-3, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);


this.RandomBlock(posX.x, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z+3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

this.RandomBlock(posX.x, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-1, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+1, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x-2, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);
this.RandomBlock(posX.x+2, posY.y, posZ.z-3, reg.IDblock1,  reg.data1, reg.IDblock2, reg.data2);

if(kokni==true){
		posY.y-=kokni1;
		} 
		if(kokni==false){
		posY.y+=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x-=kokni3;
		} 
		if(kokni2==false){
		posX.x+=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z-=kokni5;
		} 
		if(kokni4==false){
		posZ.z+=kokni5;
		} 

},
};




// file: API.js

var dungeon1 = {
cube3x3: function (reg) {
	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
	World.setBlock(posX.x, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x+1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x-1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x+1, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x-1, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x+1, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x-1, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);

}, 

cube3x3Empty: function (reg) {
	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
	
	World.setBlock(posX.x+1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x-1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x+1, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x-1, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x+1, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x-1, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);



    }, 

cube3x3WallZ: function (reg) {
	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
	World.setBlock(posX.x, posY.y, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y-1, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y+1, posZ.z, reg.cubeID, reg.cubeData);

World.setBlock(posX.x+1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x+1, posY.y-1, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x+1, posY.y+1, posZ.z, reg.cubeID, reg.cubeData);

World.setBlock(posX.x-1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x-1, posY.y-1, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x-1, posY.y+1, posZ.z, reg.cubeID, reg.cubeData);
}, 



cube3x3WallX: function (reg) {
	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
	World.setBlock(posX.x, posY.y, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y-1, posZ.z, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y+1, posZ.z, reg.cubeID, reg.cubeData);

World.setBlock(posX.x, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y-1, posZ.z+1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y+1, posZ.z+1, reg.cubeID, reg.cubeData);

World.setBlock(posX.x, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y-1, posZ.z-1, reg.cubeID, reg.cubeData);
World.setBlock(posX.x, posY.y+1, posZ.z-1, reg.cubeID, reg.cubeData);


}, 





    cube5x5: function (reg) {
    	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
		
	World.setBlock(posX.x, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x+1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x-1, posY.y, posZ.z, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
	World.setBlock(posX.x, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+1, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-1, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+1, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-1, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
    
    World.setBlock(posX.x+2, posY.y, posZ.z, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
    
    World.setBlock(posX.x-2, posY.y, posZ.z, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
		
    World.setBlock(posX.x, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+1, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-1, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    
    World.setBlock(posX.x, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+1, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-1, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
		
		
		
		
		
}, 
cube5x5Empty: function (reg) {
    	var posX = reg.coordsX;
	var posY = reg.coordsY;
	var posZ = reg.coordsZ;
	var kokni = reg.plusY;
	var kokni1 = reg.Y;
	if(kokni==true){
		posY.y+=kokni1;
		} 
		if(kokni==false){
		posY.y-=kokni1;
		} 
		var kokni2 = reg.plusX;
	    var kokni3 = reg.X;
	if(kokni2==true){
		posX.x+=kokni3;
		} 
		if(kokni2==false){
		posX.x-=kokni3;
		} 
		var kokni4 = reg.plusZ;
	    var kokni5 = reg.Z;
	if(kokni4==true){
		posZ.z+=kokni5;
		} 
		if(kokni4==false){
		posZ.z-=kokni5;
		} 
		
	
    
    World.setBlock(posX.x+2, posY.y, posZ.z, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+2, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
    
    World.setBlock(posX.x-2, posY.y, posZ.z, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z+1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z-1, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-2, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
		
    World.setBlock(posX.x, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+1, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-1, posY.y, posZ.z+2, reg.cubeID, reg.cubeData);
    
    World.setBlock(posX.x, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x+1, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
    World.setBlock(posX.x-1, posY.y, posZ.z-2, reg.cubeID, reg.cubeData);
		
		
		
		
}
};














// file: API/renderAPI.js

let renderAPI = {
setCristalPidestal: function (id) {

var renderAPI = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(id, -1, renderAPI); 
     var modelAPI = BlockRenderer.createModel(); 
           renderAPI.addEntry(modelAPI);
modelAPI.addBox (2/16, 0, 2/16, 14/16, 0.0625, 14/16, id, 0);

modelAPI.addBox (5/16, 0.0625, 5/16, 11/16, 0.9375, 11/16, id, 0);

modelAPI.addBox (3/16, 0.9375, 3/16, 13/16, 1, 13/16, id, 0);

}, 

setGlblock1: function (id) {

var renderAPI = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(id, -1, renderAPI); 
     var modelAPI = BlockRenderer.createModel(); 
           renderAPI.addEntry(modelAPI);

modelAPI.addBox (1/16, 0, 1/16, 15/16, 0.125, 15/16, id, 0);

modelAPI.addBox (6/16, 0.125, 6/16, 10/16, 0.9375, 10/16, id, 0);

modelAPI.addBox (4/16, 0.9375, 4/16, 12/16, 1, 12/16, id, 0);
}, 
steve: function (id) {
var renderAPI = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(id, -1, renderAPI); 
     var modelAPI = BlockRenderer.createModel(); 
           renderAPI.addEntry(modelAPI);

modelAPI.addBox (1/16, 0, 1/16, 15/16, 0.0625, 15/16, id, 0);

modelAPI.addBox (2/16, 0.0625, 2/16, 14/16, 0.125, 14/16, id, 0);

modelAPI.addBox (10/16, 0.125, 5/16, 8/16, 1, 12/16, id, 0);
}, 
ManaGenerator: function (id) {
var renderAPI = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(id, -1, renderAPI); 
     var modelAPI = BlockRenderer.createModel(); 
           renderAPI.addEntry(modelAPI);

modelAPI.addBox (0/16, 0, 0/16, 16/16, 0.125, 16/16, id, 0);
modelAPI.addBox (0/16, 0.875, 0/16, 16/16, 1, 16/16, id, 0);
modelAPI.addBox (0/16, 0.125, 0/16, 2/16, 0.875, 2/16, id, 0);
modelAPI.addBox (14/16, 0.125, 14/16, 16/16, 0.875, 16/16, id, 0);
modelAPI.addBox (14/16, 0.125, 0/16, 16/16, 0.875, 2/16, id, 0);
modelAPI.addBox (0/16, 0.125, 14/16, 2/16, 0.875, 16/16, id, 0);
modelAPI.addBox (11/16, 0.125, 11/16, 5/16, 0.3125, 5/16, id, 0);


}, 
setblock: function (id, obj, texture) {
let file = __dir__ + "/res/model/" + obj;
var mesh = new RenderMesh();
var renderAPI = new ICRender.Model(); 
BlockRenderer.setStaticICRender(id, -1, renderAPI); 
var modelAPI = new BlockRenderer.Model(mesh);  

           renderAPI.addEntry(modelAPI);
mesh.importFromFile(file, "obj", null);
mesh.setBlockTexture(texture, 0);
} 
};




// file: API/saplingAPI.js

var EntityGetYaw = ModAPI.requireGlobal("Entity.getYaw");
var EntityGetPitch = ModAPI.requireGlobal("Entity.getPitch");

// block place fix
function canTileBeReplaced(id, data) {
	if(id == 175 && (data%8 == 2 || data%8 == 3)) return true;
    return CONSTANT_REPLACEABLE_TILES[id] || false;
}
var canTileBeReplaced = ModAPI.requireGlobal("canTileBeReplaced = "+uneval(canTileBeReplaced));
var CONSTANT_REPLACEABLE_TILES = ModAPI.requireGlobal("CONSTANT_REPLACEABLE_TILES")
CONSTANT_REPLACEABLE_TILES[51] = true;
CONSTANT_REPLACEABLE_TILES[78] = true;
CONSTANT_REPLACEABLE_TILES[106] = true;

var TileRenderer = {
	data: {},
	
	setStandartModel: function(id, texture, rotation){
		if(rotation){
			var textures = [
				[texture[0], texture[1], texture[2], texture[3], texture[4], texture[5]],
				[texture[0], texture[1], texture[3], texture[2], texture[5], texture[4]],
				[texture[0], texture[1], texture[5], texture[4], texture[2], texture[3]],
				[texture[0], texture[1], texture[4], texture[5], texture[3], texture[2]]
			]
			for(var i = 0; i < 4; i++){
				var render = new ICRender.Model();
				var model = BlockRenderer.createTexturedBlock(textures[i]);
				render.addEntry(model);
				BlockRenderer.enableCoordMapping(id, i, render);
			}
		}else{
			var render = new ICRender.Model();
			var model = BlockRenderer.createTexturedBlock(texture);
			render.addEntry(model);
			BlockRenderer.enableCoordMapping(id, -1, render);
		}
	},
	
	registerRenderModel: function(id, data, texture){
		var render = new ICRender.Model();
		var model = BlockRenderer.createTexturedBlock(texture);
		render.addEntry(model);
		if(!this.data[id]) this.data[id] = {};
		this.data[id][data] = render;
	},
	
	registerRotationModel: function(id, data, texture, reverse){
		reverse = reverse || 0;
		var textures = [
			[texture[0], texture[1], texture[3], texture[2], texture[5], texture[4]],
			[texture[0], texture[1], texture[2], texture[3], texture[4], texture[5]],
			[texture[0], texture[1], texture[4], texture[5], texture[3], texture[2]],
			[texture[0], texture[1], texture[5], texture[4], texture[2], texture[3]]
		]
		for(var i = 0; i < 4; i++){
			this.registerRenderModel(id, i + data + reverse * Math.pow(-1, i), textures[i]);
		}
	},
	
	registerFullRotationModel: function(id, data, texture){
		if(texture.length == 2){
			for(var i = 0; i < 6; i++){
				var textures = [];
				for(var j = 0; j < 6; j++){
					if(j == i) textures.push(texture[1]);
					else textures.push(texture[0]);
				}
				this.registerRenderModel(id, i + data, textures);
			}
		}else{
			var textures = [
				[texture[3], texture[2], texture[0], texture[1], texture[4], texture[5]],
				[texture[2], texture[3], texture[1], texture[0], texture[5], texture[4]],
				[texture[0], texture[1], texture[3], texture[2], texture[5], texture[4]],
				[texture[0], texture[1], texture[2], texture[3], texture[4], texture[5]],
				[texture[0], texture[1], texture[4], texture[5], texture[3], texture[2]],
				[texture[0], texture[1], texture[5], texture[4], texture[2], texture[3]],
			]
			for(var i = 0; i < 6; i++){
				this.registerRenderModel(id, i + data, textures[i]);
			}
		}
	},
	
	getRenderModel: function(id, data){
		var models = this.data[id];
		if(models){
			return models[data];
		}
		return 0;
	},
	
	mapAtCoords: function(x, y, z, id, data){
		var model = this.getRenderModel(id, data);
		if(model){
			BlockRenderer.mapAtCoords(x, y, z, model);
		}
	},
	
	getBlockRotation: function(isFull){
		var pitch = EntityGetPitch(Player.get());
		if(isFull){
			if(pitch < -45) return 0;
			if(pitch > 45) return 1;
		}
		var rotation = Math.floor((EntityGetYaw(Player.get())-45)%360 / 90);
		if(rotation < 0) rotation += 4;
		rotation = [3, 1, 2, 0][rotation];
		if(isFull) return rotation + 2;
		return rotation;
	},

	setRotationPlaceFunction: function(id, fullRotation){
		Block.registerPlaceFunction(id, function(coords, item, block){
			var place = canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
			World.setBlock(place.x, place.y, place.z, item.id, 0);
			var rotation = TileRenderer.getBlockRotation(fullRotation);
			var tile = World.addTileEntity(place.x, place.y, place.z);
			tile.data.meta = rotation;
			TileRenderer.mapAtCoords(place.x, place.y, place.z, item.id, rotation);
		});
	},
	
	setupWireModel: function(id, data, width, groupName, preventSelfAdd) {
		var render = new ICRender.Model();
		var shape = new ICRender.CollisionShape();

		var group = ICRender.getGroup(groupName);
		if (!preventSelfAdd) {
			group.add(id, data);
		}
		
		// connections
		width /= 2;
		var boxes = [
			{side: [1, 0, 0], box: [0.5 + width, 0.5 - width, 0.5 - width, 1, 0.5 + width, 0.5 + width]},
			{side: [-1, 0, 0], box: [0, 0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width]},
			{side: [0, 1, 0], box: [0.5 - width, 0.5 + width, 0.5 - width, 0.5 + width, 1, 0.5 + width]},
			{side: [0, -1, 0], box: [0.5 - width, 0, 0.5 - width, 0.5 + width, 0.5 - width, 0.5 + width]},
			{side: [0, 0, 1], box: [0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, 1]},
			{side: [0, 0, -1], box: [0.5 - width, 0.5 - width, 0, 0.5 + width, 0.5 + width, 0.5 - width]},
		]
		
		for (var i in boxes) {
			var box = boxes[i];
			// render
			var model = BlockRenderer.createModel();
			model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, data);
			var condition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], group, false);
			render.addEntry(model).setCondition(condition);
			// collision shape
			var entry = shape.addEntry();
			entry.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
			entry.setCondition(condition);
		}
		
		// central box
		var model = BlockRenderer.createModel();
		model.addBox(0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, id, data);
		render.addEntry(model);
		
		var entry = shape.addEntry();
		entry.addBox(0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width);
		
		width = Math.max(width, 0.25);
		Block.setShape(id, 0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, data);
		
		BlockRenderer.setStaticICRender(id, data, render);
		BlockRenderer.setCustomCollisionShape(id, data, shape);
	},
	
	__plantVertex: [
		[0.15, 0, 0.15, 1, 1],
		[0.85, 0, 0.85, 0, 1],
		[0.85, 1, 0.85, 0, 0],
		[0.15, 0, 0.15, 1, 1],
		[0.15, 1, 0.15, 1, 0],
		[0.85, 1, 0.85, 0, 0],
		[0.15, 0, 0.85, 1, 1],
		[0.85, 0, 0.15, 0, 1],
		[0.85, 1, 0.15, 0, 0],
		[0.15, 0, 0.85, 1, 1],
		[0.15, 1, 0.85, 1, 0],
		[0.85, 1, 0.15, 0, 0]
	],
	
	setPlantModel: function(id, data, texture, meta){
		var shape = new ICRender.CollisionShape();
		shape.addEntry().addBox(7/8, 1, 7/8, 1/8, 0, 1/8);
		BlockRenderer.setCustomCollisionShape(id, data, shape);
		var render = new ICRender.Model();
		var mesh = new RenderMesh();
		mesh.setBlockTexture(texture, meta || 0);
		for(var i = 0; i < 12; i++){
			var poly = this.__plantVertex[i];
			mesh.addVertex(poly[0], poly[1], poly[2], poly[3], poly[4]);
		}
		for(var i = 11; i >= 0; i--){
			var poly = this.__plantVertex[i];
			mesh.addVertex(poly[0], poly[1], poly[2], poly[3], poly[4]);
		}
		render.addEntry(mesh);
		BlockRenderer.setStaticICRender(id, data, render);	
	},
	
	setCropModel: function(id, data, height){
		if(height){
			Block.setShape(id, 0, 0, 0, 1, height, 1, data);
		}
		var shape = new ICRender.CollisionShape();
		shape.addEntry().addBox(1, 1, 1, 0, 0, 0);
		BlockRenderer.setCustomCollisionShape(id, data, shape);
		var render = new ICRender.Model();
		var model = BlockRenderer.createModel();
		model.addBox(0.25, 0, 0, 0.25, 1, 1, id, data);
		model.addBox(0.75, 0, 0, 0.75, 1, 1, id, data);
		model.addBox(0, 0, 0.25, 1, 1, 0.25, id, data);
		model.addBox(0, 0, 0.75, 1, 1, 0.75, id, data);
		render.addEntry(model);
		BlockRenderer.setStaticICRender(id, data, render);	
	},
	
	getCropModel:function(texture){   
        var render = new ICRender.Model(); 
        var model = BlockRenderer.createModel(); 
        model.addBox(0.2499, 0.01, 0,0.25, 0.99, 1, texture[0], texture[1]); 
        model.addBox(0, 0.01, 0.2499, 1, 0.99, 0.25, texture[0], texture[1]); 
        model.addBox(0.7499, 0.01, 0, 0.75, 0.99, 1, texture[0], texture[1]); 
        model.addBox(0, 0.01, 0.7499,1, 0.99, 0.75, texture[0], texture[1]); 
        render.addEntry(model); 
        return render; 

    }, 
	
	makeSlab: function(id, fullBlockID, fullBlockData){
		this.setSlabShape(id);
		this.setSlabPlaceFunction(id, fullBlockID, fullBlockData || 0);
	},
	
	setSlabShape: function(id){
		Block.setShape(id, 0, 0, 0, 1, 0.5, 1, 0);
		Block.setShape(id, 0, 0.5, 0, 1, 1, 1, 1);
	},
	
	setSlabPlaceFunction: function(id, fullBlockID, fullBlockData){
		Block.registerPlaceFunction(id, function(coords, item, block){
			Game.prevent();
			if(block.id == item.id && (block.data == (coords.side+1)%2)){
				World.setBlock(coords.x, coords.y, coords.z, fullBlockID, fullBlockData);
				return;
			}
			var x = coords.relative.x
			var y = coords.relative.y
			var z = coords.relative.z
			block = World.getBlock(x, y, z);
			if(canTileBeReplaced(block.id, block.data)){
				if(coords.vec.y - y < 0.5){
					World.setBlock(x, y, z, item.id, 0);
				}
				else {
					World.setBlock(x, y, z, item.id, 1);
				}
			}
		});
	}
}




// file: API/RuneAPI.js

var RuneAPI = {
    Register: function (id, name, texture, stack){
        texture = texture || {};
        texture.texture = texture.texture || item;
        texture.meta = texture.meta || 0;
        IDRegistry.genItemID(id);
        Item.createItem(id, name, {name: texture.texture, meta: texture.meta}, {stack: stack});
    }, 
    DropMob: function (drop){
        Callback.addCallback("EntityDeath", function(entity){
            if(Entity.getType(entity) == drop.MobsID){
                var coords = Entity.getPosition(entity);
                var random = Math.random() * 1;
                if (random < drop.Chance) {
                    World.drop(coords.x, coords.y, coords.z, drop.DropItemID, 1, 0);
                }
            }
        });
    }, 
    DropBlock: function (drop){
        Callback.addCallback('DestroyBlock', function (coords, block, player) { 
            if(World.getBlockID(coords.x, coords.y, coords.z)== drop.BlockID){
                var random = Math.random() * 1;
                if (random < drop.Chance) {
                    World.drop(coords.x, coords.y, coords.z, drop.DropItemID, 1, 0);
                }
            }
        });
    }, 
};

RuneAPI.Register("RuneDarkness", "rune darkness", {texture: "rune", meta: 5}, 1);

Item.setGlint(ItemID.RuneDarkness, true);
/*
RuneAPI.DropMob({
    MobsID: 32,
    DropItemID: 264,
    Chance: 1
});
*/




// file: API/dungeonAPI.js

function DungeonAPI (path){
    this.path = path;
    let BlockReplace = [];
    var pathJson = __dir__+"/json/" + path;
    this.setStructurePro = function (xx, yy, zz, func) {
        var arr = FileTools.ReadJSON(pathJson);
        for(o in arr){
            let x = arr[o].x;
            let y = arr[o].y;
            let z = arr[o].z;
	         	let Id = arr[o].id;
            let data = arr[o].data;
            this.func = func;
            this.func = func
            World.setBlock(x + xx, y + yy, z + zz, Id, data);
            for(i in BlockReplace){
                if(World.getBlock(x + xx, y + yy, z + zz).id==BlockReplace[i].id1){
                    if(World.getBlock(x + xx, y + yy, z + zz).data==BlockReplace[i].data1){
                        BlockSet.RandomBlock(x + xx, y + yy, z + zz, BlockReplace[i].id1, BlockReplace[i].data1, BlockReplace[i].id2, BlockReplace[i].data2);
                    }
                }
           } 
           func(x + xx, y + yy, z + zz, arr, o);
        }
    }
    this.addReplace = function (id1, data1, id2, data2){
        BlockReplace.push({id1:id1, data1:data1, id2:id2, data2:data2});
    }
    this.setStructure = function (xx, yy, zz) {
        var arr = FileTools.ReadJSON(pathJson);
        for(o in arr){
            let x = arr[o].x;
            let y = arr[o].y;
            let z = arr[o].z;
            let Id = arr[o].id;
            let data = arr[o].data;
            World.setBlock(x + xx, y + yy, z + zz, Id, data);
            for(i in BlockReplace){
                if(World.getBlock(x + xx, y + yy, z + zz).id==BlockReplace[i].id1){
                    if(World.getBlock(x + xx, y + yy, z + zz).data==BlockReplace[i].data1){
                        BlockSet.RandomBlock(x + xx, y + yy, z + zz, BlockReplace[i].id1, BlockReplace[i].data1, BlockReplace[i].id2, BlockReplace[i].data2);
                    }
                }
           } 
        }
    }
}
/*
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
let save = {
x: chunkX, 
z: chunkZ
};
FileTools.WriteJSON (__dir__+"/debug/chank.json", save, true);
});
*/
var StructureCokEnd = new DungeonAPI("cokroviwnisa_end.json");

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
var random = Math.random()*600;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureCokEnd.setStructure(coords.x, coords.y, coords.z);

fillChest2.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});

var StructureCoEnd = new DungeonAPI("name.json");

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
var random = Math.random()*550;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureCoEnd.setStructure(coords.x, coords.y, coords.z);
fillChest2.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});

var StructureRuinEnd = new DungeonAPI("ruin_end.json");
StructureRuinEnd.addReplace(206, 0, 121, 0);

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
var random = Math.random()*400;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureRuinEnd.setStructure(coords.x, coords.y, coords.z);
}
});

var StructureGrobnisa = new DungeonAPI("grobnisa.json");
StructureGrobnisa.addReplace(4, 0, 48, 0);
StructureGrobnisa.addReplace(98, 0, 98, 1);
StructureGrobnisa.addReplace(139, 7, 139, 8);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*2200;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureGrobnisa.setStructure(coords.x, coords.y, coords.z);

fillChest2.fillChest(coords.x, coords.y+2, coords.z+3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x+2, coords.y+2, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x, coords.y+2, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x, coords.y+2, coords.z+3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});

var StructureGrobnisa2 = new DungeonAPI("grobnisa2.json");
StructureGrobnisa2.addReplace(4, 0, 48, 0);
StructureGrobnisa2.addReplace(98, 0, 98, 1);
StructureGrobnisa2.addReplace(139, 7, 139, 8);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*2800;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureGrobnisa2.setStructure(coords.x, coords.y, coords.z);
fillChestLab3(coords.x, coords.y, coords.z);

fillChest2.fillChest(coords.x+3, coords.y+4, coords.z-3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x-3, coords.y+4, coords.z-3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});



var StructureHome = new DungeonAPI("home.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*2000;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureHome.setStructurePro(coords.x, coords.y, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="board"){
        World.setBlock(x, y, z, BlockID.brick2, 0);
    }
    if(arr[i].id=="altar3"){
        World.setBlock(x, y, z, BlockID.board, 0);
    }
    if(arr[i].id=="glass2"){
        World.setBlock(x, y, z, BlockID.glass2, 0);
    }
    if(arr[i].id=="board2"){
        World.setBlock(x, y, z, BlockID.Breastya, 0);
    }
});
if(0.1<=Math.random()*1) {
World.setBlock(coords.x-2, coords.y+1, coords.z, 54, 0);

Structure3.fillChest(coords.x-2, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});
} 
if(1<=Math.random()*1) {
World.setBlock(coords.x, coords.y+1, coords.z-2, 54, 0);
fillChest2.fillChest(coords.x, coords.y+1, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
} 
if(0.7<=Math.random()*1) {
World.setBlock(coords.x, coords.y+1, coords.z+2, 54, 0);

fillChest2.fillChest(coords.x, coords.y+1, coords.z+2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
} 


}
});


//2500
var StructureAltar = new DungeonAPI("structure.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*2500;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureAltar.setStructurePro(coords.x, coords.y+1, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="fire"){
        World.setBlock(x, y, z, BlockID.kristalFire, 0);
    }
    if(arr[i].id=="altar"){
        World.setBlock(x, y, z, BlockID.rityal1, 0);
    } 
});
}
});

var StructureBawnaAda = new DungeonAPI("bawna_ada.json");
//100
Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
var random = Math.random()*100;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureBawnaAda.setStructurePro(coords.x, coords.y, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="fire"){
        World.setBlock(x, y, z, BlockID.kristalFire, 0);
    }
});

fillChest2.fillChest(coords.x, coords.y+7, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x-2, coords.y+11, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x-2, coords.y+11, coords.z+2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x+2, coords.y+11, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
fillChest2.fillChest(coords.x+2, coords.y+11, coords.z+2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});

var StructureCokAda = new DungeonAPI("cokrovewnisa.json");
Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
var random = Math.random()*150;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureCokAda.setStructure(coords.x, coords.y, coords.z);

fillChest2.fillChest(coords.x, coords.y+2, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});

var StructureLabAda = new DungeonAPI("labirint_ada.json");
Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
var random = Math.random()*250;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureLabAda.setStructure(coords.x, coords.y, coords.z);

fillChest2.fillChest(coords.x-5, coords.y+1, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

fillChest2.fillChest(coords.x-4, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

fillChest2.fillChest(coords.x+3, coords.y+1, coords.z+4, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

fillChest2.fillChest(coords.x+4, coords.y+1, coords.z-5, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
});

var StructureBawna = new DungeonAPI("bawna.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*1750;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureBawna.setStructure(coords.x, coords.y, coords.z);

Structure3.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});

}
});

var StructureRuin = new DungeonAPI("ruin.json");

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*1250;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructureRuin.setStructure(coords.x, coords.y, coords.z);
Structure3.fillChest(coords.x-1, coords.y+1, coords.z+1, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});

fillChest2.fillChest(coords.x+1, coords.y+10, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

}
});


var StructurePiramid = new DungeonAPI("piramida.json");
StructurePiramid.addReplace(4, 0, 48, 0);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*3000;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

StructurePiramid.setStructure(coords.x, coords.y, coords.z);

fillChest2.fillChest(coords.x+3, coords.y+1, coords.z+3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

fillChest2.fillChest(coords.x+3, coords.y+1, coords.z-3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

fillChest2.fillChest(coords.x-3, coords.y+1, coords.z+3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

fillChest2.fillChest(coords.x-3, coords.y+1, coords.z-3, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

}
});







var firstClick = true;
var origin = {x:0, y:0, z:0};
var es = ModAPI.requireGlobal("Entity.isSneaking");
var blockArray;
var coordinates=[{},{}];

Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id == ItemID.debugTools&&es(Player.get())){ 
	origin = coords;
 Game.message("установлен цент структуры");
}else
if(item.id == ItemID.debugTools&&!es(Player.get())){
	if(!firstClick){
		coordinates[1] = coords;
		Game.message("second click");
	}else{
		Game.message("first click");
		coordinates[0]=coords;
	}
	firstClick = firstClick?false:true;
}
})
















































// file: API/GenerateItem.js

function ItemGenerate (){
    let GenerateionItem = [];
    this.addItem = function (id, random, count, data){
        random = random||1;
        count = count||{};
        count.min = count.min||1;
        count.max = count.max||1;
        data = data||0;
        GenerateionItem.push({id:id, data:data, random:random, count:count});
    }
    this.fillChest = function (x, y, z, func){
        var container = World.getContainer(x, y, z);
        if(container){
            var random = Math.random();
            var slot = Math.random()*27;
            for(var i in GenerateionItem){
                if(random<GenerateionItem[i].random){
                    var slot1 = container.getSlot(slot);
                    var count = Math.floor(Math.random()*(GenerateionItem[i].count.max-GenerateionItem[i].count.min))+GenerateionItem[i].count.min; 
                    this.func = func 
                    container.setSlot(slot, GenerateionItem[i].id, count, GenerateionItem[i].data);
                    func(slot, x, y, z, GenerateionItem[i].id, GenerateionItem[i].data, count);
                    slot = Math.random()*27;
                }
            }
        }else{
            Game.message("error: no chest")
        }
    }
    this.getItem = function (){
        return GenerateionItem;
    }
}
const TYPE = {
  helmet: [0, 1, 3, 4, 5, 6, 8, 17],
  chestplate: [0, 1, 3, 4, 5, 17],
  leggings: [0, 1, 3, 4, 5, 17],
  boots: [0, 1, 2, 3, 4, 5, 7, 17],
  sword: [9, 10, 11, 12, 13, 14, 17],
  shovel: [15, 16, 17, 18],
  pickaxe: [15, 16, 17, 18],
  axe: [9, 10, 11, 15, 16, 17, 18],
  hoe: [17],
  bow: [17, 19, 20, 21, 22],
  fishing: [17, 23, 24],
  shears: [15, 17],
};
function enchantAdd (random, typ, ech){
    let extra = new ItemExtraData();
    for(i = 0;i <= ech;i++){
        let ran = Math.random()*1;
        if(ran<=random){
            let enc = 0;
            let ty = TYPE[typ]
            for(i in ty){
                enc++;
            }
            let ran2 = Math.floor(Math.random()*enc);
            let ran3 = Math.floor(Math.random()*2 + 1);
            let ench = ty[ran2];
            extra.addEnchant(ench, ran3);
        }
    }
    return extra;
}




// file: block/BlockRegister.js

IDRegistry.genBlockID("brick2");
Block.createBlock("brick2", [ {name: "Paradise Bricks", texture: [["brick2", 0]], inCreative: true}]);

Translation.addTranslation("Paradise Bricks", {ru: "кирпичи рая"});

IDRegistry.genBlockID("vase");
Block.createBlock("vase", [ {name: "vase", texture: [["stone", 0]], inCreative: true}]);

Translation.addTranslation("vase", {ru: "ваза"});
renderAPI.setblock(BlockID.vase, "vase.obj", "vase");

Callback.addCallback('DestroyBlock', function (coords, block, player) {
if(block.id==BlockID.werep) {
World.drop(coords.x, coords.y, coords.z, 264, Math.trunc(Math.random() * 3 + 1));
} 
});

Block.registerDropFunctionForID(BlockID.vase, function(coords, id, data, diggingLevel, toolLevel){

     return [[0, 0, 0]];

});


ToolAPI.registerBlockMaterial(BlockID.vase, "stone", 1, true);
Block.setDestroyTime(BlockID.vase, 1);
Block.setDestroyLevel(BlockID.vase, 1);


IDRegistry.genBlockID("werep");
Block.createBlock("werep", [ {name: "werep", texture: [["stone", 0]], inCreative: true}]);

Translation.addTranslation("werep", {ru: "череп"});
renderAPI.setblock(BlockID.werep, "werep.obj", "werep");

Callback.addCallback('DestroyBlock', function (coords, block, player) {
if(block.id==BlockID.vase) {
World.drop(coords.x, coords.y, coords.z, 371, Math.trunc(Math.random() * 16 + 1));
} 
});

Block.registerDropFunctionForID(BlockID.werep, function(coords, id, data, diggingLevel, toolLevel){

     return [[0, 0, 0]];

});

ToolAPI.registerBlockMaterial(BlockID.werep, "stone", 1, true);
Block.setDestroyTime(BlockID.werep, 1);
Block.setDestroyLevel(BlockID.werep, 1);

/*
IDRegistry.genBlockID("br");
Block.createBlock("br", [ {name: "Paradise Bricks", texture: [["br", 0], ["gg", 0], ["tt", 0],], inCreative: true}]);

renderAPI.steve(BlockID.br);
*/
ToolAPI.registerBlockMaterial(BlockID.brick2, "stone", 3, true);
Block.setDestroyTime(BlockID.brick2, 1);

IDRegistry.genBlockID("glass2");
Block.createBlock("glass2", [ {name: "Glass of paradise", texture: [["glass2", 0]], inCreative: true} ]);

Translation.addTranslation("Glass of paradise", {ru: "стекло"});

Block.setDestroyTime(BlockID.glass2, 0.1);

Block.createSpecialType({
	base: 17,
	solid: true,
	destroytime: 2,
	explosionres: 10,
	lightopacity: 15,
	renderlayer: 2,
	translucency: 0
}, "log");
Block.createSpecialType({
	base: 18,
	destroytime: 0.2,
	explosionres: 1,
	renderallfaces: true, 
	renderlayer: 1,
	lightopacity: 1,
	translucency: 0.5
}, "log2");

IDRegistry.genBlockID("Breastya");
Block.createBlockWithRotation("Breastya", [ {name: "Breastya", texture: [["Breastya", 1], ["Breastya", 1], ["Breastya", 0], ["Breastya", 0], ["Breastya", 0], ["Breastya", 0]], inCreative: true} ], "log");

Translation.addTranslation("Breastya", {ru: "бревно рая"});

//Block.setDestroyTime(BlockID.Breastya, 1);
//Block.setDestroyLevel(BlockID.Breastya, 1);

IDRegistry.genBlockID("Foliage");
Block.createBlock("Foliage", [ {name: "Foliage of paradise", texture: [["Foliage", 0]], inCreative: true} ], "log2");

Translation.addTranslation("Foliage of paradise", {ru: "листва"});

Block.setDestroyTime(BlockID.Foliage, 0.1);

Block.registerDropFunctionForID(BlockID.Foliage, function(coords, id, data, diggingLevel, toolLevel){

     return [[ItemID.sapling10, 1, 0]];

});

IDRegistry.genBlockID("sap");
Block.createBlock("sap", [ {name: "sapling", texture: [["Sapling2", 0]], inCreative: false} ]);

TileRenderer.setPlantModel(BlockID.sap, 0, "Sapling2", 0);

Block.setDestroyTime(BlockID.sap, 0.2);

Block.createSpecialType({
 opaque: false, 
	lightopacity: 0,
  lightlevel: 8, 
 	explosionres: 0,
}, "trava");

IDRegistry.genBlockID("trava");
Block.createBlock("trava", [ {name: "trava", texture: [["trava", 0]], inCreative: false} ], "trava");

TileRenderer.setPlantModel(BlockID.trava, 0, "trava", 0);

Block.setDestroyTime(BlockID.trava, 0.2);

TileEntity.registerPrototype(BlockID.trava, {

     defaultValues: {
     },
     tick: function(){
        if(World.getBlock(this.x, this.y-1, this.z).id==0){
World.setBlock(this.x, this.y, this.z, 0, 0);
}
     }
});

IDRegistry.genBlockID("board");
Block.createBlock("board", [ {name: "board", texture: [["board", 0]], inCreative: true} ], "log");

Translation.addTranslation("board", {ru: "доски рая"});

//Block.setDestroyTime(BlockID.board, 1);
//ToolAPI.registerBlockMaterial(BlockID.board, "plant", 1, true);
//Block.setDestroyLevel(BlockID.board, 1);


IDRegistry.genBlockID("a0");
Block.createBlock("a0", [ {name: "ggg", texture: [["a", 0]], inCreative: false} ]);

Block.setDestroyTime(BlockID.a0, 0.1);

Block.registerDropFunctionForID(BlockID.a0, function(coords, id, data, diggingLevel, toolLevel){

     return [[ItemID.Berries, 1, 0]];

});

IDRegistry.genBlockID("a1");
Block.createBlock("a1", [ {name: "ggg", texture: [["a", 1]], inCreative: false} ]);

Block.setDestroyTime(BlockID.a1, 0.1);

Block.registerDropFunctionForID(BlockID.a1, function(coords, id, data, diggingLevel, toolLevel){

     return [[ItemID.Berries, 2, 0]];

});

TileEntity.registerPrototype(BlockID.a0, {
     defaultValues: {
     },
     tick: function(){
        if(Math.random() * 1000 < 1){
World.setBlock(this.x, this.y, this.z, BlockID.a1, 0);
}
     }
});

Block.setBlockShape(BlockID.a0, {x: 0.2, y: 0, z: 0.2}, {x: 0.8, y: 0.8, z: 0.8}) 

Block.setBlockShape(BlockID.a1, {x: 0.2, y: 0, z: 0.2}, {x: 0.8, y: 0.8, z: 0.8})

TileEntity.registerPrototype(BlockID.a1, {
     defaultValues: {
     },
     click: function(id, count, data, coords){
World.drop(this.x, this.y+1, this.z, ItemID.Berries, 1, 0);
World.setBlock(this.x, this.y, this.z, BlockID.a0, 0);
     }
});

IDRegistry.genBlockID("altar");
Block.createBlock("altar", [ {name: "Altarial block", texture: [["stone-1", 0], ["stone-1", 0], ["stone-1", 0]], inCreative: true} ]);

Translation.addTranslation("Altarial block", {ru: "алтарьный блок"});

Block.setDestroyTime(BlockID.altar, 1);
ToolAPI.registerBlockMaterial(BlockID.altar, "stone", 1, true);

IDRegistry.genBlockID("altar1");
Block.createBlock("altar1", [ {name: "Altarial block", texture: [["rityalBlock", 0], ["rityalBlock", 0], ["rityalBlock", 0]], inCreative: true} ]);

Block.setDestroyTime(BlockID.altar1, 1);
ToolAPI.registerBlockMaterial(BlockID.altar1, "stone", 1, true);

IDRegistry.genBlockID("altar3");
Block.createBlock("altar3", [ {name: "Altarial block", texture: [["rityalBlock", 2], ["rityalBlock", 2], ["rityalBlock", 2]], inCreative: true} ]);

Block.setDestroyTime(BlockID.altar3, 1);
ToolAPI.registerBlockMaterial(BlockID.altar3, "stone", 1, true);

IDRegistry.genBlockID("dirt2"); 
Block.createBlock("dirt2", [{name: "Land of paradise", texture: [["aether_dirt", 0]],inCreative: true}], "opaque");

Translation.addTranslation("Land of paradise", {ru: "земля рая"});

Block.setDestroyTime(BlockID.dirt2, 1);
ToolAPI.registerBlockMaterial(BlockID.dirt2, "dirt", 1, true);

IDRegistry.genBlockID("stone2"); 
Block.createBlock("stone2", [{name: "Stone of paradise", texture: [["holystone", 0]],inCreative: true}], "opaque");

Translation.addTranslation("Stone of paradise", {ru: "камень рая"});

IDRegistry.genBlockID("grass2");
Block.createBlock("grass2", [{name: "Grass of paradise", texture: [["aether_dirt", 0], ["aether_grass_top", 0], ["aether_grass_side", 0]],inCreative: true}], "opaque");

Translation.addTranslation("Grass of paradise", {ru: "трава рая"});

Block.registerDropFunctionForID(BlockID.grass2, function(coords, id, data, diggingLevel, toolLevel){
   return [[BlockID.dirt2, 1, 0]];
});

IDRegistry.genBlockID("ore"); 
Block.createBlock("ore", [{name: "Ore of paradise", texture: [["ore", 0]],inCreative: true}], "opaque");

Translation.addTranslation("Ore of paradise", {ru: "руда рая"});

IDRegistry.genBlockID("blockmetal"); 
Block.createBlock("blockmetal", [{name: "Blocks of divine methal", texture: [["blockmetal", 0]],inCreative: true}], "opaque");

Translation.addTranslation("Blocks of divine methal", {ru: "блок божественного метала"});

Block.setDestroyTime(BlockID.blockmetal, 1);
ToolAPI.registerBlockMaterial(BlockID.blockmetal, "stone", 1, true);

IDRegistry.genBlockID("block1"); 
Block.createBlock("block1", [{name: "Controller of the worlds", texture: [["altar", 0]],inCreative: true}], "opaque");

Translation.addTranslation("Controller of the worlds", {ru: "контролер миров"});

TileEntity.registerPrototype(BlockID.grass2, {

     defaultValues: {

          someValue: 0 

     },


     tick: function(){
         if(World.getBlockID(this.x, this.y + 1, this.z)<<0){
World.setBlock(this.x, this.y, this.z, BlockID.dirt2, 0);
} 

          

     },

    

     click: function(id, count, data, coords){

     }

    

    

});
TileEntity.registerPrototype(BlockID.dirt2, {

     defaultValues: {

          someValue: 0 

     },


     tick: function(){
         if(World.getBlockID(this.x + 1, this.y, this.z)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
} 

 if(World.getBlockID(this.x - 1, this.y, this.z)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x - 1, this.y, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x - 1, this.y, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x + 1, this.y, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x + 1, this.y, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
}
if(World.getBlockID(this.x, this.y, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
} 

 if(World.getBlockID(this.x, this.y, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}












if(World.getBlockID(this.x + 1, this.y - 1, this.z)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
} 

 if(World.getBlockID(this.x - 1, this.y - 1, this.z)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x - 1, this.y - 1, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x - 1, this.y - 1, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x + 1, this.y - 1, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x + 1, this.y - 1, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
}
if(World.getBlockID(this.x, this.y - 1, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
} 

 if(World.getBlockID(this.x, this.y - 1, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}












if(World.getBlockID(this.x + 1, this.y + 1, this.z)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
} 

 if(World.getBlockID(this.x - 1, this.y + 1, this.z)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x - 1, this.y + 1, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x - 1, this.y + 1, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x + 1, this.y + 1, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
if(World.getBlockID(this.x + 1, this.y + 1, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
}
if(World.getBlockID(this.x, this.y + 1, this.z - 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

} 
} 

 if(World.getBlockID(this.x, this.y + 1, this.z + 1)==BlockID.grass2){
if(Math.random() < 2400){

World.setBlock(this.x, this.y, this.z, BlockID.grass2, 0);

}
}
     },

    

     click: function(id, count, data, coords){

     }

    

    

});

ToolAPI.registerBlockMaterial(BlockID.stone2, "stone", 1, true);
ToolAPI.registerBlockMaterial(BlockID.ore, "stone", 3, true);


Block.setDestroyTime(BlockID.dirt2, 0.1);
Block.setDestroyTime(BlockID.grass2, 0.1);
Block.setDestroyTime(BlockID.stone2, 2);
Block.setDestroyTime(BlockID.block1, 99999999999);
Block.setDestroyLevel(BlockID.stone2, 1);
Block.setDestroyTime(BlockID.ore, 3);
Block.setDestroyLevel(BlockID.ore, 3);


IDRegistry.genBlockID("kristalFire");
Block.createBlock("kristalFire", [ {name: "crictal fire", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);

TileRenderer.setPlantModel(BlockID.kristalFire, 0, "crictal", 0);

Block.registerDropFunctionForID(BlockID.kristalFire, function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.crystalfire, 1, 0]];
});
Block.setDestroyTime(BlockID.kristalFire, 1);
ToolAPI.registerBlockMaterial(BlockID.kristalFire, "stone", 0.1, true);

IDRegistry.genBlockID("kristaldirt");
Block.createBlock("kristaldirt", [ {name: "проигрыватель", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);
TileRenderer.setPlantModel(BlockID.kristaldirt, 0, "crictal", 2);
Block.registerDropFunctionForID(BlockID.kristaldirt, function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.crystalearth, 1, 0]];
});

Block.setDestroyTime(BlockID.kristaldirt, 1);
ToolAPI.registerBlockMaterial(BlockID.kristaldirt, "stone", 0.1, true);

IDRegistry.genBlockID("kristalLight");
Block.createBlock("kristalLight", [ {name: "проигрыватель", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);
TileRenderer.setPlantModel(BlockID.kristalLight, 0, "crictal", 3);
Block.registerDropFunctionForID(BlockID.kristalLight, function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.crystalLightning, 1, 0]];
});

Block.setDestroyTime(BlockID.kristalLight, 1);
ToolAPI.registerBlockMaterial(BlockID.kristalLight, "stone", 0.1, true);

IDRegistry.genBlockID("kristalwind");
Block.createBlock("kristalwind", [ {name: "проигрыватель", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);
TileRenderer.setPlantModel(BlockID.kristalwind, 0, "crictal", 1);
Block.registerDropFunctionForID(BlockID.kristalwind, function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.crystalWind, 1, 0]];
});

Block.setDestroyTime(BlockID.kristalwind, 1);
ToolAPI.registerBlockMaterial(BlockID.kristalwind, "stone", 0.1, true);

IDRegistry.genBlockID("rityal1"); 
Block.createBlock("rityal1", [{name: "magis altar block", texture: [["nis", 0],["vverx", 0], ["ctoronS", 0],["storonO", 0], ["storonM", 0], ["ctoronl", 0]],inCreative: true, opaque: true, lightopacity: 1, renderlayer: 2}]);

Translation.addTranslation("magis altar block", {ru: "магический ритуальный блок"});

Block.setDestroyTime(BlockID.rityal1, 1);
ToolAPI.registerBlockMaterial(BlockID.rityal1, "stone", 1, true);

var Render = {
setAltarRender: function(blockID, normal){
    if(normal){
     let render = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(blockID, -1, render); 
     let model = BlockRenderer.createModel(); 
           render.addEntry(model);
                    
					
					model.addBox (0/16, 0.88, 0/16, 16/16, 1, 1/16, blockID, 0);
					  model.addBox (0/16, 0.88, 15/16, 16/16, 1, 16/16, blockID, 0);
					   model.addBox (0/16, 0.88, 1/16, 1/16, 1, 15/16, blockID, 0);
					    model.addBox (15/16, 0.88, 1/16, 16/16, 1, 15/16, blockID, 0);
				   model.addBox(0/16, 0.79, 0/16, 16/16, 0.88, 16/16, blockID, 0);
                 model.addBox(3/16, 0.21, 3/16, 13/16, 0.78, 13/16, blockID, 0);
			   model.addBox(0/16, 0, 0/16, 16/16, 0.20, 16/16, blockID, 0);
					
					
					
     }
},

setRackRender: function(blockID, normal){
    if(normal){
     let render = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(blockID, -1, render); 
     let model = BlockRenderer.createModel(); 
           render.addEntry(model);
                    
					 model.addBox (0/16, 0, 0/16, 16/16, 0.133, 16/16, blockID, 0);
					  model.addBox (4/16, 0.134, 4/16, 12/16, 0.246, 12/16, blockID, 0);
					  model.addBox (10/16, 0.247, 10/16, 6/16, 0.95, 6/16, blockID, 0);
			
					  model.addBox (4/16, 0.96, 4/16, 12/16, 1, 12/16, blockID, 0);
     }
},

setRitualAltarRender: function(blockID, normal){
    if(normal){
     let render = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(blockID, -1, render); 
     let model = BlockRenderer.createModel(); 
           render.addEntry(model);
                    
					model.addBox (0/16, 0, 0/16, 16/16, 0.20, 16/16, blockID, 0);
					model.addBox (4/16, 0.21, 4/16, 12/16, 0.80, 12/16, blockID, 0);
					model.addBox (0/16, 0.81, 0/16, 16/16, 1, 16/16, blockID, 0);
					
     }
},

setRitualAltarControllerRender: function(blockID, normal){
    if(normal){
     Block.setBlockShape(blockID, {x: 0, y: 0, z: 0}, {x: 1, y: 0.4, z: 1});			
     }
}
};

Render.setRitualAltarRender(BlockID.rityal1, true);

TileEntity.registerPrototype(BlockID.rityal1, {
	defaultValues: {
		item: 0
	},
	
	init:function(){
		this.animationItem = new Animation.Item(this.x+.5, this.y+1.02, this.z+.5);
	},
	
	animation: function (){
		
		 var Item = Player.getCarriedItem();
		 
	  if ((Item.id > 0) && (Item.count > 0) && (!this.animationItem.load())){
		  this.data.item = Item.id;
		Player.setCarriedItem(Item.id, Item.count-1, 0);
		 
				this.animationItem.describeItem({		
			id: this.data.item,
			count: 1,
			data: 0,
			size: .7,
			rotation:[3.14/2, 0, 0]
		});
		
		this.animationItem.load();
		}
		
	},
 customAnimation: function (ItemID) {
this.animationItem.describeItem({		
			id: ItemID,
			count: 1,
			data: 0,
			size: .7,
			rotation:[3.14/2, 0, 0]
		});
		 this.data.item = ItemID;
		this.animationItem.load();
}, 
	
	drop: function (){
	this.animationItem.destroy();
	World.drop(this.x, this.y, this.z, this.data.item, 1, 0);
	this.data.item = 0;
	},
	
	tick: function (){
	},
	
	click: function (){
if(Entity.getSneaking(Player.get()) == true){
		var Item = Player.getCarriedItem();
		if (Item.count > 0){
		this.animation();
		} else if (Item.count <= 0){
			this.drop();
		}
} 
	},
	


selfDestroy: function(){
	this.destroy();
}
});






// file: block/recordPlayer.js


IDRegistry.genBlockID("player1");
Block.createBlock("player1", [ {name: "player", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);

IDRegistry.genBlockID("player2");
Block.createBlock("player2", [ {name: "player", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);

IDRegistry.genBlockID("player3");
Block.createBlock("player3", [ {name: "player", texture: [["jukebox_side", 0], ["jukebox_top", 0], ["jukebox_side", 0]], inCreative: false} ]);

TileEntity.registerPrototype(BlockID.player1, {

     defaultValues: {

          someValue: 0 

     },


     tick: function(){
        
     },

    

     click: function(id, count, data, coords){
World.setBlock(this.x, this.y, this.z, 84, 0);
boss1.stop();
World.drop(this.x, this.y + 1, this.z, ItemID.GlasPlacte, 1, 0);


     }, 

destroyBlock: function(coords, player){

          
boss1.stop();
     },
});

Block.registerDropFunctionForID(BlockID.player1, function(coords, id, data, diggingLevel, toolLevel){
     return [[BlockID.player, 1, 0], [ItemID.GlasPlacte, 1, 0]];
});

TileEntity.registerPrototype(BlockID.player2, {

     defaultValues: {

          someValue: 0 

     },


     tick: function(){
        
     },

    

     click: function(id, count, data, coords){
World.setBlock(this.x, this.y, this.z, 84, 0);
angel.stop();
World.drop(this.x, this.y + 1, this.z, ItemID.AngelPlate, 1, 0);


     }, 

destroyBlock: function(coords, player){

          
angel.stop();
     },
});

Block.registerDropFunctionForID(BlockID.player2, function(coords, id, data, diggingLevel, toolLevel){
     return [[BlockID.player, 1, 0], [ItemID.AngelPlate, 1, 0]];
});

TileEntity.registerPrototype(BlockID.player3, {

     defaultValues: {

          someValue: 0 

     },


     tick: function(){
        
     },

    

     click: function(id, count, data, coords){
World.setBlock(this.x, this.y, this.z, 84, 0);
raiFinal.stop();
World.drop(this.x, this.y + 1, this.z, ItemID.godcol, 1, 0);


     }, 

destroyBlock: function(coords, player){

          
raiFinal.stop();
     },
});

Block.registerDropFunctionForID(BlockID.player3, function(coords, id, data, diggingLevel, toolLevel){
     return [[BlockID.player, 1, 0], [ItemID.godcol, 1, 0]];
});




// file: block/generation.js

Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
var random = Math.random()*1;
if (random <= 2){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 0, 40);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if(World.getBlockID(coords.x, coords.y, coords.z)==1){
if(World.getBlockID(coords.x, coords.y+1, coords.z)==0){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristaldirt, 0);
} 
}
} 
});

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
var random = Math.random()*10;
if (random <= 2){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 0, 40);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if(World.getBlockID(coords.x, coords.y, coords.z)==87){
if(World.getBlockID(coords.x, coords.y+1, coords.z)==0){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristalFire, 0);
} 
}
} 
});



Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
var random = Math.random()*10;
if (random <= 2){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 70, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        
if(World.getBlockID(coords.x, coords.y, coords.z)==1){
if(World.getBlockID(coords.x, coords.y+1, coords.z)==0){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristalwind, 0);
} 
}
} 
});









// file: block/ritual/ritual.js

IDRegistry.genBlockID("statua");
Block.createBlock("statua", [ {name: "The statue of the Nezhi", texture: [["ctena", 1],["ctena", 1],["vvex", 1]], inCreative: true}]);

Translation.addTranslation("The statue of the Nezhi", {ru: "статуя нежити"});

IDRegistry.genBlockID("rityal"); 
Block.createBlock("rityal", [{name: "Magic storage", texture: [["nis", 0],["vverx1", 0], ["ctoronS", 0],["storonO", 0], ["storonM", 0], ["ctoronl", 0]],inCreative: true, opaque: true, lightopacity: 1, renderlayer: 2}]);

var nak = 19999;
TileEntity.registerPrototype(BlockID.rityal, {

     defaultValues: {

          someValue: 0,
         


          

     },


     tick: function(){
if (World.getBlock(this.x-1, this.y, this.z).id != BlockID.rityal){
if (World.getBlock(this.x-2, this.y, this.z).id != BlockID.rityal){
if (World.getBlock(this.x+1, this.y, this.z).id != BlockID.rityal){
if (World.getBlock(this.x+2, this.y, this.z).id != BlockID.rityal){

if (World.getBlock(this.x-1, this.y, this.z+1).id != BlockID.rityal){
if (World.getBlock(this.x-2, this.y, this.z+1).id != BlockID.rityal){
if (World.getBlock(this.x+2, this.y, this.z+1).id != BlockID.rityal){
if (World.getBlock(this.x+1, this.y, this.z+1).id != BlockID.rityal){
if (World.getBlock(this.x, this.y, this.z+1).id != BlockID.rityal){

if (World.getBlock(this.x-1, this.y, this.z+2).id != BlockID.rityal){
if (World.getBlock(this.x-2, this.y, this.z+2).id != BlockID.rityal){
if (World.getBlock(this.x+2, this.y, this.z+2).id != BlockID.rityal){
if (World.getBlock(this.x+1, this.y, this.z+2).id != BlockID.rityal){
if (World.getBlock(this.x, this.y, this.z+2).id != BlockID.rityal){

if (World.getBlock(this.x-1, this.y, this.z-1).id != BlockID.rityal){
if (World.getBlock(this.x-2, this.y, this.z-1).id != BlockID.rityal){
if (World.getBlock(this.x+2, this.y, this.z-1).id != BlockID.rityal){
if (World.getBlock(this.x+1, this.y, this.z-1).id != BlockID.rityal){
if (World.getBlock(this.x, this.y, this.z-1).id != BlockID.rityal){

if (World.getBlock(this.x-1, this.y, this.z-2).id != BlockID.rityal){
if (World.getBlock(this.x-2, this.y, this.z-2).id != BlockID.rityal){
if (World.getBlock(this.x+2, this.y, this.z-2).id != BlockID.rityal){
if (World.getBlock(this.x+1, this.y, this.z-2).id != BlockID.rityal){
if (World.getBlock(this.x, this.y, this.z-2).id != BlockID.rityal){

         if(mana<=nak){
mana+=1;
ritual2.play();
ritualParticle.ParticleType(Native.ParticleType.flame, this.x+Math.random(), this.y+1+Math.random(), this.z+Math.random(), 1);

} 

}
}
}
} 

} 
} 
} 
} 
} 

}
}
}
}
}

}
}
}
}
}
}
}
}
}
}
     },

    

     click: function(id, count, data, coords){


    } 
});

Translation.addTranslation("Magic storage", {ru: "магичиский накопитель"});

var render = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(BlockID.statua, -1, render); 
     var model = BlockRenderer.createModel(); 
           render.addEntry(model);
model.addBox (6/16, 0, 6/16, 10/16, 0.29, 10/16, BlockID.statua, 0);
model.addBox (3/16, 0.30, 3/16, 13/16, 0.80, 13/16, BlockID.statua, 0);

IDRegistry.genBlockID("ritualGL");
Block.createBlock("ritualGL", [ {name: "Pedestal for statues", texture: [["testN", 0],["testV", 0],["testC", 0]], inCreative: true}]);



Translation.addTranslation("Pedestal for statues", {ru: "пьедестал длс статуй"});

var render1 = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(BlockID.ritualGL, -1, render1); 
     var model1 = BlockRenderer.createModel(); 
           render1.addEntry(model1);
model1.addBox (2/16, 0, 2/16, 14/16, 0.90, 14/16, BlockID.ritualGL, 0);
model1.addBox (3/16, 0.91, 3/16, 13/16, 1, 13/16, BlockID.ritualGL, 0);

model1.addBox (0/16, 0, 2/16, 16/16, 0.50, 14/16, BlockID.ritualGL, 0);

model1.addBox (16/16, 0, 2/16, 0/16, 0.50, 14/16, BlockID.ritualGL, 0);

model1.addBox (0/16, 0, 16/16, 16/16, 0.50, 0/16, BlockID.ritualGL, 0);

model1.addBox (0/16, 0, 0/16, 16/16, 0.50, 16/16, BlockID.ritualGL, 0);











TileEntity.registerPrototype(BlockID.statua, {
		defaultValues: {
		progress: 0,
		active: false,
   active2: false, 
   manaC: 0, 
   manaC2: 0,
		charge: false,
		rings: 0,
		item: 0, 
   testFunction: 0,
	},
	
	init:function(){

	},
	
	animation: function (){
		
		 
		 
		 
				
	  
	},
	
	
	
	
	click: function (){
	},
	
	destroy: function(){
	this.data.active = false;


	this.data.item = 0;
},

selfDestroy: function(){
	this.destroy();
},


RitualCraft: function (material, result, count, manaCount, manaMax){
	
	if (World.getBlock(this.x-2, this.y-1, this.z).id === BlockID.rityal1){
if (World.getBlock(this.x, this.y-1, this.z).id === BlockID.ritualGL){
	if (World.getBlock(this.x+2, this.y-1, this.z).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z-2).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z+2).id === BlockID.rityal1){
		
	
		if(World.getTileEntity(this.x-2, this.y-1, this.z).data.item === material){
		if(World.getTileEntity(this.x+2, this.y-1, this.z).data.item === material){
		if(World.getTileEntity(this.x, this.y-1, this.z-2).data.item === material){
		if(World.getTileEntity(this.x, this.y-1, this.z+2).data.item === material){
if (mana >= manaMax){
			this.data.active = true;
				this.data.item = result;
this.data.manaC = manaCount;
		 sound.play();
    Entity.spawn(this.x, this.y+1, this.z, 93);
    World.drop(this.x, this.y+1, this.z, this.data.item, count);
 }
  
    }
		 }
		      }
	                }
	
	                     }
	                }
	          }
	     }
	}
},

RitualmanaPlus: function (material, manaCount, manaMax){
	
	if (World.getBlock(this.x-2, this.y-1, this.z).id === BlockID.rityal1){
if (World.getBlock(this.x, this.y-1, this.z).id === BlockID.ritualGL){
	if (World.getBlock(this.x+2, this.y-1, this.z).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z-2).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z+2).id === BlockID.rityal1){
		
	
		if(World.getTileEntity(this.x-2, this.y-1, this.z).data.item === material){
		if(World.getTileEntity(this.x+2, this.y-1, this.z).data.item === material){
		if(World.getTileEntity(this.x, this.y-1, this.z-2).data.item === material){
		if(World.getTileEntity(this.x, this.y-1, this.z+2).data.item === material){
if (mana <= manaMax){
				   
				   
			this.data.manaC2 = manaCount;
			this.data.active2 = true;
		 sound.play();
    Entity.spawn(this.x, this.y+1, this.z, 93);
 mana+=manaCount;
 } 
    }
		 }
		      }
	                }
	
	                     }
	                }
	          }
	     }
	}
},

ProRitualCraft: function (r){
	
	if (World.getBlock(this.x-2, this.y-1, this.z).id === BlockID.rityal1){
if (World.getBlock(this.x, this.y-1, this.z).id === BlockID.ritualGL){
	if (World.getBlock(this.x+2, this.y-1, this.z).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z-2).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z+2).id === BlockID.rityal1){
		
	
		if(World.getTileEntity(this.x-2, this.y-1, this.z).data.item === r.ItemXm){
		if(World.getTileEntity(this.x+2, this.y-1, this.z).data.item === r.ItemXp){
		if(World.getTileEntity(this.x, this.y-1, this.z-2).data.item === r.ItemZm){
		if(World.getTileEntity(this.x, this.y-1, this.z+2).data.item === r.ItemZp){
if (mana >= r.manaMax){
			this.data.active = true;
				this.data.item = r.result;
this.data.manaC = r.manaCount;
		 sound.play();
    Entity.spawn(this.x, this.y+1, this.z, 93);
    World.drop(this.x, this.y+1, this.z, this.data.item, r.count);
 }
  
    }
		 }
		      }
	                }
	
	                     }
	                }
	          }
	     }
	}
},

restart: function (){	
mana-=this.data.manaC;
	if (World.getBlock(this.x-2, this.y-1, this.z).id === BlockID.rityal1){
	
	World.getTileEntity(this.x-2, this.y-1, this.z).animationItem.destroy();
	World.getTileEntity(this.x-2, this.y-1, this.z).data.item = 0;



	}
	if (World.getBlock(this.x+2, this.y-1, this.z).id === BlockID.rityal1){
	
	World.getTileEntity(this.x+2, this.y-1, this.z).animationItem.destroy();
	World.getTileEntity(this.x+2, this.y-1, this.z).data.item = 0;
	}
	if (World.getBlock(this.x, this.y-1, this.z-2).id === BlockID.rityal1){
	
	World.getTileEntity(this.x, this.y-1, this.z-2).animationItem.destroy();
	World.getTileEntity(this.x, this.y-1, this.z-2).data.item = 0;
	}
	if (World.getBlock(this.x, this.y-1, this.z+2).id === BlockID.rityal1){
	
	World.getTileEntity(this.x, this.y-1, this.z+2).animationItem.destroy();
	World.getTileEntity(this.x, this.y-1, this.z+2).data.item = 0;
	}
				
},

restart2: function (){	
	if (World.getBlock(this.x-2, this.y-1, this.z).id === BlockID.rityal1){
	
	World.getTileEntity(this.x-2, this.y-1, this.z).animationItem.destroy();
	World.getTileEntity(this.x-2, this.y-1, this.z).data.item = 0;

mana+=this.data.manaC2;

	}
	if (World.getBlock(this.x+2, this.y-1, this.z).id === BlockID.rityal1){
	
	World.getTileEntity(this.x+2, this.y-1, this.z).animationItem.destroy();
	World.getTileEntity(this.x+2, this.y-1, this.z).data.item = 0;
	}
	if (World.getBlock(this.x, this.y-1, this.z-2).id === BlockID.rityal1){
	
	World.getTileEntity(this.x, this.y-1, this.z-2).animationItem.destroy();
	World.getTileEntity(this.x, this.y-1, this.z-2).data.item = 0;
	}
	if (World.getBlock(this.x, this.y-1, this.z+2).id === BlockID.rityal1){
	
	World.getTileEntity(this.x, this.y-1, this.z+2).animationItem.destroy();
	World.getTileEntity(this.x, this.y-1, this.z+2).data.item = 0;
	}
				
},



tick: function (){
 this.RitualmanaPlus(ItemID.Gem2, 4000, 12000);
	this.RitualmanaPlus(ItemID.Gem, 1000, 18000);
this.RitualCraft(ItemID.clitok, ItemID.Gem, 1, 1000, 2000);

this.ProRitualCraft({
 ItemXm: ItemID.Gem,
 ItemXp: ItemID.gotovka,
 ItemZm: ItemID.clitok,
 ItemZp: ItemID.clitok,
 manaMax: 15000, 
 result: ItemID.poic1, 
 count: 1, 
 manaCount: 5000, 
});

this.ProRitualCraft({
 ItemXm: ItemID.gotovka,
 ItemXp: ItemID.Gem,
 ItemZm: ItemID.clitok,
 ItemZp: ItemID.clitok,
 manaMax: 15000, 
 result: ItemID.poic1, 
 count: 1, 
 manaCount: 5000, 
});

this.ProRitualCraft({
 ItemXm: ItemID.clitok,
 ItemXp: ItemID.clitok,
 ItemZm: ItemID.gotovka,
 ItemZp: ItemID.Gem,
 manaMax: 15000, 
 result: ItemID.poic1, 
 count: 1, 
 manaCount: 5000, 
});

this.ProRitualCraft({
 ItemXm: ItemID.clitok,
 ItemXp: ItemID.clitok,
 ItemZm: ItemID.Gem,
 ItemZp: ItemID.gotovka,
 manaMax: 15000, 
 result: ItemID.poic1, 
 count: 1, 
 manaCount: 5000, 
});

this.ProRitualCraft({
 ItemXm: ItemID.crystalearth,
 ItemXp: ItemID.crystalearth,
 ItemZm: ItemID.crystalLightning,
 ItemZp: ItemID.crystalLightning,
 manaMax: 10000, 
 result: ItemID.clitok, 
 count: 1, 
 manaCount: 10000, 
});

this.ProRitualCraft({
 ItemXm: ItemID.crystalLightning,
 ItemXp: ItemID.crystalLightning,
 ItemZm: ItemID.crystalearth,
 ItemZp: ItemID.crystalearth,
 manaMax: 10000, 
 result: ItemID.clitok, 
 count: 1, 
 manaCount: 10000, 
});
this.ProRitualCraft({
 ItemXm: ItemID.crystalfire,
 ItemXp: ItemID.crystalfire,
 ItemZm: ItemID.crystalearth,
 ItemZp: ItemID.crystalearth,
 manaMax: 20000, 
 result: ItemID.clitok1, 
 count: 1, 
 manaCount: 20000, 
});

this.ProRitualCraft({
 ItemXm: ItemID.crystalearth,
 ItemXp: ItemID.crystalearth,
 ItemZm: ItemID.crystalfire,
 ItemZp: ItemID.crystalfire,
 manaMax: 20000, 
 result: ItemID.clitok1, 
 count: 1, 
 manaCount: 20000, 
});

	if(this.data.charge == true){
		this.getSource();
		this.data.charge = false;
	}
	
	if (this.data.active === true){
		this.restart() ;
		this.data.active = false;
   this.data.manaC = 0;
	}
if (this.data.active2 === true){
		this.restart2() ;
		this.data.active2 = false;
   this.data.manaC2 = 0;
	}
	}
});



/*
rityal4 - ItemID.gotovka
rityal3 - ItemID.Gem
rityal2 - ItemID.clitok
*/






/*


var active = false;
var item = 0;
var manaC = 0;


var dungeon = {
ProRitualCraft: function (r){
	Callback.addCallback("tick", function () {
	if (World.getBlock(this.x-2, this.y-1, this.z).id === BlockID.rityal1){
if (World.getBlock(this.x, this.y-1, this.z).id === BlockID.ritualGL){
	if (World.getBlock(this.x+2, this.y-1, this.z).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z-2).id === BlockID.rityal1){
	if (World.getBlock(this.x, this.y-1, this.z+2).id === BlockID.rityal1){
		
	
		if(World.getTileEntity(this.x-2, this.y-1, this.z).data.item === r.ItemXm){
		if(World.getTileEntity(this.x+2, this.y-1, this.z).data.item === r.ItemXp){
		if(World.getTileEntity(this.x, this.y-1, this.z-2).data.item === r.ItemZm){
		if(World.getTileEntity(this.x, this.y-1, this.z+2).data.item === r.ItemZp){
if (mana >= r.manaMax){
			active = true;
				item = r.result;
manaC = r.manaCount;
mana-=manaC;
		 sound.play();
    Entity.spawn(this.x, this.y+1, this.z, 93);
    World.drop(this.x, this.y+1, this.z, item, r.count);
mana-=manaC;
World.getTileEntity(this.x-2, this.y-1, this.z).animationItem.destroy();
	World.getTileEntity(this.x-2, this.y-1, this.z).data.item = 0;

World.getTileEntity(this.x+2, this.y-1, this.z).animationItem.destroy();
	World.getTileEntity(this.x+2, this.y-1, this.z).data.item = 0;

World.getTileEntity(this.x, this.y-1, this.z+2).animationItem.destroy();
	World.getTileEntity(this.x, this.y-1, this.z+2).data.item = 0;

World.getTileEntity(this.x, this.y-1, this.z-2).animationItem.destroy();
	World.getTileEntity(this.x, this.y-1, this.z-2).data.item = 0;
 }
  
    }
		 }
		      }
	                }
	
	                     }
	                }
	          }
	     }
	}
if (active === true){
		active = false;
   manaC = 0;
	}
});
},
};

this.ProRitualCraft({
 ItemXm: ItemID.gotovka,
 ItemXp: ItemID.gotovka,
 ItemZm: ItemID.gotovka,
 ItemZp: ItemID.gotovka,
 manaMax: 5000,
 manaCount: 5000,
 result: 2,
 count: 1,
});


 



*/



IDRegistry.genBlockID("gubok1");
Block.createBlock("gubok1", [ {name: "Pedestal for Christalov", texture: [["nis", 0],["vverx1", 0], ["ctoronS", 0],["storonO", 0], ["storonM", 0], ["ctoronl", 0]],inCreative: true}]);

renderAPI.setCristalPidestal(BlockID.gubok1);

Translation.addTranslation("Pedestal for Christalov", {ru: "Пьедестал для криссталов"});

IDRegistry.genBlockID("gubok2");
Block.createBlock("gubok2", [ {name: "Cruster's growth controller", texture: [["nis", 0],["vverx1", 0], ["ctoronS", 0],["storonO", 0], ["storonM", 0], ["ctoronl", 0]], inCreative: true}]);

renderAPI.setGlblock1(BlockID.gubok2);

Translation.addTranslation("Cruster's growth controller", {ru: "Контроллер роста криссталов"});



TileEntity.registerPrototype(BlockID.gubok2, {
defaultValues: {
		progress: 0,
        random: 0
	},

proggres1: function (block, ran, prog, manaCount) {
if(mana!=manaCount && mana<<manaCount){
if (World.getBlock(this.x+2, this.y, this.z+2).id == BlockID.gubok1){
if (World.getBlock(this.x-2, this.y, this.z+2).id == BlockID.gubok1){
if (World.getBlock(this.x+2, this.y, this.z-2).id == BlockID.gubok1){
if (World.getBlock(this.x-2, this.y, this.z-2).id == BlockID.gubok1){


if (World.getBlock(this.x+2, this.y+1, this.z+2).id == block){
if (World.getBlock(this.x-2, this.y+1, this.z+2).id == block){
if (World.getBlock(this.x+2, this.y+1, this.z-2).id == block){
if (World.getBlock(this.x-2, this.y+1, this.z-2).id == block){
if (World.getBlock(this.x, this.y+1, this.z).id == 0){


if(this.data.progress<=prog){
this.data.progress++;
this.data.random==Math.random()*1;

ritualParticle.particle(this.x, this.y+0.9, this.z, 1);
ritualParticle.particle(this.x+2, this.y+0.9, this.z+2, 1);
ritualParticle.particle(this.x-2, this.y+0.9, this.z+2, 1);
ritualParticle.particle(this.x+2, this.y+0.9, this.z-2, 1);
ritualParticle.particle(this.x-2, this.y+0.9, this.z-2, 1);

ritual1.play();
mana-=manaCount;

if(this.data.random>=ran) {
Entity.spawn(this.x-15+Math.random()*30, this.y+1, this.z-15+Math.random()*30, 93);
} 

if (World.getBlock(this.x, this.y+1, this.z).id == 0){
if(this.data.progress>=prog){
World.setBlock(this.x, this.y+1, this.z, block, 0);

ritualParticle.ParticleType(Native.ParticleType.flame, this.x+Math.random(), this.y+1+Math.random(), this.z+Math.random(), 10);

this.data.progress-=prog;
} 
} 

}

} 
} 
} 
} 

} 
} 
} 
} 
}
}

}, 

tick: function (){
this.proggres1(BlockID.kristalFire, 0.3, 300, 5);
this.proggres1(BlockID.kristalwind, 0.3, 300, 5);
this.proggres1(BlockID.kristalLight, 0.3, 300, 5);
this.proggres1(BlockID.kristaldirt, 0.3, 300, 5);
	},

});

























// file: block/ritual/rune.js

var runeAltarDungeon = new UI.StandartWindow({
    standart: {
        header: {text: {text: "рунный алтарь/Rule Altar"}},
         inventory: {standart: true},
     
    },

    drawing: [
    ],

    elements: {
		"slotRes": {type: "slot", x: 630, y: 20, bitmap: "slot"},
		"slot2": {type: "slot", x: 530, y: 120, bitmap: "slot"},
		"slot3": {type: "slot", x: 430, y: 220, bitmap: "slot"},
		"slot4": {type: "slot", x: 530, y: 320, bitmap: "slot"},
		"slot5": {type: "slot", x: 730, y: 120, bitmap: "slot"},
		"slot6": {type: "slot", x: 830, y: 220, bitmap: "slot"},
		"slot7": {type: "slot", x: 730, y: 320, bitmap: "slot"},

		"slot1": {type: "slot", x: 630, y: 220, bitmap: "slot"}
    }
});




IDRegistry.genBlockID("runeAltarDungeon");
Block.createBlock("runeAltarDungeon", [ {name: "Rule Altar", texture: [["nis", 0],["vverx1", 0], ["ctoronS", 0],["storonO", 0], ["storonM", 0], ["ctoronl", 0]],inCreative: true}]);

Translation.addTranslation("Rule Altar", {ru: "рунный алтарь"});

Render.setRitualAltarRender(BlockID.runeAltarDungeon, true);

TileEntity.registerPrototype(BlockID.runeAltarDungeon, {
	defaultValues: {
		progress: 0
	},
init:function(){
		this.animationItem = new Animation.Item(this.x+.5, this.y+1.1, this.z+.5);
	},
	tick: function(){
		 var slotResult = this.container.getSlot("slotResult");
		
	   

			if(slotResult.id > 0){
				this.animationItem.describeItem({
			id: slotResult.id,
			count: 1,
			data: slotResult.data,
			size: 0.5,
			rotation:[3.14/2, 0, 0]
		});
		this.animationItem.load();
			}else {
				this.animationItem.destroy();
			}
		
	  
	   var slotSource1 = this.container.getSlot("slot1");
	    var slotSource2 = this.container.getSlot("slot2");
	    var slotSource3 = this.container.getSlot("slot3");
	    var slotSource4 = this.container.getSlot("slot4");
	    var slotSource5 = this.container.getSlot("slot5");
	    var slotSource6 = this.container.getSlot("slot6");
	    var slotSource7 = this.container.getSlot("slot7");
	    var slotResult = this.container.getSlot("slotRes");

		var input = [slotSource1, slotSource2, slotSource3, slotSource4, slotSource5, slotSource6, slotSource7];
		
        var output = dungeonRuneCtol.getAltarRecipe(input);
		
	   if (output){
		   this.data.progress++;
		   if (this.data.progress++ >= 40){
 slotSource1.count--;
 slotSource2.count--;
 slotSource3.count--;
 slotSource4.count--;
 slotSource5.count--;
 slotSource6.count--;
 slotSource7.count--;

 
 slotSource2.id = output.backItem1.id;
 slotSource5.id = output.backItem2.id;
 slotSource2.data = output.backItem1.data;
 slotSource5.data = output.backItem2.data;
 slotSource2.count += output.backItem1.count;
 slotSource5.count += output.backItem2.count;
 
 slotResult.id = output.Result.id;
 slotResult.data = output.Result.data;
 slotResult.count += output.Result.count;
  this.data.progress = 0;
		   }
	 }  
this.container.validateAll(); 

	},

	
	getGuiScreen: function(){
		return runeAltarDungeon; 
	}
	

});



/*
  R
 2 5
3 1 6
 4 7
*/
const empty = 0;


dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.manysript2, data: 0, count: 1},
	Source2: {id: ItemID.rune3, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.rune4, data: 0, count: 1},
	Source5: {id: ItemID.rune4, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.rune3, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.Scroll6, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.manysript2, data: 0, count: 1},
	Source2: {id: ItemID.rune4, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.rune4, data: 0, count: 1},
	Source5: {id: ItemID.rune4, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.rune4, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.Scroll1, data: 0, count: 1}, 
});
dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.manysript2, data: 0, count: 1},
	Source2: {id: ItemID.rune4, data: 0, count: 1},
	Source3: {id: ItemID.clitok, data: 0, count: 1},
	Source4: {id: ItemID.rune4, data: 0, count: 1},
	Source5: {id: ItemID.rune4, data: 0, count: 1},
	Source6: {id: ItemID.clitok, data: 0, count: 1},
	Source7: {id: ItemID.rune4, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.Scroll2, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.manysript2, data: 0, count: 1},
	Source2: {id: ItemID.rune1, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.rune1, data: 0, count: 1},
	Source5: {id: ItemID.rune1, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.rune1, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.Scroll4, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: BlockID.stone2, data: 0, count: 1},
	Source2: {id: ItemID.clitok1, data: 0, count: 1},
	Source3: {id: ItemID.koin_1, data: 0, count: 1},
	Source4: {id: ItemID.clitok1, data: 0, count: 1},
	Source5: {id: ItemID.clitok1, data: 0, count: 1},
	Source6: {id: ItemID.koin_1, data: 0, count: 1},
	Source7: {id: ItemID.clitok1, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: BlockID.altar, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.sword_2, data: 0, count: 1},
	Source2: {id: ItemID.clitok1, data: 0, count: 1},
	Source3: {id: ItemID.clitok, data: 0, count: 1},
	Source4: {id: 280, data: 0, count: 1},
	Source5: {id: ItemID.clitok1, data: 0, count: 1},
	Source6: {id: ItemID.clitok, data: 0, count: 1},
	Source7: {id: 280, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.sword_1, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.pickaxe_2, data: 0, count: 1},
	Source2: {id: ItemID.clitok1, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: 280, data: 0, count: 1},
	Source5: {id: ItemID.clitok1, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: 280, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.pickaxe_1, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.armor5, data: 0, count: 1},
	Source2: {id: ItemID.clitok1, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.clitok, data: 0, count: 1},
	Source5: {id: ItemID.clitok1, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.clitok, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.armor1, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.armor6, data: 0, count: 1},
	Source2: {id: ItemID.clitok1, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.clitok1, data: 0, count: 1},
	Source5: {id: ItemID.clitok1, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.clitok1, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.armor2, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.armor7, data: 0, count: 1},
	Source2: {id: ItemID.clitok1, data: 0, count: 1},
	Source3: {id: ItemID.clitok, data: 0, count: 1},
	Source4: {id: ItemID.clitok1, data: 0, count: 1},
	Source5: {id: ItemID.clitok1, data: 0, count: 1},
	Source6: {id: ItemID.clitok, data: 0, count: 1},
	Source7: {id: ItemID.clitok1, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.armor3, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: ItemID.armor8, data: 0, count: 1},
	Source2: {id: ItemID.clitok, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.clitok1, data: 0, count: 1},
	Source5: {id: ItemID.clitok, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.clitok1, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: ItemID.armor4, data: 0, count: 1}, 
});

dungeonRuneCtol.recipesAltarRecipe({
	Source1: {id: BlockID.rityal1, data: 0, count: 1},
	Source2: {id: ItemID.crystalLightning, data: 0, count: 1},
	Source3: {id: ItemID.clitok1, data: 0, count: 1},
	Source4: {id: ItemID.crystalearth, data: 0, count: 1},
	Source5: {id: ItemID.crystalWind, data: 0, count: 1},
	Source6: {id: ItemID.clitok1, data: 0, count: 1},
	Source7: {id: ItemID.crystalfire, data: 0, count: 1},

	
	backItem1: {id: empty, data: 0, count: 0},
	backItem2: {id: empty, data: 0, count: 0},
	
	Result: {id: BlockID.rityal, data: 0, count: 1}, 
});



























// file: block/key.js

IDRegistry.genBlockID("brickkey");
Block.createBlock("brickkey", [ {name: "brickkey", texture: [["brickBlock", 1],["brickBlock", 1],["keyBlock", 0],["keyBlock", 0],["brickBlock", 0]], inCreative: false}]);

Translation.addTranslation("brickkey", {ru: "блок с входом под ключ"});

Block.setDestroyTime(BlockID.brickkey, 9999999999999);

var renderChest = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(BlockID.brickkey, -1, renderChest); 
     var modelChest = BlockRenderer.createModel(); 
           renderChest.addEntry(modelChest);
modelChest.addBox (0/16, 0, 6/16, 16/16, 1, 10/16, BlockID.brickkey, 0);

IDRegistry.genBlockID("brick3");
Block.createBlock("brick3", [ {name: "brickkey2", texture: [["brickBlock", 1],["brickBlock", 1],["brick2", 0],["brick2", 0],["brickBlock", 0]], inCreative: false}]);

Block.setDestroyTime(BlockID.brick3, 9999999999999);

Translation.addTranslation("brickkey2", {ru: "тонкая стена"});

var renderChest2 = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(BlockID.brick3, -1, renderChest2); 
     var modelChest2 = BlockRenderer.createModel(); 
           renderChest2.addEntry(modelChest2);
modelChest2.addBox (0/16, 0, 6/16, 16/16, 1, 10/16, BlockID.brick3, 0);
/*
IDRegistry.genBlockID("brickkey4");
Block.createBlock("brick4", [ {name: "brickkey3", texture: [["brickBlock", 1],["brickBlock", 1],["brickBlock", 0],["brickBlock", 0],["brick2", 0]], inCreative: true}]);

Translation.addTranslation("brickkey3", {ru: "тонкая стена"});

var renderChest3 = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(BlockID.brickkey4, -1, renderChest3); 
     var modelChest3 = BlockRenderer.createModel(); 
           renderChest3.addEntry(modelChest3);
modelChest3.addBox (6/16, 0, 0/16, 10/16, 1, 16/16, BlockID.brickkey4, 0);




IDRegistry.genBlockID("brickkey5");
Block.createBlock("brickkey5", [ {name: "brickkey", texture: [["brickBlock", 1],["brickBlock", 1],["brickBlock", 0],["brickBlock", 0],["keyBlock", 0]], inCreative: true}]);

Translation.addTranslation("brickkey", {ru: "блок с входом под ключ"});

var renderChest5 = new ICRender.Model(); 
     BlockRenderer.setStaticICRender(BlockID.brickkey5, -1, renderChest5); 
     var modelChest5 = BlockRenderer.createModel(); 
           renderChest5.addEntry(modelChest5);
modelChest5.addBox (0/16, 0, 6/16, 16/16, 1, 10/16, BlockID.brickkey5, 0);
*/















// file: block/magisIndustrial/manaGenerator.js

IDRegistry.genBlockID("manaGenerator");
Block.createBlock("manaGenerator", [ {name: "mana Generator", texture: [["testV", 0]], inCreative: true}]);

Translation.addTranslation("mana Generator", {ru: "генератор маны"});

var manaParticle2 = Particles.registerParticleType({
 texture: "mana_par",
 render: 2,
 size:[5, 8],
 lifetime:[10, 40],
 animators: {
  alpha:{fadeIn: .4, fadeOut: .4},
  size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
 }
});

var manaGeneratorGui = new UI.StandartWindow({
    standart: {
        header: {text: {text: "рунный генератор"}},
         inventory: {standart: true},
     
    },

    drawing: [
	{type: "bitmap", x: 400, y: 100, bitmap: "mana_slace_0", scale: 4.2}, 
 {type: "bitmap", x: 600, y: 100, bitmap: "mana_slace_0", scale: 4.2}
    ],

    elements: {
    "progres": {type: "scale", x: 400, y: 100, direction: 1, bitmap: "mana_slace_1", scale: 4.2},
     "progres2": {type: "scale", x: 600, y: 100, direction: 1, bitmap: "mana_slace_1", scale: 4.2},
		"fuelSlot": {type: "slot", x: 500, y: 100, bitmap: "slot"}
    }
});

var FuelGeneratorMana = [];
var ManaGenerator = {
addFuel: function (id, data, time, mana) {
FuelGeneratorMana.push({id:id, data:data, time:time, mana:mana}) 
} 
};

ManaGenerator.addFuel(ItemID.clitok, 0, 500, 500);

TileEntity.registerPrototype(BlockID.manaGenerator, {

     defaultValues: {
      active: false, 
      progress: 0, 
      progressMax: 100,
      manaMax: 1,
      manaMin: 0
     },

init:function(){
		this.animationItem = new Animation.Item(this.x+.5, this.y+0.6, this.z+.5);
	},
     tick: function(){
let fuelSlot = this.container.getSlot("fuelSlot");
this.container.setScale("progres", this.data.progress / this.data.progressMax);
this.container.setScale("progres2", this.data.progress / this.data.progressMax);

for(i in FuelGeneratorMana) {

if(fuelSlot.id==FuelGeneratorMana[i].id){
if (fuelSlot.data==FuelGeneratorMana[i].data){
if(fuelSlot.count>=1){
if(this.data.active==false) {
fuelSlot.count--;
this.data.progressMax = FuelGeneratorMana[i].time;
this.data.manaMax = FuelGeneratorMana[i].mana;
this.data.active = true;
this.animationItem.describeItem({		
			id: FuelGeneratorMana[i].id,
			count: 1,
			data: FuelGeneratorMana[i].data,
			size: .5,
			rotation: [Math.PI / 4, 0, 0],
		});
this.animationItem.load();
if(fuelSlot.count<=0){
this.container.clearSlot("fuelSlot");
}
} 
} 
} 
} 
if(this.data.active==true) {
this.data.progress++;
var MA = 20000 - this.data.manaMin;
Particles.addFarParticle(manaParticle2, this.x+Math.random(), this.y+0.6+Math.random(), this.z+Math.random(), 0, Math.random(), 0, 0);
if(mana<=MA) {
mana+=this.data.manaMin;
if(this.data.manaMax<=FuelGeneratorMana[i].mana) {
this.data.manaMin++;
} 
} 

if (this.data.progress >= this.data.progressMax){
this.drop();
} 
} 


} 

if(this.data.active==false) {
if(this.data.manaMin>0) {
this.data.manaMin--;
} 
} 
     },

drop: function () {
this.data.progress = 0;
this.data.active = false;
this.animationItem.load();
this.animationItem.destroy();
}, 

    

     click: function(id, count, data, coords){
Game.message("mana: " + this.data.manaMin);
     }, 
getGuiScreen: function(){
		return manaGeneratorGui; 
	}, 
});

renderAPI.ManaGenerator(BlockID.manaGenerator);























































// file: block/magisIndustrial/storageMana.js

IDRegistry.genBlockID("manaStorage");
Block.createBlock("manaStorage", [ {name: "mana Storage", texture: [["brick2", 0]], inCreative: true}]);

Translation.addTranslation("mana Storage", {ru: "хранилище маны"});

var Particles = ModAPI.requireGlobal("Particles");
var manaParticle = Particles.registerParticleType({
 texture: "mana",
 render: 2,
 size:[1, 3],
 lifetime:[10, 40],
 animators: {
  alpha:{fadeIn: .4, fadeOut: .4},
  size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
 }
});
TileEntity.registerPrototype(BlockID.manaStorage, {

     defaultValues: {
      manaStorage: 0
     },

     tick: function(){
         if(mana>=19999){
             if(this.data.manaStorage<=19999){
                 mana--;
                 this.data.manaStorage++;
             }
         }
         if(mana<=19997){
             if(this.data.manaStorage>=1){
                 mana++;

Particles.addFarParticle(manaParticle, this.x+Math.random(), this.y+0.6+Math.random(), this.z+Math.random(), Math.random()-Math.random(), Math.random(), Math.random()-Math.random(), 0);
                 this.data.manaStorage--;
             }
         }
     },

    

     click: function(id, count, data, coords){
Game.message("mana: " + this.data.manaStorage + ";");

     }, 

destroyBlock: function(coords, player){

          

     },
});

var mesh2 = new RenderMesh();
var renderAPI2 = new ICRender.Model(); 
BlockRenderer.setStaticICRender(BlockID.manaStorage, -1, renderAPI2); 
var modelAPI2 = new BlockRenderer.Model(mesh2);  

           renderAPI2.addEntry(modelAPI2);
mesh2.importFromFile(__dir__ + "/res/model/magis_storage.obj", "obj", null);
mesh2.setBlockTexture("block", 0);


















// file: Wood.js

function setWood(coords){

dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Foliage,
    cubeData: 0,
});
dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Foliage,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 5,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Foliage,
    cubeData: 0,
});
World.setBlock(coords.x, coords.y, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x, coords.y+2, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x, coords.y+3, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x, coords.y+4, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x, coords.y+5, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x, coords.y+6, coords.z, BlockID.Breastya, 0);
World.setBlock(coords.x+1, coords.y+6, coords.z, BlockID.Foliage, 0);
World.setBlock(coords.x-1, coords.y+6, coords.z, BlockID.Foliage, 0);
World.setBlock(coords.x, coords.y+6, coords.z+1, BlockID.Foliage, 0);
World.setBlock(coords.x, coords.y+6, coords.z-1, BlockID.Foliage, 0);
World.setBlock(coords.x, coords.y+7, coords.z, BlockID.Foliage, 0);
World.setBlock(coords.x+1, coords.y+7, coords.z, BlockID.Foliage, 0);
World.setBlock(coords.x-1, coords.y+7, coords.z, BlockID.Foliage, 0);
World.setBlock(coords.x, coords.y+7, coords.z+1, BlockID.Foliage, 0);
World.setBlock(coords.x, coords.y+7, coords.z-1, BlockID.Foliage, 0);
}
Callback.addCallback("ItemUse", function(coords, item){ 

if(item.id == 351 && item.data == 15){ 
if(World.getBlock(coords.x, coords.y, coords.z).id== BlockID.sap){
setWood(coords);
} 
} 
});
TileEntity.registerPrototype(BlockID.sap, {

     defaultValues: {

          

     },


     tick: function(){
        if(Math.random() * 1000 < 1){
setWood(this);
}
     },
});












// file: item/Placte.js

IDRegistry.genItemID("godcol"); 
Item.createItem("godcol", "Record of the sun god", {name: "godcol", meta: 0}, {stack: 1});

Translation.addTranslation("Record of the sun god", {ru: "пластинка Бога"});

IDRegistry.genItemID("GlasPlacte"); 
Item.createItem("GlasPlacte", "Evil Plate", {name: "GlasPlacte", meta: 0}, {stack: 1});

Translation.addTranslation("Evil Plate", {ru: "пластинка нечести"});

IDRegistry.genItemID("AngelPlate"); 
Item.createItem("AngelPlate", "angel record", {name: "AngelPlate", meta: 0}, {stack: 1});

Translation.addTranslation("angel record", {ru: "пластинка рая"});

Item.addCreativeGroup("plate", Translation.translate("Plate"), [
	ItemID.godcol,
	ItemID.GlasPlacte,
  ItemID.AngelPlate, 
]);

Callback.addCallback("ItemUse", function(coords, item){ 

if (item.id== ItemID.godcol){
if(World.getBlockID(coords.x , coords.y, coords.z)==84){
World.setBlock(coords.x, coords.y, coords.z, BlockID.player3, 0);
	raiFinal.play();
Player.decreaseCarriedItem()
Game.tipMessage("§2сейчас играет §3Рай Финал");
} 
	} 
});

Callback.addCallback("ItemUse", function(coords, item){ 

if (item.id== ItemID.GlasPlacte){
if(World.getBlockID(coords.x , coords.y, coords.z)==84){
World.setBlock(coords.x, coords.y, coords.z, BlockID.player1, 0);
	boss1.play();
Player.decreaseCarriedItem()
Game.tipMessage("играет музыка §3босс живая не честь");
} 
	} 
	});
	

Callback.addCallback("ItemUse", function(coords, item){ 


if (item.id== ItemID.AngelPlate){
if(World.getBlockID(coords.x , coords.y, coords.z)==84){
World.setBlock(coords.x, coords.y, coords.z, BlockID.player2, 0);
	angel.play();
Player.decreaseCarriedItem()
Game.tipMessage("играет музыка §3хранитель небес");
} 
	} 
	});




// file: item/ItemsRegister.js

IDRegistry.genItemID("manysript1"); 
Item.createItem("manysript1", "Manuscript", {name: "manysript", meta: 0}, {stack: 1});

Translation.addTranslation("Manuscript", {ru: "манускрипт"});

IDRegistry.genItemID("manysript2"); 
Item.createItem("manysript2", "Manuscript Knowledge: Basics", {name: "manysript", meta: 0}, {stack: 1});

Translation.addTranslation("Manuscript Knowledge: Basics", {ru: "манускрипт знание: основы"});

Item.setGlint(ItemID.manysript2, true);


IDRegistry.genItemID("rune0"); 
Item.createItem("rune0", "Empty rune", {name: "rune", meta: 0}, {stack: 1});

Translation.addTranslation("Empty rune", {ru: "пустая руна"});

IDRegistry.genItemID("rune1"); 
Item.createItem("rune1", "fire rune", {name: "rune", meta: 1}, {stack: 1});

Translation.addTranslation("fire rune", {ru: "руна огня"});

Item.setGlint(ItemID.rune1, true);

IDRegistry.genItemID("rune2"); 
Item.createItem("rune2", "Earth rune", {name: "rune", meta: 2}, {stack: 1});

Translation.addTranslation("Earth rune", {ru: "руна земли"});

Item.setGlint(ItemID.rune2, true);

IDRegistry.genItemID("rune3"); 
Item.createItem("rune3", "Wind rune", {name: "rune", meta: 3}, {stack: 1});

Translation.addTranslation("Wind rune", {ru: "руна ветра"});

Item.setGlint(ItemID.rune3, true);

IDRegistry.genItemID("rune4"); 
Item.createItem("rune4", "The rune of light", {name: "rune", meta: 4}, {stack: 1});

Translation.addTranslation("The rune of light", {ru: "руна света"});

Item.setGlint(ItemID.rune4, true);

Item.addCreativeGroup("rune", Translation.translate("Rune"), [
	ItemID.rune0,
	ItemID.rune1,
	ItemID.rune2,
	ItemID.rune3,
 ItemID.rune4, 
 ItemID.RuneDarkness, 
]);

IDRegistry.genItemID("sapling10"); 
Item.createItem("sapling10", "sapling", {name: "sapling", meta: 0}, {stack: 64});

Translation.addTranslation("sapling", {ru: "саженец"});

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.sapling10){
if(World.getBlock(coords.x, coords.y+1, coords.z).id== 0){
 if(World.getBlock(coords.x, coords.y, coords.z).id!= BlockID.rityal1){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.sap, 0);
Player.decreaseCarriedItem()
} 
} 
	} 
	});

IDRegistry.genItemID("magis_book"); 
Item.createItem("magis_book", "magis book", {name: "magis_book", meta: 0}, {stack: 1});

Translation.addTranslation("magis book", {ru: "книга магии"});
//Item.setMaxDamage(ItemID.craftingHammer, 80););

Item.setGlint(ItemID.magis_book, true);

IDRegistry.genItemID("Berries"); 
Item.createFoodItem("Berries", "Berries", {name: "Berries", meta: 0}, {stack: 64, food: 2});

Translation.addTranslation("Berries", {ru: "ягоды"});

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.Berries){

World.setBlock(coords.x, coords.y+1, coords.z, BlockID.a0, 0);
Player.decreaseCarriedItem()
//World.addTileEntity(coords.x, coords.y+1, coords.z);
	} 
	});

IDRegistry.genItemID("crystalfire"); 
Item.createItem("crystalfire", "crystal fire", {name: "crystalfire", meta: 0}, {stack: 1});

Translation.addTranslation("crystal fire", {ru: "крисстал огня"});

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.crystalfire){
if(World.getBlock(coords.x, coords.y+1, coords.z).id== 0){
if(World.getBlock(coords.x, coords.y, coords.z).id!= BlockID.rityal1){
if(Entity.getSneaking(Player.get()) == true){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristalFire, 0);
Player.decreaseCarriedItem()
} 
} 
} 
	} 
	});


IDRegistry.genItemID("crystalearth"); 
Item.createItem("crystalearth", "crystal earth", {name: "crystalearth", meta: 0}, {stack: 1});

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.crystalearth){
if(World.getBlock(coords.x, coords.y+1, coords.z).id== 0){
if(World.getBlock(coords.x, coords.y, coords.z).id!= BlockID.rityal1){
if(Entity.getSneaking(Player.get()) == true){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristaldirt, 0);
Player.decreaseCarriedItem()
}
} 
} 
	} 
	});

Translation.addTranslation("crystal earth", {ru: "крисстал земли"});

IDRegistry.genItemID("crystalWind"); 
Item.createItem("crystalWind", "crystal Wind", {name: "crystalWind", meta: 0}, {stack: 1});

Translation.addTranslation("crystal Wind", {ru: "крисстал ветра"});

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.crystalWind){
if(Entity.getSneaking(Player.get()) == true){
if(World.getBlock(coords.x, coords.y+1, coords.z).id== 0){
if(World.getBlock(coords.x, coords.y, coords.z).id!= BlockID.rityal1){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristalwind, 0);
Player.decreaseCarriedItem()
} 
} 
} 
	} 
	});

IDRegistry.genItemID("crystalLightning"); 
Item.createItem("crystalLightning", "crystal Lightning", {name: "crystalLightning", meta: 0}, {stack: 1});
Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.crystalLightning){
if(Entity.getSneaking(Player.get()) == true){
if(World.getBlock(coords.x, coords.y+1, coords.z).id== 0){
if(World.getBlock(coords.x, coords.y, coords.z).id!= BlockID.rityal1){
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.kristalLight, 0);
Player.decreaseCarriedItem()
} 
} 
} 
	} 
	});
Translation.addTranslation("crystal Lightning", {ru: "крисстал молнии"});

Item.addCreativeGroup("crystal", Translation.translate("Crystal"), [
	ItemID.crystalfire,
	ItemID.crystalearth,
	ItemID.crystalWind,
	ItemID.crystalLightning,
]);

IDRegistry.genItemID("ring"); 
Item.createItem("ring", "ring", {name: "ring", meta: 0}, {stack: 1});

Translation.addTranslation("ring", {ru: "кольцо с драгоценным камнем"});

IDRegistry.genItemID("Gem"); 
Item.createItem("Gem", "Gem", {name: "Gem", meta: 0}, {stack: 1});

Translation.addTranslation("Gem", {ru: "камень перемещения"});



IDRegistry.genItemID("GemEarth"); 
Item.createItem("GemEarth", "Gem Earth", {name: "GemEarth", meta: 0}, {stack: 1});

Translation.addTranslation("Gem Earth", {ru: "камень перемещения"});

IDRegistry.genItemID("Gem2"); 
Item.createItem("Gem2", "Gem", {name: "Gem", meta: 0}, {stack: 1});

Translation.addTranslation("Gem", {ru: "камень перемещения"});

Item.setGlint(ItemID.Gem2, true);

IDRegistry.genItemID("GemEarth2"); 
Item.createItem("GemEarth2", "Gem Earth", {name: "GemEarth", meta: 0}, {stack: 1});

Translation.addTranslation("Gem Earth", {ru: "камень перемещения"});

Item.setGlint(ItemID.GemEarth2, true);

Item.addCreativeGroup("gem", Translation.translate("Gem"), [
	ItemID.Gem,
	ItemID.GemEarth,
	ItemID.Gem2,
	ItemID.GemEarth2,
]);

IDRegistry.genItemID("glas"); 
Item.createItem("glas", "glas", {name: "glas", meta: 0}, {stack: 16});

Translation.addTranslation("glas", {ru: "глаз нежити"});

IDRegistry.genItemID("poic1"); 
Item.createItem("poic1", "Search for a flight", {name: "poic", meta: 0}, {stack: 1});

Translation.addTranslation("Search for a flight", {ru: "пояс полёта"});



IDRegistry.genItemID("amylet"); 
Item.createItem("amylet", "Breathing the breath", {name: "amylet", meta: 0}, {stack: 1});

Translation.addTranslation("Breathing the breath", {ru: "амулет дыхания"});

IDRegistry.genItemID("clitok"); 
Item.createItem("clitok", "Divine ingot", {name: "clitok", meta: 0}, {stack: 64});

Translation.addTranslation("Divine ingot", {ru: "божественый слиток"});

IDRegistry.genItemID("clitok1"); 
Item.createItem("clitok1", "Fur ingot", {name: "clitok", meta: 1}, {stack: 64});

Item.addCreativeGroup("ingot", Translation.translate("Ingot"), [
	ItemID.clitok,
	ItemID.clitok1,
]);

Translation.addTranslation("Fur ingot", {ru: "слиток огня"});

IDRegistry.genItemID("gotovka"); 
Item.createItem("gotovka", "Preparation", {name: "gotovka", meta: 0}, {stack: 1});

Translation.addTranslation("Preparation", {ru: "заготовка"});

IDRegistry.genItemID("item"); 
Item.createItem("item", "ritual activator", {name: "item", meta: 0}, {stack: 1});

Translation.addTranslation("ritual activator", {ru: "ритуальный активатор"});

var maxMana = 20000;

Item.registerUseFunction("item", function(coords, item, block)
{
Game.message("mana: " + mana + "/" + maxMana + ";");
});
/*
IDRegistry.genItemID("Grenade"); 
Item.createItem("Grenade", "Grenade", {name: "Grenade", meta: 0}, {stack: 1});

Translation.addTranslation("Grenade", {ru: "граната"});

Item.registerThrowableFunction("Grenade", 
function(projectile, item, target){
if(target.entity == -1){} else {
var targetEntity = target.entity;
var coords = Entity.getPosition(targetEntity);
Entity.damageEntity(targetEntity, 10);

Entity.spawn(coords.x, coords.y, coords.z, 65);


} 
});

IDRegistry.genItemID("ryneClone1");
Item.createThrowableItem("ryneClone1", "ryne Clone", {name: "ryneClone", meta: 0}, {enchant: {value: 1, type: 1}});

IDRegistry.genItemID("ryneClone2");
Item.createThrowableItem("ryneClone2", "ryne Clone", {name: "ryneClone", meta: 1}, {enchant: {value: 1, type: 1}});

IDRegistry.genItemID("ryneClone3");
Item.createThrowableItem("ryneClone3", "ryne Clone", {name: "ryneClone", meta: 2}, {enchant: {value: 1, type: 1}});

IDRegistry.genItemID("ryneClone4");
Item.createThrowableItem("ryneClone4", "ryne Clone", {name: "ryneClone", meta: 3}, {enchant: {value: 1, type: 1}});

Translation.addTranslation("ryne Clone", {ru: "руна клонирование"});
*/
IDRegistry.genItemID("bookxp"); 
Item.createItem("bookxp", "book xp", {name: "book_xp", meta: 0}, {stack: 64});

Item.registerUseFunction("bookxp", function(coords, item, block)
{
Player.decreaseCarriedItem();
Player.addLevel(10);
} 
);

Translation.addTranslation("book xp", {ru: "книга опыта"});

Item.setGlint(ItemID.bookxp, true);

IDRegistry.genItemID("koin_1"); 
Item.createItem("koin_1", "gold coin", {name: "koin", meta: 1}, {stack: 64});

Translation.addTranslation("gold coin", {ru: "золотая монета"});
Item.setGlint(ItemID.koin_1, true);


IDRegistry.genItemID("koin_0"); 
Item.createItem("koin_0", "Silver coin", {name: "koin", meta: 0}, {stack: 64});

Item.addCreativeGroup("koin", Translation.translate("Koin"), [
	ItemID.koin_0,
	ItemID.koin_1,
]);

Translation.addTranslation("Silver coin", {ru: "серебреная монета"});





























































// file: item/BaublesRegister.js


const searchItem = function (id, data) {
 var dat = data || -1;
 var od = id || -1;
	for(var i = 0;i < 9;i++) {
	 var item = Player.getInventorySlot(i);
		if((item.id == od || (od == -1 && item.id != 0)) && (item.data == dat || dat == -1)){
			return {
			    id: item.id,
			    data: item.data,
			    extra: item.extra,
			    count: item.count,
			    slot: i
			}
		}
	}
};

Callback.addCallback("tick", function () {

if(searchItem(ItemID.poic1)){
let flying = Player.getFlying();
		let velocity = Player.getVelocity();
        if (mana >= 1){
			Player.setFlyingEnabled(true);
		}
		if (mana >= 1){
			mana--;
		}
		if (mana < 1){
			Player.setFlyingEnabled(false);
						Player.setVelocity(velocity.x, -0.1, velocity.z);
		}
}
if(!searchItem(ItemID.poic1)){
if(Game.getGameMode()==0){
Player.setFlyingEnabled(false);
}
if(Game.getGameMode()==1){
Player.setFlyingEnabled(true);
}
}
  
if(searchItem(ItemID.amylet)){
if(mana >= 1){
Entity.addEffect(Player.get(), Native.PotionEffect.waterBreathing, 20, 20, false, false)
mana-=1;
}
}
if(!searchItem(ItemID.amylet)){
Entity.clearEffect(Player.get(), 13);
}
});





// file: item/armor.js

IDRegistry.genItemID("armor1");
Item.createArmorItem("armor1", "Fire helmet" , {name: "armor_fire", meta: 4}, {type: "helmet", armor: 7, durability: 6993, texture: "armor/armor1.png"}); 

Translation.addTranslation("Fire helmet", {ru: "огненый шлем"});

IDRegistry.genItemID("armor2");
Item.createArmorItem("armor2" , "fire chestplate", {name: "armor_fire", meta: 3}, {type: "chestplate", armor: 10, durability: 9102, texture: "armor/armor1.png"}); 

Translation.addTranslation("fire chestplate", {ru: "огненный нагрудник"});

IDRegistry.genItemID("armor3");
Item.createArmorItem("armor3", "fire leggings", {name: "armor_fire", meta: 2}, {type: "leggings", armor: 9, durability: 8103, texture: "armor/armor2.png"});

Translation.addTranslation("fire leggings", {ru: "огненные поножи"});

IDRegistry.genItemID("armor4");
Item.createArmorItem("armor4", "fire boots", {name: "armor_fire", meta: 1}, {type: "boots", armor: 6, durability: 6438, texture: "armor/armor1.png"});

Translation.addTranslation("fire boots", {ru: "огненые ботинки"});

IDRegistry.genItemID("armor5");
Item.createArmorItem("armor5", "Divine helmet" , {name: "armor", meta: 1}, {type: "helmet", armor: 5, durability: 2775, texture: "armor/armor4.png"}); 

Translation.addTranslation("Divine helmet", {ru: "божественый шлем"});

IDRegistry.genItemID("armor6");
Item.createArmorItem("armor6" , "Divine chestplate", {name: "armor", meta: 2}, {type: "chestplate", armor: 8, durability: 4440, texture: "armor/armor4.png"}); 

Translation.addTranslation("Divine chestplate", {ru: "божественый нагрудник"});

IDRegistry.genItemID("armor7");
Item.createArmorItem("armor7", "Divine leggings", {name: "armor", meta: 3}, {type: "leggings", armor: 7, durability: 3885, texture: "armor/armor3.png"});

Translation.addTranslation("Divine leggings", {ru: "божественые поножи"});

IDRegistry.genItemID("armor8");
Item.createArmorItem("armor8", "Divine boots", {name: "armor", meta: 4}, {type: "boots", armor: 4, durability: 2220, texture: "armor/armor4.png"});

Translation.addTranslation("Divine boots", {ru: "божественый ботинки"});

/*
Callback.addCallback("tick", function(){
    if(Player.getArmorSlot(0) === ItemID.armor1){
        if(Player.getArmorSlot(1) === ItemID.armor2){
            if(Player.getArmorSlot(2) === ItemID.armor3){
                if(Player.getArmorSlot(3) === ItemID.armor4){
                    Entity.addEffect(Player.get(), 12, 20, 20, false, false);
                } 
            } 
        }
    }
});
*/

Item.addCreativeGroup("helmet", Translation.translate("Helmet"), [
	ItemID.armor1,
	ItemID.armor5,
]);
Item.addCreativeGroup("chestplate", Translation.translate("Chestplate"), [
	ItemID.armor2,
	ItemID.armor6,
]);
Item.addCreativeGroup("leggings", Translation.translate("Leggings"), [
	ItemID.armor3,
	ItemID.armor7,
]);
Item.addCreativeGroup("boots", Translation.translate("Boots"), [
	ItemID.armor4,
	ItemID.armor8,
]);

Item.setEnchantType(ItemID.armor1, Native.EnchantType.helmet, 14);

Item.setEnchantType(ItemID.armor2, Native.EnchantType.chestplate, 14);

Item.setEnchantType(ItemID.armor3, Native.EnchantType.leggings, 14);

Item.setEnchantType(ItemID.armor4, Native.EnchantType.boots, 14);

Item.setEnchantType(ItemID.armor5, Native.EnchantType.helmet, 14);

Item.setEnchantType(ItemID.armor6, Native.EnchantType.chestplate, 14);

Item.setEnchantType(ItemID.armor7, Native.EnchantType.leggings, 14);

Item.setEnchantType(ItemID.armor8, Native.EnchantType.boots, 14);

Item.addRepairItemIds(ItemID.armor1, [ItemID.clitok1]);

Item.addRepairItemIds(ItemID.armor2, [ItemID.clitok1]);

Item.addRepairItemIds(ItemID.armor3, [ItemID.clitok1]);

Item.addRepairItemIds(ItemID.armor4, [ItemID.clitok1]);

Item.addRepairItemIds(ItemID.armor5, [ItemID.clitok]);

Item.addRepairItemIds(ItemID.armor6, [ItemID.clitok]);

Item.addRepairItemIds(ItemID.armor7, [ItemID.clitok]);

Item.addRepairItemIds(ItemID.armor8, [ItemID.clitok]);

























// file: item/инструменты_огня.js

IDRegistry.genItemID("sword_1"); 
Item.createItem("sword_1", "The sword of fire", {name: "sword_1", meta: 0}, {stack: 1});

Translation.addTranslation("The sword of fire", {ru: "меч огня"});

Item.setEnchantType(ItemID.sword_1, Native.EnchantType.weapon, 14);

Item.addRepairItemIds(ItemID.sword_1, [ItemID.clitok1]);

IDRegistry.genItemID("pickaxe_1"); 
Item.createItem("pickaxe_1", "pickaxe Fire", {name: "pickaxe_1", meta: 0}, {stack: 1});

Item.setEnchantType(ItemID.pickaxe_1, Native.EnchantType.pickaxe, 14);

Translation.addTranslation("pickaxe Fire", {ru: "кирка огня"});

Item.addRepairItemIds(ItemID.pickaxe_1, [ItemID.clitok1]);

IDRegistry.genItemID("sword_2");
Item.createItem("sword_2", "The sword of God", {name: "sword2", meta: 0}, {stack: 1});

Item.addRepairItemIds(ItemID.sword_2, [ItemID.clitok]);

var godSword = new RenderMesh(__dir__ + "/res/model/sword_god.obj","obj");
ItemModel.getFor(ItemID.sword_2, 0).setHandModel(godSword, "3dItem/3d_god_sword")


Translation.addTranslation("The sword of God", {ru: "меч бога"});

Item.setEnchantType(ItemID.sword_2, Native.EnchantType.weapon, 14);

IDRegistry.genItemID("pickaxe_2"); Item.createItem("pickaxe_2", "pickaxe of God", {name: "kirka", meta: 0}, {stack: 1});

Item.addRepairItemIds(ItemID.sword_2, [ItemID.clitok]);

Item.addRepairItemIds(ItemID.pickaxe_2, [ItemID.clitok]);

Translation.addTranslation("pickaxe of God", {ru: "Кирка бога"});

Item.addCreativeGroup("sword", Translation.translate("Sword"), [
	ItemID.sword_1,
	ItemID.sword_2,
]);
Item.addCreativeGroup("pickaxe", Translation.translate("Pickaxe"), [
	ItemID.pickaxe_1,
	ItemID.pickaxe_2,
]);

ToolAPI.addToolMaterial("fire", {
    durability: 4440,
    level: 4,
    efficiency: 18,
    damage: 10,
    enchantability: 14
});



ToolAPI.addToolMaterial("god", {
    durability: 2220,
    level: 5,
    efficiency: 6,
    damage: 6,
    enchantability: 14
});

ToolAPI.setTool(ItemID["sword_1"], "fire", ToolType.sword);

ToolAPI.setTool(ItemID["sword_2"], "god", ToolType.sword);

ToolAPI.setTool(ItemID["pickaxe_1"], "fire", ToolType.pickaxe);

ToolAPI.setTool(ItemID["pickaxe_2"], "god", ToolType.pickaxe);




Item.registerUseFunction("sword_1", function(coords, item, block)
{
if(World.getBlockID(coords.x, coords.y + 1, coords.z)==0){
World.setBlock(coords.x, coords.y + 1, coords.z, 51, 0);
}
}
);

Callback.addCallback("PlayerAttack", function (player, victim) { 
var item = Player.getCarriedItem();
if(item.id==ItemID.sword_1){
Entity.setFire(victim, 80, true);
} 
});

Callback.addCallback("PlayerAttack", function (player, victim) { 
var item = Player.getCarriedItem();
if(item.id==ItemID.sword_2){
var random = Math.random() * 1;
if(random <= 0.1){
var entity = victim;
var coords = Entity.getPosition(victim);
Entity.spawn(coords.x, coords.y, coords.z, 93);
World.playSoundAtEntity(entity, "ambient.weather.thunder", 50);
Entity.damageEntity(entity, 20);
}
} 
});


















// file: item/Scroll/Scroll.js

IDRegistry.genItemID("Scroll6"); 
Item.createItem("Scroll6", "Svic of the clear day", {name: "Scroll", meta: 6}, {stack: 1});

Translation.addTranslation("Svic of the clear day", {ru: "свиток ясного дня"});

Item.registerUseFunction("Scroll6", function(coords, item, block)
{
if(mana>=2000){
mana-=2000;
World.setWeather(1);
sound.play();
}
}
);











// file: item/Scroll/Scroll2.js

IDRegistry.genItemID("Scroll2"); 
Item.createItem("Scroll2", "Milk scroll", {name: "Scroll", meta: 2}, {stack: 1});

Translation.addTranslation("Milk scroll", {ru: "свиток мрака"});

Item.registerUseFunction("Scroll2", function(coords, item, block)
{
if(mana>=2000){
mana-=2000;
World.setWorldTime(15000);
sound.play();
} 
}
);













// file: item/Scroll/Scroll4.js

let fire = {
    set: function (x, y, z, id, data){
        if(World.getBlock(x, y, z).id==0){
            if(World.getBlock(x, y-1, z).id>=0){
            World.setBlock(x, y, z, id, data);
            }
        }
    }, 
};

IDRegistry.genItemID("Scroll4"); 
Item.createItem("Scroll4", "scroll of fire", {name: "Scroll", meta: 3}, {stack: 1});

Translation.addTranslation("scroll of fire", {ru: "свиток огня"});

Item.registerUseFunction("Scroll4", function(coords, item, block)
{
if(mana>=50){
mana-=50;
Entity.addEffect(Player.get(), Native.PotionEffect.fireResistance, 1, 1000);

fire.set(coords.x, coords.y+1, coords.z, 51, 0);
fire.set(coords.x+1, coords.y+1, coords.z, 51, 0);
fire.set(coords.x-1, coords.y+1, coords.z, 51, 0);

fire.set(coords.x, coords.y+1, coords.z+1, 51, 0);
fire.set(coords.x+1, coords.y+1, coords.z+1, 51, 0);
fire.set(coords.x-1, coords.y+1, coords.z+1, 51, 0);

fire.set(coords.x, coords.y+1, coords.z-1, 51, 0);
fire.set(coords.x+1, coords.y+1, coords.z-1, 51, 0);
fire.set(coords.x-1, coords.y+1, coords.z-1, 51, 0);


fire.set(coords.x, coords.y, coords.z, 51, 0);
fire.set(coords.x+1, coords.y, coords.z, 51, 0);
fire.set(coords.x-1, coords.y, coords.z, 51, 0);

fire.set(coords.x, coords.y, coords.z+1, 51, 0);
fire.set(coords.x+1, coords.y, coords.z+1, 51, 0);
fire.set(coords.x-1, coords.y, coords.z+1, 51, 0);

fire.set(coords.x, coords.y, coords.z-1, 51, 0);
fire.set(coords.x+1, coords.y, coords.z-1, 51, 0);
fire.set(coords.x-1, coords.y, coords.z-1, 51, 0);

fire.set(coords.x, coords.y+2, coords.z, 51, 0);
fire.set(coords.x+1, coords.y+2, coords.z, 51, 0);
fire.set(coords.x-1, coords.y+2, coords.z, 51, 0);

fire.set(coords.x, coords.y+2, coords.z+1, 51, 0);
fire.set(coords.x+1, coords.y+2, coords.z+1, 51, 0);
fire.set(coords.x-1, coords.y+2, coords.z+1, 51, 0);

fire.set(coords.x, coords.y+1, coords.z-1, 51, 0);
fire.set(coords.x+1, coords.y+1, coords.z-1, 51, 0);
fire.set(coords.x-1, coords.y+1, coords.z-1, 51, 0);




sound.play();
}
}
);

Item.addCreativeGroup("sroll", Translation.translate("Sroll"), [
	ItemID.Scroll6,
 ItemID.Scroll2, 
 ItemID.Scroll4, 
 ItemID.Scroll1,
]);
















// file: item/Scroll/Scroll_mining.js

/*

IDRegistry.genItemID("Scroll_mining"); 
Item.createItem("Scroll_mining", "Scroll_mining", {name: "Scroll_mining", meta: 0}, {stack: 1});

var effect = false;
var cvitokw = new Timer('cvitokw');

Translation.addTranslation("Scroll_mining", {ru: "свиток шахтера"});

Item.registerUseFunction("Scroll_mining", function(coords, item, block)
{
if(effect==false){
if(mana>=0){
mana-=0;
Game.message("свиток активирован");
sound.play();
effect = true;
cvitokw.start();


} 


}
if(effect==true){

World.destroyBlock(coords.x, coords.y, coords.z, true);
World.destroyBlock(coords.x + 1, coords.y, coords.z, true);
World.destroyBlock(coords.x - 1, coords.y, coords.z, true);
World.destroyBlock(coords.x, coords.y, coords.z + 1, true);
World.destroyBlock(coords.x, coords.y, coords.z - 1, true);
World.destroyBlock(coords.x + 1, coords.y, coords.z + 1, true);
World.destroyBlock(coords.x - 1, coords.y, coords.z + 1, true);
World.destroyBlock(coords.x + 1, coords.y, coords.z - 1, true);
World.destroyBlock(coords.x - 1, coords.y, coords.z - 1, true);

World.destroyBlock(coords.x, coords.y - 1, coords.z, true);
World.destroyBlock(coords.x + 1, coords.y - 1, coords.z, true);
World.destroyBlock(coords.x - 1, coords.y - 1, coords.z, true);
World.destroyBlock(coords.x, coords.y - 1, coords.z + 1, true);
World.destroyBlock(coords.x, coords.y - 1, coords.z - 1, true);
World.destroyBlock(coords.x + 1, coords.y - 1, coords.z + 1, true);
World.destroyBlock(coords.x - 1, coords.y - 1, coords.z + 1, true);
World.destroyBlock(coords.x + 1, coords.y - 1, coords.z - 1, true);
World.destroyBlock(coords.x - 1, coords.y - 1, coords.z - 1, true);

World.destroyBlock(coords.x, coords.y + 1, coords.z, true);
World.destroyBlock(coords.x + 1, coords.y + 1, coords.z, true);
World.destroyBlock(coords.x - 1, coords.y + 1, coords.z, true);
World.destroyBlock(coords.x, coords.y + 1, coords.z + 1, true);
World.destroyBlock(coords.x, coords.y + 1, coords.z - 1, true);
World.destroyBlock(coords.x + 1, coords.y + 1, coords.z + 1, true);
World.destroyBlock(coords.x - 1, coords.y + 1, coords.z + 1, true);
World.destroyBlock(coords.x + 1, coords.y + 1, coords.z - 1, true);
World.destroyBlock(coords.x - 1, coords.y + 1, coords.z - 1, true);
} 
}
);

cvitokw.create(function () {
     effect = false;
Game.message("свиток выключен");
}, 1, 'min');

ToolAPI.setTool(ItemID["Scroll_mining"], "свиток", ToolType.pickaxe);

*/




// file: item/Scroll/Scroll1.js

IDRegistry.genItemID("Scroll1"); 
Item.createItem("Scroll1", "Scroll of the day", {name: "Scroll", meta: 1}, {stack: 1});

Translation.addTranslation("Scroll of the day", {ru: "свиток дня"});

Item.registerUseFunction("Scroll1", function(coords, item, block)
{
if(mana>=2000){
mana-=2000;
World.setWorldTime(1000);
sound.play();
}
}
);















// file: item/посохи/магическая_палка_0.js

var peremen1 = 18990;

var BlockID55 = [51, 52, 122, 120, 7];

IDRegistry.genItemID("stick2"); 
Item.createItem("stick2", "Postability of absorption", {name: "stick2", meta: 1}, {stack: 1});

Translation.addTranslation("Postability of absorption", {ru: "посох поглощения"});

Item.registerUseFunction("stick2", function(coords, item, block)
{
if(mana<=peremen1){
if(World.getBlock(coords.x, coords.y, coords.z).id != BlockID55) {
mana+=10;
World.setBlock(coords.x, coords.y, coords.z, 0, 0);
sound.play();
} 
} 
}
);
/*
var fireParticle = Particles.registerParticleType({
 texture: "fire",
 render: 0,
 collision: true, 
 size:[10, 10],
 lifetime:[10, 20],
 animators: {
  alpha:{fadeIn: .4, fadeOut: .4},
  size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
 }
});

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.stick2){
var player = Entity.getLookAngle(Player.get());
let velocity = {
			x: -Math.sin(player.yaw) * 1,
			y: Math.sin(player.pitch) * 1,
			z: Math.cos(player.yaw) * 1
		};
var pos = Player.getPosition();
var emitter = new Particles.ParticleEmitter(pos.x, pos.y, pos.z);

emitter.emit(fireParticle, pos.x, pos.y, pos.z, velocity.x, velocity.y, velocity.z, 0);
}
});

function test (pos, velocity){
    Callback.addCallback("tick", function (){
        emitter.setEmitRelatively(enable);
        var emitter = new Particles.ParticleEmitter(pos.x, pos.y, pos.z);

emitter.emit(fireParticle, pos.x, pos.y, pos.z, velocity.x, velocity.y, velocity.z, 0);
    });
}
*/





// file: item/Guidebook.js

ModAPI.addAPICallback("GuideAPI", function(api){ 
const GuideAPI = api.GuideAPI; 
const GuideHelper = api.GuideHelper; 
const PageControllers = api.PageControllers;

GuideAPI.registerGuide("magisbook", { 
item: ItemID.magis_book, 
debug: false, 
textures: { 
background: "guide_book", 
nextLink: "next_page", 
preLink: "pre_page", 
close: "btn_close", 
}, 
pages: {
"default": {  
left: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "Dungeon Craft [pre - release]", size: 30},
{text: "этот мод добавит новые данжи и ритуалы, а тагже измерения", size: 20},
] 
}, 

right: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "dungeon craft", size: 30}, 
{text: "измерения", size: 20, link: "dimension"},
{text: "броня", size: 20, link: "armor"},
]
}
},

"dimension": {
preLink: "default",
left: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "Dungeon Craft [pre - release]", size: 30},
{text: "этот мод добавит новые данжи и ритуалы, а тагже измерения", size: 20},
] 
}, 

right: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "рай", size: 20, link: "rai1"},
] 
}
}, 

"rai1": {
preLink: "dimension",
nextLink: "rai2", 
left: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "измерения - рай", size: 30},
{text: "рай был добавлен в качестве промежуточного измерения, в рае спавнится деревья, дома, сокровищницы, и руда", size: 20},
] 
}, 

right: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "как по пасть в рай?", size: 30},
{text: "1)найдите структуру в которой есть блок под названием контроллер миров 2)в некоторых данжах спавнится камни перемещения они бывают 2 видов(вечные и обычные) нажмите ими по контроллеру миров и всё)", size: 20},
] 
}
}, 

"armor": {
preLink: "default", 
left: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "Dungeon Craft [pre - release]", size: 30},
{text: "этот мод добавит новые данжи и ритуалы, а тагже измерения", size: 20},
] 
}, 

right: {
controller: PageControllers.BASIC_PAGE, 
elements: [
{text: "божественная броня", size: 20, link: "armorGod1"},
{text: "броня огня", size: 20, link: "armorfire1"},
] 
}
}, 


"armorfire1": {
preLink: "armor",
nextLink: "armorfire2", 
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor1}, 
], 
elements: [ 
{text: "огненый шлем", size: 30}, 
{text: "прочность - 6993, защита - 7", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: огненый шлем", 
recipes: [ 
{ 
grid: [ 
["b", "b", "b"], 
["b", "a", "b"], 
["a", "a", "a"] 
], 
materials: { 
"b": {id: ItemID.clitok1, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor1, count: 1} 
} 
], 
elements: [
] 
}
}, 

"armorfire2": {
preLink: "armorfire1",
nextLink: "armorfire3", 
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor2}, 
], 
elements: [ 
{text: "огненный нагрудник", size: 30}, 
{text: "прочность - 9102, защита - 10", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: огненный нагрудник", 
recipes: [ 
{ 
grid: [ 
["b", "a", "b"], 
["b", "b", "b"], 
["b", "b", "b"] 
], 
materials: { 
"b": {id: ItemID.clitok1, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor2, count: 1} 
} 
], 
elements: [
] 
}
}, 

"armorfire3": {
preLink: "armorfire2",
nextLink: "armorfire4", 
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor3}, 
], 
elements: [ 
{text: "огненные поножи", size: 30}, 
{text: "прочность - 8103, защита - 9", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: огненные поножи", 
recipes: [ 
{ 
grid: [ 
["b", "b", "b"], 
["b", "a", "b"], 
["b", "a", "b"] 
], 
materials: { 
"b": {id: ItemID.clitok1, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor3, count: 1} 
} 
], 
elements: [
] 
}
}, 

"armorfire4": {
preLink: "armorfire3",
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor4}, 
], 
elements: [ 
{text: "огненые ботинки", size: 30}, 
{text: "прочность - 6438, защита - 6", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: огненые ботинки", 
recipes: [ 
{ 
grid: [ 
["a", "a", "a"], 
["b", "a", "b"], 
["b", "a", "b"] 
], 
materials: { 
"b": {id: ItemID.clitok1, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor4, count: 1} 
} 
], 
elements: [
] 
}
}, 




"armorGod1": {
preLink: "armor",
nextLink: "armorGod2", 
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor5}, 
], 
elements: [ 
{text: "божественый шлем", size: 30}, 
{text: "прочность - 2775, защита - 5", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: божественый шлем", 
recipes: [ 
{ 
grid: [ 
["b", "b", "b"], 
["b", "a", "b"], 
["a", "a", "a"] 
], 
materials: { 
"b": {id: ItemID.clitok, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor5, count: 1} 
} 
], 
elements: [
] 
}
}, 

"armorGod2": {
preLink: "armorGod1",
nextLink: "armorGod3", 
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor6}, 
], 
elements: [ 
{text: "божественый нагрудник", size: 30}, 
{text: "прочность - 4440, защита - 8", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: божественый нагрудник", 
recipes: [ 
{ 
grid: [ 
["b", "a", "b"], 
["b", "b", "b"], 
["b", "b", "b"] 
], 
materials: { 
"b": {id: ItemID.clitok, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor6, count: 1} 
} 
], 
elements: [
] 
}
}, 

"armorGod3": {
preLink: "armorGod2",
nextLink: "armorGod4", 
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor7}, 
], 
elements: [ 
{text: "божественые поножи", size: 30}, 
{text: "прочность - 3885, защита - 7", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: божественые поножи", 
recipes: [ 
{ 
grid: [ 
["b", "b", "b"], 
["b", "a", "b"], 
["b", "a", "b"] 
], 
materials: { 
"b": {id: ItemID.clitok, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor7, count: 1} 
} 
], 
elements: [
] 
}
}, 

"armorGod4": {
preLink: "armorGod3",
left: {
controller: PageControllers.ITEM_GRID_PAGE, 
columns: 3, 
item_size: 100, 
items: [ 
{id: ItemID.armor8}, 
], 
elements: [ 
{text: "божественый ботинки", size: 30}, 
{text: "прочность - 2220, защита - 4", size: 20}, 
]
}, 

right: {
controller: PageControllers.GRID_3x3_PAGE, 
title: "крафт: божественый ботинки", 
recipes: [ 
{ 
grid: [ 
["a", "a", "a"], 
["b", "a", "b"], 
["b", "a", "b"] 
], 
materials: { 
"b": {id: ItemID.clitok, data: 0}, 
"a": {id: 0, data: 0},
}, 
result: {id: ItemID.armor8, count: 1} 
} 
], 
elements: [
] 
}
}, 








}
});


});




// file: item/dungeonKey.js

IDRegistry.genItemID("keyDungeon"); 
Item.createItem("keyDungeon", "key Dungeon", {name: "keyDungeon", meta: 0}, {stack: 1});

Translation.addTranslation("key Dungeon", {ru: "золотой ключ"});

Item.setGlint(ItemID.keyDungeon, true);

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.keyDungeon){
if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.brickkey){
if (World.getBlock(coords.x, coords.y+1, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x, coords.y-1, coords.z).id == BlockID.brick3){

if (World.getBlock(coords.x-1, coords.y, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x-1, coords.y+1, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x-1, coords.y-1, coords.z).id == BlockID.brick3){

if (World.getBlock(coords.x+1, coords.y, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x+1, coords.y+1, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x+1, coords.y-1, coords.z).id == BlockID.brick3){


World.setBlock(coords.x, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x, coords.y, coords.z, 0, 0);
World.setBlock(coords.x, coords.y-1, coords.z, 0, 0);

World.setBlock(coords.x-1, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x-1, coords.y, coords.z, 0, 0);
World.setBlock(coords.x-1, coords.y-1, coords.z, 0, 0);

World.setBlock(coords.x+1, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x+1, coords.y, coords.z, 0, 0);
World.setBlock(coords.x+1, coords.y-1, coords.z, 0, 0);
Player.decreaseCarriedItem()

}
}
}

}
}
}

} 
} 
} 
/*
if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.portal3){
if (World.getBlock(coords.x+1, coords.y, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x-1, coords.y, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x-2, coords.y+1, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x+2, coords.y+1, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x-2, coords.y+2, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x+2, coords.y+2, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x-2, coords.y+3, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x+2, coords.y+3, coords.z).id == BlockID.brick2){

if (World.getBlock(coords.x, coords.y+4, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x+1, coords.y+4, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x-1, coords.y+4, coords.z).id == BlockID.brick2){
Player.decreaseCarriedItem()
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.portal1, 0);
World.setBlock(coords.x, coords.y+2, coords.z, BlockID.portal1, 0);
World.setBlock(coords.x, coords.y+3, coords.z, BlockID.portal1, 0);

World.setBlock(coords.x-1, coords.y+1, coords.z, BlockID.portal1, 0);
World.setBlock(coords.x-1, coords.y+2, coords.z, BlockID.portal1, 0);
World.setBlock(coords.x-1, coords.y+3, coords.z, BlockID.portal1, 0);

World.setBlock(coords.x+1, coords.y+1, coords.z, BlockID.portal1, 0);
World.setBlock(coords.x+1, coords.y+2, coords.z, BlockID.portal1, 0);
World.setBlock(coords.x+1, coords.y+3, coords.z, BlockID.portal1, 0);
}
}
}
}
}
}
} 
} 

}
}
} 
} 
if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.portal3){
if (World.getBlock(coords.x, coords.y, coords.z+1).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y, coords.z-1).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+1, coords.z+2).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+1, coords.z-2).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+2, coords.z+2).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+2, coords.z-2).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+3, coords.z+2).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+3, coords.z-2).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+4, coords.z).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+4, coords.z+1).id == BlockID.brick2){
if (World.getBlock(coords.x, coords.y+4, coords.z-1).id == BlockID.brick2){
Player.decreaseCarriedItem()
World.setBlock(coords.x, coords.y+1, coords.z, BlockID.portal2, 0);
World.setBlock(coords.x, coords.y+2, coords.z, BlockID.portal2, 0);
World.setBlock(coords.x, coords.y+3, coords.z, BlockID.portal2, 0);

World.setBlock(coords.x, coords.y+1, coords.z+1, BlockID.portal2, 0);
World.setBlock(coords.x, coords.y+2, coords.z+1, BlockID.portal2, 0);
World.setBlock(coords.x, coords.y+3, coords.z+1, BlockID.portal2, 0);

World.setBlock(coords.x, coords.y+1, coords.z-1, BlockID.portal2, 0);
World.setBlock(coords.x, coords.y+2, coords.z-1, BlockID.portal2, 0);
World.setBlock(coords.x, coords.y+3, coords.z-1, BlockID.portal2, 0);

} 
} 
} 
} 
} 
}
}
} 
} 
} 
} 
} 
*/
} 
});


IDRegistry.genItemID("keyDungeon2"); 
Item.createItem("keyDungeon2", "update key", {name: "key", meta: 2}, {stack: 1});

Translation.addTranslation("update key", {ru: "огненный ключ"});

Item.setGlint(ItemID.keyDungeon2, true);

Item.addCreativeGroup("keyDungeon", Translation.translate("Key"), [
	ItemID.keyDungeon,
	ItemID.keyDungeon2,
]);

Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == ItemID.keyDungeon2){
if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.brickkey){
if (World.getBlock(coords.x, coords.y+1, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x, coords.y-1, coords.z).id == BlockID.brick3){

if (World.getBlock(coords.x-1, coords.y, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x-1, coords.y+1, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x-1, coords.y-1, coords.z).id == BlockID.brick3){

if (World.getBlock(coords.x+1, coords.y, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x+1, coords.y+1, coords.z).id == BlockID.brick3){
if (World.getBlock(coords.x+1, coords.y-1, coords.z).id == BlockID.brick3){


World.setBlock(coords.x, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x, coords.y, coords.z, 0, 0);
World.setBlock(coords.x, coords.y-1, coords.z, 0, 0);

World.setBlock(coords.x-1, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x-1, coords.y, coords.z, 0, 0);
World.setBlock(coords.x-1, coords.y-1, coords.z, 0, 0);

World.setBlock(coords.x+1, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x+1, coords.y, coords.z, 0, 0);
World.setBlock(coords.x+1, coords.y-1, coords.z, 0, 0);
var random = Math.random() * 1;
if(random<=0.5){
Player.decreaseCarriedItem();
} 

}
}
}

}
}
}

} 
} 
} 
}
});













// file: boss/нежить.js

var Test555= MobRegistry.registerEntity("Test555");

Test555.customizeEvents({



 tick: function(){

Entity.addEffect(this.entity,
Native.PotionEffect.regeneration, 5, 5, true, true) 
Entity.setRender(this.entity, 2);
 Entity.setSkin(this.entity, "res/mobs/boss0.png");

 }, 
created: function(){


}, 
});


Test555.customizeDescription({
	
 getHitbox: function(){
 return {w: 2, h: 2}
},
getDrop: function(){
 var drop = [];
 
 drop.push({id: ItemID.sword_1, count: {min: 1, max: 1}, data: 0, separate: true, chance: 0.10});
 drop.push({id: ItemID.armor1, count: {min: 1, max: 1}, data: 0, separate: true, chance: 0.10});
 drop.push({id: ItemID.armor2, count: {min: 1, max: 1}, data: 0, separate: true, chance: 0.10});
 drop.push({id: ItemID.armor3, count: {min: 1, max: 2}, data: 0, separate: true, chance: 0.10});
drop.push({id: ItemID.armor4, count: {min: 1, max: 2}, data: 0, separate: true, chance: 0.10});

drop.push({id: ItemID.poic1, count: {min: 1, max: 2}, data: 0, separate: true, chance: 0.3});
 drop.push({id: ItemID.magis_book, count: {min: 1, max: 2}, data: 0, separate: true, chance: 0.5});
drop.push({id: ItemID.Gem, count: {min: 1, max: 2}, data: 0, separate: true, chance: 1});
drop.push({id: ItemID.GlasPlacte, count: {min: 1, max: 1}, data: 0, separate: true, chance: 0.1});

 return drop;
 
 
}
});
/*
Test555.customizeAI({
getHealth: function(){
  return 0;},
     
getAITypes: function(){
return {
wander: {
type: EntityAI.Wander,

priority: 4,
speed: 1,
angular_speed: 0.3,
delay_weigth: 0.2
},

follow: {
type: EntityAI.Follow,
priority: 0,
speed: 0.1,
rotateHead: true
},

attack: {
type: EntityAI.Attack,

priority: 5,
attack_damage: 5,
attack_range: 2,
attack_rate: 20
},
enemy_watcher: {
type: AdvancedAI.EnemyWatcher,

attackAI: "attack",
followAI: "follow",
find_delay: 5,
priority_on_attack: 5,
priority_on_idle: 5,
feelingModifier: 50
}
};
}
});



*/


Item.registerUseFunction("glas", function(coords, item, block)
{
if(World.getBlockID(coords.x, coords.y, coords.z)==BlockID.altar3){
if(World.getBlockID(coords.x, coords.y - 1, coords.z)==BlockID.altar1){
if(World.getBlockID(coords.x, coords.y - 1, coords.z + 1)==41){
if(World.getBlockID(coords.x, coords.y - 1, coords.z - 1)==41){
if(World.getBlockID(coords.x + 1, coords.y - 1, coords.z)==41){
if(World.getBlockID(coords.x - 1, coords.y - 1, coords.z)==41){
if(World.getBlockID(coords.x - 1, coords.y - 1, coords.z + 1)==BlockID.altar){
if(World.getBlockID(coords.x - 1, coords.y - 1, coords.z - 1)==BlockID.altar){
if(World.getBlockID(coords.x + 1, coords.y - 1, coords.z + 1)==BlockID.altar){
if(World.getBlockID(coords.x + 1, coords.y - 1, coords.z - 1)==BlockID.altar){

World.setBlock(coords.x, coords.y, coords.z, 0, 0)
Entity.spawnCustom("Test555", coords.x, coords.y, coords.z);
World.setBlock(coords.x, coords.y - 1, coords.z, 0, 0)
World.setBlock(coords.x + 1, coords.y - 1, coords.z, 0, 0)
World.setBlock(coords.x - 1, coords.y - 1, coords.z, 0, 0)
World.setBlock(coords.x, coords.y - 1, coords.z + 1, 0, 0)
World.setBlock(coords.x, coords.y - 1, coords.z - 1, 0, 0)
World.setBlock(coords.x + 1, coords.y - 1, coords.z + 1, 0, 0)
World.setBlock(coords.x + 1, coords.y - 1, coords.z - 1, 0, 0)
World.setBlock(coords.x - 1, coords.y - 1, coords.z + 1, 0, 0)
World.setBlock(coords.x - 1, coords.y - 1, coords.z - 1, 0, 0)

boss1.play();
}
}
}
}
}
}
}
}
} 
}} 
);










// file: API/ritual.js

var itemRitual = [];
let ritualParticle = {
particle: function (x, y, z, par) {
for(var i = 0;i < par;i++) {
Particles.addParticle(Native.ParticleType.redstone,x+Math.random(), y, z+Math.random(),0,0,0,0);
} 
}, 

ParticleType: function (type, x, y, z, par) {
for(var i = 0;i < par;i++) {
Particles.addParticle(type, x, y, z,0,0,0,0);
} 
}, 
ParticleType2: function (typee, x, y, z, par) {
for(var i = 0;i < par;i++) {
Particles.addParticle(typee,x-0.3+Math.random(), y, z+0.9+Math.random(),0,0,0,0);
} 
}, 

};

let ritual = {

addUptable: function (r) {
Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == r.item){

if (World.getBlock(coords.x-2, coords.y, coords.z-2).id == BlockID.altar){
if (World.getBlock(coords.x-2, coords.y+1, coords.z-2).id == BlockID.altar1){
if (World.getBlock(coords.x-2, coords.y+2, coords.z-2).id == BlockID.altar){
if (World.getBlock(coords.x-2, coords.y+3, coords.z-2).id == BlockID.kristalFire){

if (World.getBlock(coords.x-2, coords.y, coords.z+2).id == BlockID.altar){
if (World.getBlock(coords.x-2, coords.y+1, coords.z+2).id == BlockID.altar1){
if (World.getBlock(coords.x-2, coords.y+2, coords.z+2).id == BlockID.altar){
if (World.getBlock(coords.x-2, coords.y+3, coords.z+2).id == BlockID.kristalFire){

if (World.getBlock(coords.x+2, coords.y, coords.z-2).id == BlockID.altar){
if (World.getBlock(coords.x+2, coords.y+1, coords.z-2).id == BlockID.altar1){
if (World.getBlock(coords.x+2, coords.y+2, coords.z-2).id == BlockID.altar){
if (World.getBlock(coords.x+2, coords.y+3, coords.z-2).id == BlockID.kristalFire){

if (World.getBlock(coords.x+2, coords.y, coords.z+2).id == BlockID.altar){
if (World.getBlock(coords.x+2, coords.y+1, coords.z+2).id == BlockID.altar1){
if (World.getBlock(coords.x+2, coords.y+2, coords.z+2).id == BlockID.altar){
if (World.getBlock(coords.x+2, coords.y+3, coords.z+2).id == BlockID.kristalFire){

if (mana >= r.manaCount){
if (World.getTileEntity(coords.x, coords.y, coords.z).data.item == r.itemID) {

World.getTileEntity(coords.x, coords.y, coords.z).animationItem.destroy();
World.getTileEntity(coords.x, coords.y, coords.z).data.item = 0;

mana-=r.manaCount;
ritual3.play();
    Entity.spawn(coords.x, coords.y+1, coords.z, 93);


World.getTileEntity(coords.x, coords.y, coords.z).customAnimation(r.result);
ritualParticle.particle(coords.x, coords.y+0.9, coords.z, 20);

ritualParticle.ParticleType(Native.ParticleType.flame, this.x+Math.random(), this.y+1+Math.random(), this.z+Math.random(), 10);



} 

} 
} 
} 
} 

} 
} 
}
}

} 
} 
} 
} 

} 
} 
}
}

} 
} 
});

}

};



ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.clitok, 
manaCount: 15000,
result: ItemID.clitok1, 
});

ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.keyDungeon, 
manaCount: 10000,
result: ItemID.keyDungeon2, 
});

ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.armor5, 
manaCount: 20000,
result: ItemID.armor1, 
});

ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.armor5, 
manaCount: 20000,
result: ItemID.armor1, 
});

ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.armor6, 
manaCount: 20000,
result: ItemID.armor2, 
});

ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.armor7, 
manaCount: 20000,
result: ItemID.armor3, 
});

ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.armor8, 
manaCount: 20000,
result: ItemID.armor4, 
});


ritual.addUptable({
item: ItemID.item, 
itemID: ItemID.clitok, 
manaCount: 15000,
result: ItemID.clitok1, 
});







// file: API/ritual2.js

function RitualAPI (){
    let ItemRitualID = [];
    this.addItem = function (id){
        ItemRitualID.push({id:id});
    } 
    this.ritualRegister = function (r){
        Callback.addCallback("ItemUse", function(coords, item){ 
if (item.id == r.item){
if (World.getBlock(coords.x, coords.y-1, coords.z).id == 22){
if (World.getBlock(coords.x-1, coords.y-1, coords.z).id == 133){
if (World.getBlock(coords.x+1, coords.y-1, coords.z).id == 133){
if (World.getBlock(coords.x, coords.y-1, coords.z+1).id == 133){
if (World.getBlock(coords.x, coords.y-1, coords.z-1).id == 133){

if (World.getBlock(coords.x+1, coords.y-1, coords.z+1).id == 57){
if (World.getBlock(coords.x-1, coords.y-1, coords.z+1).id == 57){
if (World.getBlock(coords.x+1, coords.y-1, coords.z-1).id == 57){
if (World.getBlock(coords.x-1, coords.y-1, coords.z-1).id == 57){

if (World.getBlock(coords.x+1, coords.y-1, coords.z+2).id == BlockID.altar1){
if (World.getBlock(coords.x, coords.y-1, coords.z+2).id == BlockID.altar){
if (World.getBlock(coords.x-1, coords.y-1, coords.z+2).id == BlockID.altar1){

if (World.getBlock(coords.x+1, coords.y-1, coords.z-2).id == BlockID.altar1){
if (World.getBlock(coords.x, coords.y-1, coords.z-2).id == BlockID.altar){
if (World.getBlock(coords.x-1, coords.y-1, coords.z-2).id == BlockID.altar1){

if (World.getBlock(coords.x+2, coords.y-1, coords.z-1).id == BlockID.altar1){
if (World.getBlock(coords.x+2, coords.y-1, coords.z+1).id == BlockID.altar1){
if (World.getBlock(coords.x+2, coords.y-1, coords.z).id == BlockID.altar){

if (World.getBlock(coords.x-2, coords.y-1, coords.z-1).id == BlockID.altar1){
if (World.getBlock(coords.x-2, coords.y-1, coords.z+1).id == BlockID.altar1){
if (World.getBlock(coords.x-2, coords.y-1, coords.z).id == BlockID.altar){

if (World.getBlock(coords.x+2, coords.y, coords.z).id == BlockID.kristalwind){
if (World.getBlock(coords.x-2, coords.y, coords.z).id == BlockID.kristalwind){
if (World.getBlock(coords.x, coords.y, coords.z+2).id == BlockID.kristalwind){
if (World.getBlock(coords.x, coords.y, coords.z-2).id == BlockID.kristalwind){

if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.rityal1){

if (mana >= r.manaCount){
if (World.getTileEntity(coords.x, coords.y, coords.z).data.item == r.itemID) {

World.getTileEntity(coords.x, coords.y, coords.z).animationItem.destroy();

World.getTileEntity(coords.x, coords.y, coords.z).data.item = 0;

mana-=r.manaCount;
sound.play();
    Entity.spawn(coords.x, coords.y+1, coords.z, 93);
    
ritualParticle.particle(coords.x, coords.y+0.9, coords.z, 20);
var gg = 0;
for(i in ItemRitualID){
    gg++;
}
var random = Math.random() * gg;
var itemRandom = Math.trunc(random);
World.drop(coords.x, coords.y+1, coords.z, ItemRitualID[itemRandom].id, 1);
} 

}




} 
} 
} 
} 
} 

}
}
}

}
}
}

} 
} 
} 

} 
} 
} 

} 
} 
} 
} 

}
}
} 
} 
}

} 
});
    }
};

var Ritual = new RitualAPI();
Ritual.addItem(ItemID.rune1);
Ritual.addItem(ItemID.rune2);
Ritual.addItem(ItemID.rune3);
Ritual.addItem(ItemID.rune4);
Ritual.ritualRegister({
    item: ItemID.item, 
    itemID: ItemID.rune0, 
    manaCount: 1000,
});

var Ritual2 = new RitualAPI();
Ritual2.addItem(ItemID.manysript2);
Ritual2.ritualRegister({
    item: ItemID.item, 
    itemID: ItemID.manysript1, 
    manaCount: 1000,
});




// file: craft/block.js

Callback.addCallback("LevelLoaded", function () {


Recipes.addShaped({id: BlockID.blockmetal, count: 1, data: 0}, 
	["aaa", "aaa", "aaa"],
	['a', ItemID.clitok, 0]);

Recipes.addShaped({id: BlockID.board, count: 4, data: 0}, 
	["###", "#a#", "###"],
	['a', BlockID.Breastya, 0]);

Recipes.addShaped({id: 58, count: 1, data: 0}, 
	["aa#", "aa#", "###"],
	['a', BlockID.board, 0]);

Recipes.addShaped({id: 54, count: 1, data: 0}, 
	["aaa", "a*a", "aaa"],
	['a', BlockID.board, 0]);
/*
Recipes.addShaped({id: BlockID.CloneAltar1, count: 1, data: 0}, 
	["*a*", "aba", "*a*"],
	['a', ItemID.clitok, 0, 'b', BlockID.blockmetal, 0]);
*/
Recipes.addShaped({id: BlockID.rityal1, count: 1, data: 0}, 
	["***", "aba", "aaa"],
	['a', ItemID.clitok, 0, 'b', BlockID.blockmetal, 0]);

Recipes.addShaped({id: BlockID.brick2, count: 8, data: 0}, 
	["bbb", "bab", "bbb"],
	['a', ItemID.clitok, 0, 'b', BlockID.stone2, 0]);
Recipes.addShaped({id: BlockID.ritualGL, count: 1, data: 0}, 
	["bab", "bab", "aaa"],
	['b', ItemID.clitok, 0, 'a', BlockID.blockmetal, 0]);
/*
Recipes.addShaped({id: BlockID.rityal, count: 1, data: 0}, 
	["aaa", "bbb", "bab"],
	['a', ItemID.clitok, 0, 'b', BlockID.blockmetal, 0]);
*/
Recipes.addShaped({id: BlockID.gubok1, count: 1, data: 0}, 
	["bbb", "aba", "aba"],
	['a', ItemID.clitok, 0, 'b', BlockID.blockmetal, 0]);
	Recipes.addShaped({id: BlockID.gubok2, count: 1, data: 0}, 
	["aba", "aba", "bbb"],
	['a', ItemID.clitok, 0, 'b', BlockID.blockmetal, 0]);
});













// file: craft/item.js

Callback.addCallback("LevelLoaded", function () {


Recipes.addShaped({id: ItemID.stick2, count: 1, data: 0},
	["**a", "*b*", "b**"], 
	['a', BlockID.blockmetal, 0, 'b', 280, 0]);


Recipes.addShaped({id: ItemID.rune0, count: 4, data: 0},
	["***", "*b*", "***"], 
	['b', BlockID.altar, 0]);


Recipes.addShaped({id: ItemID.item, count: 1, data: 0}, 
	["*a*", "a*a", "*a*"], 
	['a', ItemID.clitok, 0]
); 


Recipes.addShaped({id: ItemID.gotovka, count: 1, data: 0}, 
	["aaa", "a*a", "*a*"], 
	['a', ItemID.clitok, 0] 
);


Recipes.addShaped({id: ItemID.armor5, count: 1, data: 0}, 
	["aaa", "a*a", "***"], 
	['a', ItemID.clitok, 0]
);


Recipes.addShaped({id: ItemID.armor6, count: 1, data: 0}, 
	["a*a", "aaa", "aaa"], 
	['a', ItemID.clitok, 0] 
);


Recipes.addShaped({id: ItemID.armor7, count: 1, data: 0}, 
	["aaa", "a*a", "a*a"], 
	['a', ItemID.clitok, 0] 
);


Recipes.addShaped({id: ItemID.armor8, count: 1, data: 0}, 
	["***", "a*a", "a*a"], 
	['a', ItemID.clitok, 0] 
);

/*
Recipes.addShaped({id: ItemID.sword_2, count: 1, data: 0}, 
	["*a*", "*a*", "*b*"], 
	['a', ItemID.clitok, 0, 'b', 280, 0] 
);
*/

Recipes.addShaped({id: 280, count: 1, data: 0}, 
	["#a#", "#a#", "###"],
	['a', BlockID.board, 0]);

Recipes.addShaped({id: 270, count: 1, data: 0}, 
	["aaa", "#b#", "#b#"],
	['a', BlockID.board, 0, 'b', 280, 0]);

Recipes.addShaped({id: 268, count: 1, data: 0}, 
	["#a#", "#a#", "#b#"],
	['a', BlockID.board, 0, 'b', 280, 0]);

Recipes.addShaped({id: 269, count: 1, data: 0}, 
	["#a#", "#b#", "#b#"],
	['a', BlockID.board, 0, 'b', 280, 0]);

Recipes.addShaped({id: 271, count: 1, data: 0}, 
	["aa#", "ab#", "#b#"],
	['a', BlockID.board, 0, 'b', 280, 0]);

Recipes.addShaped({id: 290, count: 1, data: 0}, 
	["aa#", "#b#", "#b#"],
	['a', BlockID.board, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.sword_2, count: 1, data: 0}, 
	["*a*", "*a*", "*g*"], 
	['a', ItemID.clitok, 0, 'b', 280, 0, 'g', 399, 0]);

Recipes.addShaped({id: ItemID.pickaxe_2, count: 1, data: 0}, 
	["aaa", "*g*", "*b*"], 
	['a', ItemID.clitok, 0, 'b', 280, 0, 'g', 399, 0]);

Recipes.addFurnace(BlockID.ore, ItemID.clitok, 0);
Recipes.addFurnace(BlockID.blockmetal, BlockID.glass2, 0);
});




// file: EMC.js

ModAPI.addAPICallback("EquivalentAPI", function(api){
//божественый слиток
api.System.setValue(ItemID.clitok, 0, 4096);
//камень перемещения не вечный
api.System.setValue(ItemID.Gem, 0, 16384);
//камень перемещения вечный
api.System.setValue(ItemID.Gem2, 0, 65536);
//блок божественого металла 
api.System.setValue(BlockID.blockmetal, 0, 36864);
//земля
api.System.setValue(BlockID.dirt2, 0, 1);
api.System.setValue(BlockID.grass2, 0, 1);
//стекло
api.System.setValue(BlockID.glass2, 0, 36864);
//камень
api.System.setValue(BlockID.stone2, 0, 1);
//кирпич
api.System.setValue(BlockID.brick2, 0, 1);
});




// file: structure/piramida_ada.js

let setStructure2 = {
    cloi1: function(coords) {
    	World.setBlock(coords.x, coords.y+2, coords.z, BlockID.statua, 0);
   World.setBlock(coords.x, coords.y, coords.z, 54, 0);
   fillChest2.fillChest(coords.x, coords.y, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
World.setBlock(coords.x + 1, coords.y, coords.z, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z, 43, 0);


World.setBlock(coords.x, coords.y, coords.z, 54, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 1, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 2, 43, 0);




World.setBlock(coords.x + 1, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 3, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 4, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 5, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 6, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 7,43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 7, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 1, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 2, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 3, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 4, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 5, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 6, 43, 0);



World.setBlock(coords.x + 1, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 7, 43, 0);



World.setBlock(coords.x - 1, coords.y, coords.z, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z, 43, 0);


World.setBlock(coords.x, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 1, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 1, 43, 0);



World.setBlock(coords.x, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 2, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 2, 43, 0);



World.setBlock(coords.x, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 3, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 3, 43, 0);



World.setBlock(coords.x, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 4, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 4, 43, 0);




World.setBlock(coords.x, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 5, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 5, 43, 0);



World.setBlock(coords.x, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 6, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 6, 43, 0);



World.setBlock(coords.x, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 7, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 7, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 1, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 1, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 2, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 2, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 3, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 3, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 4, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 4, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 5, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 5, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 6, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 6, 43, 0);



World.setBlock(coords.x, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 7, 43, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 7, 43, 0);
	}, 
	cloi2: function(coords) {
		World.setBlock(coords.x, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x + 7, coords.y + 1, coords.z, 0, 0);


World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.altar, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 1, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 2, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 2, 0, 0);




World.setBlock(coords.x + 1, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 3, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 3, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 4, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 4, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 5, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 5, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 6, 43, 7);



World.setBlock(coords.x + 1, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z + 7, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z + 7, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 1, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 2, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 2, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 3, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 3, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 4, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 4, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 5, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 5, 0, 0);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 6, 43, 7);



World.setBlock(coords.x + 1, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x + 3, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x + 4, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x + 5, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x + 6, coords.y + 1, coords.z - 7, 43, 7);
World.setBlock(coords.x + 7, coords.y + 1, coords.z - 7, 0, 0);



World.setBlock(coords.x - 1, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z, 0, 0);


World.setBlock(coords.x, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 1, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 1, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z + 1, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 2, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 2, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z + 2, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 3, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 3, 43, 7);
World.setBlock(coords.x - 7, coords.y +1, coords.z + 3, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 4, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 4, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z + 4, 0, 0);




World.setBlock(coords.x, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 5, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 5, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z + 5, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 6, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z + 6, 43, 7);



World.setBlock(coords.x, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z + 7, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z + 7, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z + 7, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 1, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 1, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 1, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 2, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 2, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 2, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 3, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 3, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 3, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 4, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 4, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 4, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 5, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 5, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 5, 0, 0);



World.setBlock(coords.x, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 6, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 6, 43, 7);



World.setBlock(coords.x, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x - 3, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x - 4, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x - 5, coords.y + 1, coords.z - 7, 0, 0);
World.setBlock(coords.x - 6, coords.y + 1, coords.z - 7, 43, 7);
World.setBlock(coords.x - 7, coords.y + 1, coords.z - 7, 0, 0);
		}, 
		cloi3: function (coords) {
			World.setBlock(coords.x, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 1, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 6, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z, 0, 0);


World.setBlock(coords.x, coords.y + 2, coords.z, BlockID.statua, 0);
World.setBlock(coords.x + 1, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 1, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 2, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 2, 0, 0);




World.setBlock(coords.x + 1, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 3, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 3, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 4, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 4, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 5, 43, 7);



World.setBlock(coords.x + 1, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 6, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 6, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x + 6, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 7, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 1, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 2, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 2, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 3, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 3, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 4, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 4, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 5, 43, 7);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 6, 43, 7);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 6, 0, 0);



World.setBlock(coords.x + 1, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x + 2, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x + 3, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x + 4, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x + 6, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 7, 0, 0);



World.setBlock(coords.x - 1, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z, 0, 0);


World.setBlock(coords.x, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 1, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 1, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 2, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 2, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 3, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 3, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 3, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 4, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 4, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 4, 0, 0);




World.setBlock(coords.x, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 5, 43, 7);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 5, 43, 7);



World.setBlock(coords.x, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 6, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 6, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 6, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 6, coords.y + 2, coords.z + 7, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z + 7, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 1, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 1, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 1, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 2, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 2, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 2, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 3, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 3, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 3, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 4, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 4, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 4, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 5, 43, 7);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 5, 43, 7);



World.setBlock(coords.x, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 6, 43, 7);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 6, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 6, 0, 0);



World.setBlock(coords.x, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 1, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 2, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 3, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 4, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 5, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 6, coords.y + 2, coords.z - 7, 0, 0);
World.setBlock(coords.x - 7, coords.y + 2, coords.z - 7, 0, 0);
			}, 
			cloi4: function (coords) {
				World.setBlock(coords.x, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 1, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z, 0, 0);


World.setBlock(coords.x, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x + 1, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 1, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 2, 43, 7);
World.setBlock(coords.x + 5, coords.y + 2, coords.z + 2, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 2, 0, 0);




World.setBlock(coords.x + 1, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 3, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 3, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 4, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 4, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 5, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 5, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 6, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z + 7, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 1, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 1, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 2, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 2, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 3, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 3, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 4, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 4, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 4, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 5, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 6, 0, 0);



World.setBlock(coords.x + 1, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x + 2, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x + 3, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x + 6, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x + 7, coords.y + 3, coords.z - 7, 0, 0);



World.setBlock(coords.x - 1, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x - 5, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z, 0, 0);


World.setBlock(coords.x, coords.y + 2, coords.z + 1, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 1, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 1, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 1, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 2, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 2, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 2, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 3, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 3, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 3, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z + 4, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 4, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 4, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 4, 0, 0);




World.setBlock(coords.x, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 5, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 5, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 5, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 6, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 6, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 5, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z + 7, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z + 7, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 1, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 1, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 2, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 2, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 2, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 3, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 3, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 3, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 4, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 4, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 4, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 5, 43, 7);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 5, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 5, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 6, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 6, 0, 0);



World.setBlock(coords.x, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 1, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 2, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 3, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 4, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 5, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 6, coords.y + 3, coords.z - 7, 0, 0);
World.setBlock(coords.x - 7, coords.y + 3, coords.z - 7, 0, 0);







//Устанение ошибок

World.setBlock(coords.x - 4, coords.y + 3, coords.z, 43, 7);
World.setBlock(coords.x, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 1, 0, 0);
World.setBlock(coords.x + 5, coords.y + 2, coords.z - 2, 43, 7);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 5, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 5, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z - 5, 0, 0);
World.setBlock(coords.x + 7, coords.y + 2, coords.z + 5, 0, 0);
World.setBlock(coords.x + 5, coords.y + 3, coords.z + 4, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 4, 43, 7);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 5, 43, 7);
World.setBlock(coords.x + 5, coords.y + 3, coords.z - 4, 43, 7);

World.setBlock(coords.x + 4, coords.y + 3, coords.z + 1, 44, 7);
World.setBlock(coords.x + 4, coords.y + 3, coords.z, 43, 7);
World.setBlock(coords.x + 4, coords.y + 3, coords.z - 1, 44, 7);
World.setBlock(coords.x + 4, coords.y + 4, coords.z - 4, 44, 7);
World.setBlock(coords.x + 4, coords.y + 4, coords.z + 4, 44, 7);
World.setBlock(coords.x - 4, coords.y + 4, coords.z + 4, 44, 7);
World.setBlock(coords.x - 4, coords.y + 4, coords.z - 4, 44, 7);
				}, 
};

/*

function setStructure2(coords){
World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.altar1, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z, 41, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z, 41, 0);
World.setBlock(coords.x, coords.y + 1, coords.z + 1, 41, 0);
World.setBlock(coords.x, coords.y + 1, coords.z - 1, 41, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z - 1, BlockID.altar, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z + 1, BlockID.altar, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 1, BlockID.altar, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 1, BlockID.altar, 0);
World.setBlock(coords.x, coords.y + 2, coords.z, BlockID.altar3, 0);

         
       }
       
  */


Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
var random = Math.random()*350;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 200);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if (World.getBlock(coords.x, coords.y, coords.z).id == 87){
            
                            setStructure2.cloi1(coords);
                            setStructure2.cloi2(coords);
                            setStructure2.cloi3(coords);
                            setStructure2.cloi4(coords);
                            }
}      
});
























// file: structure/подземелье.js

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*2000;
if (random <= 100){
           

 var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 20);

dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 0,
});

dungeon.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 98,
    cubeData: 0,
});
dungeon.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 98,
    cubeData: 0,
});
dungeon.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 98,
    cubeData: 0,
});

dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});

World.setBlock(coords.x, coords.y+1, coords.z, 54, 0);
World.setBlock(coords.x, coords.y+2, coords.z, 52, 1);

Structure3.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});

Entity.spawn(coords.x+1, coords.y+1, coords.z, 23);
Entity.spawn(coords.x-1, coords.y+1, coords.z, 23);

}
});




// file: structure/храм_небес.js

var Structure3 = new ItemGenerate();

Structure3.addItem(264, 0.3, {max:5});
Structure3.addItem(265, 1, {max:3});
//железо
Structure3.addItem(306, 0.15, {max:1});
Structure3.addItem(307, 0.08, {max:1});
Structure3.addItem(308, 0.08, {max:1});
Structure3.addItem(309, 0.15, {max:1});
//алмазы
Structure3.addItem(310, 0.02, {max:1});
Structure3.addItem(311, 0.01, {max:1});
Structure3.addItem(312, 0.03, {max:1});
Structure3.addItem(313, 0.02, {max:1});
//кожа
Structure3.addItem(298, 0.4, {max:1});
Structure3.addItem(299, 0.1, {max:1});
Structure3.addItem(300, 0.2, {max:1});
Structure3.addItem(301, 0.4, {max:1});

//кольчуга
Structure3.addItem(302, 0.2, {max:1});
Structure3.addItem(303, 0.1, {max:1});
Structure3.addItem(304, 0.1, {max:1});
Structure3.addItem(305, 0.2, {max:1});

function fillChest3(slot, x, y, z, id, data, count){
     let container = World.getContainer(x, y, z);
     if(id == 306){
         let extra = enchantAdd(0.2, "helmet", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 307){
         let extra = enchantAdd(0.2, "chestplate", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 308){
         let extra = enchantAdd(0.2, "leggings", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 309){
         let extra = enchantAdd(0.2, "boots", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 310){
         let extra = enchantAdd(0.2, "helmet", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 311){
         let extra = enchantAdd(0.2, "chestplate", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 312){
         let extra = enchantAdd(0.2, "leggings", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 313){
         let extra = enchantAdd(0.2, "boots", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 298){
         let extra = enchantAdd(0.2, "helmet", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 299){
         let extra = enchantAdd(0.2, "chestplate", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 300){
         let extra = enchantAdd(0.2, "leggings", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 301){
         let extra = enchantAdd(0.2, "boots", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 302){
         let extra = enchantAdd(0.2, "helmet", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 303){
         let extra = enchantAdd(0.2, "chestplate", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 304){
         let extra = enchantAdd(0.2, "leggings", 3);
         container.setSlot(slot, id, count, data, extra);
     }
     if(id == 305){
         let extra = enchantAdd(0.2, "boots", 3);
         container.setSlot(slot, id, count, data, extra);
     }
}

Structure3.addItem(ItemID.clitok, 0.05, {max:10});




Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*8000;
if (random <= 40){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        
                            World.setBlock(coords.x, coords.y, coords.z, 54, 0);
//1 слой
   World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.block1, 0);
World.setBlock(coords.x, coords.y + 1, coords.z - 1, 155, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z, 155, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z + 1, 155, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z - 1, 155, 0);
World.setBlock(coords.x, coords.y + 1, coords.z + 1, 155, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z, 155, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 1, 155, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 1, 155, 0);


World.setBlock(coords.x, coords.y + 1, coords.z + 1, 155, 0);
World.setBlock(coords.x - 1, coords.y + 1, coords.z, 155, 0);
World.setBlock(coords.x + 1, coords.y + 1, coords.z, 155, 0);



World.setBlock(coords.x + 2, coords.y + 1, coords.z, 44, 6);
World.setBlock(coords.x - 2, coords.y + 1, coords.z, 44, 6);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 1, 44, 6);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 1, 44, 6);
World.setBlock(coords.x + 2, coords.y + 1, coords.z + 2, 44, 6);
World.setBlock(coords.x + 2, coords.y + 1, coords.z - 2, 44, 6);

World.setBlock(coords.x - 2, coords.y + 1, coords.z, 44, 6);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 1, 44, 6);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 1, 44, 6);
World.setBlock(coords.x - 2, coords.y + 1, coords.z + 2, 44, 6);
World.setBlock(coords.x - 2, coords.y + 1, coords.z - 2, 44, 6);

World.setBlock(coords.x, coords.y + 1, coords.z + 2, 44, 6);
World.setBlock(coords.x + 1, coords.y + 1, coords.z + 2, 44, 6);
World.setBlock(coords.x - 1, coords.y + 1, coords.z + 2, 44, 6);

World.setBlock(coords.x, coords.y + 1, coords.z - 2, 44, 6);
World.setBlock(coords.x - 1, coords.y + 1, coords.z - 2, 44, 6);
World.setBlock(coords.x + 1, coords.y + 1, coords.z - 2, 44, 6);
   
    //2 слой
       World.setBlock(coords.x - 1, coords.y + 2, coords.z - 1, 155, 2);
World.setBlock(coords.x - 1, coords.y + 2, coords.z + 1, 155, 2);

World.setBlock(coords.x + 1, coords.y + 2, coords.z - 1, 155, 2);
World.setBlock(coords.x + 1, coords.y + 2, coords.z + 1, 155, 2);

//3 слой

World.setBlock(coords.x - 1, coords.y + 3, coords.z - 1, 155, 2);
World.setBlock(coords.x - 1, coords.y + 3, coords.z + 1, 155, 2);

World.setBlock(coords.x + 1, coords.y + 3, coords.z - 1, 155, 2);
World.setBlock(coords.x + 1, coords.y + 3, coords.z + 1, 155, 2);

//4 слой
         
World.setBlock(coords.x - 1, coords.y + 4, coords.z - 1, 155, 2);
World.setBlock(coords.x - 1, coords.y + 4, coords.z + 1, 155, 2);

World.setBlock(coords.x + 1, coords.y + 4, coords.z, 155, 2);
World.setBlock(coords.x - 1, coords.y + 4, coords.z, 155, 2);
World.setBlock(coords.x, coords.y + 4, coords.z + 1, 155, 2);
World.setBlock(coords.x, coords.y + 4, coords.z - 1, 155, 2);

World.setBlock(coords.x + 1, coords.y + 4, coords.z - 1, 155, 2);
World.setBlock(coords.x + 1, coords.y + 4, coords.z + 1, 155, 2);




World.setBlock(coords.x + 2, coords.y + 4, coords.z, 44, 6);
World.setBlock(coords.x - 2, coords.y + 4, coords.z, 44, 6);
World.setBlock(coords.x + 2, coords.y + 4, coords.z + 1, 44, 6);
World.setBlock(coords.x + 2, coords.y + 4, coords.z - 1, 44, 6);
World.setBlock(coords.x + 2, coords.y + 4, coords.z + 2, 44, 6);
World.setBlock(coords.x + 2, coords.y + 4, coords.z - 2, 44, 6);

World.setBlock(coords.x - 2, coords.y + 4, coords.z, 44, 6);
World.setBlock(coords.x - 2, coords.y + 4, coords.z + 1, 44, 6);
World.setBlock(coords.x - 2, coords.y + 4, coords.z - 1, 44, 6);
World.setBlock(coords.x - 2, coords.y + 4, coords.z + 2, 44, 6);
World.setBlock(coords.x - 2, coords.y + 4, coords.z - 2, 44, 6);

World.setBlock(coords.x, coords.y + 4, coords.z + 2, 44, 6);
World.setBlock(coords.x + 1, coords.y + 4, coords.z + 2, 44, 6);
World.setBlock(coords.x - 1, coords.y + 4, coords.z + 2, 44, 6);

World.setBlock(coords.x, coords.y + 4, coords.z - 2, 44, 6);
World.setBlock(coords.x + 1, coords.y + 4, coords.z - 2, 44, 6);
World.setBlock(coords.x - 1, coords.y + 4, coords.z - 2, 44, 6);

//5 слой



World.setBlock(coords.x, coords.y + 5, coords.z, 44, 6);




         Structure3.fillChest(coords.x, coords.y, coords.z, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});
                            }

});




// file: structure/xyi.js





var generateItems1 =[
];

var Structure1 = {

  addItems: function (id, random, count, data){
    random = random||1;
    count = count||{};
    count.min = count.min||1;
    count.max = count.max||1;
    data = data||0;
    generateItems1.push({id:id, data:data, random:random, count:count});
}

};

Structure1.addItems(264, 1, {max:10});

Structure1.addItems(266, 0.90, {max:15});

Structure1.addItems(265, 0.80, {max:30});

Structure1.addItems(372, 0.30, {max:15});

Structure1.addItems(384, 0.10, {max:64});

Structure1.addItems(399, 0.01, {max:1});

Structure1.addItems(ItemID.glas, 0.1, {max:1});

Structure1.addItems(ItemID.magis_book, 0.7, {max:1});

function fillChest1(x,y,z){
    var container = World.getContainer(x, y, z);
if(container){
    var size = container.getSize();
    var random = Math.random();
    var slot = Math.random()*27;
var slot1 = container.getSlot(slot);

    for(var i in generateItems1){
        if(random<generateItems1[i].random){
            var count = Math.floor(Math.random()*(generateItems1[i].count.max-generateItems1[i].count.min))+generateItems1[i].count.min;
if(slot1.id==0){
            container.setSlot(slot, generateItems1[i].id, count, generateItems1[i].data);
            var slot = Math.random()*27;
} 
        }
    }
} 
}


function setStructure(coords){
//1 слой
   World.setBlock(coords.x, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z, 4, 0);
World.setBlock(coords.x, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x, coords.y, coords.z - 1, 4, 0);

World.setBlock(coords.x + 1, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 1, 4, 0);

World.setBlock(coords.x + 2, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 2, 4, 0);


World.setBlock(coords.x - 2, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 2, 4, 0);

World.setBlock(coords.x, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 2, 4, 0);

World.setBlock(coords.x, coords.y, coords.z - 2, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 2, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 2, 4, 0);

World.setBlock(coords.x, coords.y, coords.z + 3, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 3, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 3, 4, 0);

World.setBlock(coords.x, coords.y, coords.z - 3, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 3, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 3, 4, 0);

World.setBlock(coords.x + 3, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 3, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 3, coords.y, coords.z - 1, 4, 0);

World.setBlock(coords.x - 3, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 3, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 3, coords.y, coords.z - 1, 4, 0);











World.setBlock(coords.x, coords.y, coords.z + 4, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 4, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 4, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 4, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 4, 4, 0);


World.setBlock(coords.x, coords.y, coords.z - 4, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 4, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 4, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 4, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 4, 4, 0);

World.setBlock(coords.x + 4, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x + 4, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x + 4, coords.y, coords.z - 2, 4, 0);


World.setBlock(coords.x - 4, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x - 4, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x - 4, coords.y, coords.z - 2, 4, 0);












World.setBlock(coords.x, coords.y, coords.z + 5, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 5, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 5, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 5, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 5, 4, 0);


World.setBlock(coords.x, coords.y, coords.z - 5, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 5, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 5, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 5, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 5, 4, 0);

World.setBlock(coords.x + 5, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 5 , coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x + 5, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x + 5, coords.y, coords.z - 2, 4, 0);


World.setBlock(coords.x - 5, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x - 5, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x - 5, coords.y, coords.z - 2, 4, 0);












World.setBlock(coords.x, coords.y, coords.z + 6, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 6, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 6, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 6, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 6, 4, 0);


World.setBlock(coords.x, coords.y, coords.z - 6, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 6, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 6, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 6, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 6, 4, 0);

World.setBlock(coords.x + 6, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 6 , coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x + 6, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x + 6, coords.y, coords.z - 2, 4, 0);


World.setBlock(coords.x - 6, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x - 6, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x - 6, coords.y, coords.z - 2, 4, 0);












World.setBlock(coords.x, coords.y, coords.z + 7, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 7, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 7, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z + 7, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z + 7, 4, 0);


World.setBlock(coords.x, coords.y, coords.z - 7, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 7, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 7, 4, 0);
World.setBlock(coords.x + 2, coords.y, coords.z - 7, 4, 0);
World.setBlock(coords.x - 2, coords.y, coords.z - 7, 4, 0);

World.setBlock(coords.x + 7, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 7 , coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x + 7, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x + 7, coords.y, coords.z - 2, 4, 0);


World.setBlock(coords.x - 7, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 1, 4, 0);
World.setBlock(coords.x - 7, coords.y, coords.z + 2, 4, 0);
World.setBlock(coords.x - 7, coords.y, coords.z - 2, 4, 0);







World.setBlock(coords.x, coords.y, coords.z + 8, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z + 8, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z + 8, 4, 0);

World.setBlock(coords.x, coords.y, coords.z - 8, 4, 0);
World.setBlock(coords.x + 1, coords.y, coords.z - 8, 4, 0);
World.setBlock(coords.x - 1, coords.y, coords.z - 8, 4, 0);

World.setBlock(coords.x + 8, coords.y, coords.z, 4, 0);
World.setBlock(coords.x + 8, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x + 8, coords.y, coords.z - 1, 4, 0);

World.setBlock(coords.x - 8, coords.y, coords.z, 4, 0);
World.setBlock(coords.x - 8, coords.y, coords.z + 1, 4, 0);
World.setBlock(coords.x - 8, coords.y, coords.z - 1, 4, 0);
         











//2 слой

World.setBlock(coords.x, coords.y + 1, coords.z, 54, 0);
         //fillChest1(coords.x, coords.y, coords.z);
       }
       
  




























// file: structure/храм_медецирования.js

var structure = FileTools.ReadJSON(__dir__+"/json/structure.json");

var generateItems5 =[
];

var Structure5 = {

  addItems: function (id, random, count, data){
    random = random||1;
    count = count||{};
    count.min = count.min||1;
    count.max = count.max||1;
    data = data||0;
    generateItems5.push({id:id, data:data, random:random, count:count});
}

};

Structure5.addItems(264, 0.3, {max:3});

Structure5.addItems(266, 0.5, {max:5});

Structure5.addItems(265, 0.4, {max:10});

Structure5.addItems(372, 0.10, {max:5});

Structure5.addItems(384, 0.10, {max:11});

Structure5.addItems(399, 0.01, {max:1});

Structure5.addItems(ItemID.glas, 0.4, {max:1});

Structure5.addItems(ItemID.magis_book, 1, {max:1});




function fillChest5(x,y,z){
    var container = World.getContainer(x, y, z);
if(container){
    var size = container.getSize();
    var random = Math.random();
    var slot = Math.random()*27;
var slot1 = container.getSlot(slot);

    for(var i in generateItems5){
        if(random<generateItems5[i].random){
            var count = Math.floor(Math.random()*(generateItems5[i].count.max-generateItems5[i].count.min))+generateItems5[i].count.min;
if(slot1.id==0){
            container.setSlot(slot, generateItems5[i].id, count, generateItems5[i].data);
            var slot = Math.random()*27;
} 
        }
    }
} 
}












// file: structure/лутница.js


Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*10000;
if (random <= 25){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
       


dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 5,
    cubeData: 2,
});
World.setBlock(coords.x-2, coords.y+1, coords.z, 139, 0);
World.setBlock(coords.x-2, coords.y+1, coords.z+1, 139, 0);
World.setBlock(coords.x-2, coords.y+1, coords.z+2, 139, 0);
World.setBlock(coords.x-2, coords.y+1, coords.z-1, 139, 0);
World.setBlock(coords.x-2, coords.y+1, coords.z-2, 139, 0);

World.setBlock(coords.x+2, coords.y+1, coords.z, 139, 0);
World.setBlock(coords.x+2, coords.y+1, coords.z+1, 139, 0);
World.setBlock(coords.x+2, coords.y+1, coords.z+2, 139, 0);
World.setBlock(coords.x+2, coords.y+1, coords.z-1, 139, 0);
World.setBlock(coords.x+2, coords.y+1, coords.z-2, 139, 0);

World.setBlock(coords.x, coords.y+1, coords.z+2, 139, 0);
World.setBlock(coords.x+1, coords.y+1, coords.z+2, 139, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z+2, 139, 0);

World.setBlock(coords.x, coords.y+1, coords.z-2, 139, 0);
World.setBlock(coords.x+1, coords.y+1, coords.z-2, 139, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z-2, 139, 0);
World.setBlock(coords.x, coords.y+1, coords.z, 54, 0);

fillChest5(coords.x, coords.y+1, coords.z);

         
                            }


});
























// file: structure/лабиринт.js

var generateLab =[
];

var StructureLab = {

  addItems: function (id, random, count, data){
    random = random||1;
    count = count||{};
    count.min = count.min||1;
    count.max = count.max||1;
    data = data||0;
    generateLab.push({id:id, data:data, random:random, count:count});
}

};

StructureLab.addItems(264, 0.1, {max:5});
StructureLab.addItems(266, 0.4, {max:7});
StructureLab.addItems(295, 0.8, {max:20});
StructureLab.addItems(291, 0.9, {max:1});
StructureLab.addItems(261, 0.8, {max:1});
StructureLab.addItems(262, 0.4, {max:20});
StructureLab.addItems(297, 0.8, {max:6});
StructureLab.addItems(322, 0.05, {max:10});




function fillChestLab(x,y,z){
    var container = World.getContainer(x, y, z);
if(container){
    var size = container.getSize();
    var random = Math.random();
    var slot = Math.random()*27;
var slot1 = container.getSlot(slot);

    for(var i in generateLab){
        if(random<generateLab[i].random){
            var count = Math.floor(Math.random()*(generateLab[i].count.max-generateLab[i].count.min))+generateLab[i].count.min;
if(slot1.id==0){
            container.setSlot(slot, generateLab[i].id, count, generateLab[i].data);
            var slot = Math.random()*27;
} 
        }
    }
} 
}


var generateLab2 =[
];

var StructureLab2 = {

  addItems: function (id, random, count, data){
    random = random||1;
    count = count||{};
    count.min = count.min||1;
    count.max = count.max||1;
    data = data||0;
    generateLab2.push({id:id, data:data, random:random, count:count});
}

};

StructureLab2.addItems(264, 0.15, {max:5});
StructureLab2.addItems(266, 0.5, {max:7});
StructureLab2.addItems(362, 0.75, {max:20});
StructureLab2.addItems(294, 0.9, {max:1});
StructureLab2.addItems(261, 0.85, {max:1});
StructureLab2.addItems(262, 0.45, {max:20});
StructureLab2.addItems(297, 0.8, {max:8});
StructureLab2.addItems(322, 0.1, {max:2});
StructureLab2.addItems(370, 0.03, {max:4});
StructureLab2.addItems(369, 0.02, {max:2});
StructureLab2.addItems(ItemID.clitok, 0.1, {max:8});




function fillChestLab2(x,y,z){
    var container = World.getContainer(x, y, z);
if(container){
    var size = container.getSize();
    var random = Math.random();
    var slot = Math.random()*27;
var slot1 = container.getSlot(slot);

    for(var i in generateLab2){
        if(random<generateLab2[i].random){
            var count = Math.floor(Math.random()*(generateLab2[i].count.max-generateLab2[i].count.min))+generateLab2[i].count.min;
if(slot1.id==0){
            container.setSlot(slot, generateLab2[i].id, count, generateLab2[i].data);
            var slot = Math.random()*27;
} 
        }
    }
} 
}

var generateLab3 =[
];

var StructureLab3 = {

  addItems: function (id, random, count, data){
    random = random||1;
    count = count||{};
    count.min = count.min||1;
    count.max = count.max||1;
    data = data||0;
    generateLab3.push({id:id, data:data, random:random, count:count});
}

};

StructureLab3.addItems(264, 1, {max:7});
StructureLab3.addItems(266, 1, {max:10});
StructureLab3.addItems(362, 1, {max:20});
StructureLab3.addItems(294, 0.9, {max:1});
StructureLab3.addItems(261, 0.85, {max:1});
StructureLab3.addItems(262, 0.9, {max:64});
StructureLab3.addItems(297, 0.8, {max:8});
StructureLab3.addItems(322, 0.09, {max:22});
StructureLab3.addItems(370, 0.7, {max:5});
StructureLab3.addItems(369, 0.8, {max:6});
StructureLab3.addItems(ItemID.clitok, 0.5, {max:32});
StructureLab3.addItems(381, 0.5, {max:5});
StructureLab3.addItems(382, 0.7, {max:5});
StructureLab3.addItems(384, 1, {max:32});
StructureLab3.addItems(ItemID.sword_1, 0.05, {max:1});
StructureLab3.addItems(ItemID.pickaxe_1, 0.05, {max:1});
StructureLab3.addItems(ItemID.keyDungeon, 0.4, {max:1});




function fillChestLab3(x,y,z){
    var container = World.getContainer(x, y, z);
if(container){
    var size = container.getSize();
    var random = Math.random();
    var slot = Math.random()*27;
var slot1 = container.getSlot(slot);

    for(var i in generateLab3){
        if(random<generateLab3[i].random){
            var count = Math.floor(Math.random()*(generateLab3[i].count.max-generateLab3[i].count.min))+generateLab3[i].count.min;
if(slot1.id==0){
            container.setSlot(slot, generateLab3[i].id, count, generateLab3[i].data);
            var slot = Math.random()*27;
} 
        }
    }
} 
}
       
  


Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*1000;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 10);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        
//вход
World.setBlock(coords.x-1, coords.y+1, coords.z+2, BlockID.altar1, 0);
World.setBlock(coords.x, coords.y+1, coords.z+2, BlockID.altar1, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z-2, BlockID.altar1, 0);
World.setBlock(coords.x, coords.y+1, coords.z-2, BlockID.altar1, 0);

World.setBlock(coords.x-1, coords.y+2, coords.z+2, BlockID.a1, 0);
World.setBlock(coords.x, coords.y+2, coords.z+2, BlockID.a1, 0);
World.setBlock(coords.x-1, coords.y+2, coords.z-2, BlockID.a1, 0);
World.setBlock(coords.x, coords.y+2, coords.z-2, BlockID.a1, 0);
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: false, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 3, 
    cubeID: 4,
    cubeData: 0,
});
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 1, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 3, 
    cubeID: 4,
    cubeData: 0,
});

dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: false, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 3, 
    cubeID: 4,
    cubeData: 0,
});
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 1, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 3, 
    cubeID: 4,
    cubeData: 0,
});

dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 3, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 2, 
    cubeID: 4,
    cubeData: 0,
});
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 3, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 2, 
    cubeID: 4,
    cubeData: 0,
});
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});

World.setBlock(coords.x-3, coords.y+1, coords.z+2, 4, 0);
World.setBlock(coords.x-3, coords.y+2, coords.z+2, 4, 0);
World.setBlock(coords.x-3, coords.y+3, coords.z+2, 4, 0);

World.setBlock(coords.x-3, coords.y+1, coords.z-2, 4, 0);
World.setBlock(coords.x-3, coords.y+2, coords.z-2, 4, 0);
World.setBlock(coords.x-3, coords.y+3, coords.z-2, 4, 0);

World.setBlock(coords.x+4, coords.y, coords.z, 4, 0);
World.setBlock(coords.x+4, coords.y, coords.z+1, 4, 0);
World.setBlock(coords.x+4, coords.y, coords.z-1, 4, 0);
World.setBlock(coords.x+4, coords.y+4, coords.z, 4, 0);
World.setBlock(coords.x+4, coords.y+4, coords.z+1, 4, 0);
World.setBlock(coords.x+4, coords.y+4, coords.z-1, 4, 0);
         

//развилка 1
var randomLab1 = Math.random()*5;
var randomLab2 = Math.random()*10;
var randomLab3 = Math.random()*10;
if(randomLab1<=5){
//пол
dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
//потолок
dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
//комнота 1
World.setBlock(coords.x+7, coords.y, coords.z, 4, 0);
World.setBlock(coords.x+7, coords.y, coords.z+1, 4, 0);
World.setBlock(coords.x+7, coords.y, coords.z-1, 4, 0);
World.setBlock(coords.x+7, coords.y+4, coords.z, 4, 0);
World.setBlock(coords.x+7, coords.y+4, coords.z+1, 4, 0);
World.setBlock(coords.x+7, coords.y+4, coords.z-1, 4, 0);

World.setBlock(coords.x+7, coords.y+1, coords.z+2, 4, 0);
World.setBlock(coords.x+7, coords.y+2, coords.z+2, 4, 0);
World.setBlock(coords.x+7, coords.y+3, coords.z+2, 4, 0);

World.setBlock(coords.x+7, coords.y+1, coords.z-2, 4, 0);
World.setBlock(coords.x+7, coords.y+2, coords.z-2, 4, 0);
World.setBlock(coords.x+7, coords.y+3, coords.z-2, 4, 0);

dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 11, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
World.setBlock(coords.x+11, coords.y+1, coords.z, 54, 0);
fillChestLab(coords.x+11, coords.y+1, coords.z);
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 11, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 11, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 11, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 11, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 4,
    cubeData: 2,
});

dungeon.cube3x3WallZ({
    coordsX: coords, 
    plusX: true, 
    X: 8, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
if(randomLab3>=1){
//блок1
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 2, 
    cubeID: 4,
    cubeData: 0,
});
}
if(randomLab2>=6){
//блок2
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 2, 
    cubeID: 4,
    cubeData: 0,
});
} 
World.setBlock(coords.x+8, coords.y+1, coords.z-2, 4, 0);
World.setBlock(coords.x+8, coords.y+2, coords.z-2, 4, 0);
World.setBlock(coords.x+8, coords.y+3, coords.z-2, 4, 0);
World.setBlock(coords.x+8, coords.y+1, coords.z+2, 4, 0);
World.setBlock(coords.x+8, coords.y+2, coords.z+2, 4, 0);
World.setBlock(coords.x+8, coords.y+3, coords.z+2, 4, 0);
}

if(randomLab2<=6){
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: false, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: false, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: false, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 3, 
    cubeID: 0,
    cubeData: 0,
});
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: false, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});

World.setBlock(coords.x+6, coords.y+1, coords.z-6, 54, 0);
fillChestLab2(coords.x+6, coords.y+1, coords.z-6);
}

if(randomLab3<=1){
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube6x6Empty({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
dungeon.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 3, 
    cubeID: 0,
    cubeData: 0,
});
dungeon.cube6x6({
    coordsX: coords, 
    plusX: true, 
    X: 6, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 6, 
    cubeID: 4,
    cubeData: 2,
});
World.setBlock(coords.x+6, coords.y+1, coords.z+6, 54, 0);
fillChestLab3(coords.x+6, coords.y+1, coords.z+6);
}



} 
});




// file: structure/сокровищница2.js

IDRegistry.genBlockID("board2");
Block.createBlock("board2", [ {name: "board", texture: [["board", 0]], inCreative: false} ]);
Block.setDestroyTime(BlockID.board2, 9999999999999);

IDRegistry.genBlockID("brickD2");
Block.createBlock("brickD2", [ {name: "brick", texture: [["brick2", 0]], inCreative: false}]);

Block.setDestroyTime(BlockID.brickD2, 9999999999999);

var generateCok =[
];

var StructureCok = {

  addItems: function (id, random, count, data){
    random = random||1;
    count = count||{};
    count.min = count.min||1;
    count.max = count.max||1;
    data = data||0;
    generateCok.push({id:id, data:data, random:random, count:count});
}

};

StructureCok.addItems(421, 0.5, {max:9});
StructureCok.addItems(264, 1, {max:16});
StructureCok.addItems(399, 0.5, {max:1});
StructureCok.addItems(368, 0.8, {max:16});
StructureCok.addItems(396, 0.5, {max:18});
StructureCok.addItems(388, 0.3, {max:2});
StructureCok.addItems(ItemID.clitok, 0.5, {max:32});
StructureCok.addItems(ItemID.amylet, 0.3, {max:1});
StructureCok.addItems(ItemID.armor1, 0.05, {max:1});
StructureCok.addItems(ItemID.armor2, 0.05, {max:1});
StructureCok.addItems(ItemID.armor3, 0.05, {max:1});
StructureCok.addItems(ItemID.armor4, 0.05, {max:1});
StructureCok.addItems(ItemID.koin_1, 0.05, {max:4});
StructureCok.addItems(ItemID.bookxp, 0.06, {max:5});






function fillChestCok(x,y,z){
    var container = World.getContainer(x, y, z);
if(container){
    var size = container.getSize();
    var random = Math.random();
    var slot = Math.random()*27;
var slot1 = container.getSlot(slot);

    for(var i in generateCok){
        if(random<generateCok[i].random){
            var count = Math.floor(Math.random()*(generateCok[i].count.max-generateCok[i].count.min))+generateCok[i].count.min;
if(slot1.id==0){
            container.setSlot(slot, generateCok[i].id, count, generateCok[i].data);
            var slot = Math.random()*27;
} 
        }
    }
} 
}

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId==rai1.id){
var random = Math.random()*1000;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 200);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.grass2){
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.board2,
    cubeData: 2,
});

World.setBlock(coords.x, coords.y, coords.z+2, BlockID.board2, 0);
World.setBlock(coords.x-1, coords.y, coords.z+2, BlockID.board2, 0);
World.setBlock(coords.x+1, coords.y, coords.z+2, BlockID.board2, 0);
World.setBlock(coords.x, coords.y, coords.z-2, BlockID.board2, 0);
World.setBlock(coords.x-1, coords.y, coords.z-2, BlockID.board2, 0);
World.setBlock(coords.x+1, coords.y, coords.z-2, BlockID.board2, 0);

dungeon.cube3x3WallZ({
    coordsX: coords, 
    plusX: true, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 1, 
    cubeID: BlockID.brickD2,
    cubeData: 0,
});

dungeon.cube3x3WallZ({
    coordsX: coords, 
    plusX: true, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 1, 
    cubeID: BlockID.brickD2,
    cubeData: 0,
});

dungeon.cube3x3WallZ({
    coordsX: coords, 
    plusX: false, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 1, 
    cubeID: BlockID.brickD2,
    cubeData: 0,
});

dungeon.cube3x3WallZ({
    coordsX: coords, 
    plusX: false, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: false, 
    Z: 1, 
    cubeID: BlockID.brickD2,
    cubeData: 0,
});

dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.brickD2,
    cubeData: 2,
});

World.setBlock(coords.x, coords.y+4, coords.z+2, BlockID.brickD2, 0);
World.setBlock(coords.x-1, coords.y+4, coords.z+2, BlockID.brickD2, 0);
World.setBlock(coords.x+1, coords.y+4, coords.z+2, BlockID.brickD2, 0);
World.setBlock(coords.x, coords.y+4, coords.z-2, BlockID.brickD2, 0);
World.setBlock(coords.x-1, coords.y+4, coords.z-2, BlockID.brickD2, 0);
World.setBlock(coords.x+1, coords.y+4, coords.z-2, BlockID.brickD2, 0);

World.setBlock(coords.x+1, coords.y+1, coords.z-2, BlockID.brick3, 0);
World.setBlock(coords.x, coords.y+1, coords.z-2, BlockID.brick3, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z-2, BlockID.brick3, 0);

World.setBlock(coords.x+1, coords.y+2, coords.z-2, BlockID.brick3, 0);
World.setBlock(coords.x, coords.y+2, coords.z-2, BlockID.brickkey, 0);
World.setBlock(coords.x-1, coords.y+2, coords.z-2, BlockID.brick3, 0);

World.setBlock(coords.x+1, coords.y+3, coords.z-2, BlockID.brick3, 0);
World.setBlock(coords.x, coords.y+3, coords.z-2, BlockID.brick3, 0);
World.setBlock(coords.x-1, coords.y+3, coords.z-2, BlockID.brick3, 0);

World.setBlock(coords.x+1, coords.y+1, coords.z+2, BlockID.brick3, 0);
World.setBlock(coords.x, coords.y+1, coords.z+2, BlockID.brick3, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z+2, BlockID.brick3, 0);

World.setBlock(coords.x+1, coords.y+2, coords.z+2, BlockID.brick3, 0);
World.setBlock(coords.x, coords.y+2, coords.z+2, BlockID.brickkey, 0);
World.setBlock(coords.x-1, coords.y+2, coords.z+2, BlockID.brick3, 0);

World.setBlock(coords.x+1, coords.y+3, coords.z+2, BlockID.brick3, 0);
World.setBlock(coords.x, coords.y+3, coords.z+2, BlockID.brick3, 0);
World.setBlock(coords.x-1, coords.y+3, coords.z+2, BlockID.brick3, 0);

World.setBlock(coords.x, coords.y+1, coords.z, 54, 0);
fillChestCok(coords.x, coords.y+1, coords.z);
}
} 
}
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(dimensionId==rai1.id){
var random = Math.random()*500;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 1, 1);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if(World.getBlock(coords.x, coords.y, coords.z).id == BlockID.grass2){
dungeon1.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.stone2,
    cubeData: 0,
});

dungeon1.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Breastya,
    cubeData: 0,
});

dungeon1.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Breastya,
    cubeData: 0,
});

dungeon1.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Breastya,
    cubeData: 0,
});



dungeon1.cube3x3WallZ({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 2, 
    cubeID: BlockID.board,
    cubeData: 0,
});

dungeon1.cube3x3WallZ({
    coordsX: coords, 
    plusX: false, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 0,
    coordsZ: coords, 
    plusZ: false, 
    Z: 4, 
    cubeID: BlockID.board,
    cubeData: 0,
});

dungeon1.cube3x3WallX({
    coordsX: coords, 
    plusX: true, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 2, 
    cubeID: BlockID.board,
    cubeData: 0,
});

dungeon1.cube3x3WallX({
    coordsX: coords, 
    plusX: false, 
    X: 4, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.board,
    cubeData: 0,
});



dungeon1.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 2, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Breastya,
    cubeData: 0,
});

dungeon1.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.board,
    cubeData: 0,
});

dungeon1.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: BlockID.Breastya,
    cubeData: 0,
});

World.setBlock(coords.x, coords.y-3, coords.z+2, BlockID.glass2, 0);

World.setBlock(coords.x, coords.y-3, coords.z-2, BlockID.glass2, 0);

World.setBlock(coords.x+2, coords.y-3, coords.z, BlockID.glass2, 0);

World.setBlock(coords.x-2, coords.y-3, coords.z, 0, 0);
World.setBlock(coords.x-2, coords.y-4, coords.z, 0, 0);

dungeon1.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
dungeon1.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
dungeon1.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
} 
} 
}
});




// file: structure/сокровещница_ада.js

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
var random = Math.random()*100;
if (random <= 5){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if(World.getBlockID(coords.x, coords.y+5, coords.z)==87){
if(World.getBlockID(coords.x, coords.y-5, coords.z)==87){
dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 215,
    cubeData: 0,
});

dungeon.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 43,
    cubeData: 7,
});
dungeon.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 43,
    cubeData: 7,
});
dungeon.cube5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 43,
    cubeData: 7,
});

dungeon.cube5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 215,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});
dungeon.cube3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 0,
    cubeData: 0,
});

World.setBlock(coords.x, coords.y+1, coords.z, 54, 0);
World.setBlock(coords.x, coords.y+2, coords.z, 52, 1);

fillChest2.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

Entity.spawn(coords.x+1, coords.y+1, coords.z, 5);
Entity.spawn(coords.x-1, coords.y+1, coords.z, 5);
}
}
}
});




// file: structure/храмЭнда.js

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
var random = Math.random()*200;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
if (World.getBlock(coords.x, coords.y, coords.z).id == 121){
if (World.getBlock(coords.x, coords.y+1, coords.z).id == 0){
dungeon.cube3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    cubeID: 206,
    cubeData: 0,
});
World.setBlock(coords.x, coords.y+1, coords.z, 54, 0);

World.setBlock(coords.x+2, coords.y+1, coords.z, 44, 1);
World.setBlock(coords.x+2, coords.y+1, coords.z+1, 44, 1);
World.setBlock(coords.x+2, coords.y+1, coords.z-1, 44, 1);

World.setBlock(coords.x-2, coords.y+1, coords.z, 44, 1);
World.setBlock(coords.x-2, coords.y+1, coords.z+1, 44, 1);
World.setBlock(coords.x-2, coords.y+1, coords.z-1, 44, 1);


World.setBlock(coords.x, coords.y+1, coords.z+2, 44, 1);
World.setBlock(coords.x+1, coords.y+1, coords.z+2, 44, 1);
World.setBlock(coords.x-1, coords.y+1, coords.z+2, 44, 1);

World.setBlock(coords.x, coords.y+1, coords.z-2, 44, 1);
World.setBlock(coords.x+1, coords.y+1, coords.z-2, 44, 1);
World.setBlock(coords.x-1, coords.y+1, coords.z-2, 44, 1);

World.setBlock(coords.x-2, coords.y+1, coords.z-2, 139, 0);
World.setBlock(coords.x+2, coords.y+1, coords.z-2, 139, 0);

World.setBlock(coords.x-2, coords.y+1, coords.z+2, 139, 0);
World.setBlock(coords.x+2, coords.y+1, coords.z+2, 139, 0);

World.setBlock(coords.x-2, coords.y+2, coords.z-2, 139, 0);
World.setBlock(coords.x+2, coords.y+2, coords.z-2, 139, 0);

World.setBlock(coords.x-2, coords.y+2, coords.z+2, 139, 0);
World.setBlock(coords.x+2, coords.y+2, coords.z+2, 139, 0);

World.setBlock(coords.x-2, coords.y+3, coords.z-2, BlockID.kristalLight, 0);
World.setBlock(coords.x+2, coords.y+3, coords.z-2, BlockID.kristalLight, 0);

World.setBlock(coords.x-2, coords.y+3, coords.z+2, BlockID.kristalLight, 0);
World.setBlock(coords.x+2, coords.y+3, coords.z+2, BlockID.kristalLight, 0);

World.setBlock(coords.x, coords.y+2, coords.z, BlockID.runeAltarDungeon, 0);


fillChest2.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
}
}
}
});




// file: structure/башня.js




Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*1000;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        

BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    data1: 0,
    IDblock1: 4,
    IDblock2: 48,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 4,
    data1: 0,
    IDblock2: 48,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 4,
    data1: 0,
    IDblock2: 48,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 4,
    data1: 0,
    IDblock2: 48,
    data2: 0,
});

BlockSet.RandomBlock(coords.x+2, coords.y+1, coords.z, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+1, coords.z, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x, coords.y+1, coords.z+2, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x, coords.y+1, coords.z-2, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x+2, coords.y+2, coords.z, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+2, coords.z, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x, coords.y+2, coords.z+2, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x, coords.y+2, coords.z-2, 4, 0, 48, 0);

World.setBlock(coords.x, coords.y+1, coords.z, 49, 0);
World.setBlock(coords.x, coords.y+2, coords.z, 54, 0);
Structure3.fillChest(coords.x, coords.y+2, coords.z, function(slot, x, y, z, id, data, count){
     fillChest3(slot, x, y, z, id, data, count);
});
World.setBlock(coords.x, coords.y+3, coords.z, 49, 0);
World.setBlock(coords.x, coords.y+4, coords.z, 49, 0);

BlockSet.RandomBlock(coords.x+2, coords.y+3, coords.z, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+3, coords.z, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x, coords.y+3, coords.z+2, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x, coords.y+3, coords.z-2, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x+1, coords.y+5, coords.z, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x-1, coords.y+5, coords.z, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x, coords.y+5, coords.z-1, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x, coords.y+5, coords.z+1, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x, coords.y+6, coords.z, 4, 0, 48, 0);
BlockSet.RandomBlock(coords.x, coords.y+7, coords.z, 4, 0, 48, 0);

BlockSet.RandomBlock(coords.x+1, coords.y+6, coords.z, 0, 0, BlockID.kristalwind, 0);
BlockSet.RandomBlock(coords.x-1, coords.y+6, coords.z, 0, 0, BlockID.kristalFire, 0);
BlockSet.RandomBlock(coords.x, coords.y+6, coords.z-1, 0, 0, BlockID.kristaldirt, 0);
BlockSet.RandomBlock(coords.x, coords.y+6, coords.z+1, 0, 0, BlockID.kristalLight, 0);

}
});




// file: structure/улучшеная_сокровещнитца.js

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*1500;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        
BlockSet.RandomBlockSet7x7({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 1,
    data1: 5,
    IDblock2: 1,
    data2: 6,
});
BlockSet.RandomBlockSet3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 2,
});
BlockSet.RandomBlockSet5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 2,
});
BlockSet.RandomBlockSet5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 2,
});
BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlock(coords.x+2, coords.y+3, coords.z, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+3, coords.z, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x, coords.y+3, coords.z+2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x, coords.y+3, coords.z-2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+4, coords.z-2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+2, coords.y+4, coords.z-2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+4, coords.z+2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+2, coords.y+4, coords.z+2, 44,  5, 421, 0);

World.setBlock(coords.x+2, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x-2, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x, coords.y+1, coords.z+2, 0, 0);
World.setBlock(coords.x, coords.y+1, coords.z-2, 0, 0);
World.setBlock(coords.x+2, coords.y+2, coords.z, 0, 0);
World.setBlock(coords.x-2, coords.y+2, coords.z, 0, 0);
World.setBlock(coords.x, coords.y+2, coords.z+2, 0, 0);
World.setBlock(coords.x, coords.y+2, coords.z-2, 0, 0);
World.setBlock(coords.x, coords.y+1, coords.z, 54, 0);
fillChest2.fillChest(coords.x, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

Entity.spawn(coords.x+1, coords.y+1, coords.z, 5);
Entity.spawn(coords.x-1, coords.y+1, coords.z, 5);

}
});




// file: structure/подземелье_энда.js

Callback.addCallback("GenerateEndChunk", function(chunkX, chunkZ){
var random = Math.random()*500;
if (random <= 1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
if (World.getBlock(coords.x, coords.y, coords.z).id == 121){
if (World.getBlock(coords.x, coords.y+1, coords.z).id == 0){

BlockSet.RandomBlockSet7x7({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet5x5Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 5,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
World.setBlock(coords.x+2, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x-2, coords.y+1, coords.z, 0, 0);
World.setBlock(coords.x, coords.y+1, coords.z+2, 0, 0);
World.setBlock(coords.x, coords.y+1, coords.z-2, 0, 0);
World.setBlock(coords.x+2, coords.y+2, coords.z, 0, 0);
World.setBlock(coords.x-2, coords.y+2, coords.z, 0, 0);
World.setBlock(coords.x, coords.y+2, coords.z+2, 0, 0);
World.setBlock(coords.x, coords.y+2, coords.z-2, 0, 0);
World.setBlock(coords.x-2, coords.y+4, coords.z-2, 417, 0);
World.setBlock(coords.x+2, coords.y+4, coords.z-2, 417, 0);
World.setBlock(coords.x-2, coords.y+4, coords.z+2, 417, 0);
World.setBlock(coords.x+2, coords.y+4, coords.z+2, 417, 0);

BlockSet.RandomBlock(coords.x, coords.y, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlock(coords.x, coords.y-1, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlock(coords.x, coords.y-2, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlock(coords.x, coords.y-3, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlock(coords.x, coords.y-4, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlock(coords.x, coords.y-5, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlockSet7x7({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 6,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlock(coords.x, coords.y-6, coords.z, 65, 3, 0, 0);
BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 7,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 8,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 9,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet7x7({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 10,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 206,
    data1: 0,
    IDblock2: 121,
    data2: 0,
});
BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 7,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 8,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});
BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: false, 
    Y: 9,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 0,
    data1: 0,
    IDblock2: 0,
    data2: 0,
});

var randomChest = Math.random()*1;

if(randomChest<=0.7){
World.setBlock(coords.x+2, coords.y-9, coords.z, 54, 0);
fillChest2.fillChest(coords.x+2, coords.y-9, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
} 
var randomChest2 = Math.random()*1;

if(randomChest2<=0.7){
World.setBlock(coords.x-2, coords.y-9, coords.z, 54, 0);
fillChest2.fillChest(coords.x-2, coords.y-9, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
} 
var randomChest3 = Math.random()*1;

if(randomChest3<=0.7){
World.setBlock(coords.x, coords.y-9, coords.z+2, 54, 0);
fillChest2.fillChest(coords.x, coords.y-9, coords.z+2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
} 
var randomChest4 = Math.random()*1;

if(randomChest4<=0.7){
World.setBlock(coords.x, coords.y-9, coords.z-2, 54, 0);
fillChest2.fillChest(coords.x, coords.y-9, coords.z-2, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});
} 


}
}
} 
});




// file: structure/дом_алхимика.js

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*11000;
if (random <= 10){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
       
BlockSet.RandomBlockSet7x7({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 4,
    data1: 0,
    IDblock2: 48,
    data2: 0,
});

BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 1,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 1,
});
BlockSet.RandomBlock(coords.x+3, coords.y+1, coords.z+3, 139, 7, 139, 8);
BlockSet.RandomBlock(coords.x-3, coords.y+1, coords.z+3, 139, 7, 139, 8);
BlockSet.RandomBlock(coords.x+3, coords.y+1, coords.z-3, 139, 7, 139, 8);
BlockSet.RandomBlock(coords.x-3, coords.y+1, coords.z-3, 139, 7, 139, 8);

World.setBlock(coords.x+3, coords.y+1, coords.z, 0, 0);

BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 2,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 1,
});
BlockSet.RandomBlock(coords.x+3, coords.y+2, coords.z+3, 139, 7, 139, 8);
BlockSet.RandomBlock(coords.x-3, coords.y+2, coords.z+3, 139, 7, 139, 8);
BlockSet.RandomBlock(coords.x+3, coords.y+2, coords.z-3, 139, 7, 139, 8);
BlockSet.RandomBlock(coords.x-3, coords.y+2, coords.z-3, 139, 7, 139, 8);

World.setBlock(coords.x+3, coords.y+2, coords.z, 0, 0);

BlockSet.RandomBlock(coords.x-3, coords.y+2, coords.z, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x, coords.y+2, coords.z+3, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x, coords.y+2, coords.z-3, BlockID.glass2, 0, 0, 0);



BlockSet.RandomBlockSet7x7Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 3,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 1,
});
BlockSet.RandomBlock(coords.x+3, coords.y+3, coords.z+3, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-3, coords.y+3, coords.z+3, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+3, coords.y+3, coords.z-3, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-3, coords.y+3, coords.z-3, 44,  5, 421, 0);

BlockSet.RandomBlock(coords.x+3, coords.y+3, coords.z, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x-3, coords.y+3, coords.z, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x, coords.y+3, coords.z+3, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x, coords.y+3, coords.z-3, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x+2, coords.y+3, coords.z+2, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x+2, coords.y+3, coords.z-2, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x-2, coords.y+3, coords.z+2, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x-2, coords.y+3, coords.z-2, BlockID.glass2, 0, 0, 0);

BlockSet.RandomBlock(coords.x+2, coords.y+4, coords.z, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+2, coords.y+4, coords.z+1, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+2, coords.y+4, coords.z-1, 44,  5, 421, 0);

BlockSet.RandomBlock(coords.x-2, coords.y+4, coords.z, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+4, coords.z+1, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-2, coords.y+4, coords.z-1, 44,  5, 421, 0);

BlockSet.RandomBlock(coords.x, coords.y+4, coords.z+2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+1, coords.y+4, coords.z+2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-1, coords.y+4, coords.z+2, 44,  5, 421, 0);

BlockSet.RandomBlock(coords.x, coords.y+4, coords.z-2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x+1, coords.y+4, coords.z-2, 44,  5, 421, 0);
BlockSet.RandomBlock(coords.x-1, coords.y+4, coords.z-2, 44,  5, 421, 0);

BlockSet.RandomBlockSet3x3({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 4,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 98,
    data1: 0,
    IDblock2: 98,
    data2: 1,
});

BlockSet.RandomBlockSet3x3Empty({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 5,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 139,
    data1: 7,
    IDblock2: 139,
    data2: 8,
});

BlockSet.RandomBlock(coords.x, coords.y+5, coords.z, 98,  0, 98, 1);

BlockSet.RandomBlock(coords.x, coords.y+6, coords.z, 139, 7, 139, 8);

//декор


World.setBlock(coords.x-2, coords.y+1, coords.z, 54, 0);
fillChest2.fillChest(coords.x-2, coords.y+1, coords.z, function(slot, x, y, z, id, data, count){
    let container = World.getContainer(x, y, z);
    if(id == 283){
        let extra = enchantAdd(0.2, "sword", 3);
        container.setSlot(slot, id, count, data, extra);
    }
});

World.setBlock(coords.x, coords.y+1, coords.z+2, 33, 0);
World.setBlock(coords.x+1, coords.y+1, coords.z+2, 33, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z+2, 33, 0);

World.setBlock(coords.x, coords.y+1, coords.z-2, 33, 0);
World.setBlock(coords.x+1, coords.y+1, coords.z-2, 33, 0);
World.setBlock(coords.x-1, coords.y+1, coords.z-2, 33, 0);

BlockSet.RandomBlock(coords.x, coords.y+2, coords.z+2, 117, 0, 0, 0);
BlockSet.RandomBlock(coords.x, coords.y+2, coords.z-2, 117, 0, 0, 0);
}

});




// file: structure/MegaLoot.js

/*
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
var random = Math.random()*1000;
if (random <= 100){

var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 1,
    data1: 5,
    IDblock2: 1,
    data2: 6,
});

BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 5, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 0, 
    IDblock1: 1,
    data1: 5,
    IDblock2: 1,
    data2: 6,
});

BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 0, 
    coordsY: coords, 
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 5, 
    IDblock1: 1,
    data1: 5,
    IDblock2: 1,
    data2: 6,
});

BlockSet.RandomBlockSet5x5({
    coordsX: coords, 
    plusX: true, 
    X: 5, 
    coordsY: coords,
    plusY: true, 
    Y: 0,
    coordsZ: coords, 
    plusZ: true, 
    Z: 5, 
    IDblock1: 1,
    data1: 5,
    IDblock2: 1,
    data2: 6,
});

BlockSet.RandomBlock(coords.x, coords.y+1, coords.z, 98,  0, 98, 1);
BlockSet.RandomBlock(coords.x-1, coords.y+1, coords.z+1, 98,  0, 98, 1);
BlockSet.RandomBlock(coords.x+1, coords.y+1, coords.z-1, 98,  0, 98, 1);

BlockSet.RandomBlock(coords.x+5, coords.y+1, coords.z+5, 98,  0, 98, 1);
BlockSet.RandomBlock(coords.x+6, coords.y+1, coords.z+4, 98,  0, 98, 1);
BlockSet.RandomBlock(coords.x+4, coords.y+1, coords.z+6, 98,  0, 98, 1);

BlockSet.RandomBlock(coords.x+5, coords.y+1, coords.z+5, 98,  0, 98, 1);
BlockSet.RandomBlock(coords.x+6, coords.y+1, coords.z+1, 98,  0, 98, 1);
BlockSet.RandomBlock(coords.x+4, coords.y+1, coords.z-1, 98,  0, 98, 1);

BlockSet.RandomBlock(coords.x+5, coords.y+1, coords.z-5, 98,  0, 98, 1);

}
});
*/




// file: dimension/rai.js


var rai1 = new Dimensions.CustomDimension("rai1", 1345); 
rai1.setSkyColor(0, 128, 188) 
rai1.setFogColor(0, 128, 188); 
 
rai1.setGenerator(Dimensions.newGenerator({
    layers: [
        {
            minY: 0, maxY: 68, 
            yConversion: [[0, 1], [1, -1]], 
            material: {base: BlockID.stone2, surface: {id:BlockID.dirt2, data: 0, width:4}, cover: BlockID.grass2}, 
            noise: {
                octaves: {count: 4, scale: 20}
            }
        }
    ]
}));
/*
var raiForest = new CustomBiome("raiForest")
 
 raiForest.setSkyColor(0x66FFFF)
 
 raiForest.setGrassColor(0x66FFFF)
 
 raiForest.setFoliageColor(0x66FFFF)

 raiForest.setCoverBlock(BlockID.grass2, 0)
 
 raiForest.setSurfaceBlock(BlockID.dirt2, 0)
 
 raiForest.setFillingBlock(BlockID.stone2, 0);

Callback.addCallback("GenerateBiomeMap", function(x, z, rand, dimensionId, chunkSeed, worldSeed) {
if (dimensionId == rai1.id) {
 (x *= 20, z *= 20);
 for (var xs = x +1; xs < x + 1; xs++)
     for (var zs = z + 1; zs < z +1; zs++)
      if (GenerationUtils.getPerlinNoise(xs, 0, zs, worldSeed, 0.025, 3) < 0.03)
    World.setBiomeMap(xs, zs, raiForest.id);
Game.tipMessage("Biome");
}
});
*/
var rai_particle = Particles.registerParticleType({
 texture: "rai_particle",
 render: 2,
 size:[4, 10],
 lifetime: [40, 100],
 animators: {
  alpha:{fadeIn: .4, fadeOut: .4},
  size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
 }
});

Callback.addCallback("tick", function() {
let dimension = Player.getDimension();
if(dimension==rai1.id) {
let coords = Player.getPosition();
if(Math.random() <= 0.4){

Particles.addFarParticle(rai_particle, coords.x+Math.random() * 15 - Math.random() * 15, coords.y+Math.random() * 5 - Math.random() * 5, coords.z+Math.random() * 15 - Math.random() * 15, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, 0);
}
} 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) {
if (dimensionId == rai1.id) {
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 60);
        if(World.getBlockID(coords.x, coords.y, coords.z)==0){
        //GenerationUtils.generateOre(coords.x, coords.y, coords.z, 0, 500, 900, true);

}
} 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if (dimensionId == rai1.id) {

    for(i = 0; i < 3; i++){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 100);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.grass2){
            
                            setWood(coords);
                            
} 
} 
} 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if (dimensionId == rai1.id) {
    for(i = 0; i < 15; i++){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 10);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.grass2){
            if(World.getBlock(coords.x, coords.y+1, coords.z).id==0){
            World.setBlock(coords.x, coords.y+1, coords.z, BlockID.trava, 0);
//BlockSet.add(BlockID.trava, 0, coords.x, coords.y, coords.z);
} 
}
} 
} 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if (dimensionId == rai1.id) {
    var random1 = Math.random() * 20;
    if(random1<=1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 10);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
        if (World.getBlock(coords.x, coords.y, coords.z).id == BlockID.grass2){
            if(World.getBlock(coords.x, coords.y+1, coords.z).id==0){
                World.setBlock(coords.x, coords.y+1, coords.z, BlockID.a0, 0);
            }
}
} 
} 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId==rai1.id){
    var random = Math.random()*5;
if (random <= 3){
    for(var i = 0; i < 2; i++){
        
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 20);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.ore, 0, 10, true);

} 
} 
}
});


var wood1 = new DungeonAPI("wood.json");
Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId == rai1.id){
        let random1 = Math.random() * 20;
        if(random1<=1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 10);
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
            wood1.setStructurePro(coords.x, coords.y, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="Foliage"){
        World.setBlock(x, y, z, BlockID.Foliage, 0);
    }
    if(arr[i].id=="board2"){
        World.setBlock(x, y, z, BlockID.Breastya, 0);
    }
});
} 
} 
});

var wood2 = new DungeonAPI("wood2.json");
Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId == rai1.id){
        let random1 = Math.random() * 10;
        if(random1<=1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 10);
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
            wood2.setStructurePro(coords.x, coords.y, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="Foliage"){
        World.setBlock(x, y, z, BlockID.Foliage, 0);
    }
    if(arr[i].id=="board2"){
        World.setBlock(x, y, z, BlockID.Breastya, 0);
    }
});
} 
} 
});

var wood3 = new DungeonAPI("wood3.json");
Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId <= rai1.id){
        let random1 = Math.random() * 10;
        if(random1<=1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 10);
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
            wood3.setStructurePro(coords.x, coords.y, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="Foliage"){
        World.setBlock(x, y, z, BlockID.Foliage, 0);
    }
    if(arr[i].id=="board2"){
        World.setBlock(x, y, z, BlockID.Breastya, 0);
    }
});
} 
} 
});



var raiTeleport = new DungeonAPI("raiTeleport.json");
Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId <= rai1.id){
        let random1 = Math.random() * 100;
        if(random1<=1){
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 60, 90);
            raiTeleport.setStructurePro(coords.x, coords.y, coords.z, function(x, y, z, arr, i){
    if(arr[i].id=="Foliage"){
        World.setBlock(x, y, z, BlockID.Foliage, 0);
    }
    if(arr[i].id=="Breastya"){
        World.setBlock(x, y, z, BlockID.Breastya, 0);
    }
    if(arr[i].id=="dirt"){
        World.setBlock(x, y, z, BlockID.dirt2, 0);
    }
    if(arr[i].id=="grass"){
        World.setBlock(x, y, z, BlockID.grass2, 0);
    }
    if(arr[i].id=="stone"){
        World.setBlock(x, y, z, BlockID.stone2, 0);
    }
    if(arr[i].id=="kristalLight"){
        World.setBlock(x, y, z, BlockID.kristalLight, 0);
    }
    if(arr[i].id=="board"){
        World.setBlock(x, y, z, BlockID.board, 0);
    }
    if(arr[i].id=="vase"){
        World.setBlock(x, y, z, BlockID.vase, 0);
    }
    if(arr[i].id=="block1"){
        World.setBlock(x, y, z, BlockID.block1, 0);
    }
    if(arr[i].id=="werep"){
        World.setBlock(x, y, z, BlockID.werep, 0);
    }
});
} 
} 
});


Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id==ItemID.Gem){
if(World.getBlock(coords.x, coords.y, coords.z).id == BlockID.block1) {
var pos = GenerationUtils.findHighSurface(coords.x, coords.z);
Entity.setPosition(Player.get(), pos.x, pos.y+2, pos.z);
Dimensions.transfer(Player.get(), rai1.id);
Player.decreaseCarriedItem();
Player.setCarriedItem(ItemID.GemEarth, 1);
Entity.addEffect(Player.get(), Native.PotionEffect.damageResistance, 10, 1000);
} 
}
});
Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id==ItemID.Gem2){
if(World.getBlock(coords.x, coords.y, coords.z).id == BlockID.block1) {
var pos = GenerationUtils.findHighSurface(coords.x, coords.z);
Entity.setPosition(Player.get(), pos.x, pos.y+2, pos.z);
Dimensions.transfer(Player.get(), rai1.id);
Player.decreaseCarriedItem();
Player.setCarriedItem(ItemID.GemEarth2, 1);
Entity.addEffect(Player.get(), Native.PotionEffect.damageResistance, 10, 1000);
} 
}
});
Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id==ItemID.GemEarth){
var pos = GenerationUtils.findHighSurface(coords.x, coords.z);
Entity.setPosition(Player.get(), pos.x, pos.y+2, pos.z);
Dimensions.transfer(Player.get(), 0);
Player.decreaseCarriedItem();
}
});
Callback.addCallback("ItemUse", function(coords, item){ 
if(item.id==ItemID.GemEarth2){
var pos = GenerationUtils.findHighSurface(coords.x, coords.z);
Entity.setPosition(Player.get(), pos.x, pos.y+2, pos.z);
Dimensions.transfer(Player.get(), 0);
Player.decreaseCarriedItem();
Player.setCarriedItem(ItemID.Gem2, 1);
}
});




// file: dimension/EnchantedForest/register.js

var EnchantedForest = new Dimensions.CustomDimension("EnchantedForest", 1347); 
EnchantedForest.setSkyColor(98, 98, 98);
EnchantedForest.setFogColor(98, 98, 98); 
 
EnchantedForest.setGenerator(Dimensions.newGenerator({
    layers: [
        {
            minY: 0, maxY: 80, 
            yConversion: [[0, 1], [1, -1]],
            material: {base: BlockID.stone2, surface: {id:BlockID.dirt2, data: 0, width:4}, cover: BlockID.grass2}, 
            noise: {
                octaves: {count: 4, scale: 6}
            }
        }
    ]
}));





var EnchantedForest_particle = Particles.registerParticleType({
 texture: "EnchantedForest_particle",
 render: 2,
 size:[4, 10],
 lifetime: [40, 100],
 animators: {
  alpha:{fadeIn: .4, fadeOut: .4},
  size:{fadeOut: .5, fadeIn:0.2, start:0, end:0}
 }
});

Callback.addCallback("tick", function() {
let dimension = Player.getDimension();
if(dimension==EnchantedForest.id) {
let coords = Player.getPosition();

Particles.addFarParticle(EnchantedForest_particle, coords.x+Math.random() * 20 - Math.random() * 20, coords.y+Math.random() * 5 - Math.random() * 5, coords.z+Math.random() * 20 - Math.random() * 20, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, 0);

Particles.addFarParticle(EnchantedForest_particle, coords.x+Math.random() * 20 - Math.random() * 20, coords.y+Math.random() * 5 - Math.random() * 5, coords.z+Math.random() * 20 - Math.random() * 20, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, 0);

Particles.addFarParticle(EnchantedForest_particle, coords.x+Math.random() * 20 - Math.random() * 20, coords.y+Math.random() * 5 - Math.random() * 5, coords.z+Math.random() * 20 - Math.random() * 20, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, 0);

Particles.addFarParticle(EnchantedForest_particle, coords.x+Math.random() * 20 - Math.random() * 20, coords.y+Math.random() * 5 - Math.random() * 5, coords.z+Math.random() * 20 - Math.random() * 20, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, Math.random()*0.1-Math.random()*0.1, 0);

} 
});














// file: dimension/EnchantedForest/block.js

IDRegistry.genBlockID("BlockSoul");
Block.createBlock("BlockSoul", [ {name: "Block soul", texture: [["brick2", 0]], inCreative: false}]);

Translation.addTranslation("Block soul", {ru: "блок душ"});

Block.setDestroyTime(BlockID.BlockSoul, 1);

Block.registerDropFunctionForID(BlockID.BlockSoul, function(coords, id, data, diggingLevel, toolLevel){
     return [[0, 0, 0]];
});

Callback.addCallback('DestroyBlockContinue', function (coords, block, player) {
if(block.id==BlockID.BlockSoul) {
for(i = 0;i < 4;i++) {
Particles.addFarParticle(manaParticle, coords.x+Math.random(), coords.y+0.6+Math.random(), coords.z+Math.random(), Math.random()-Math.random(), Math.random(), Math.random()-Math.random(), 0);
} 
mana++;
World.getTileEntity(coords.x, coords.y, coords.z).data.des++;
}
});

TileEntity.registerPrototype(BlockID.BlockSoul, {
     defaultValues: {
          des: 0
     },
     tick: function(){
         if(this.data.des > 100){
          World.setBlock(this.x, this.y, this.z);
    } 
}, 
});




// file: integration.js

ModAPI.addAPICallback("TreeCapitator", function(api){
	api.registerTree([BlockID.Breastya, -1], [BlockID.Foliage, -1]);
});
ModAPI.addAPICallback("VeinMinerBlocks", function(api){
	api.VeinMinerBlocks += BlockID.ore;
});




// file: API/shared.js

var DC = {
getItem: function () {
return ItemID;
}, 
getBlock: function () {
return BlockID;
} 
};

ModAPI.registerAPI("DungeonAPI", {
DungeonAPI: DungeonAPI,
ItemGenerate: ItemGenerate, 
BlockSet: BlockSet,
dungeonRuneCtol: dungeonRuneCtol, 
renderAPI: renderAPI, 
ritual: ritual, 
RitualAPI: RitualAPI, 
RuneAPI: RuneAPI, 
dungeon1: dungeon1, 
DC: DC
});














