var wi = window.innerWidth-10;
var hi = window.innerHeight-60;
var wiL = 1507;
var hiL = 670;

var lastWasCorrect;
var startTime;
var spottingTime;

//For grafs
var graf1Tab; // holding grafs and there hit bx
var graf1Giff;
var graf1GiffWi;
var graf1GiffHi;

var graf2Tab;
var industry2Tab;
var industry2infoDisTab = [];
var graf2Image;
var graf2ImageGray;

var graf3Tab;
var industry3Tab;
var industry3infoDisTab = [];
var graf3Image;
var graf3ImageGray;

var infoDis = {
  g: 0,
  q: 0,
  year: 2000,
  mont: 1,
  value: 0,
  color: "#ffffff",
  coX: 0,
  coY: 0,
}
var hitBoxTemp = {
  g: 0,
  q: 0,
  x: 0,
  y: 0,
}
/*
wi1: 0,
wi2: wi,
hi1: 0,
hi2:hi*/
var grafNow = 1;
var colordDis = false;
//Question
var questTab = [
  "Q1",
  "Q2",
  "Q3"
]
var questNow = 1;

//2015-2020
var colorTab = ['#f8766d','#b79f00','#00ba38','#00bfc4','#619cff','#f564e3'];
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
  graf1Giff = createImg("graph/Industry1.gif");//graf1Giff.position(50,100)
  graf1Giff.hide();
  graf2Image = loadImage("graph/Industry2.jpg");
  graf3Image = loadImage("graph/Industry3.jpg");
  graf2ImageGray = loadImage("graph/Industry2.jpg");
  graf3ImageGray = loadImage("graph/Industry3.jpg");
  graf2ImageGray.filter(GRAY);
  graf3ImageGray.filter(GRAY);

  industry2Tab = loadTable('IndustryTabs/Industry2.csv', 'csv');
  industry3Tab = loadTable('IndustryTabs/Industry3.csv', 'csv');
}

function setup() {
  createCanvas(wi, hi);
  print("wi: " + wi + " hi: " + hi);

  //secuens =
  background(255);
  console.log("tryli index: " + ctx.trialIndex);
  makeHitBoxTable();
  //defoltStyle();
  setupTable();
  makeInfoDisTable(industry2Tab, industry2infoDisTab , 2);
  makeInfoDisTable(industry3Tab, industry3infoDisTab , 3);
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
  coloredDis = false;
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

    var questionNow = "No question found";

    var questNowTemp = ctx.trials[ctx.cpt][ctx.queIndex];
    var tempArry = questNowTemp.split("");
    //console.log("tempArry[1]: " + tempArry[1]);
    questionNow = questTab[tempArry[1]-1];

    textSize(wi/10);
    fill(0);
    text("Wait",wi/2,hi/2-(hi/4));
    textSize(wi/25);
    text(questionNow, wi/2,hi/2);
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
  colordDis = true;
  printGraf();
  startTime = new Date().getTime();
}
function pick(){
  //console.log("in pick count");
    bol1 = true;
    colordDis = false;
  graf1Giff.hide();
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
  //grafNow
  print("grafNow: " + grafNow);
  if(grafNow == 1){
    printG1();
  } else if (grafNow == 2 ){
    printSpesGraf(graf2Image);
  } else if (grafNow == 3){
    printSpesGraf(graf3Image);
  } else {
    text("There shuld be a graph her", wi/2,hi/2);
  }
  noFill();
}
function printG1(){
  graf1GiffWi = graf1Giff.width;
  graf1GiffHi = graf1Giff.height;
  //console.log("test giff hight: " + graf1GiffWH);
  graf1Giff.position(wi/2-graf1GiffWi/2,hi/2-graf1GiffHi/2)
  graf1Giff.show();
}
function printSpesGraf(graf){
  //print image
  //loop cords
  //if over cord disply
  //draw small thing

  //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
  graf.resize(wi/1.2,hi/1.2);
  var grafWi = graf.width;
  var grafHi = graf.height;
  image(graf, wi/2-grafWi/2,hi/2-grafHi/2);

}
function printSpesGrafShadow(graf){

  //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
  graf.resize(wi/1.2,hi/1.2);
  var grafWi = graf.width;
  var grafHi = graf.height;
  graf.filter(GRAY);
  image(graf, wi/2-grafWi/2,hi/2-grafHi/2);

}
function drawDisplay(thisHitBox){//
  /*var infoDis = {
    g: 0,
    q: 0,
    year: 2000,
    mont: 1,
    value: 0,
    color: "#ffffff",
    coX: 0,
    coY: 0,
  }*/
  print("I am drawing a box now");
  var disText = "tmep text it is so \n\n\nccoosodjfj ladiddia "
  var x = thisHitBox.coX * wi;
  var y = thisHitBox.coY * hi;
  var colorInsideBox = thisHitBox.color;

  //------------------
  var tO = 5;//triOfsett
  var ryO = 50;//recOfsett for y
  var rxO = 50;//recOfsett for x
  //------------------
  print("colorInsideBox: " + colorInsideBox);
  fill(colorInsideBox);
  stroke('#000000');
  strokeWeight(2);
  beginShape();
    vertex(x, y);
    vertex(x+tO, y-tO);
    vertex(x+tO, y-tO-ryO);
    vertex(x+tO+rxO, y-tO-ryO);
    vertex(x+tO+rxO, y+tO+ryO);
    vertex(x+tO, y+tO+ryO);
    vertex(x+tO, y+tO);
    vertex(x, y);
  endShape(CLOSE);
  noFill();
  noStroke();
  //------------------
  stroke('#000000');
  strokeWeight(1);
  text(disText, x+tO+3, y-tO-ryO+3, rxO-3, ryO-3);
  noStroke();
}

function draw() {
  fill(255);
  frameRate(12);
  //drawDisplay();
  /* // drawing mous cords on screen
    print("x: " + mouseX + " y: " + mouseY);
    s = "x: " + mouseX + " y: " + mouseY;
    fill('#ffffff');
    noStroke();
    rect(0,0,400,30);
    stroke('#000000');
    strokeWeight(0);
    fill('#000000');
    textSize(11);
    text(s,150,20);
    noFill();
  //*/
  if(colordDis){
    inInfoDis();
  }



}
function drawPlacholders(){
  clear();
  fill(0);
  textSize(wi/30);
  if (grafNow == 1){

  } else if (grafNow == 2){
    printSpesGrafShadow(graf2ImageGray);
  } else if (grafNow == 3){
    printSpesGrafShadow(graf3ImageGray);
  } else {
    text("Wher in the graf did you fint the info", wi/2,hi/2);
  }
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
        x: 0,
        y: 0,
      }
      grafTab[i][j] = hitBoxTemp;//Adds hitbox per graf and quest
    }

  }
}
function makeInfoDisTable(table, toTable, gg){
  var infoDisTemp = {
    g: gg,
    q: 0,
    year: 2000,
    mont: 1,
    value: 0,
    color: "#ffffff",
    coX: 0,
    coY: 0,
  }
  print(table);

  //cycle through the table
  for (let r = 0; r < table.getRowCount(); r++){
      //print(table.getString(r, c));
      //2015,JAN,90.2
      var yearTemp = table.getString(r, 0);
      var colorTemp = whatColor(yearTemp);
      //print("colorTemp " + colorTemp);
      var monthTemp = table.getString(r, 1);
      var valueTemp = table.getString(r, 2);
      var coXTemp = table.getString(r, 3)/wiL;
      var coYTemp = table.getString(r, 4)/hiL;

      var infoDisTemp2 = {
        g: gg,
        q: 0,
        year: yearTemp,
        mont: monthTemp,
        value: valueTemp,
        color: colorTemp,
        coX: coXTemp,
        coY: coYTemp,
      }
      toTable[r] = infoDisTemp2;
    }
}
function inHitBox(x,y){//Needs to be fix
  //console.log("Open Hitbox");

  //x,y = mouse cordinats

  return true;
}
function inInfoDis(){
  print("Start of inInfoDis");
  var tab;
  var smalestBox;
  var smalest = wi+hi;
  var minDistasn = 5;
  var draw = false;

  if (nowGraf = 2){
    tab = industry2infoDisTab;
    draw = true;
  } else if (nowGraf = 3){
    tab = industry3infoDisTab;
    draw = true;
  } else {
    print ("Where is my graf 432?");
  }
  if (draw) {
    for(i = 0; i < tab.length; i++){
      var tempX = tab[i].coX * wi;
      var tempY = tab[i].coY * hi;
      let d = int(dist(tempX, tempY, mouseX, mouseY));
      if(d < smalest){
        smalest = d;
        smalestBox = tab[i];
      }
    }
    if (smalest <= minDistasn){
      drawDisplay(smalestBox);
    }
  }
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

    let newRow = table.addRow();//insertRow addRow()
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

function whatColor(year) {
  //print("year: " + year);
  //print("colorTab[0]: " + colorTab[0])
  var color = '#ffffff';
  if (year == 2015){
    color = colorTab[0];
  } else if (year == 2016){
    color = colorTab[1];
  } else if (year == 2017){
    color = colorTab[2];
  } else if (year == 2018){
    color = colorTab[3];
  } else if (year == 2019){
    color = colorTab[4];
  } else if (year == 2020){
    color = colorTab[5];
  }
  return color;
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
