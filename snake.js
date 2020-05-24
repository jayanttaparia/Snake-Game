function init() {
	canvas = document.getElementById('mycanvas')
	W = canvas.width = H = canvas.height = 900
	pen = canvas.getContext('2d')
	score = 0
	game_over = false
	cs = 66	//cell width of snake

	food_img = new Image()
	trophy_img = new Image()
	food_img.src = "Assets/apple.png"
	trophy_img.src = "Assets/trophy.png"

	food = getRandomFood()

	snake = {
		init_len : 5,
		color :"blue",
		direction : "right",
		cells : [],

		createSnake:function(){
			for(var i = this.init_len; i>0; i--){
				this.cells.push({x:i, y:0})
			}
		},

		drawSnake:function(){
			for(var i=0; i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x * cs, this.cells[i].y*cs , cs-3, cs-3);
			}	
		},

		updateSnake:function(){

			var headX = this.cells[0].x
			var headY = this.cells[0].y

			var nextX, nextY;
			if(this.direction == "right"){
				nextX = headX+1
				nextY = headY
			}else if (this.direction == "left"){
				nextX = headX-1
				nextY = headY
			}else if (this.direction == "down"){
				nextX = headX
				nextY = headY+1
			}else{
				nextX = headX
				nextY = headY-1
			}
			
			if((nextX*cs >= W) || (nextX*cs < 0) || (nextY*cs >= H) || (nextY*cs < 0)){
				console.log("game over")
				game_over = true;
				return;
			}else if(headX == food.x && headY == food.y){
				score++
				getRandomFood()
				this.cells.unshift({x:nextX,y:nextY})
			}else {
				for(var i=1;i<this.cells.length;i++){
					if(headX == this.cells[i].x && headY==this.cells[i].y){
						console.log("game over")
						game_over = true;
						return;
					}
				}

				this.cells.pop();
				this.cells.unshift({x:nextX,y:nextY})
			}
		}
	};

	function keypressed(e) {
		if(e.key == 'ArrowRight'){
			if(snake.direction != "left")
				snake.direction = "right";
		}
		else if(e.key == 'ArrowLeft'){
			if(snake.direction != "right")
				snake.direction = "left";
		}
		else if(e.key == 'ArrowDown'){
			if(snake.direction != "up")
				snake.direction = "down";
		}
		else if(e.key == 'ArrowUp'){
			if(snake.direction != "down")
				snake.direction = "up";
		}


		console.log("key pressed",e.key,"direction=",snake.direction);
	}


	snake.createSnake();
	document.addEventListener('keydown',keypressed);
}

function draw() {
	// console.log("in draw")
	pen.clearRect(0,0,W,H)
	snake.drawSnake()

	// food.drawFood()
	// pen.fillStyle = food.color
	pen.drawImage(food_img, food.x*cs,food.y*cs,cs,cs);

	pen.fillStyle = "black"
	pen.font = "25px Roboto"
	pen.drawImage(trophy_img,0,0,cs,cs)
	pen.fillText(score, 25, 33)
}

function update() {
	// console.log("in update")	
	snake.updateSnake();
}

function getRandomFood() {
	var foodX = Math.round(Math.random()*(W-cs)/cs)
	var foodY = Math.round(Math.random()*(H-cs)/cs)
	food = {
		x:foodX,
		y:foodY,
		color:"red",
		drawFood:function(){
			console.log("drawing food")
		}
	}
	return food
}

function gameloop() {
	// console.log("in gameloop")
	if(game_over){
		clearInterval(f)

		// alert("Game Over\nYour score : "+score);
		var r = confirm("Game Over\nYour score : "+score);
		if (r == true) {
			playAgain()
		} else {
		  txt = "You pressed Cancel!";
		}
	}
	draw()
	update()
}

function playAgain() {
	init()
	f =  setInterval(gameloop,120);
}

init()
f =  setInterval(gameloop,120);
