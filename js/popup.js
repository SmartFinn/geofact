import maplibregl from 'maplibre-gl';

const coordsPopupContent = (coordinates) => {
  const popupContent = document.createElement('div');
  const coordSpan = document.createElement('code');
  coordSpan.className = 'popup-coordinates';
  coordSpan.textContent = coordinates;

  popupContent.appendChild(coordSpan);

  return popupContent;
}

function setupCoordinatePopups(map) {
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
}

export { setupCoordinatePopups };
