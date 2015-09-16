function generateImg(img) {
    var canvas = document.createElement('canvas');
    var canvasWidth = 100;
    var canvasHeight = 50;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;


    var dataArr = [];
    for (var i = 0, il = pixels.length; i < il; i += 4) {
        //765 - half of sum of all rgb maximum values (255*3/2)
        //127 - half of rgba alpha channel (255/2)
        if(pixels[i] + pixels[i+1] + pixels[i+2] > 382 || pixels[i+3] < 127) {
            pixels[i] = pixels[i+1] = pixels[i+2] = 255;
            dataArr.push('1');
        }else {
            pixels[i] = pixels[i+1] = pixels[i+2] = 0;
            dataArr.push('8');
        }
        pixels[i+3] = 255;

    }

    var str = dataArr.join('');
    var reg = new RegExp('.{1,' + canvasWidth +'}', 'g');
    var strArr = str.match(reg);
    str = strArr.join('<br>');

    return str
}

var input = document.getElementById('img');

input.onchange = function(e){
    var files = e.target.files;
    if(files && files[0]){
        var reader = new FileReader();

        reader.onload = function(){
            var img = new Image();
            img.src = reader.result;
            changeImg(img);
        }
        reader.readAsDataURL(files[0])

    }
}

function changeImg(img) {

    var canvas = document.getElementsByTagName('canvas');
    var container = document.getElementById('container');
    if(canvas && canvas.length) document.body.removeChild(canvas);
    if(container) {
        container.innerHTML = '';
    }else {
        container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container)
    }

    container.innerHTML = generateImg(img);

}
