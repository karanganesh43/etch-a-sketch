const container = document.querySelector('.container');
let randomColor = false;
let darken = false;
let gridSize = 16;
let squareSize = 400 / gridSize;

createGrid(gridSize);

function createGrid(size) {
    container.style.setProperty('--grid-size', size);
    squareSize = 400 / size;

    container.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.style.width = `${squareSize}px`;
        gridSquare.style.height = `${squareSize}px`;
        container.appendChild(gridSquare);
    }
}

function changeGridSize() {
    const newSize = prompt('Enter the number of squares per side (1-100):');
    const size = parseInt(newSize);

    if (isNaN(size) || size < 1 || size > 100) {
        alert('Invalid input. Please enter a number between 1 and 100.');
    } else {
        gridSize = size;
        createGrid(size);
    }
}

function toggleRandomColor() {
    randomColor = !randomColor;
    if (randomColor) {
        darken = false;
        document.getElementById('darkenToggle').checked = false;
    }
}

function toggleDarken() {
    darken = !darken;
    if (darken) {
        randomColor = false;
        document.getElementById('randomColorToggle').checked = false;
    }
}

container.addEventListener('mouseover', function (event) {
    if (event.target.classList.contains('grid-square')) {
        if (randomColor) {
            const randomRGB = `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)})`;
            event.target.style.backgroundColor = randomRGB;
        } else if (darken) {
            let currentOpacity = parseFloat(getComputedStyle(event.target).getPropertyValue('opacity'));
            if (!isNaN(currentOpacity) && currentOpacity < 1) {
                event.target.style.opacity = (currentOpacity + 0.1).toFixed(1);
                event.target.style.backgroundColor = 'rgba(0, 0, 0, ' + event.target.style.opacity + ')';
            }
        } else {
            event.target.style.backgroundColor = 'black';
        }
    }
});

function clearGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(square => {
        square.style.backgroundColor = 'white';
        square.style.opacity = 1;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}