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

let BRUSH;



const updateGrid = (user) =>
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
}

const gridDivs = document.querySelectorAll('.grid-div');

const activateDivs = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    gridDivs.forEach(div => div.addEventListener('mouseover', e => 
    {
        e.target.classList.add('grid-on-hover');
    }));    
    console.log('activated');
}

updateGrid(startingGrid);
activateDivs();

const ApplyColor_gaming = (e) =>
{
    e.target.classList.remove('grid-on-hover', 'rainbow');
    e.target.classList.add('gaming');
}

const ApplyColor_rainbow = (e) =>
{
    e.target.classList.remove('grid-on-hover', 'gaming');
    e.target.classList.add('rainbow');
}


// MENU -----------------------------------------------------------------------
const thisGuyIsGaming = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    const gamerBtn = document.getElementById('gamermode');
    gamerBtn.classList.toggle('active-btn');
    if (gamerBtn.classList.contains('active-btn')) {
        gridDivs.forEach(div => div.addEventListener('mouseover', ApplyColor_gaming));
    } else if (!gamerBtn.classList.contains('active-btn')) {
        gridDivs.forEach(div => div.removeEventListener('mouseover', ApplyColor_gaming));
    }
}

const refreshDivsBG = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    gridDivs.forEach(div => div.classList.remove('gaming', 'rainbow', 'grid-on-hover'));
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active-btn'));
    gridDivs.forEach(div => div.removeEventListener('mouseover', ApplyColor_gaming));
    activateDivs();
}

const rainbowStyle = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    document.getElementById('rainbow').classList.toggle('active-btn');
    gridDivs.forEach(div => div.addEventListener('mouseover', e =>
    {
        let randomNum = (Math.floor(Math.random() * 10)) % 7;
        e.target.remove('grid-on-hover', 'gaming');
        let color = rainbowColorsHex[randomNum];
        e.target.style.backgroundColor = `${color}`;
    }));

}
// SLIDER ----------------------------------------------------------------------
const slider = document.getElementById('slider-id');
const sqnum = document.getElementById('sqnum');

sqnum.textContent = slider.value;
slider.oninput = function() {
    sqnum.textContent = this.value;
    updateGrid(this.value);
    activateDivs();
}