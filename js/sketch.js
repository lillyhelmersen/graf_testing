var wi = window.innerWidth-10;
var hi = window.innerHeight-60;
var randomSetCol = -1;
var randomSetRow = -1;
//startOfTrail();
var lastWasCorrect;
var startTime;
var spottingTime;

//For grafs
var grafTab; // holding grafs and there hit bx
var hitBox = {
  g: 1,
  q: 1,
  wi1: 0,
  wi2: wi,
  hi1: 0,
  hi2:hi
}
var grafNow = 1;
//Question
var questTab = [
  "Q1?",
  "Q2",
  "Q3"
]
var questNow = 1;


var colorTab = ['#FAEF27','#AD132F'];
var shapeTab = ["Circle", "Squer"];
var shape;
var color;
var shapeD;
var colorD;
//Shape size
var cSais = wi/30;

var colHit;
var rowHit;
var col;
var row;
var finichedBol = false;
var bol1 = true;

var secuens = -1;
var quantity = 3;

let table;

var notFirst = 0;

function preload(){

}

function setup() {
  createCanvas(wi, hi);
  //secuens =
  background(255);
  console.log("tryli index: " + ctx.trialIndex);
  makeHitBoxTable();
  //defoltStyle();
  //setupTable();
  //newGrafQue();
  //pick(quantity);
  //startOfTrail();
}

function startOfTrail(){
  clear();
  //printPalet(3);
  //setHitBox();//Might need to be added later
  printStartScreen();
  //printPalet(3);
}
function printStartScreen(){
  textSize1 = 30;
  textSize2 = 60;
  textSize(wi/30);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Multiple grafs will get displayed.",wi/2,hi/4);
  textSize(wi/textSize2);
  text("We will ask you to find infomration in the grafs ",wi/2,hi/4+(wi/30));
  text("1. Look for the answer as fast as possible and press _Space_ bar when you found it",wi/2,hi/4+(wi/30)+(wi/30));
  text("Then you will see the graf without numbers where you are suposed to _mouse_ click",wi/2,hi/4+(wi/30)+(wi/30)+(wi/textSize2));
  text("2. When the goust of the graf appers _mouse_ click on where you found the answere",wi/2,hi/4+(wi/30)+(wi/30)+(wi/textSize2)+(wi/textSize2));
  text("Press _Enter_ key when you are ready to start.",wi/2,hi/4+(wi/30)+(wi/30)+(wi/textSize2)+(wi/30)+(wi/textSize2));

  noFill();
}

function next(){
  clear();
  //console.log("In next secuens: " + secuens);
  switch(secuens){
    case 0: wait()
            newGrafQue();
    break;
    case 1: look();
            //setHitBox();
    break;
    case 2: secuens = 0;
            if(lastWasCorrect){
              nextTrial();
            }
            pick();

            return;
  }
  secuens++;
}

function wait(){
  //console.log("Im in wate");
  var par = -1;
  var parLast = -1;
  console.log("cpt: " + ctx.cpt);
  if(notFirst > 1 && ctx.cpt != 0){
    par = ctx.trials[ctx.cpt][ctx.participantIndex];
    parLast = ctx.trials[ctx.cpt-1][ctx.participantIndex];
    //console.log("par: " + par);
    //console.log("parLast: " + parLast);
    //console.log("parLastInedex: " + ctx.participantIndex);
  }
  console.log("par: " + par);
  console.log("parLast: " + parLast);

  if(par != parLast){
    finiched();
  } else {
    notFirst++;
    textSize(wi/10);
    fill(0);
    text("Wait",wi/2,hi/2-(hi/4));
    textSize(wi/25);
    text("(Question)In the next graf you shuld find the ___", wi/2,hi/2);
    textSize(wi/35);
    text("Klikk _Space_ when you are reddy to se the next graf", wi/2,hi/2+(hi/8));
    textSize(wi/45);
    text("Remmeber to klikk _Space_ at the moment you see the answere", wi/2,hi/2+(hi/8)+(hi/8));

    //Also needs question
    noFill();
  }
}
function look(){
  //trailIndex();
  printGraf();
  startTime = new Date().getTime();
}
function pick(){
  //console.log("in pick count");
    bol1 = true;

  spottingTime = new Date().getTime() - startTime;
  //console.log("Time of tril: " + spottingTime
  drawPlacholders();
  /*
  var theCircle;
  noStroke();
  fill('#BABABA');
  for (i = 0; i < quantity; i++){
    for (j = 0; j < quantity; j++){
      //console.log("i = " + i + " j = " + j );
        ellipse(col[i],row[j],cSais,cSais);
    }
  }
  noFill();
  */
  //Makes new data entry

}

function newGrafQue(){
  var grafNowTemp = ctx.trials[ctx.cpt][ctx.grafIndex];
  gNTT = grafNowTemp.split("");
  grafNow = gNTT[1];
  var questNowTemp = ctx.trials[ctx.cpt][ctx.queIndex];
  qNTT = questNowTemp.split("");
  questNow = qNTT[1];
  //console.log("graf: " + grafNow +"\nquest: " + questNow);

}
function printGraf(){ //This is wat needs to print the graf
  fill(0);
  textSize(wi/30);
  text("A graf will apear her", wi/2,hi/2);
  //Also needs question
  noFill();
}

function draw() {

  fill(255);
  //console.log(ctx.w);
}
function drawPlacholders(){
  fill(0);
  textSize(wi/30);
  text("Wher in the graf did you fint the info", wi/2,hi/2);
  //Also needs question
  noFill();
}

function makeHitBoxTable(){      //Shuld take a list of points and make a hitbox
  grafTab = [];
  var hitBoxTab = [];
  var i,j = 0;
  for(i = 0; i < 3; ++i){
    grafTab[i] = hitBoxTab; // adds hit box tas for etch graf
    for (j = 0; j < 3; ++j){
      var gg = i+1;
      var qq = j+1;
      var hitBoxTemp = {
        g: gg,
        q: qq,
        wi1: 0,
        wi2: wi,
        hi1: 0,
        hi2:hi
      }
      grafTab[i][j] = hitBoxTemp;//Adds hitbox per graf and quest
    }

  }
}
function inHitBox(x,y){//Needs to be fix
  //console.log("Open Hitbox");

  //x,y = mouse cordinats

  return true;
}

function finiched(){
  finichedBol = true;
  console.log("Im finched");
  textSize(wi/10);
  fill(0);
  text("Finiched",wi/2,hi/2);
  textSize(wi/30);
  text("Thank you for partisipating", wi/2,hi/2+(wi/10));
  noFill();


  saveMyTable();
}
function setupTable() {
  table = new p5.Table();

  table.addColumn('Participant');
  table.addColumn('Practice');
  table.addColumn('Block');
  table.addColumn('Trial');
  table.addColumn('Graf');//Graf
  table.addColumn('Quest');//Question
  table.addColumn('Time');
}
function newRowInTable(time){

    var par = ctx.trials[ctx.cpt][ctx.participantIndex];
    var blo = ctx.trials[ctx.cpt][ctx.blockIndex];
    var tra = ctx.trials[ctx.cpt][ctx.trialIndex];
    var gra = ctx.trials[ctx.cpt][ctx.grafIndex];
    var queI = ctx.trials[ctx.cpt][ctx.queIndex];

    let newRow = table.addRow();
    newRow.setNum('Participant',  par);
    newRow.setNum('Block',        blo);
    newRow.setNum('Trial',        tra);
    newRow.setString('Graf',      gra);
    newRow.setString('Quest',     queI);
    newRow.setNum('Time',         time);

}
function saveMyTable(){
  var par = ctx.trials[ctx.cpt][ctx.participantIndex-1];
  var tableName = "tableForPartisipant_" + par;
  saveTable(table, tableName, 'csv');
}


function keyTyped() {
  if (!finichedBol) {
    if (key === ' ') {
      //console.log("Space was presed secuens:" + secuens);
      if(secuens == 1){
        next();
        //start time
      } else if(secuens == 2){
        //end time
        //console.log("Space was presed secuens:" + secuens);
        //next task
        next();
      }
    }
  }

}
function keyPressed() {
  if (keyCode === ENTER) {
    console.log("Enter is presed secuens: " + secuens);
    if(secuens == -1){
      secuens++;
      next();
    }
  }
}
function mousePressed() {
  if (!finichedBol) {//finiched
    if(true){
      bol1 = false;
    //mouseX, mouseY
    mX = mouseX;
    mY = mouseY;
      //console.log("Mouse presed in x: " + mouseX + " y: " + mouseY);
      //console.log(" - Secuens: " + secuens);
      var notDone = true;

      if(secuens == 0){
        for(i = 0; i < quantity && notDone; i++){
          for(j = 0; j < quantity && notDone; j++){
            if(inHitBox(mX,mY)){
              console.log("Mouse is in the box");
              lastWasCorrect = true;
              newRowInTable(spottingTime);
              notDone = false;
            } else {
              lastWasCorrect = false;
              notDone = false;
            }
          }
        }
        next();
      }
  }
}

}
