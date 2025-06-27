import MapboxDraw from '@mapbox/mapbox-gl-draw';

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
});

// MapboxDraw requires the canvas's class order to have the class
// "mapboxgl-canvas" first in the list for the key bindings to work
// These are Mapbox GL JS specific classes, but Maplibre GL JS
// is largely API-compatible, so we add them for MapboxDraw to function.
const canvas = document.querySelector('.maplibregl-canvas');
if (canvas) {
  canvas.className = 'mapboxgl-canvas maplibregl-canvas';
}
const container = document.querySelector('.maplibregl-map');
if (container) {
  container.classList.add('mapboxgl-map');
}
const canvasContainer = document.querySelector('.maplibregl-canvas-container');
if (canvasContainer) {
  canvasContainer.classList.add('mapboxgl-canvas-container');
  if (canvasContainer.classList.contains('maplibregl-interactive')) {
    canvasContainer.classList.add('mapboxgl-interactive');
  }
}


const originalOnAdd = draw.onAdd.bind(draw);
draw.onAdd = (map) => {
  const controlContainer = originalOnAdd(map);
  controlContainer.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');
  return controlContainer;
};

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

// callback for draw.update and draw.selectionchange
const setDrawFeature = function(e) {
  if (e.features.length && e.features[0].type === 'Feature') {
    const feat = e.features[0];
    drawFeatureID = feat.id;
  }
}

// Event Handlers for Draw Tools
function setupDrawEventHandlers(map) {
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
}

export { draw, changeColor, setupDrawEventHandlers };
