var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var region1 = document.getElementById("region1")
var myVideo = document.getElementById("video1");
canvas.width = region1.clientWidth
alert(region1.clientWidth)
ctx.fillStyle = 'rgb(204,204,204)';
ctx.fillRect(0, 0, canvas.width, 20);

// ctx.fillStyle = 'rgb(255, 0, 0)';
// ctx.fillRect(50, 50, 20, 20);
//
// ctx.fillStyle = 'rgb(0, 255, 0)';
// ctx.fillRect(150, 150, 30, 30);


function showColor() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var x = event.offsetX;
  var y = event.offsetY;
  var color = ctx.getImageData(x, y, 1, 1).data;
  if(color[0]==237 && color[1]==107 && color[2]==78){
    // alert(x)
    // alert(y)
    // alert(color);
    alert(myVideo.duration*x/canvas.width)
    time = myVideo.duration*x/canvas.width
    movePlayPosition(time)
  }

}

function movePlayPosition(pos) {
  myVideo.currentTime = pos
}

/**
 * Created by bagjeongtae on 2017. 5. 9..
 */

// getElementById
function $id(id) {
	return document.getElementById(id);
}

// output information
function Output(msg) {
	var m = $id("list");
	m.innerHTML = msg + m.innerHTML;
}

// call initialization file
if (window.File && window.FileList && window.FileReader) {
	Init();
}

// initialize
function Init() {

	var fileselect = $id("fileselect"),
		filedrag = $id("filedrag"),
		submitbutton = $id("submitbutton");

	// file select
	fileselect.addEventListener("change", FileSelectHandler, false);

	// is XHR2 available?
	var xhr = new XMLHttpRequest();
	if (xhr.upload) {

		// file drop
		filedrag.addEventListener("dragover", FileDragHover, false);
		// filedrag.addEventListener("dragleave", FileDragHover, false);
		filedrag.addEventListener("drop", FileSelectHandler, false);
		filedrag.style.display = "block";

		// remove submit button
		submitbutton.style.display = "none";
	}
}

// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

// file selection
function FileSelectHandler(e) {

	// cancel event and hover styling
    FileDragHover(e);

	// fetch FileList object
	var files = e.target.files || e.dataTransfer.files;

    console.log('te');
    addFileFromLastInput(files);

    // process all File objects
	for (var i = 0, f; f = files[i]; i++) {
		ParseFile(f);
	}
}

function ParseFile(file) {

    var fileName = file.name,
        fileType = file.type,
        fileSize = file.size + 'bytes';

	Output(
		"<tr><td>" + fileName +
		"</td><td>" + fileType +
		"</td><td>" + fileSize +
		"</td> </tr>"
	);
}

function addFileFromLastInput(file){

    var a = $('input#fileselect.addFile');
    a[a.length-1].files = file;

    try{
        let new_input = '<input id="fileselect" type="file" name="fileselect" multiple="multiple" class="addFile" />';
        $('.files').append(new_input);
    }catch(err){

    }

    return 0;
}
