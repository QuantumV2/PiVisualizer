// Get canvas element
const canvas = document.getElementById('canvas');
const cellSize = 10;

// Parse URL parameters and set to default value if not found
const urlParams = new URLSearchParams(window.location.search);
let piSize = parseInt(urlParams.get('size')) || 1000;
let splitSize = parseInt(urlParams.get('split')) || 4;

//canvas.width = ((piSize) * cellSize) ;
canvas.width = (splitSize * cellSize);

// Get context and set initial properties for drawing
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'black';

function getPi(size) {
    let i = 1n;
    let x = 3n * (10n ** (BigInt(size + 1) + 20n));
    let pi = x;
    while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
    }
    return BigInt((pi / (10n ** 20n)).toString().slice(1));
}
// Pi digits as a string
let pi = getPi(piSize);
canvas.height = ((pi.toString(2).length / splitSize) * cellSize) + cellSize;

function to2dArray(str, numCharacters) {
    let result = [];
    for (let i = 0; i < str.length; i += numCharacters) { 
        let chunk = str.substring(i, i + numCharacters).split(''); 
        result.push(chunk);
    }
    return result;
}

// Function to convert pi digits to binary and draw pixels on canvas
function drawPiBinary() {
    let color = "white";
    let binaryString = pi.toString(2);
    let binaryStringArr = to2dArray(binaryString, splitSize);
    for (let i = 0; i < binaryString.length; i++) {
        for (let j = 0; j < binaryString.length; j++) {
            if (binaryStringArr[i][j] == '1') {
                color = "black";
            } else {
                color = "white";
            }
            ctx.fillStyle = color;
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}
function download() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "pi.png";
    link.click();
}

// Call function to draw pi in binary on canvas
drawPiBinary();