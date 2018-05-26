var player1_name="";
var player2_name="";

var land_piece;
var cloud_img;
var tank;
var mountain;
var arrow=false;
var aim1;
var aim2;

var weapon="";

var shot1=false;
var shot2=false;

var fire=false;
var explosion=false;

var takeshot;
var atombomb_sound;
var fireball_sound;
var sniper;
var background_music;
var pause_menu_sound;
var winner_sound;
var tie_game_sound;

var turn=1;
var score_1=0;
var score_2=0;
var volley_count=1;
var suffix="";

var pause=false;
var text=false;
var winner=false;

var score_display=false;

function game_data() {
	document.getElementById("player1_name").focus();
}
function startGame() {
	game_area.start();
    land_piece = new component(800,20, "#827B60", 0, 280);
	cloud_img = new add_cloud(-120);
	tank = new add_tank();
	var start_x=Math.floor(Math.random() * 100)+70;
	var end_x=730-Math.floor(Math.random() * 100);
	var gap=Math.floor(Math.random() * 10)+5;
	mountain = new add_mountain(start_x,end_x,gap);
	arrow = new add_arrow();
	aim1 = new load_aim();
	aim2 = new load_aim();
	document.getElementById("player_1_name").innerHTML=player1_name;
	document.getElementById("player_2_name").innerHTML=player2_name;
	document.getElementById("player_1_score").innerHTML=score_1;
	document.getElementById("player_2_score").innerHTML=score_2;
	document.getElementById("volley_count").innerHTML=suffix+ " Volley";
	atombomb_sound = new sound("./atomshot.mp3");
	fireball_sound = new sound("./fire.mp3");
	takeshot=new sound("takeshot.mp3");
	sniper= new sound ("sniper.mp3");
	background_music=new sound("bgmusic.mp3");
	background_music.play();
	pause_menu_sound=new sound ("pause.mp3");
	winner_sound=new sound ("win.mp3");
	tie_game_sound=new sound ("tie.mp3");
}

var game_area = {
    canvas : document.getElementById("game_canvas"),
    start : function() {
		this.canvas.width=800;
		this.canvas.height=300;
		this.canvas.style.border="1px solid #000";
		this.canvas.style.borderTop="0px";
        this.context = this.canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx = game_area.context;
		grd=ctx.createLinearGradient(0,0,0,300);
		grd.addColorStop(0,"#1589FF");
		grd.addColorStop(1,"#ADDFFF");
		ctx.fillStyle=grd;
        ctx.fillRect(0,0,800,300);
    },
	stop : function() {
        clearInterval(this.interval);
    },
	resume : function() {
		this.interval = setInterval(updateGameArea,33);
	}
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
	if(src=="bgmusic.mp3") {
		this.sound.loop=true;
		this.sound.volume=0.5;
	}
	else
	if(src=="pause.mp3"||src=="tie.mp3") {
		this.sound.loop=true;
	}
    this.sound.style.display = "none";
    document.getElementById("canvas_container").appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
	this.update = function(){
		ctx = game_area.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

function add_cloud(x) {
    img=document.getElementById("Cloud");
	this.x=x;
	this.update = function(){
		ctx = game_area.context;
		ctx.drawImage(img,this.x,10);
	}
}

function add_tank() {
    tank1=document.getElementById("tank_1");
	tank2=document.getElementById("tank_2");
	this.update = function(){
		ctx = game_area.context;
		ctx.drawImage(tank1,20,265,50,25);
		ctx.drawImage(tank2,730,265,50,25);
	}
}

function add_arrow() {
	this.dy=2;
	this.y=200;
    arrow_img=document.getElementById("arrow");
	this.update = function(){
		if(turn==1) { 
			this.x=37;
			document.getElementById("player_1_name").style.color="#f3eb00";
			document.getElementById("player_1_name").style.textShadow="2px 2px 2px #636363";
		}
		else {
			this.x=747;
			document.getElementById("player_2_name").style.color="#f3eb00";
			document.getElementById("player_2_name").style.textShadow="2px 2px 2px #636363";
		}
		this.y+=this.dy;
		if(this.y>206)
			this.dy=-2;
		if(this.y<194)
			this.dy=2;
		ctx = game_area.context;
		ctx.drawImage(arrow_img,this.x,this.y,20,30);
	}
}

function load_aim() {
	this.update = function(x,y,angle){
		this.angle=angle*0.0175;
		this.x=x;
		this.y=y;
		this.add_x=15*Math.cos(this.angle);
		this.add_x+=this.x;
		this.add_y=15*Math.sin(this.angle);
		this.add_y=this.y-this.add_y;
		ctx = game_area.context;
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.add_x,this.add_y);
		ctx.lineCap = 'round';
		ctx.lineWidth = 3;
		ctx.strokeStyle="#000";
		ctx.stroke();
	}
}

function add_mountain(x,y,gap) {
	this.start_x=x;
	this.y=300;
	this.end_x=y; 
	this.gap=gap;
	this.node_x1=this.start_x+gap*6;
	this.node_x2=this.start_x+gap*10;
	this.node_x3=this.start_x+gap*15;
	this.node_x4=this.start_x+gap*20;
	this.node_x5=this.start_x+gap*27;
	this.node_x6=this.start_x+gap*35;
	this.node_x7=this.start_x+gap*42;
	
	this.node_cx1=this.start_x+gap*4;
	this.node_cx2=this.start_x+gap*8;
	this.node_cx3=this.start_x+gap*12;
	this.node_cx4=this.start_x+gap*17;
	this.node_cx5=this.start_x+gap*24;
	this.node_cx6=this.start_x+gap*30;
	this.node_cx7=this.start_x+gap*40;
	this.node_cx8=this.start_x+gap*43;
	
	this.node_cy1=260+gap;
	this.node_cy2=228+gap;
	this.node_cy3=200;
	this.node_cy4=140+gap;
	this.node_cy5=70+gap;
	this.node_cy6=120+gap;
	this.node_cy7=220+gap;
	this.node_cy8=220+gap;
	
	this.node_y1=250+gap;
	this.node_y2=230+gap;
	this.node_y3=190+gap;
	this.node_y4=100+gap*5;
	this.node_y5=80+gap*10;
	this.node_y6=180+gap;
	this.node_y7=240+gap;
	this.update = function(){
		ctx = game_area.context;
		grd=ctx.createLinearGradient(0,0,0,282);
		grd.addColorStop(0,"#5FFB17");
		grd.addColorStop(0.15,"#5FFB17");
		grd.addColorStop(0.30,"#4CC417");
		grd.addColorStop(0.80,"#348017");
		grd.addColorStop(0.90,"#347C2C");
		grd.addColorStop(1,"#254117");
		ctx.beginPath();
		ctx.moveTo(this.start_x, this.y);
		ctx.quadraticCurveTo(this.node_cx1,this.node_cy1,this.node_x1,this.node_y1);
		ctx.lineTo(this.start_x, this.y);
		ctx.moveTo(this.node_x1, this.node_y1);
		ctx.quadraticCurveTo(this.node_cx2,this.node_cy2,this.node_x2,this.node_y2);
		ctx.lineTo(this.start_x, this.y);
		ctx.moveTo(this.node_x2, this.node_y2);
		ctx.quadraticCurveTo(this.node_cx3,this.node_cy3,this.node_x3,this.node_y3);
		ctx.lineTo(this.start_x, this.y);
		ctx.moveTo(this.node_x3, this.node_y3);
		ctx.quadraticCurveTo(this.node_cx4,this.node_cy4,this.node_x4,this.node_y4);
		ctx.lineTo(this.start_x, this.y);
		ctx.moveTo(this.node_x4, this.node_y4);
		ctx.quadraticCurveTo(this.node_cx5,this.node_cy5,this.node_x5,this.node_y5);
		ctx.lineTo(this.start_x, this.y);
		ctx.moveTo(this.node_x5, this.node_y5);
		ctx.quadraticCurveTo(this.node_cx6,this.node_cy6,this.node_x6,this.node_y6);
		ctx.lineTo(this.start_x, this.y);
		ctx.moveTo(this.node_x6, this.node_y6);
		ctx.quadraticCurveTo(this.node_cx7,this.node_cy7,this.node_x7,this.node_y7);
		ctx.lineTo(this.start_x,this.y);
		ctx.moveTo(this.node_x7, this.node_y7);
		ctx.quadraticCurveTo(this.node_cx8,this.node_cy8,this.end_x,this.y);
		ctx.lineTo(this.start_x, this.y);
		ctx.closePath();
		ctx.fillStyle=grd;
		ctx.fill();
	}
}

function add_score(text,condition) {
		this.text=text
		this.x=0;
		if(turn==2)
			this.x=750;
		else
			this.x=40;
		this.color="#0041C2";
		if(condition=="danger") {
			this.color="red";
			if(turn==2)
				this.x=40;
			else
				this.x=750;
		}
		this.y=260;
		this.dy=-2;
		this.update = function(){
			this.y+=this.dy;
			ctx = game_area.context;
			ctx.font="bold 15px Arial";
			ctx.fillStyle = this.color;
			ctx.textAlign = "center";
			ctx.fillText(this.text,this.x,this.y);		
			if(this.y<200)
				score_display=false;
	}
}


function add_atom(x,score,status) {
	this.x=x;
	this.ctx=game_area.context;
	this.cycle=0;
	this.startx=0;
	this.starty=0;
	explosion_img=document.getElementById("atom");
	this.start_time=Date.now();
	this.update = function(){
		this.current_time=Date.now();
		this.millis=this.current_time-this.start_time;
		this.seconds=(this.millis/150);
		if(this.seconds<=11) {
			ctx.drawImage(explosion_img,this.startx,this.starty,192,197,this.x,262,90,35);
			this.startx+=192;
			if(this.startx>=768) {
				this.startx=0;
				this.starty+=197;
				if(this.starty>=551)
					this.starty=0;
			}
		}
		else {
			explosion=false;
			if(turn==2){
				if(this.x==0) {
					score_display=new add_score(-score,status);
					score_1-=score;
				}
				else
				if(this.x==712||this.x==707) {
					score_display=new add_score(score,status);
					score_1+=score;	
				}
			}
			if(turn==1){
				if(this.x==712||this.x==707) {
					score_display=new add_score(-score,status);
					score_2-=score;
				}
				else
				if(this.x==0) {
					score_display=new add_score(score,status);
					score_2+=score;	
				}
			volley_count++;
			}
			document.getElementById("fire_1").disabled=false;
			document.getElementById("fire_2").disabled=false;
			document.getElementById("play_pause").disabled=false;
			arrow=new add_arrow();
		}
	}
}


function add_fire(x,score,status) {
	this.x=x;
	this.ctx=game_area.context;
	this.cycle=0;
	this.startx=0;
	this.starty=0;
	fire_img=document.getElementById("fire");
	this.start_time=Date.now();
	this.update = function(){
		this.current_time=Date.now();
		this.millis=this.current_time-this.start_time;
		this.seconds=(this.millis/150);
		if(this.seconds<=30) {
			ctx.drawImage(fire_img,this.startx,this.starty,64,80.5,this.x,260,90,35);
			this.startx+=64;
			if(this.startx>=448) {
				this.startx=0;
				this.starty+=80.5;
				if(this.starty>=241.5)
					this.starty=0;
			}
		}
		else {
			fireball_sound.stop();
			fire=false;
			if(turn==2){
				if(this.x==0) {
					score_display=new add_score(-score,status);
					score_1-=score;
				}
				else
				if(this.x==712) {
					score_display=new add_score(score,status);
					score_1+=score;	
				}
			}
			if(turn==1){
				if(this.x==712) {
					score_display=new add_score(-score,status);
					score_2-=score;
				}
				else
				if(this.x==0) {
					score_display=new add_score(score,status);
					score_2+=score;	
				}
			volley_count++;
			}
			document.getElementById("fire_1").disabled=false;
			document.getElementById("fire_2").disabled=false;
			arrow=new add_arrow();
			document.getElementById("play_pause").disabled=false;
		}
	}
}

function shot_create(x,y,angle,power) {
	this.initial_x=x;
	this.initial_y=y;
	this.angle=angle*0.0175;
	this.power=power;
	if(this.power>100)
		this.power=100;
	if(this.power<0)
		this.power=0;
	this.u_x=this.power*Math.cos(this.angle);
	this.u_y=this.power*Math.sin(this.angle);
	this.time_of_flight=2*this.u_y/10;
	this.start_time=Date.now();
	this.x=x;
	this.y=y;
	this.score=0;
	
	this.radius=5;
	this.color="#000";
	this.update = function(){
		this.current_time=Date.now();
		this.millis=this.current_time-this.start_time;
		this.seconds=(this.millis/150);
		this.x=this.initial_x+this.u_x*(this.seconds);
		this.y=this.initial_y-(this.u_y*this.seconds)+(5*this.seconds*this.seconds);
		
		if(this.y>=265&&this.y<=280) {
				if(this.seconds>Math.abs(this.time_of_flight/2)){
					if(this.x>=720&&this.x<=790) {
						shot1=false;
						shot2=false;
						if((this.x>=720&&this.x<740)||(this.x>770&&this.x<=790)) {
							if(weapon=="SmallShot") {
								this.score=20;
							}
							else 
							if(weapon=="BigShot") {
								this.score=40;
							}
							else 
							if(weapon=="AtomBomb") {
								this.score=100;
							}
							else 
							if(weapon=="FireBall") {
								this.score=70;
							}
							else 
							if(weapon=="Sniper") {
								this.score=50;
							} 
						}
						else {
							if(weapon=="SmallShot") {
								this.score=50;
							}
							else 
							if(weapon=="BigShot") {
								this.score=70;
							}
							else 
							if(weapon=="AtomBomb") {
								this.score=150;
							}
							else 
							if(weapon=="FireBall") {
								this.score=100;
							}
							else 
							if(weapon=="Sniper") {
								this.score=120;
							} 	
						}
						if(turn==2){
							if(weapon=="FireBall") {
								fire=new add_fire(712,this.score,"plus");
								fireball_sound.play();
							}
							else
							if(weapon=="AtomBomb") {
								explosion=new add_atom(707,this.score,"plus");
								atombomb_sound.play();
							}
							else {
								score_display=new add_score(this.score,"plus");
								score_1+=this.score;	
								document.getElementById("fire_1").disabled=false;
								document.getElementById("fire_2").disabled=false;
								arrow=new add_arrow();
								document.getElementById("play_pause").disabled=false;
							}
						}
						else if(turn==1) {
							if(weapon=="FireBall") {
								fire=new add_fire(712,this.score,"danger");
								fireball_sound.play();
							}
							else
							if(weapon=="AtomBomb") {
								explosion=new add_atom(707,this.score,"danger");
								atombomb_sound.play();
							}
							else {
								score_display=new add_score(-this.score,"danger");
								score_2-=this.score;	
								document.getElementById("fire_1").disabled=false;
								document.getElementById("fire_2").disabled=false;
								arrow=new add_arrow();
								document.getElementById("play_pause").disabled=false;
								volley_count++;
							}
						}
					}
					else
					if(this.x>=10&&this.x<=90) {
						shot1=false;
						shot2=false;
						if((this.x>=10&&this.x<30)||(this.x>70&&this.x<=90)) {
							if(weapon=="SmallShot") {
								this.score=20;
							}
							else 
							if(weapon=="BigShot") {
								this.score=40;
							}
							else 
							if(weapon=="AtomBomb") {
								this.score=100;
							}
							else 
							if(weapon=="FireBall") {
								this.score=70;
							}
							else 
							if(weapon=="Sniper") {
								this.score=50;
							} 
						}
						else {
							if(weapon=="SmallShot") {
								this.score=50;
							}
							else 
							if(weapon=="BigShot") {
								this.score=70;
							}
							else 
							if(weapon=="AtomBomb") {
								this.score=150;
							}
							else 
							if(weapon=="FireBall") {
								this.score=100;
							}
							else 
							if(weapon=="Sniper") {
								this.score=120;
							} 		
						}
						if(turn==2) {
							if(weapon=="FireBall") {
								fire=new add_fire(0,this.score,"danger");
								fireball_sound.play();
							}
							else
							if(weapon=="AtomBomb") {
								explosion=new add_atom(0,this.score,"danger");
								atombomb_sound.play();
							}
							else {
								score_display=new add_score(-this.score,"danger");
								score_1-=this.score;	
								document.getElementById("fire_1").disabled=false;
								document.getElementById("fire_2").disabled=false;
								arrow=new add_arrow();
								document.getElementById("play_pause").disabled=false;
							}
						}
						else if(turn==1) {
							if(weapon=="FireBall") {
								fire=new add_fire(0,this.score,"plus");
								fireball_sound.play();
							}
							else
							if(weapon=="AtomBomb") {
								explosion=new add_atom(0,this.score,"plus");
								atombomb_sound.play();
							}
							else {
								score_display=new add_score(this.score,"plus");
								score_2+=this.score;	
								document.getElementById("fire_1").disabled=false;
								document.getElementById("fire_2").disabled=false;
								arrow=new add_arrow();
								document.getElementById("play_pause").disabled=false;
								volley_count++;
							}
							
						}
					}	
				}				
		}
		else
		if((this.y>270)||(this.x>800)||(this.x<0)) {
			shot1=false;
			shot2=false;
			if(turn==1) {
				document.getElementById("fire_1").disabled=false;
				volley_count++;
				
			}
			else
			document.getElementById("fire_2").disabled=false;
			arrow=new add_arrow();
			document.getElementById("play_pause").disabled=false;
		}
		if(this.x>=mountain.start_x&&this.x<=mountain.end_x) {
			if(this.x>=mountain.start_x&&this.x<=mountain.node_cx1) {
				if(this.y>=mountain.node_cy1) {
					var m = (mountain.node_cy1 - mountain.y)/(mountain.node_cx1-mountain.start_x);
					var val = (this.y-mountain.y)- (m*(this.x-mountain.start_x));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
					    arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx1&&this.x<=mountain.node_x1) {
				if(this.y>=mountain.node_y1) {
					var m = (mountain.node_y1 - mountain.node_cy1)/(mountain.node_x1-mountain.node_cx1);
					var val = (this.y-mountain.node_cy1)- (m*(this.x-mountain.node_cx1));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x1&&this.x<=mountain.node_cx2) {
				if(this.y>=mountain.node_cy2) {
					var m = (mountain.node_cy2 - mountain.node_y1)/(mountain.node_cx2-mountain.node_x1);
					var val = (this.y-mountain.node_y1)- (m*(this.x-mountain.node_x1));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx2&&this.x<=mountain.node_x2) {
				if(this.y>=mountain.node_y2) {
					var m = (mountain.node_y2 - mountain.node_cy2)/(mountain.node_x2-mountain.node_cx2);
					var val = (this.y-mountain.node_cy2)- (m*(this.x-mountain.node_cx2));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x2&&this.x<=mountain.node_cx3) {
				if(this.y>=mountain.node_cy3) {
					var m = (mountain.node_cy3 - mountain.node_y2)/(mountain.node_cx3-mountain.node_x2);
					var val = (this.y-mountain.node_y2)- (m*(this.x-mountain.node_x2));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx3&&this.x<=mountain.node_x3) {
				if(this.y>=mountain.node_y3) {
					var m = (mountain.node_y3 - mountain.node_cy3)/(mountain.node_x3-mountain.node_cx3);
					var val = (this.y-mountain.node_cy3)- (m*(this.x-mountain.node_cx3));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x3&&this.x<=mountain.node_cx4) {
				if(this.y>=mountain.node_cy4) {
					var m = (mountain.node_cy4 - mountain.node_y3)/(mountain.node_cx4-mountain.node_x3);
					var val = (this.y-mountain.node_y3)- (m*(this.x-mountain.node_x3));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx4&&this.x<=mountain.node_x4) {
				if(this.y>=mountain.node_y4) {
					var m = (mountain.node_y4 - mountain.node_cy4)/(mountain.node_x4-mountain.node_cx4);
					var val = (this.y-mountain.node_cy4)- (m*(this.x-mountain.node_cx4));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x4&&this.x<=mountain.node_cx5) {
				if(this.y>=mountain.node_cy5) {
					var m = (mountain.node_cy5 - mountain.node_y4)/(mountain.node_cx5-mountain.node_x4);
					var val = (this.y-mountain.node_y4)- (m*(this.x-mountain.node_x4));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx5&&this.x<=mountain.node_x5) {
				if(this.y>=mountain.node_cy5) {
					var m = (mountain.node_y5 - mountain.node_cy5)/(mountain.node_x5-mountain.node_cx5);
					var val = (this.y-mountain.node_cy5)- (m*(this.x-mountain.node_cx5));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x5&&this.x<=mountain.node_cx6) {
				if(this.y>=mountain.node_y5) {
					var m = (mountain.node_cy6 - mountain.node_y5)/(mountain.node_cx6-mountain.node_x5);
					var val = (this.y-mountain.node_y5)- (m*(this.x-mountain.node_x5));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx6&&this.x<=mountain.node_x6) {
				if(this.y>=mountain.node_cy5) {
					var m = (mountain.node_y6 - mountain.node_cy6)/(mountain.node_x6-mountain.node_cx6);
					var val = (this.y-mountain.node_cy6)- (m*(this.x-mountain.node_cx6));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x6&&this.x<=mountain.node_cx7) {
				if(this.y>=mountain.node_y6) {
					var m = (mountain.node_cy7 - mountain.node_y6)/(mountain.node_cx7-mountain.node_x6);
					var val = (this.y-mountain.node_y6)- (m*(this.x-mountain.node_x6));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx7&&this.x<=mountain.node_x7) {
				if(this.y>=mountain.node_cy7) {
					var m = (mountain.node_y7 - mountain.node_cy7)/(mountain.node_x7-mountain.node_cx7);
					var val = (this.y-mountain.node_cy7)- (m*(this.x-mountain.node_cx7));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_x7&&this.x<=mountain.node_cx8) {
				if(this.y>=mountain.node_y7) {
					var m = (mountain.node_cy8 - mountain.node_y7)/(mountain.node_cx8-mountain.node_x7);
					var val = (this.y-mountain.node_y7)- (m*(this.x-mountain.node_x7));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			else
			if(this.x>mountain.node_cx8&&this.x<=mountain.end_x) {
				if(this.y>=mountain.node_cy8) {
					var m = (mountain.y - mountain.node_cy8)/(mountain.end_x-mountain.node_cx8);
					var val = (this.y-mountain.node_cy8)- (m*(this.x-mountain.node_cx8));
					if(val>0) {
						shot1=false;
						shot2=false;
						if(turn==1) {
							document.getElementById("fire_1").disabled=false;
							volley_count++;
							
						}
						else
							document.getElementById("fire_2").disabled=false;
						arrow=new add_arrow();
						document.getElementById("play_pause").disabled=false;
				    }
				}
			}
			
		}
		ctx.beginPath();
		if(weapon=="SmallShot") {
			this.radius=3;
			this.color="#3b3b3b";
		}
		else
		if(weapon=="BigShot") {
			this.radius=5;
			this.color="#493D26";	
		}
		else
		if(weapon=="FireBall") {
			this.radius=5;
			this.color="#E42217";	
		}
		if(weapon!="AtomBomb") {
			ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
			ctx.fillStyle=this.color;
			ctx.fill();
			ctx.closePath();
		}
		else {
			ctx = game_area.context;
			atom_img=document.getElementById("atombomb");
			ctx.drawImage(atom_img,this.x,this.y,18,16);
		}
	}
}

function add_text(text,color="#000") {
		this.text=text;
		this.color=color;
		this.update = function(){
		ctx = game_area.context;
		ctx.font="bold 30px Arial";
		ctx.fillStyle = this.color;
        ctx.textAlign = "center";
		if(this.text=="GAME OVER"||this.text=="PAUSED")
			ctx.fillText(this.text,game_area.canvas.width/2,game_area.canvas.height/2);
		else
			ctx.fillText(this.text,game_area.canvas.width/2,game_area.canvas.height/2+40);
	}
}

function updateGameArea() {
    game_area.clear();
    land_piece.update();
	cloud_img.x+=0.2;
	if(cloud_img.x>=800)
		cloud_img.x=-120;
	cloud_img.update();
	tank.update();
	document.getElementById("player_1_score").innerHTML=score_1;
	document.getElementById("player_2_score").innerHTML=score_2;
	document.getElementById("volley_count").innerHTML=suffix+" Volley";
	mountain.update();
	if(arrow!=false)
		arrow.update();
	aim1.update(45,267,document.getElementById("angle_1").value);
	aim2.update(755,267,document.getElementById("angle_2").value);
	
	if(shot1!=false)
		shot1.update();
	if(shot2!=false)
		shot2.update();
	if(fire!=false)
		fire.update();
	if(explosion!=false)
		explosion.update();
	if(pause!=false)
		pause.update();
	if(score_display!=false)
		score_display.update();
    if(text!=false)
		text.update();
	if(winner!=false) {
		winner.update();
		game_area.stop();
	}
	else
		over_volley_check();
}

function show_winner() {
		background_music.stop();
		score_display=false;
		pause=new component(800,300,"#827b609e", 0,0);
		text=new add_text("GAME OVER");
		if(score_1>score_2) {
			winner=new add_text(player1_name+" WINS","red");
			winner_sound.play();
		}
		else
		if(score_1<score_2) {
			winner=new add_text(player2_name+" WINS","red");
			winner_sound.play();
		}
		else {
			winner=new add_text("TIE GAME","yellow");
			tie_game_sound.play();
		}
		document.getElementById("play_pause").style.display="none";
		document.getElementById("fire_1").disabled=true;
		document.getElementById("fire_2").disabled=true;
		updateGameArea();
		document.getElementById("volley_count").innerHTML="";
		game_area.stop();
		
}
function over_volley_check() {
	switch(volley_count) {
		case 1: suffix="1st";
				break;
		case 2: suffix="2nd";
				break;
		case 3: suffix="3rd";
				break;
		case 4: suffix="4th";
				break;
		case 5: suffix="Final";
				break;
		default: suffix="";
	}
	if(volley_count>5) {
		shot1=false;
		shot2=false;
		arrow=false;
		setTimeout(show_winner,800);
	}
}
function fire1() {
	document.getElementById("control_player1").style.display="none";
	document.getElementById("control_player2").style.display="block";
	document.getElementById("fire_2").disabled=true;
	document.getElementById("play_pause").disabled=true;
	document.getElementById("player_1_name").style.color="#000";
	document.getElementById("player_1_name").style.textShadow="none";
    ++turn;
	arrow=false;
	var select1=document.getElementById("wepaon_1");
	weapon=select1.value;
	select1.remove(select1.selectedIndex);
    shot1= new shot_create(45,267,document.getElementById("angle_1").value,document.getElementById("power_1").value);
	if(weapon!="Sniper")
		takeshot.play();
	else 
		sniper.play();
}

function fire2() {
	document.getElementById("control_player1").style.display="block";
	document.getElementById("control_player2").style.display="none";
	document.getElementById("fire_1").disabled=true;
	document.getElementById("play_pause").disabled=true;
	document.getElementById("player_2_name").style.color="#000";
	document.getElementById("player_2_name").style.textShadow="none";
	--turn;
	arrow=false;
	var select2=document.getElementById("wepaon_2");
	weapon=select2.value;
	select2.remove(select2.selectedIndex);
	shot2= new shot_create(755,267,document.getElementById("angle_2").value,document.getElementById("power_2").value);
	if(weapon!="Sniper")
		takeshot.play();
	else 
		sniper.play();
}

function ui_enable(x) {
	var val=document.getElementById("player"+x+"_name").value;
	if(val!="") {
		document.getElementById("pl"+x+"_name").style.height="15px";
	}
	else
		document.getElementById("pl"+x+"_name").style.height="0px";
}

function initiallize() {
	document.getElementById("loading").style.display="none";
	document.getElementById("welcome_screen").style.display="none";
	document.getElementById("game_container").style.display="block";
	startGame();
}
function submit_game_data() {
	player1_name=document.getElementById("player1_name").value;
	player2_name=document.getElementById("player2_name").value;
	if(player1_name==""||player2_name=="") {
		document.getElementById("error_box").style.display="block";
		if(player1_name=="")
			document.getElementById("player1_name").focus();
		else
			document.getElementById("player2_name").focus();
	}
	else
	if(player1_name!=""&&player2_name!="") {
		document.getElementById("error_box").style.display="none";
		document.getElementById("instruction").style.display="none";
		document.getElementById("input_container").style.display="none";
		document.getElementById("loading").style.display="block";
		setTimeout(initiallize, 500);
	}
}

function play_pause() {
	var val=document.getElementById("play_pause").value;
	if(val=="PAUSE"||val=="pause") {
		document.getElementById("play_pause").value="resume";
		document.getElementById("play_pause").style.background="green";
		document.getElementById("play_pause").style.color="#fff";
		pause=new component(800,300,"#827b609e", 0,0);
		text=new add_text("PAUSED");
		updateGameArea();
		game_area.stop();
		background_music.stop();
		pause_menu_sound.play();
	}
	else
    if(val=="RESUME"||val=="resume") {
		document.getElementById("play_pause").value="pause";
		document.getElementById("play_pause").style.background="#ddd";
		document.getElementById("play_pause").style.color="#000";
		pause=false;
		text=false;
		game_area.resume();
		background_music.play();
		pause_menu_sound.stop();
	}
}

function restart() {
}

function validate(id,category) {
	var value=document.getElementById(id).value;
	if(value<0)
		document.getElementById(id).value=0;
	if(category=="power") {
		if(value>100)
			document.getElementById(id).value=100;
	}
	else {
		if(value>180)
			document.getElementById(id).value=180;
	}
	
}
	