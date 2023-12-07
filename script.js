// Get canvas element
const canvas = document.getElementById('canvas');
const cellSize = 10;

// Parse URL parameters and set to default value if not found
const urlParams = new URLSearchParams(window.location.search);
let piSize = parseInt(urlParams.get('size')) || 1000;
let splitSize = parseInt(urlParams.get('split')) || 4;

canvas.width = (piSize * cellSize);
canvas.height = (piSize * cellSize);

// Get context and set initial properties for drawing
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'black';

function getPi(size) {
    let i = 1n;
    let x = 3n * (10n ** (BigInt(size) + 20n));
    let pi = x;
    while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
    }
    return pi / (10n ** 20n);
}
// Pi digits as a string
const pi = getPi(piSize);

function to2dArray(str, numCharacters) {
    let result = []; // initialize an empty array for the result
    let currIndex = 0; // set the current index to 0
    while (currIndex < str.length) { // loop until current index reaches the end of the string
        // use the slice method to get a certain number of characters starting from the current index
        let currSlice = str.slice(currIndex, currIndex + numCharacters);
        // push the current slice to the result array
        result.push(currSlice);
        // increment the current index by the specified number of characters
        currIndex += numCharacters;
    }
    return result;
}

// Function to convert pi digits to binary and draw pixels on canvas
function drawPiBinary() {
    let color = "white";
    let binaryString = pi.toString(2);
    let binaryStringArr = to2dArray(binaryString, splitSize);
    for (let i = 0; i < piSize; i++) {
        for (let j = 0; j < piSize; j++) {
            if (binaryStringArr[i][j] == '1') {
                color = "black";
            } else {
                color = "white";
            }
            ctx.fillStyle = color;
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}
function download() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = ".png";
    link.click();
}

// Call function to draw pi in binary on canvas
drawPiBinary();