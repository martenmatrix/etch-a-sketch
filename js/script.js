function createDrawingPixels(size) {
    if (size > 64) {
        outPutError("Size must be lower than 65.");
        return;
    }

    drawingAreaDiv.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    drawingAreaDiv.style["grid-template-rows"] = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const newPixel = document.createElement('div');
        newPixel.id = "pixel-" + String(i);
        newPixel.className = "pixel";

        drawingAreaDiv.appendChild(newPixel);
    };

    const drawingAreaPixels = document.querySelectorAll('.pixel');  
    drawingAreaPixels.forEach(pixel => {

        let startOpacity = 0;

        pixel.addEventListener('mouseover', (event) => {

            currentColor = "rgb(0, 0, 0)";

            if (shouldDrawRandomColors) {
                const R = Math.floor(Math.random() * 256);
                const G = Math.floor(Math.random() * 256);
                const B = Math.floor(Math.random() * 256);

                currentColor = `rgb(${R}, ${G}, ${B})`;
            };

            if (event.target.style["background-color"] === "") {
                event.target.style["background-color"] = currentColor;   
            };

            if ((startOpacity < 1) && shouldChangeOpacity) {
                startOpacity += 0.1;
            };

            if (!shouldChangeOpacity) {
                startOpacity = 1;
            };
            event.target.style["opacity"] = startOpacity;
        })
    })
};

function removeAllPixels() {
    const drawingAreaPixels = document.querySelectorAll('.pixel');
    drawingAreaPixels.forEach(pixel => pixel.remove());
};

function showUserPixelInput() {
    const modal = document.querySelector(".modal");
    modal.classList.toggle('hide');

    const textField = document.querySelector("#pixels");
};

function getUserPixelInput() {
    const modal = document.querySelector(".modal");
    const textField = document.querySelector("#pixels");
    let userInput = parseInt(textField.value);
    removeAllPixels()
    createDrawingPixels(userInput);
    modal.classList.toggle('hide');
};

function addMenuEventListener() {
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener('click', function() {
        removeAllPixels();
        createDrawingPixels(currentPixels);
    });

    const setGridsButton = document.querySelector("#set-grids");
    setGridsButton.addEventListener('click', () => showUserPixelInput());

    const submitButton = document.querySelector("#submit-button");
    submitButton.addEventListener('click', () => getUserPixelInput());

    const CloseErrorMessage = document.querySelector("#close");
    CloseErrorMessage.addEventListener("click", () => {
        const modal = document.querySelector('.error-message');
        modal.classList.toggle('hide');
    });

    const opacityInput = document.querySelector("#change-opacity");
    opacityInput.addEventListener('change', function() {
        if (this.checked) {
          shouldChangeOpacity = true;
        } else {
          shouldChangeOpacity = false;
        }
      });

    const changeColor = document.querySelector("#change-color");
    changeColor.addEventListener('change', function() {
        if (this.checked) {
            shouldDrawRandomColors = true;
        } else {
            shouldDrawRandomColors = false;
        }
    });
};

function outPutError(error) {
    const modal = document.querySelector('.error-message');
    modal.classList.remove('hide');
    const currentError = document.querySelector('#current-error');
    currentError.textContent = error; 
}

const drawingAreaDiv = document.querySelector('#drawing-area');
let currentPixels = 16; 
let currentColor = "rgb(0, 0, 0)";

let shouldChangeOpacity = false;
let shouldDrawRandomColors = false;

createDrawingPixels(currentPixels);
addMenuEventListener();