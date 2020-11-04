var state = {
  NONE:0,
  INTERTITLE: 1,
  SHAPES: 2,
  PLACEHOLDERS: 3,
};

var ctx = {
  w: 1400,
  h: 600,

  trials: [],
  participant: "",
  startBlock: 0,
  startTrial: 0,
  cpt: 0,

  participantIndex:"Participant",
  blockIndex:"Block",
  trialIndex:"Trial",
  vvIndex:"VV",
  objectsCountIndex:"OC",

  state:state.NONE,

};

var keyListener = function(event) {
  event.preventDefault();

  if(ctx.state == state.INTERTITLE && event.code == "Enter") {
    d3.selectAll('.instr').remove();
    startTrial();
  } else if(ctx.state == state.SHAPES && event.code == "Space") {
    d3.select("#visualMarks").remove();
    showPlaceholders();
  }



}

var showIntertitle = function() {
  ctx.state = state.INTERTITLE;

  d3.select("#instructions")
    .append('p')
    .classed('instr', true)
    .html("Multiple shapes will get displayed.<br> Only <b>one shape</b> is different from all other shapes.");

  d3.select("#instructions")
    .append('p')
    .classed('instr', true)
    .html("1. Spot it as fast as possible and press <code>Space</code> bar;");

  d3.select("#instructions")
    .append('p')
    .classed('instr', true)
    .html("2. Click on the placeholder over that shape.");

  d3.select("#instructions")
    .append('p')
    .classed('instr', true)
    .html("Press <code>Enter</code> key when ready to start.");

}

// copied from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

var startTrial = function() {
  ctx.state = state.SHAPES;

  var objectCount = ctx.trials[ctx.cpt][ctx.objectsCountIndex];
  var vv = ctx.trials[ctx.cpt][ctx.vvIndex];

  console.log("experimental condition: "+
    "(VV="+vv+", "+
    "OC="+objectCount+")");

  // TODO show the grid of shapes depending on the experimental condition
  // example for VV="Size"

  var objCount =
    (objectCount === "Small") ? 9 :
    (objectCount === "Medium") ? 25 : 49;

  // pick a random appearance for our target
  var targetSize = Math.random() < 0.5 ? "small" : "large";
  var targetColor = Math.random() < 0.5 ? "light" : "dark";

  var shapes = [];
  // add the target to the list of shapes to display
  shapes.push({size:targetSize, color:targetColor, target:true});

  if(vv === "Size") {
    // add (objectCount - 1) shapes that have a different size than that of the target
    for(var i = 0; i < (objCount-1); i++) {
      shapes.push(
        {
          size:(targetSize === "small" ? "large" : "small"),
          color:targetColor,
          target:false
        });
    }
  }

  // shuffle the array to display the target at a random location
  shuffle(shapes);

  // display shapes
  var sideMatrix = Math.sqrt(objCount);
  for(var i = 0; i < shapes.length; i++) {
    d3.select("#mainScene")
      .append("circle")
      .attr("cx", 200 + i%sideMatrix*60)
      .attr("cy", 200 + Math.floor(i/sideMatrix)*60)
      .attr("r", shapes[i].size === "small" ? 10 : 30)
      .attr("fill", shapes[i].color === "light" ? "#cccccc" : "#595959");
  }

}

var showPlaceholders = function() {
  // TODO
}

var nextTrial = function() {

  ctx.cpt++;

  //showIntertitle();
}

var startExperiment = function(event) {
  event.preventDefault();

  console.log(event);

  for(var i = 0; i < ctx.trials.length; i++) {
    if(ctx.trials[i][ctx.participantIndex] === ctx.participant) {
      if(parseInt(ctx.trials[i][ctx.blockIndex]) == ctx.startBlock) {
        if(parseInt(ctx.trials[i][ctx.trialIndex]) == ctx.startTrial) {
          ctx.cpt = i - 1;
        }
      }
    }
  }

  console.log("start experiment at " + ctx.cpt);
    startOfTrail();
  //nextTrial();
}

var createScene = function(){
  var svgEl = d3.select("#scene").append("svg");
  svgEl.attr("id", "mainScene");
  svgEl.attr("width", ctx.w);
  svgEl.attr("height", ctx.h)
  .classed('centered', true);

  loadData(svgEl);
};

/****************************************/
/******** STARTING PARAMETERS ***********/
/****************************************/

var setTrial = function(trialID) {
  ctx.startTrial = parseInt(trialID);
}

var setBlock = function(blockID) {
  ctx.startBlock = parseInt(blockID);

  var trial = "";
  var options = [];

  for(var i = 0; i < ctx.trials.length; i++) {
    if(ctx.trials[i][ctx.participantIndex] === ctx.participant) {
      if(parseInt(ctx.trials[i][ctx.blockIndex]) == ctx.startBlock) {
        if(!(ctx.trials[i][ctx.trialIndex] === trial)) {
          trial = ctx.trials[i][ctx.trialIndex];
          options.push(trial);
        }
      }
    }
  }

  var select = d3.select("#trialSel");

  select.selectAll('option')
    .data(options)
    .enter()
    .append('option')
    .text(function (d) { return d; });

  setTrial(options[0]);

}

var setParticipant = function(participantID) {
  ctx.participant = participantID;

  var block = "";
  var options = [];

  for(var i = 0; i < ctx.trials.length; i++) {
    if(ctx.trials[i][ctx.participantIndex] === ctx.participant) {
      if(!(ctx.trials[i][ctx.blockIndex] === block)) {
        block = ctx.trials[i][ctx.blockIndex];
        options.push(block);
      }
    }
  }

  var select = d3.select("#blockSel")
  select.selectAll('option')
    .data(options)
    .enter()
    .append('option')
    .text(function (d) { return d; });

  setBlock(options[0]);

};

var loadData = function(svgEl){

  d3.csv("experiment2.csv").then(function(data){
    ctx.trials = data;

    var participant = "";
    var options = [];

    for(var i = 0; i < ctx.trials.length; i++) {
      if(!(ctx.trials[i][ctx.participantIndex] === participant)) {
        participant = ctx.trials[i][ctx.participantIndex];
        options.push(participant);
      }
    }

    var select = d3.select("#participantSel")
    select.selectAll('option')
      .data(options)
      .enter()
      .append('option')
      .text(function (d) { return d; });

    setParticipant(options[0]);

  }).catch(function(error){console.log(error)});
};

function onchangeParticipant() {
  selectValue = d3.select('#participantSel').property('value');
  setParticipant(selectValue);
};

function onchangeBlock() {
  selectValue = d3.select('#blockSel').property('value');
  setBlock(selectValue);
};

function onchangeTrial() {
  selectValue = d3.select("#trialSel").property('value');
  setTrial(selectValue);
};
