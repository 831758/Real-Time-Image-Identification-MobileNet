function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet", modelloaded)
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotresult);
}

function modelloaded() {
  console.log("modelisloaded");
}

function gotresult(error, result) {
  if(error){
    console.error(error);
  }
  else {
    console.log(result);
    console.log(result[0].confidence);
    document.getElementById("result_object_name").innerHTML=result[0].label;
    document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(3);
    var synth=window.speechSynthesis;
    data="object detected is "+result[0].label;
    var utter=new SpeechSynthesisUtterance(data);
    synth.speak(utter);
  }
}