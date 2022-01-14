function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    classifier = ml5.imageClassifier('Doodlenet');
}

function clearCanvas(){
    background("white");
}

function draw(){

    strokeWeight(13);

    stroke(0);

    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
        
    
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.erroe(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

    document.getElementById('result_object_confidence').innerHTML =  Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
