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
          // This fallback might not be needed with proper module imports
            console.error('No changeColor function found in options or globally');
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

export { ColorControlGroup, addColorControlStyles };
