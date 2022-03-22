const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var chao;

var corda;
var fruta;
var link;
var link2;

var fundo;
var frutaimg;
var coelho;
var coelhoimg

var button;

var idle;
var eat;
var sad;

var somFUNDO;
var somAR;
var somCORDA;
var somTRISTE;
var somCOMER;

var balloon;

var mute;

var button2

var corda2

var button3
var corda3
var link3

function preload(){

  fundo = loadImage("images/background.png")
  frutaimg = loadImage("images/melon.png")
  coelhoimg = loadImage("images/Rabbit-01.png")
  idle = loadAnimation("images/blink_1.png", "images/blink_2.png", "images/blink_3.png")
  eat = loadAnimation("images/eat_1.png" , "images/eat_2.png", "images/eat_3.png", "images/eat_4.png", "images/eat_5.png")
  sad = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png")

  eat.looping = false
  sad.looping = false
   
   somFUNDO = loadSound("sounds/sound1.mp3");
   somAR = loadSound("sounds/air.wav");
   somCORDA = loadSound("sounds/rope_cut.mp3");
   somTRISTE = loadSound("sounds/sad.wav");
   somCOMER = loadSound("sounds/eating_sound.mp3")

}


function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);

  var options = {
    isStatic: true
  }

  chao = Bodies.rectangle(250,690,500,20,options);
  World.add(world,chao);

  textSize(50);

 corda = new Rope(8, {x:250, y:20})

 corda2 = new Rope(5, {x:400, y:50})

 corda3 = new Rope(6, {x : 150, y:400})

 fruta = Bodies.circle(250, 300, 20, {density:0.001})
  //World.add(world,fruta);

  Matter.Composite.add(corda.body,fruta)
  link = new Link(corda, fruta)
  link2 = new Link(corda2, fruta)
   link3 = new Link(corda3, fruta)

  coelho = createSprite(430, 600, 100, 100)
  idle.frameDelay = 20  
  eat.frameDelay = 20
  sad.frameDelay = 10


  coelho.addAnimation("idle", idle);
  coelho.addAnimation("eat", eat);
  coelho.addAnimation("sad", sad);
  coelho.scale = 0.25

  button = createImg("images/cut_btn.png")
  button.position(220, 30)
  button.size(50,50)
  button.mouseClicked(drop)

  button2 = createImg("images/cut_btn.png")
  button2.position(400, 50)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3 = createImg("images/cut_btn.png")
  button3.position(150, 400)
  button3.size(50,50)
  button3.mouseClicked(drop3)



  balloon = createImg("images/balloon.png")
  balloon.position(10, 300)
  balloon.size(150,100)
  balloon.mouseClicked(air)
  
  somFUNDO.play()
  somFUNDO.setVolume(0.05)

  mute = createImg("images/mute.png")
  mute.position(450, 20)
  mute.size(50, 50)
  mute.mouseClicked(mutar)



}

function draw(){
  background(51);
  Engine.update(engine);
  
  rect(chao.position.x,chao.position.y,500,20);
   image(fundo, 0, 0, 500, 700)
  corda.show()
   
  corda2.show()
  
  corda3.show()
  
  imageMode(CENTER)

 if(fruta != null){
  image(frutaimg, fruta.position.x, fruta.position.y, 60, 60)
 }
 
 if (fruta != null && fruta.position.y >= 650){
  
   coelho.changeAnimation("sad")
   somTRISTE.play()
   fruta = null
 }
   
   if (collide(fruta, coelho)== true){
    coelho.changeAnimation("eat")
    somCOMER.play();


   }



   drawSprites()



}
function drop(){
  corda.break()
  link.break()
  link = null
  somCORDA.play()
 

}

function drop2(){
  corda2.break()
  link2.break()
  link2 = null
  somCORDA.play()
   

}

function drop3(){
  corda3.break()
  link3.break()
  link3 = null
  somCORDA.play()
   

}



function collide(body,sprite){

if(body != null){

var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)

 if(d <= 80){
     World.remove(world, fruta)
     fruta = null
     return true
 }
 else {
  return false
 }


} 



}

function air(){

Matter.Body.applyForce(fruta, {x : 0 , y : 0}, {x : 0.01 , y : 0})

somAR.play()



}
function mutar(){

 if(somFUNDO.isPlaying()){
   somFUNDO.pause()
 }
 else{
  somFUNDO.play()
 }
 





















}
