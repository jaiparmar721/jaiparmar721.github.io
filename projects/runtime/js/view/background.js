var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'yellow');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png'); // created a var called moon. draw.bitmap draws the mooon adn stores it in the variable
                moon.x = - 300; // control the left and right of the postion of the moon
                moon.y = - 450; // controls the up and down position of the moon
                moon.scaleX = 0.5; // changes the x scale of the moon
                moon.scaleY = 0.5; // changes the y scale of the moon
                background.addChild(moon); // adds the moon to the background
            }
            
                // everything this loop runs it creats a circle with a randome x and y respective to teh canvas and add to the 
                for(var i = 0; i <= 100; i++){
                    var circle = draw.circle(10,'white','LightGray',2); // creates a var called circle that holds each circle
                    circle.x = canvasWidth*Math.random(); // multiples canvasWidth * a random decimal between .1 and .99 and assigns it to circle.x
                    circle.y = groundY*Math.random(); // multiples groundY * a random decimal between .1 and .99 and assigns it to circle.y
                    background.addChild(circle);
                }    
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<5;++i) {
                var buildingHeight = 300; // crates a var called buildingHeight tha holds the height of the buillding in pixles
                var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // creates a variable called building tha holds the data for the drawBuilding
                building.x = 200*i; // positions the x of each building 200 pixels from the next building that holds the data for the drawbuilding 
                building.y = groundY-buildingHeight; // sets the y of the buildings on each loop
                background.addChild(building); // adds the building to the background so it can be seen
                buildings.push(building); // pushes each induvidual building for the building array 
            }
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");
            tree.x = 0;
            tree.y = 0;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x + 1 // taking the value of tree

            if(tree.x < -200){
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
           
            // loops the buildings and moves them to the left by 0.5 pixels
            
           for (var i = 0; i < buildings.length; i++){
                buildings[i].x - 0.5; //moves the building's x position by .5 pixels
                if(buildings[i].x < 0){ // checks to see if the building's x pos is off the left side and if it is it resets the right side.
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
