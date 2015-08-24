var active= false;
var restart = true;
var breaktime = 5;
var timertime = 25;
var counter=timertime;
var myTimer;
var sessionstate = true;  // true = session // false = break

function formatcounter(counter){
  var seconds,
      minutes;
  
  minutes = Math.floor(counter/60);
  seconds =counter%60;
  var s = "00"+seconds;
  var m = "00"+minutes;
  return m.slice(-2)+":"+s.slice(-2);
}
function showdata(){
  $(".breaktime").text(breaktime);
  $(".timertime").text(timertime);
  $(".counter").html(timertime);
}

function tick(){
  counter-=1;
  $(".counter").html(formatcounter(counter));
  
  if(counter<1 && sessionstate){
    // break time
    sessionstate = false;  // false = breaktime
    $(".msg").html("Break");
    counter = breaktime*60; // in seconds
  }
  
  if(counter<1 && !sessionstate) {
    // breaktime over 
    // stop
    clearInterval(myTimer);
    $(".msg").html("Gameover");
    sessionstate = true;
    restart = true;
    active = false;
    return;
  }
  
  // paint effect
  
  var timeinsec;
  var percent;
  if (sessionstate) { 
    timeinsec = timertime*60;
    percent = (timeinsec-counter)/timeinsec;
  } else {
    timeinsec = breaktime*60;
    percent = 1-((timeinsec-counter)/timeinsec);
  }
  var buttonwidth =  $("#pomodorobutton").outerWidth();
  var size = percent * buttonwidth;
  //console.log(percent, size);
  $(".filler").width(size);
}

$(document).ready(function() { 
  $('.breakmenos').click(function(){
    if(breaktime<1 || active) return;
    breaktime-=1;
    restart=true;
    showdata();
  });
  $('.breakmas').click(function(){
    if(breaktime>59 || active) return; //23:59 hours max
    breaktime+=1;
    restart=true;
    showdata();
  });
  $('.timermenos').click(function(){
    if (timertime<1 || active) return;
    timertime-=1;
    restart=true;
    showdata();
  });
  $('.timermas').click(function(){
    if(timertime>59 || active) return; //23:59 hours max
    timertime+=1;
    restart=true;
    showdata();
  });

  $("#pomodorobutton").click(function(){
    active = !active;
    //console.log("onoff",active);
    if (restart) {
       counter = timertime*60; // in seconds
       $(".msg").html("Session");
       restart=false;
    }
    if (active) {
      myTimer = setInterval(tick, 1000); // every 60 seconds
    } else {
      clearInterval(myTimer);
    }
  });
  
  $("#restart").click(function(){
    if (!active) {
      restart=true;
      $(".msg").html("Session");
      $(".filler").width(0);
      showdata();
    }
  });
  
  // show data/init
  showdata();
});