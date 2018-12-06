const IMAGE_WIDTH = 140;
const IMAGE_HEIGHT = 140;
const IMAGE_WIDTH_PIXEL_SIZE = 10;
const IMAGE_HEIGHT_PIXEL_SIZE = 10;

let seed_input;

const COLORMAP = {
    '1' : [0,1,0.5,20],
    '0' : [0,0.1,0.9,0]
}

let pattern = [];

function setup() {
		createCanvas(windowWidth, windowHeight);
		colorMode(HSL, 360.0, 1.0, 1.0, 100.0);
		seed_input = document.getElementById("seed-text-field");
		
		seed_input.addEventListener('change', function() {
			pattern = [];
			let s = this.value.toLowerCase();
			Array.from(s).forEach( (x) => {
				pattern.push(getCharAsArray(x));
			});
			loop();
		})
		noStroke();

		console.log("press enter to submit!")
}

function draw() {
    background(220);
		

		if(pattern.length == 0){
				noLoop();
				return;
		}
		translate(width/2, height/2);
		//translate(width / 2 - IMAGE_WIDTH * IMAGE_WIDTH_PIXEL_SIZE / 2, height / 2 - IMAGE_HEIGHT * IMAGE_HEIGHT_PIXEL_SIZE / 2);
		rotate(15);
		let hue = 0;
    for(let i = 0; i < pattern.length; i++) {
				rotate(30);
				hue += 30;
				for(let j = 0; j < pattern[i].length; j++){
						let local_c = getPatternColor(i, j);
						if(local_c == 0)
							continue;
						fill([local_c, 1, 0.5, 40]);
						for(let l = -1000; l < 1000; l+=70){
							for(let h = -1000; h < 1000; h+=10){
            rect(i*IMAGE_WIDTH_PIXEL_SIZE - (IMAGE_WIDTH / 2) + h,
                j*IMAGE_HEIGHT_PIXEL_SIZE - (IMAGE_HEIGHT / 2) + l,
                10,
								10);
							}
						}
				}
		}
	noLoop();
}

/*
function keyTyped(){
    pattern.push(getCharAsArray(key));
    console.log(pattern);
    loop();
}
*/

function getPatternColor(i, j) {
    return pattern[i % pattern.length][j % pattern[0].length];
}

function getCharAsArray(character) {
		let char_code = (character).charCodeAt(0);
		let a = Array.from((char_code).toString(2));
		let b = a.map(x => x * map(char_code, 97, 122, 1, 360));
		return b;
} 
