const key = 'pk.eyJ1IjoianoxMTExIiwiYSI6ImNqc2syOHlhcjExcmk0M256emx3cncydDQifQ.dRFhBWbfIm97qGZNBzCR0A';

const dataCS = 'cp_data_edited.csv';
const dataIN = 'I-Naturia-Carnivorus-Plants.csv';

const options = {
  lat: 30,/*orilat,*/
  lng: 0,/*orilon,*/
  zoom: 0.5,
  studio: true,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;
let alert = false;

function preload(){
  //table = loadTable(dataCS, 'csv', 'header');
  table = loadTable(dataIN, 'csv', 'header');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  console.log(table.getRowCount() + " total Rows in table :D ");
  console.log(table.getColumnCount() + " total Column in table");

  filterDataIN(table);
  //filterDataCD(table);
  //myMap.onChange(drawMarks);


  /*For drawing
  textFont('Arial');
  fontHeight = 14;
  rowheight = 20;
  rightMargin = 200;
  */
}

function draw() {

}

function regitrerData(){

}



function drawMarks(){
  clear();
  for (i = 0; i < 100; i++){
    let position1 = myMap.latLngToPixel(latTab[i], longTab[i]);
    x1 = position1.x;
    y1 = position1.y;

    //r = 8+abs(22*sin(frameCount/50));
    r = windowHeight/50;

    ellipse(x1,y1,r,r);

    stroke(255);

    if (picture_authorTab[i] == picture_authorTab[i+1]){
      r2 = 50;//Math.sqrt(9);//myMap.getZoom()*2;
      let position2 = myMap.latLngToPixel(latTab[i+1], longTab[i+1]);
      x2 = position2.x;
      y2 = position2.y;
      mits = findTheTowPonts(x1,y1,x2,y2)
      cpx1 = mits[0];
      cpy1 = mits[1];
      cpx2 = mits[2];
      cpy2 = mits[3];
      /*
      cpx1 = x1 + r2;
      cpy1 = y1 + r2;
      cpx2 = x2 + r2;
      cpy2 = y2 + r2;
      */


      //beginShape();
      noFill();
      //arc(x1, y1, x2, y2, -PI, 0, OPEN);
      //curve (cpx1, cpy1, x1, y1, x2, y2, cpx2, cpy2);
      //bezier(x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2);
      line(x1,y1,x2,y2);
      //drawLine([x1,y1],[x2,y2])
      fill(255);

      //*/
    }
    stroke(0);
    //*/
  }
}
//---------------------MAth shit for curws---------------------
function findTheT(x1,y1,x2,y2){
  var sq = Math.sqrt(3);
  var v3 = [(x1 + x2 + sq*(y1 - y2))/2, (y1 + y2 + sq*(x2 - x1))/2];
  return v3;
}
function findTheHalf(x1,y1,x2,y2){
  x = (x1+x2)/2;
  y = (y1+y2)/2;
  return [x,y];
}
function findTheTowPonts(x1,y1,x2,y2){
  v3 = findTheT(x1,y1,x2,y2);
  var x3 = v3[0];
  var y3 = v3[1];

  m1 = findTheHalf(x1,y1,x3,y3);
  var m1x = m1[0];
  var m1y = m1[1];
  m2 = findTheHalf(x1,y1,x3,y3);
  var m2x = m2[0];
  var m2y = m2[1];

  return[m1x,m1y,m2x,m2y];
}

function filterDataCD(table){
  latTab = table.getColumn("lat");
  longTab = table.getColumn("long");
  picture_authorTab = table.getColumn("picture_author");
}
function filterDataIN(data){

  console.log("Start filter IN data");

  userIdINTab = table.getColumn("user_id");
  createdAtINTab = table.getColumn("created_at");
  latINTab = table.getColumn("latitude");
  longINTab = table.getColumn("longitude");

  var rows = table.getRowCount();
  countIDS(userIdINTab);
  /*
  console.log(table.getRowCount() + " total Rows in table :D ");
  console.log(table.getColumnCount() + " total Column in table");
  */

}

function countIDS(ar){
  if(ar == null){
    console.log("Start countIDS array is null");
  } else {
    console.log("Start countIDS array is not null");
  }


//Sorting data IDs after icother
  ar.sort(function(a, b){return a - b});

  var idCount = [[]];//[[id],[count]];[[x,y],[x,y]]
  var notFirst = false;
  /*var a = data;
  var result = { };
  var aLengt = 100;//a.length;
*/
console.log("ar.length(35259): " + ar.length);
//Iterates tha array of sorted ids !!!!remeber to modefy so not array out of bounds
  for(var i = 0; i < ar.length; ++i){
    //Cheks if this and next is tha same to maby count(levs out entrys with 1 picture)
    var idNum = ar[i];
    //console.log("ar[i]: " + ar[i]);
  //  if (ar[i] == ar[i+1]){
      //Chek if its the first entry
      if (notFirst){
        idCountLength = idCount.length-1;
        //Cheks fi we have saved the entry alreddy
        lastEntyr = idCount[idCountLength][0];
        //console.log("Last entry: " + lastEntyr + " idCountLength: " +idCountLength);
        if(ar[i] == lastEntyr){
          //console.log("try cointin");
          idCount[idCountLength][1] = idCount[idCountLength][1] + 1;
        } else {
          if(ar[i+1] != null && ar[i] == ar[i+1] ){
            //console.log(" - Added new");

            idCount.push([idNum,1]);
            /*idCount[idCountLength+1][0] = ar[i];
            idCount[idCountLength+1][1] = 1;*/
          }

        }
        //idCount.puch([ar[i],1]);
      } else {//if not empty
        //console.log(" - Tys to add first ");
        if(ar[i] == ar[i+1]){
          //console.log(" - Added first entry ar[i]: " + ar[i]);
          idCount[0][0] = ar[i];
          idCount[0][1] = 1;
          notFirst = true;
        }
      }
    //}

  }
/*
  if(idCount != null){
    for (i = 0; i < idCount.length; i++){
      console.log("idCount[0][" + i + "]: |" + idCount[1][i] + "|");
    }
  }
  */



  sortedOnNumberEntrys = sortArrayByNEntry(idCount);
/*
sortedOnNumberEntrys = idCount;
sortedOnNumberEntrys.sort(function(a, b) {
    var x = a[1];
    var y = b[1];
    return x - y;
});
*/
  printDobleArray(sortedOnNumberEntrys);

  //printDobleArray(idCount);

}

function sortArrayByNEntry(array){
  if(array == null){
    console.log("Start sortArrayByNEntry array is null");
  }
  var a = array;
  if (array !== undefined) {
    a.sort(sortFunction);

    function sortFunction(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }
  }


  return a;
}

function printDobleArray(a){
  if(a == null){
    console.log("Start printDobleArray array is null");
  }
  //console.log("array print : " + a[0][0]);
  if (a !== undefined) {
    for (i = 0; i < a.length; i++){
      console.log("User id: |" + a[i][0] + "| pictures taken: |" + a[i][1] + "|");
    }
  }
}


///Old stuff----------------------
