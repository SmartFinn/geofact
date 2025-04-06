const map = new maplibregl.Map({
  container: 'map',
  hash: true,
  style: {
    version: 8,
    sources: {
      esri_imagery: {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256,
        attribution: '&copy; Powered by <a href="https://www.esri.com/">Esri</a>',
        minzoom: 2,
        maxzoom: 18,
      },
      carto_labels: {
        type: 'raster',
        tiles: [
          'https://a.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
          'https://b.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
          'https://c.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
          'https://d.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '&copy; <a href="https://carto.com/about-carto/">CARTO</a>',
        minzoom: 2,
        maxzoom: 20,
      }
    },
    layers: [
      // Background layer
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#988f6c'
        }
      },
      {
        id: 'esri-imagery-layer',
        type: 'raster',
        source: 'esri_imagery',
      },
      {
        id: 'carto-labels-layer',
        type: 'raster',
        source: 'carto_labels',
      }
    ]
  },
  center: [35.11, 48.44],
  zoom: 6,
  bearing: 0,
});

// Optional controls
map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
map.addControl(new maplibregl.FullscreenControl());

// add draw
const draw = new MapboxDraw({
  // this is used to allow for custom properties for styling
  // it appends the word "user_" to the property
  userProperties: true,
  controls: {
    'combine_features': false,
    'uncombine_features': false,
  },
  styles: [
    {
      'id': 'gl-draw-polygon-fill-inactive',
      'type': 'fill',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Polygon'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'fill-color': '#3bb2d0',
        'fill-outline-color': '#3bb2d0',
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-polygon-fill-active',
      'type': 'fill',
      'filter': ['all', ['==', 'active', 'true'],
        ['==', '$type', 'Polygon']
      ],
      'paint': {
        'fill-color': '#fbb03b',
        'fill-outline-color': '#fbb03b',
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-polygon-midpoint',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'],
        ['==', 'meta', 'midpoint']
      ],
      'paint': {
        'circle-radius': 5,
        'circle-color': '#fbb03b'
      }
    },
    {
      'id': 'gl-draw-polygon-stroke-inactive',
      'type': 'line',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Polygon'],
        ['!=', 'mode', 'static']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#3bb2d0',
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-polygon-stroke-active',
      'type': 'line',
      'filter': ['all', ['==', 'active', 'true'],
        ['==', '$type', 'Polygon']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fbb03b',
        'line-dasharray': [0.2, 2],
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-line-inactive',
      'type': 'line',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'LineString'],
        ['!=', 'mode', 'static']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#3bb2d0',
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-line-active',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'LineString'],
        ['==', 'active', 'true']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fbb03b',
        'line-dasharray': [0.2, 2],
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 9,
        'circle-color': '#ffffff'
      }
    },
    {
      'id': 'gl-draw-polygon-and-line-vertex-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 5,
        'circle-color': '#fbb03b'
      }
    },
    {
      'id': 'gl-draw-point-point-stroke-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 9,
        'circle-opacity': 1,
        'circle-color': '#ffffff'
      }
    },
    {
      'id': 'gl-draw-point-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 7,
        'circle-color': '#3bb2d0'
      }
    },
    {
      'id': 'gl-draw-point-stroke-active',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'],
        ['==', 'active', 'true'],
        ['!=', 'meta', 'midpoint']
      ],
      'paint': {
        'circle-radius': 11,
        'circle-color': '#ffffff'
      }
    },
    {
      'id': 'gl-draw-point-active',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'],
        ['!=', 'meta', 'midpoint'],
        ['==', 'active', 'true']
      ],
      'paint': {
        'circle-radius': 7,
        'circle-color': '#fbb03b'
      }
    },
    {
      'id': 'gl-draw-polygon-fill-static',
      'type': 'fill',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'Polygon']
      ],
      'paint': {
        'fill-color': '#404040',
        'fill-outline-color': '#404040',
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-polygon-stroke-static',
      'type': 'line',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'Polygon']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#404040',
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-line-static',
      'type': 'line',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'LineString']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#404040',
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-point-static',
      'type': 'circle',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'Point']
      ],
      'paint': {
        'circle-radius': 5,
        'circle-color': '#404040'
      }
    },

    // new styles for toggling colors
    {
      'id': 'gl-draw-polygon-stroke-color-picker',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'Polygon'],
        ['has', 'user_customColor'],
      ],
      'paint': {
        'line-color': ['get', 'user_customColor'],
        'line-width': 2.5
      }
    },
    {
      'id': 'gl-draw-polygon-color-picker',
      'type': 'fill',
      'filter': ['all', ['==', '$type', 'Polygon'],
        ['has', 'user_customColor']
      ],
      'paint': {
        'fill-color': ['get', 'user_customColor'],
        'fill-outline-color': ['get', 'user_customColor'],
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-line-color-picker',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'LineString'],
        ['has', 'user_customColor']
      ],
      'paint': {
        'line-color': ['get', 'user_customColor'],
        'line-width': 2
      }
    },
    {
      'id': 'gl-draw-point-color-picker',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'],
        ['has', 'user_customColor']
      ],
      'paint': {
        'circle-radius': 7,
        'circle-color': ['get', 'user_customColor']
      }
    },

  ]
})

// MapboxDraw requires the canvas's class order to have the class
// "mapboxgl-canvas" first in the list for the key bindings to work
map.getCanvas().className = 'mapboxgl-canvas maplibregl-canvas';
map.getContainer().classList.add('mapboxgl-map');
const canvasContainer = map.getCanvasContainer();
canvasContainer.classList.add('mapboxgl-canvas-container');
if (canvasContainer.classList.contains('maplibregl-interactive')) {
  canvasContainer.classList.add('mapboxgl-interactive');
}

const originalOnAdd = draw.onAdd.bind(draw);
draw.onAdd = (map) => {
  const controlContainer = originalOnAdd(map);
  controlContainer.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');
  return controlContainer;
};

map.addControl(draw, 'top-right');


let drawFeatureID = '';
let newDrawFeature = false;

// change colors
function changeColor(color) {
  if (drawFeatureID !== '' && typeof draw === 'object') {

    // add whatever colors you want here...
    draw.setFeatureProperty(drawFeatureID, 'customColor', color);

    const feat = draw.get(drawFeatureID);
    draw.add(feat)
  }
}

class ColorControlGroup {
  constructor(options = {}) {
    this.options = options;
    this.changeColorCallback = options.changeColorCallback || function() {};
  }

  onAdd(map) {
    this._map = map;

    // Create the container div for the control group
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group color-control-group';

    // Define the colors and create buttons for each
    const colors = [
      { value: 'red', label: ' ', title: 'Change color to Red' },
      { value: 'green', label: ' ', title: 'Change color to Green' },
      { value: 'blue', label: ' ', title: 'Change color to Blue' },
      { value: 'yellow', label: ' ', title: 'Change color to Yellow' },
      { value: 'magenta', label: ' ', title: 'Change color to Magenta' },
      { value: 'cyan', label: ' ', title: 'Change color to Cyan' },
    ];

    // Create each button and add to the container
    colors.forEach(color => {
      const button = document.createElement('button');
      button.className = 'color-button ' + color.value;
      button.textContent = color.label;
      button.title = color.title;

      // Add click event handler
      button.addEventListener('click', () => {
        // Call the external changeColor function if provided in options
        if (typeof this.options.changeColorCallback === 'function') {
          this.options.changeColorCallback(color.value);
        } else {
          // Fallback to global function if it exists
          if (typeof window.changeColor === 'function') {
            window.changeColor(color.value);
          } else {
            console.error('No changeColor function found');
          }
        }

        // Highlight active button
        this._highlightActive(button);
      });

      this._container.appendChild(button);
    });

    return this._container;
  }

  // Helper to highlight the active button
  _highlightActive(activeButton) {
    // Remove active class from all buttons
    const buttons = this._container.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to selected button
    activeButton.classList.add('active');
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

// Add styles for the color control buttons
const addColorControlStyles = () => {
  if (!document.getElementById('color-control-styles')) {
    const style = document.createElement('style');
    style.id = 'color-control-styles';
    style.textContent = `
      .color-control-group button {
        width: 30px;
        height: 30px;
        padding: 0;
        text-align: center;
        border: none;
        cursor: pointer;
        display: block;
        border-bottom: 1px solid #ddd;
      }
      .color-control-group button:last-child {
        border-bottom: none;
      }
      .color-control-group button.red { background-color: rgba(255,0,0,0.5); }
      .color-control-group button.green { background-color: rgba(0,255,0,0.5); }
      .color-control-group button.blue { background-color: rgba(0,0,255,0.5); }
      .color-control-group button.yellow { background-color: rgba(255,255,0,0.5); }
      .color-control-group button.magenta { background-color: rgba(255,0,255,0.5); }
      .color-control-group button.cyan { background-color: rgba(0,255,255,0.5); }
    `;
    document.head.appendChild(style);
  }
};

map.addControl(new ColorControlGroup({
  changeColorCallback: (color) => {
    changeColor(color)
  }
}), 'top-right');

// Run this when adding the control
addColorControlStyles();

// callback for draw.update and draw.selectionchange
const setDrawFeature = function(e) {
  if (e.features.length && e.features[0].type === 'Feature') {
    const feat = e.features[0];
    drawFeatureID = feat.id;
  }
}

// Event Handlers for Draw Tools

map.on('draw.create', function() {
  newDrawFeature = true;
});

map.on('draw.update', setDrawFeature);

map.on('draw.selectionchange', setDrawFeature);

map.on('click', function(e) {
  if (!newDrawFeature) {
    const drawFeatureAtPoint = draw.getFeatureIdsAt(e.point);

    // if another drawFeature is not found - reset drawFeatureID
    drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : '';
  }

  newDrawFeature = false;
});

const coordsPopupContent = (coordinates) => {
  const popupContent = document.createElement('div');
  const coordSpan = document.createElement('code');
  coordSpan.className = 'popup-coordinates';
  coordSpan.textContent = coordinates;

  popupContent.appendChild(coordSpan);

  return popupContent;
}

map.on('contextmenu', (e) => {
  const coords = e.lngLat;
  const popupContent = coordsPopupContent(`${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`);

  new maplibregl.Popup({ 'maxWidth': 'none' })
    .setLngLat([coords.lng, coords.lat])
    .setDOMContent(popupContent)
    .addTo(map);
});

// Timer for detecting long press
let touchTimer = null;

map.on('touchstart', (e) => {
  if (e.points.length !== 1) return; // Ignore multi-touch

  touchTimer = setTimeout(() => {
    const coords = e.lngLat;
    const popupContent = coordsPopupContent(`${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`);

    new maplibregl.Popup({ 'maxWidth': 'none' })
      .setLngLat([coords.lng, coords.lat])
      .setDOMContent(popupContent)
      .addTo(map);
  }, 800); // Hold for 800ms
});

map.on('touchmove', () => {
  clearTimeout(touchTimer); // Cancel if map moved
})

map.on('touchend', () => {
  clearTimeout(touchTimer); // Cancel if released early
});

// Geocoder
const geocoderApi = {
  forwardGeocode: async (config) => {
    const features = [];
    try {
      const request =
        `https://nominatim.openstreetmap.org/search?q=${config.query}&format=geojson&polygon_geojson=1&addressdetails=1&featureType=city&countrycodes=ua,ru`;
      const response = await fetch(request);
      const geojson = await response.json();
      for (const feature of geojson.features) {
        const center = [
          feature.bbox[0] +
          (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] +
          (feature.bbox[3] - feature.bbox[1]) / 2
        ];
        const point = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: center
          },
          place_name: feature.properties.display_name,
          properties: feature.properties,
          text: feature.properties.display_name,
          place_type: ['place'],
          center
        };
        features.push(point);
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error: ${e}`);
    }

    return {
      features
    };
  }
};
map.addControl(
  new MaplibreGeocoder(geocoderApi, {
    maplibregl: maplibregl,
    collapsed: true,
    marker: false,
    showResultMarkers: false,
    showResultsWhileTyping: true,
    minLength: 3,
    debounceSearch: 400,
    flyTo: {
      zoom: 13,
    },
  }), 'top-left'
);