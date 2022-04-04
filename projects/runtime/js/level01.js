var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            'name': 'Robot Romp',
            'number': 1, 
            'speed': -3,
            'gameItems': [
                { 'type': 'sawblade', 'x': 400, 'y': groundY - 50}, // adds the saw blades into my game
                { 'type': 'sawblade', 'x': 600, 'y': groundY - 50}, // adds the saw blades into my game
                { 'type': 'sawblade', 'x': 900, 'y': groundY - 50}, // adds the saw blades into my game
                
                { 'type': 'enemy', 'x': 500, 'y': groundY - 50}, // adds the enemy into my game
               
                {'type': 'reward', 'x': 400, 'y': groundY - 50}, // adds the reward into my game 
                
            
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 25; //creates size of hitzone
            var damageFromObstacle = 10; // sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates the hitzone and stores it in this variable
            sawBladeHitZone.x = x; // the x pos of the hitzone
            sawBladeHitZone.y = y; // the y pos of the hitzone
            game.addGameItem(sawBladeHitZone); // add the hitzone to the game    
            
            var obstacleImage = draw.bitmap('img/sawblade.png'); // drawing the image and storing in the varibale
            sawBladeHitZone.addChild(obstacleImage); // add the image to the hitzone so we can see it
           
            obstacleImage.x = -25; // tweaks the image 25 pixels to the left
            obstacleImage.y -25; // tweaks the image 25 pixles up
            //sawBladeHitZone.rotationalVelocity = 5;    
            obstacleImage.scaleX = 0.2; // control the size of the obstacle
            obstacleImage.scaleY = 0.2; // controls the geight of the obstacle
        };
        
        function createEnemy(x,y){
           var enemy = game.createGameItem('enemy' ,25); // creating the game item and storing it in the 
           var redSquare = draw.rect(50,50, 'red'); // creates rect and stores as redSquare
           var redSquare = draw.bitmap('img/Jaguar.png')
           redSquare.x = -25; // x pos of the hitzone in reference in Images' x
           redSquare.y = -25; // y pos of the hitzone in reference in Images' y
           enemy.addChild(redSquare); // add redSquare the enemy game item


           enemy.x = x; // changes the enemies x pos to x
           enemy.y = y; // changes the enemies y pos to y

           enemy.scaleX = 0.1; // control the size of the enemy
           enemy.scaleY = 0.1; // controls the height of the enemy


           game.addGameItem(enemy); // adds enemy to the game

           enemy.velocityX = -1; // causes the enemy to move 1 pixel to left on the x pos


           enemy.onPlayerCollision = function(){ // detects if teh player has collided with the
               console.log('The enemy has hit Halle');
               game.changeIntegrity(-20); // takes away health from the enemy
            };
        
       
           enemy.onProjectileCollision = function(){ // detects if projectile is colliding with
               console.log('The projectile hit the Halle');
               game.changeIntegrity(5); // adds health if projectile collides with enemy 
               game.increaseScore(100); // increases score if teh projecile collides with enemy
               enemy.fadeOut(); // maes the enemy disappear if hit
           };

        }
        function createReward(x,y){
            var reward = game.createGameItem('reward',60); // creating the game isn't and storing it in the variable reward.
            var blueSquare = draw.bitmap('img/Bananas.png'); // creates rectangle and stores as blueSquare
            blueSquare.x = -25;
            blueSquare.y = -25;
            reward.addChild(blueSquare); // add the blue square to the reward game item
            
            reward.scaleX = 0.2; // control the size of the reward
            reward.scaleY = 0.2; // changes the height of the reward

            reward.x = x; // changes the reward x pos to x
            reward.y = y; // changes the reward y pos to y

            game.addGameItem(reward); // adds reward to the game
            
            reward.velocityX = -1; // this causes the reward to move one pixel to the left on the x position
            //reward.rotationalVelocity.x = 5;

            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(10);
            };    

            reward.onProjectileCollision = function() {
                console.log('The projectile has hit the reward');
                game.changeIntegrity(5);
                game.increaseScore(10);
                reward.fadeOut();
            };    
         }


        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === 'sawblade'){
                createSawBlade(gameItem.x, gameItem.y);
            }
            if (gameItem.type === 'enemy'){
                createEnemy(gameItem.x, gameItem.y);
            }
            if (gameItem.type === 'reward'){
                createReward(gameItem.x, gameItem.y);
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
};
