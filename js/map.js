import maplibregl from 'maplibre-gl';

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

export default map;
