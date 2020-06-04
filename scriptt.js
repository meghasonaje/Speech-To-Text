try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.content').hide();
}


var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');

var noteContent = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};

recognition.onstart = function() { 
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  instructions.text('Voice recognition turned off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');  
  };
}



$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});


$('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});


function copyText(){

  var txt = document.getElementById("note-textarea");
  
  if(txt.value.length>0) {
    txt.select();
    txt.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Text Copied to clipboard !!");
  }
  else {
    alert("Nothing to copy");
  }
  
}