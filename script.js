const body = document.querySelector('body')
const gridContainer = document.getElementById('gridContainer');
const rainbowColorsHex = [
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FF0000"
];
let startingGrid = 16;
// when in doubt, parametrize?
let brushState = "default";

const updateGrid = (user, brushState) =>
{
    gridContainer.style.setProperty('grid-template-columns', `repeat(${user}, 1fr)`);
    gridContainer.style.setProperty('grid-template-rows',`repeat(${user}, 1fr)`);

    const numOfDivs = user*user;
    for (let i = 0; i < numOfDivs; i++)
    {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add("grid-div");
        gridContainer.appendChild(gridDiv);
    }
    switch (brushState){
        case 'default': toDefault(); break;
        case 'gaming': thisGuyIsGaming(); break;
        case 'rainbow': rainbowStyle(); break;
        default: console.log("Issue in updateGrid()");
    }
}

function defaultBrush(e) {
    e.target.classList.add('grid-on-hover');
}

const activateDivs = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    gridDivs.forEach(div => div.addEventListener('mouseover', defaultBrush));    
}

const ApplyColor_gaming = (e) =>
{
    e.target.classList.remove('grid-on-hover', 'rainbow');
    e.target.classList.add('gaming');
}

const ApplyColor_rainbow = (e) =>
{
    e.target.classList.remove('grid-on-hover', 'gaming');
    let randomNum = Math.floor((Math.random() * 10) % 7);
    e.target.style.setProperty('--rainbow-bg-color', `${rainbowColorsHex[randomNum]}`);
    e.target.classList.add('rainbow');
}

// MENU -----------------------------------------------------------------------

const clearEventListeners = (element) =>
{
    
    element.forEach(div => div.removeEventListener('mouseover', ApplyColor_gaming));
    element.forEach(div => div.removeEventListener('mouseover', ApplyColor_rainbow));
    element.forEach(div => div.removeEventListener('mouseover', defaultBrush));
}

const setBrushColor = (brush) => {
    const gridDivs = document.querySelectorAll('.grid-div');

    // This is done in order to ensure the "brush" is clean
    clearEventListeners(gridDivs);

    switch (brush) { 
        case 'gaming':
            gridDivs.forEach(div => div.addEventListener('mouseover', ApplyColor_gaming));
            break;
        case 'rainbow':
            gridDivs.forEach(div => div.addEventListener('mouseover', ApplyColor_rainbow));
            break;
        case 'default':
            gridDivs.forEach(div => div.addEventListener('mouseover', defaultBrush));
            break;
        default:
            console.log('check brushState');
    } 
}

const highlightButton = (brush) => {
    if (brush === 'gaming')
    {
        document.getElementById('gamermode').classList.add('toggled-btn');
        document.getElementById('rainbow').classList.remove('toggled-btn');
        document.getElementById('default').classList.remove('toggled-btn');
    }
    if (brush === 'rainbow')
    {
        document.getElementById('rainbow').classList.add('toggled-btn');
        document.getElementById('gamermode').classList.remove('toggled-btn');
        document.getElementById('default').classList.remove('toggled-btn');
    }
    if (brush === 'default')
    {
        document.getElementById('default').classList.add('toggled-btn');
        document.getElementById('gamermode').classList.remove('toggled-btn');
        document.getElementById('rainbow').classList.remove('toggled-btn');
    }
}


const refreshDivsBG = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    gridDivs.forEach(div => div.classList.remove('gaming', 'rainbow', 'grid-on-hover'));
    clearEventListeners(gridDivs);
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('toggled-btn'));
    activateDivs();
}

function thisGuyIsGaming()
{
    brushState = "gaming";
    setBrushColor(brushState); 
    highlightButton(brushState);
}

function toDefault()
{
    brushState = "default";
    setBrushColor(brushState);
    highlightButton(brushState);
}

function rainbowStyle()
{
    brushState = "rainbow";
    setBrushColor(brushState);
    highlightButton(brushState);
}

// SLIDER ----------------------------------------------------------------------
const slider = document.getElementById('slider-id');
const sqnum = document.getElementById('sqnum');

updateGrid(startingGrid, brushState);
activateDivs();

sqnum.textContent = slider.value;
slider.oninput = function() {
    sqnum.textContent = this.value;
    updateGrid(this.value, brushState);
    activateDivs();
}
