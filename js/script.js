function createDrawingPixels(size) {

    drawingAreaDiv.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    drawingAreaDiv.style["grid-template-rows"] = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const newPixel = document.createElement('div');
        newPixel.id = "pixel-" + String(i);
        newPixel.className = "pixel";

        drawingAreaDiv.appendChild(newPixel);
    };

    const drawingAreaPixels = document.querySelectorAll('.pixel');

    drawingAreaPixels.forEach(pixel => pixel.addEventListener('mouseover', (event) => {
        event.target.style["background-color"] = "black";
    }, {once: true}));
};
const drawingAreaDiv = document.querySelector('#drawing-area');
createDrawingPixels(2);