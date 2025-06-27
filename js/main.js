import map from './map.js';
import { draw, changeColor, setupDrawEventHandlers } from './draw.js';
import { ColorControlGroup, addColorControlStyles } from './colorControl.js';
import { setupCoordinatePopups } from './popup.js';
import { setupGeocoder } from './geocoder.js';
import { setupRuler } from './ruler.js';

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

// Setup Ruler
setupRuler(map, draw);

