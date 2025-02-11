// Obtener referencias a los elementos HTML
const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');
const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');
const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay');
const hexCode = document.getElementById('hexCode');

// Función para convertir RGB a código hexadecimal
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Función para convertir código hexadecimal a RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Función para actualizar el color y el código hexadecimal desde los controles deslizantes
function updateColorFromSliders() {
    const red = parseInt(redRange.value);
    const green = parseInt(greenRange.value);
    const blue = parseInt(blueRange.value);

    // Actualizar los valores en los campos de entrada de texto
    redInput.value = red;
    greenInput.value = green;
    blueInput.value = blue;

    // Actualizar el color picker
    colorPicker.value = rgbToHex(red, green, blue);

    // Actualizar el color y el código hexadecimal
    updateColor(red, green, blue);
}

// Función para actualizar el color y el código hexadecimal desde los campos de entrada
function updateColorFromInputs() {
    let red = parseInt(redInput.value);
    let green = parseInt(greenInput.value);
    let blue = parseInt(blueInput.value);

    // Validar y ajustar los valores si es necesario
    red = isNaN(red) ? 0 : Math.min(255, Math.max(0, red));
    green = isNaN(green) ? 0 : Math.min(255, Math.max(0, green));
    blue = isNaN(blue) ? 0 : Math.min(255, Math.max(0, blue));

    // Actualizar los controles deslizantes
    redRange.value = red;
    greenRange.value = green;
    blueRange.value = blue;

    // Actualizar el color picker
    colorPicker.value = rgbToHex(red, green, blue);

    // Actualizar el color y el código hexadecimal
    updateColor(red, green, blue);
}

// Función para actualizar el color y el código hexadecimal desde el color picker
function updateColorFromPicker() {
    const hex = colorPicker.value;
    const rgb = hexToRgb(hex);

    // Actualizar los controles deslizantes y campos de entrada
    redRange.value = rgb.r;
    greenRange.value = rgb.g;
    blueRange.value = rgb.b;

    redInput.value = rgb.r;
    greenInput.value = rgb.g;
    blueInput.value = rgb.b;

    // Actualizar el color y el código hexadecimal
    updateColor(rgb.r, rgb.g, rgb.b);
}

// Función general para actualizar el color y el código hexadecimal
function updateColor(red, green, blue) {
    const color = `rgb(${red}, ${green}, ${blue})`;
    const hex = rgbToHex(red, green, blue);

    // Actualizar la vista previa del color y el código hexadecimal
    colorDisplay.style.backgroundColor = color;
    hexCode.textContent = hex;
}

// Asignar funciones de actualización a los controles deslizantes
redRange.addEventListener('input', updateColorFromSliders);
greenRange.addEventListener('input', updateColorFromSliders);
blueRange.addEventListener('input', updateColorFromSliders);

// Asignar funciones de actualización a los campos de entrada de texto
redInput.addEventListener('input', updateColorFromInputs);
greenInput.addEventListener('input', updateColorFromInputs);
blueInput.addEventListener('input', updateColorFromInputs);

// Asignar función de actualización al color picker
colorPicker.addEventListener('input', updateColorFromPicker);

// Llamar a la función de actualización al cargar la página
updateColorFromSliders();
