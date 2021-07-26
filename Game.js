class Game {
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref("GameState");
        gameStateRef.on("value", function (data){
            gameState = data.val();
        })
    }

    update(state){
        var gameStateRef = database.ref("/");
        gameStateRef.update({
            GameState:state
        })
    }

    start(){
        if(gameState === 0){
           player = new Player();
           player.getCount();
           form = new Form();
           form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage(car1Img);
        car2 = createSprite(300,200);
        car2.addImage(car2Img);
        car3 = createSprite(500,200);
        car3.addImage(car3Img);
        car4 = createSprite(700,200);
        car4.addImage(car4Img);
        cars = [car1,car2,car3,car4];
    }

    play(){
        form.greeting.hide();
        form.input.hide();
        form.button.hide();

        textSize(30);
        text("Game Starts",120,100);
        Player.getPlayersInfo();
        player.getCarsAtEnd();

        if(allPlayersInfo !== undefined){
            background("#c68767");
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
            var x = 200;
            var y = 0;
            var index = 0;
            for(var plr in allPlayersInfo){
                index+=1;
                x+=220;
                y = displayHeight - allPlayersInfo[plr].Distance - 150;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                //console.log(player.index);
                if(index === player.index){
                    //cars[index - 1].shapeColor = "Red";
                    fill("red");
                    stroke(10);
                    ellipse(x,y,80,80);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            }
        }

        if(keyDown(UP_ARROW) && player.index !== 0) {
            player.distance+= 50;
            player.update();
        }

        if(player.distance>4050) {
            gameState = 2;
            player.rank+=1;
            Player.updateCarsAtEnd(player.rank);
            console.log(player.rank);
        }

        drawSprites();
    }
    
    end(){
        textSize(20);
        fill("red");
        text(player.rank,displayWidth/2-20, -(displayHeight*4 + 30));
    }
}