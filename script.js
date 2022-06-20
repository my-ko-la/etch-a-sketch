const body = document.querySelector('body')
const gridContainer = document.getElementById('gridContainer');

let startingGrid = 4;

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

const activateDivs = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    gridDivs.forEach(div => div.addEventListener('mouseover', e => 
    {
        e.target.classList.add('grid-on-hover');
    }));    
}

updateGrid(startingGrid);
activateDivs();



// MENU -----------------------------------------------------------------------
const thisGuyIsGaming = () =>
{
    const gridDivs = document.querySelectorAll('.grid-div');
    gridDivs.forEach(div => div.addEventListener('mouseover', e =>
    {
        e.target.classList.add('gaming');
    }))
}

const gamerBtn = document.getElementById('gamermode');
gamerBtn.onclick = thisGuyIsGaming();


// SLIDER ----------------------------------------------------------------------
const slider = document.getElementById('slider-id');
const sqnum = document.getElementById('sqnum');

sqnum.textContent = slider.value;
slider.oninput = function() {
    sqnum.textContent = this.value;
    updateGrid(this.value);
    activateDivs();
}