import map from './map.js';
import { draw, changeColor, setupDrawEventHandlers } from './draw.js';
import { ColorControlGroup, addColorControlStyles } from './colorControl.js';
import { setupCoordinatePopups } from './popup.js';
import { setupGeocoder } from './geocoder.js';
import { area, length } from '@turf/turf'; // Import turf for calculations

// Add MapboxDraw control
map.addControl(draw, 'top-right');
setupDrawEventHandlers(map);

// Add ColorControlGroup
map.addControl(new ColorControlGroup({
  changeColorCallback: (color) => {
    changeColor(color)
  }
}), 'top-right');
addColorControlStyles();

// Setup Coordinate Popups
setupCoordinatePopups(map);

// Setup Geocoder
setupGeocoder(map);

// Ruler - Area and Length Calculation for Draw tools
// Add event listener for the close button
document.getElementById('close-calculation-box').addEventListener('click', function() {
  document.getElementById('calculated-area').style.display = 'none';
});

// Calculate area and length functions
function calculateArea(e) {
  const data = draw.getAll();
  const calculatedArea = document.getElementById('calculated-area');

  if (data.features.length > 0) {
    const lastFeature = data.features[data.features.length - 1];

    if (lastFeature.geometry.type === 'Polygon') {
      // Calculate area for polygons
      const _area = area(lastFeature);
      let areaRounded = Math.round(_area * 100) / 100;
      const areaDisplay = areaRounded >= 10000 ?
        `${Math.round(areaRounded / 1000000 * 100) / 100} km²` :
        `${areaRounded} m²`;

      // Update only the text content, preserving the close button
      const textNode = document.createTextNode(`Area: ${areaDisplay}`);
      calculatedArea.innerHTML = '';
      calculatedArea.appendChild(textNode);

      // Re-add the close button
      const closeButton = document.createElement('button');
      closeButton.className = 'close-calculation-box-button';
      closeButton.id = 'close-calculation-box';
      closeButton.innerHTML = '×';
      closeButton.addEventListener('click', function() {
        calculatedArea.style.display = 'none';
      });
      calculatedArea.appendChild(closeButton);

      calculatedArea.style.display = 'block';
    } else if (lastFeature.geometry.type === 'LineString') {
      // Calculate length for lines
      const _length = length(lastFeature, {units: 'kilometers'});
      let lengthRounded = Math.round(_length * 100) / 100;
      const lengthDisplay = lengthRounded < 1 ?
        `${Math.round(lengthRounded * 1000)} meters` :
        `${lengthRounded} km`;

      // Update only the text content, preserving the close button
      const textNode = document.createTextNode(`Distance: ${lengthDisplay}`);
      calculatedArea.innerHTML = '';
      calculatedArea.appendChild(textNode);

      // Re-add the close button
      const closeButton = document.createElement('button');
      closeButton.className = 'close-calculation-box-button';
      closeButton.id = 'close-calculation-box';
      closeButton.innerHTML = '×';
      closeButton.addEventListener('click', function() {
        calculatedArea.style.display = 'none';
      });
      calculatedArea.appendChild(closeButton);

      calculatedArea.style.display = 'block';
    }
  } else {
    calculatedArea.innerHTML = '';
    calculatedArea.style.display = 'none';

    // Re-add the close button (ensure it's always there even if hidden)
    let closeButton = document.getElementById('close-calculation-box');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.className = 'close-calculation-box-button';
        closeButton.id = 'close-calculation-box';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', function() {
            calculatedArea.style.display = 'none';
        });
        calculatedArea.appendChild(closeButton);
    }
  }
}

// Setup event listeners for the draw tools
map.on('draw.create', calculateArea);
map.on('draw.delete', calculateArea);
map.on('draw.update', calculateArea);
