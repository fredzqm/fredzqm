
var sentence_length = 0;
var sentence_halfheight = 0;
var border_percentage = 0;
var offset = 0;

function bubble(str){
    // setTimeout(updateCanvasDimensions, 30);
    canvas = $("#myCanvas");
    var letterColors = [red, orange, green, blue, purple];

    border_percentage = 2/(str.length+4);
    drawName(str, letterColors);
    bounceBubbles();
}

function drawName(str, letterColors) {
    var g = [];
 
    function addLetter(cc_hex, ix, letterCols) {
        if (typeof letterCols !== 'undefined') {
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && Object.prototype.toString.call(letterCols[0]) === '[object Array]') {
                letterColors = letterCols;
            }
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && typeof letterCols[0] === "number") {
                letterColors = [letterCols];
            }
        } else {
            letterColors = [[0, 0, 27]];
        }

        if (document.alphabet.hasOwnProperty(cc_hex)) {
            var chr_data = document.alphabet[cc_hex].P;
            var bc = letterColors[ix % letterColors.length];
            
            for (var i = 0; i < chr_data.length; ++i) {
                point = chr_data[i];
                var x = point[0] + offset;
                var y = point[1];
                g.push(new Point(x,y,0.0,point[2], makeColor(bc, point[3])));
            }
            offset += document.alphabet[cc_hex].W;
        }
    }
 
    var hexphrase = phraseToHex(str);
 
    var col_ix = -1;
    for (var i = 0; i < hexphrase.length; i += 2) {
        var cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
        if (cc_hex != "A20") {
            col_ix++;
        }
        addLetter(cc_hex, col_ix, letterColors);
    }
 
    sentence_length = offset;
    sentence_halfheight = canvas.parent().height()/2;
    offset = 0;
    // sentence_halfheight = (y_max+y_min)/2;
    pointCollection = new PointCollection();
    pointCollection.points = g;

    updateCanvasDimensions();
    initEventListeners();
}


function updateCanvasDimensions() {
    canvas.parent().height( canvas.parent().width() * border_percentage*1.5);
    canvas.attr({
        height: canvas.parent().height(),
        width: canvas.parent().width(),
    });
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();

    var border = canvasWidth * border_percentage;
    var g = pointCollection.points;
    var k = (canvasWidth-2*border)/sentence_length;
    for (var j = 0; j < g.length; j++) {
        g[j].curPos.x = (g[j].curPos.x- offset)*k + border;
        g[j].curPos.y = (g[j].curPos.y- sentence_halfheight)*k + canvasHeight/2;
        g[j].size *= k;
        g[j].originalPos.x = (g[j].originalPos.x- offset)*k + border;;
        g[j].originalPos.y = (g[j].originalPos.y- sentence_halfheight)*k + canvasHeight/2;
    }
    sentence_length = canvasWidth-2*border;
    offset = border;
    sentence_halfheight = canvasHeight/2;
    draw();
}




