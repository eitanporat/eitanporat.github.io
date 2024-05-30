import diseaseClasses from "./constants.js";

class PeriodicTableApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.diseases = [];

    this.selectedDiseaseIndex = 0;
    // Initialize the app
    this.init();
  }

  async init() {
    await this.fetchDiseases();
    this.render();
  }

  render() {
    // Clear the container before rendering
    this.container.innerHTML = "";
  
    // Create an outer layout container to hold the settings and the main content
    const outerLayoutContainer = document.createElement("div");
    outerLayoutContainer.className = "outer-layout-container";
  
    const navbar = this.createNavbar();
    outerLayoutContainer.appendChild(navbar);
  
    // Create the main layout container to hold the disease content
    const layoutContainer = document.createElement("div");
    layoutContainer.className = "layout-container";
  
    // Create a container for settings (e.g., toggle switch)
    const settingsContainer = document.createElement("div");
    settingsContainer.className = "settings-container";
  
    // Container for disease classes and diseases
    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";
  
    // Append the toggle switch to the settings container
    const toggleSwitch = this.createToggleSwitch();
    settingsContainer.appendChild(toggleSwitch);
  
    const ageSlider = this.createAgeSlider();
    settingsContainer.appendChild(ageSlider);
    
    const incidenceSlider = this.createIncidenceSlider();
    settingsContainer.appendChild(incidenceSlider);
    
    // Append the settings container to the outer layout container
    contentContainer.appendChild(settingsContainer);
    
    // Append disease class elements
    const diseaseClassContainer = document.createElement("div");
    diseaseClassContainer.className = "disease-class-container";
    diseaseClasses.forEach((diseaseClass) => {
      diseaseClassContainer.appendChild(
        this.createDiseaseClassElement(diseaseClass)
      );
    });
    contentContainer.appendChild(diseaseClassContainer);
  
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-wrapper';
    tableWrapper.style.position = 'relative'; // Needed for absolute positioning of children

    const verticalAxis = this.createVerticalAxis();
    const verticalAxisLabel = this.createVerticalAxisLabel();
    verticalAxis.appendChild(verticalAxisLabel);

    const horizontalAxis = this.createHorizontalAxis();
    const horizontalAxisLabel = this.createHorizontalAxisLabel();
    horizontalAxis.appendChild(horizontalAxisLabel);

    tableWrapper.appendChild(verticalAxis);
    tableWrapper.appendChild(horizontalAxis);

    // Append disease elements
    const diseasesContainer = this.createDiseasesContainer();

    tableWrapper.appendChild(diseasesContainer);
    contentContainer.appendChild(tableWrapper);
  
    // Append the content container to the layout container
    layoutContainer.appendChild(contentContainer);
  
    // Append the selected disease container and attributes table to the layout container
    const selectedDiseaseContainer = this.createSelectedDiseaseContainer();
    layoutContainer.appendChild(selectedDiseaseContainer);
  
    // Append the main layout container to the outer layout container
    outerLayoutContainer.appendChild(layoutContainer);
  
    // Append the outer layout container to the main container
    this.container.appendChild(outerLayoutContainer);
  }  

  createDiseasesContainer() {
    const diseasesContainer = document.createElement("div");

    const labelsRow = document.createElement("div");
    labelsRow.className = "diseases-labels-row";

    // Define labels and their positions
    const labels = [
      { text: 'BARRIER', startColumn: 1, endColumn: 2 },
      { text: 'SECRETORY', startColumn: 2, endColumn: 6 },
      { text: 'FRONTLINE', startColumn: 6, endColumn: 7 },
      { text: 'PERMANENT', startColumn: 7, endColumn: 8 },
    ];
  
    // Create label elements and position them
    labels.forEach(label => {
      const labelElement = document.createElement('div');
      labelElement.className = 'disease-column-label';
      labelElement.textContent = label.text;
      labelElement.style.gridColumnStart = label.startColumn;
      labelElement.style.gridColumnEnd = label.endColumn;
      labelElement.style.gridRow = 1; // All labels will be in the first row
      if (window.innerWidth <= 900) {
        labelElement.style.width = `${50 * (label.endColumn - label.startColumn)}px`;
      } else {
        labelElement.style.width = `${80 * (label.endColumn - label.startColumn)}px`;
      }
      diseasesContainer.appendChild(labelElement);
    });

    diseasesContainer.className = "diseases-container";
    this.diseases.forEach((disease, index) => {
      diseasesContainer.appendChild(this.createDiseaseElement(disease, index));
    });

    return diseasesContainer;
  }

  createVerticalAxis() {
    const verticalAxis = document.createElement('div');
    verticalAxis.className = 'vertical-axis';
  
    // Create labels for the cell count (10^7 to 10^11)
    for (let i = 11; i >= 7; i--) {
      const label = document.createElement('div');
      label.className = 'axis-label';
      
      // Use the HTML <sup> tag for supscript
      label.innerHTML = `10<sup>${i}</sup>`;
      
      verticalAxis.appendChild(label);
    }
  
    return verticalAxis;
  }
  
  createVerticalAxisLabel() {
    const labelContainer = document.createElement('div');
    labelContainer.className = 'vertical-axis-label';
  
    const lineLeft = document.createElement('div');
    lineLeft.className = 'vertical-axis-label-line';
  
    const labelText = document.createElement('div');
    labelText.className = 'vertical-axis-label-text';
    labelText.textContent = 'Number of Cells';
  
    const lineRight = document.createElement('div');
    lineRight.className = 'vertical-axis-label-line';
  
    // Append the lines and text to the label container
    labelContainer.appendChild(lineLeft);
    labelContainer.appendChild(labelText);
    labelContainer.appendChild(lineRight);
  
    return labelContainer;
  }


  createHorizontalAxis() {
    const horizontalAxis = document.createElement('div');
    horizontalAxis.className = 'horizontal-axis';
  
    return horizontalAxis;
  }

  createHorizontalAxisLabel() {
    const labelContainer = document.createElement('div');
    labelContainer.className = 'horizontal-axis-label';
  
    const lineLeft = document.createElement('div');
    lineLeft.className = 'horizontal-axis-label-line';
  
    const labelText = document.createElement('div');
    labelText.className = 'horizontal-axis-label-text';
    labelText.textContent = 'Turnover Rate';
  
    const lineRight = document.createElement('div');
    lineRight.className = 'horizontal-axis-label-line';
  
    labelContainer.appendChild(lineLeft);
    labelContainer.appendChild(labelText);
    labelContainer.appendChild(lineRight);
  
    return labelContainer;
  }

  async fetchDiseases() {
    const response = await fetch("diseases.json");
    this.diseases = await response.json();
  }

  createToggleSwitch() {
    const container = document.createElement("div");
    container.className = "toggle-container";

    const label = document.createElement("label");
    label.className = "switch";

    const input = document.createElement("input");
    input.type = "checkbox";

    const span = document.createElement("span");
    span.className = "slider round";

    const switchLabel = document.createElement("span");
    switchLabel.className = "switch-label";
    switchLabel.textContent = "♂:♀";

    label.appendChild(input);
    label.appendChild(span);

    container.appendChild(label);
    container.appendChild(switchLabel);

    // Event listener for changing the display of disease information
    input.addEventListener("change", () => {
      const diseases = document.querySelectorAll(".disease");
      diseases.forEach((disease) => {
        if (input.checked) {
          disease.classList.add("show-ratio");
        } else {
          disease.classList.remove("show-ratio");
        }
      });
    });

    return container;
  }

  createDiseaseElement(disease, index) {
    const element = document.createElement("div");
    element.className = `disease ${disease.diseaseClass} show-details hoverable`;
    element.style.backgroundColor = diseaseClasses.find(
      (dc) => dc.disease === disease.diseaseClass
    ).color;

    // Calculate grid position based on row and column properties
    element.style.gridRow = disease.row + 1;
    element.style.gridColumn = disease.column;

    // Create and append organ name element
    const organNameElement = document.createElement("div");
    organNameElement.className = "organ-name";
    organNameElement.textContent = disease.organ;
    element.appendChild(organNameElement);

    // Create and append cell type element
    const cellTypeElement = document.createElement("div");
    cellTypeElement.className = "cell-type";
    cellTypeElement.textContent = disease.cellType;
    element.appendChild(cellTypeElement);

    // Create and append disease name element
    const diseaseNameElement = document.createElement("div");
    diseaseNameElement.className = "disease-name";
    diseaseNameElement.textContent = disease.diseaseName;
    element.appendChild(diseaseNameElement);

    element.setAttribute('data-onset-age', disease.age);
    element.setAttribute('data-incidence', disease.incidence);
    element.setAttribute('data-disease-name', disease.diseaseName);

    // if disease has attribute genderRatio (could be equal to 0...)
    if (disease.genderRatio !== undefined)
    {
      const genderRatioText = document.createElement("div");
      genderRatioText.className = "gender-ratio-text";
      genderRatioText.innerHTML = `<div class="ratio-container">
      <div class="ratio-part">
        <div class="ratio-text-right">♂</div>
        <div class="ratio-colon">:</div>
        <div class="ratio-text-left">♀</div>
      </div>
      <div class="ratio-part">
        <div class="ratio-text-left">1</div>
        <div class="ratio-colon">:</div>
        <div class="ratio-text-right">${disease.genderRatio.toFixed(1)}</div>
      </div>
    </div>    
    `;
      element.appendChild(genderRatioText);
    }

    element.addEventListener("mouseenter", () => {
      if (!this.selectionFinalized) {
        this.selectDisease(index, false);
      }
    });

    const clickevent = () => {
      // Check if the clicked element is already selected
      if (element.classList.contains("selected")) {
        // If it is selected, remove the class and unselect it
        element.classList.remove("selected");
        this.selectionFinalized = false;
        this.selectedDiseaseIndex = null;
      } else {
        // If it is not selected, select it and add the class
        document.querySelectorAll('.disease.selected').forEach(disease => {
          disease.classList.remove('selected');
        });
        element.classList.add("selected");
        this.selectionFinalized = true;
        this.selectDisease(index, true);
      }
    
      // Re-enable the hover effect for all disease elements
      document.querySelectorAll('.disease').forEach(disease => {
        disease.classList.add('hoverable');
      });
    };
    
    element.addEventListener("touchstart", clickevent);
    element.addEventListener("click", clickevent);

    return element;
  }

  createDiseaseClassElement(diseaseClass) {
    const container = document.createElement("div");
    container.className = "disease-class";
  
    // Create the color box
    const colorBox = document.createElement("div");
    colorBox.className = "disease-class-color-box";
    colorBox.style.backgroundColor = diseaseClass.color; // Set the background color to match the disease class
  
    // Create the label
    const label = document.createElement("span");
    label.className = "disease-class-label";
    label.textContent = diseaseClass.disease;
  
    // Append the color box and label to the container
    container.appendChild(colorBox);
    container.appendChild(label);
  
    container.addEventListener("mouseenter", () =>
      this.highlightDiseases(diseaseClass.disease)
    );
    container.addEventListener("mouseleave", () => this.resetHighlight());
  
    // Add touch event listeners for mobile devices
    container.addEventListener("touchstart", (event) => {
      this.highlightDiseases(diseaseClass.disease);
      event.preventDefault(); // Prevent default touch behavior
    }, {passive: false});
  
    container.addEventListener("touchend", (event) => {
      this.resetHighlight();
      event.preventDefault(); // Prevent default touch behavior
    }, {passive: false});
  
    return container;
  }
  

  selectDisease(index, finalize=true) {
    console.log(finalize);
    this.selectedDiseaseIndex = index;

    // Update the selected disease display
    const selectedDiseaseContainer = document.querySelector(".selected-disease-container");
    if (selectedDiseaseContainer) {
      selectedDiseaseContainer.innerHTML = "";
      selectedDiseaseContainer.appendChild(this.createSelectedDiseaseElement());
      selectedDiseaseContainer.appendChild(this.createDiseaseAttributesTable());
    }
  
    // Re-enable the hover effect for all disease elements if not finalizing
    if (!finalize) {
      document.querySelectorAll('.disease').forEach(disease => {
        disease.classList.add('hoverable');
      });
    }
  }

  createSelectedDiseaseElement() {
    const disease =
      this.selectedDiseaseIndex !== null
        ? this.diseases[this.selectedDiseaseIndex]
        : null;
  
    const element = document.createElement("div");
    element.className = "selected-disease";
  
    if (disease) {
      // Create a container for the scrollable content
      const contentContainer = document.createElement("div");
      contentContainer.className = "selected-disease-content";
  
      // Add organ and cell type information to the content container
      const organNameElement = document.createElement("div");
      organNameElement.className = "organ-name";
      organNameElement.textContent = disease.organ;
      contentContainer.appendChild(organNameElement);
  
      const cellTypeElement = document.createElement("div");
      cellTypeElement.className = "cell-type";
      cellTypeElement.textContent = disease.cellType;
      contentContainer.appendChild(cellTypeElement);
  
      const diseaseNameElement = document.createElement("div");
      diseaseNameElement.className = "disease-name";
      diseaseNameElement.textContent = disease.diseaseName;
      contentContainer.appendChild(diseaseNameElement);
  
      // Apply the same color as the disease class
      const color = diseaseClasses.find(
        (dc) => dc.disease === disease.diseaseClass
      )?.color;
      element.style.backgroundColor = color || "#fff";
  
      element.appendChild(contentContainer);
    } else {
      element.textContent = "No disease selected";
    }
  
    return element;
  }
  
  createDiseaseAttributesTable() {
    const disease =
      this.selectedDiseaseIndex !== null
        ? this.diseases[this.selectedDiseaseIndex]
        : null;
  
    const table = document.createElement("table");
    table.className = "disease-attributes-table";
  
    if (disease) {
      // Add table rows for each attribute
      const attributes = ["countMale", "countFemale", "cellLifeSpan", "incidence", "age", "genderRatio", "link"];
      const attributeToText = {
        "countMale": "Cell Count (Male)",
        "countFemale": "Cell Count (Female)",
        "cellLifeSpan": "Cell Life Span (Days)",
        "incidence": "Incidence (Per Million)",
        "age": "Age of Onset",
        "genderRatio": "Female/Male Ratio",
        "link": "Link"
      }
  
      attributes.forEach(attr => {
        const row = table.insertRow();
        const cellName = row.insertCell();
        cellName.textContent = attributeToText[attr];
        const cellValue = row.insertCell();
  
        const value = disease[attr];
        // Check if the attribute is 'link' and if the value is a URL
        if (attr === "link" && typeof value === 'string' && value.startsWith('http')) {
          const link = document.createElement('a');
          link.href = value;
          link.textContent = "View Wikipedia Article";
          link.target = "_blank"; // Opens the link in a new tab
          cellValue.appendChild(link);
        } else {
          // Format large numbers in scientific notation
          if (typeof value === 'number' && value >= 1e5) {
            cellValue.textContent = value.toExponential(1);
          } else {
            cellValue.textContent = value;
          }
        }
      });
    }
  
    return table;
  }
  
  createNavbar() {
    const navbar = document.createElement("div");
    navbar.className = "navbar";  // Assign a class for potential styling
  
    const logo = document.createElement("img");
    logo.src = "https://ptable.com/icon/ptable-logo.svg";
    logo.alt = "PTable Logo";
    logo.className = "navbar-logo";  // Class for styling the logo
  
    const titleText = document.createElement("span");
    titleText.textContent = " of Diseases";
    titleText.className = "navbar-title";  // Class for styling the text
  
    // Append the logo and text to the navbar
    navbar.appendChild(logo);
    navbar.appendChild(titleText);
  
    return navbar;
  }

  highlightDiseases(diseaseClass) {
    console.log('hello?')
    this.diseases.forEach((disease) => {
      const diseaseElement = this.container.querySelector(`.disease[data-disease-name="${disease.diseaseName}"]`);
      if (diseaseElement) {
        if (disease.diseaseClass === diseaseClass) {
          diseaseElement.classList.add("focused");
        } else {
          diseaseElement.classList.add("dimmed");
        }
      }
    });
  }
  
  
  resetHighlight() {
    const diseaseElements = this.container.querySelectorAll(".disease");
    diseaseElements.forEach((element) => {
      element.classList.remove("dimmed");
      element.classList.remove("focused");
    });
  }
  

  // Function to create the selected disease container
  createSelectedDiseaseContainer() {
    const selectedDiseaseContainer = document.createElement("div");
    selectedDiseaseContainer.className = "selected-disease-container";
    selectedDiseaseContainer.appendChild(this.createSelectedDiseaseElement());
  
    // Append the attributes table for the initially selected disease
    selectedDiseaseContainer.appendChild(this.createDiseaseAttributesTable());
  
    return selectedDiseaseContainer;
  }

  createAgeSlider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
  
    // Create a label for the slider
    const ageLabel = document.createElement('span');
    ageLabel.className = 'age-label';
    ageLabel.textContent = 'Age:';
  
    const ageSlider = document.createElement('input');
    ageSlider.type = 'range';
    ageSlider.id = 'ageSlider';
    ageSlider.min = '0';
    ageSlider.max = '84';
    ageSlider.value = '40';
    ageSlider.step = '1';
  
    const ageValue = document.createElement('span');
    ageValue.id = 'ageValue';
    ageValue.textContent = ageSlider.value;
  
    sliderContainer.appendChild(ageLabel);
    sliderContainer.appendChild(ageSlider);
    sliderContainer.appendChild(ageValue);
    this.adjustDiseasesByAge(ageSlider.value);

    // Event listener for the slider
    ageSlider.addEventListener('input', () => {
      ageValue.textContent = ageSlider.value;
      // Adjust the appearance of diseases based on age
      this.adjustDiseasesByAge(ageSlider.value);
    });
  
    this.adjustDiseasesByAge(ageSlider.value);
    return sliderContainer;
  }

  createIncidenceSlider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'slider-container';
  
    const incidenceLabel = document.createElement('span');
    incidenceLabel.className = 'incidence-label';
    incidenceLabel.textContent = 'Incidence:';
  
    const incidenceSlider = document.createElement('input');
    incidenceSlider.type = 'range';
    incidenceSlider.id = 'incidenceSlider';
    incidenceSlider.min = '0';
    incidenceSlider.max = '100'; // Slider range from 0 to 100 for linear movement
    incidenceSlider.value = '50'; // Initial slider position
    incidenceSlider.step = '1';
  
    const incidenceValue = document.createElement('span');
    incidenceValue.id = 'incidenceValue';
  
    // Logarithmic scale parameters
    const logMin = Math.log(0.1); // Logarithm of the minimum incidence value
    const logMax = Math.log(10800); // Logarithm of the maximum incidence value
    const scale = (logMax - logMin) / 100; // Scale to fit the slider range (0-100)
  
    // Set the initial logarithmic value displayed next to the slider
    const initialLogValue = Math.exp(logMin + scale * incidenceSlider.value);
    incidenceValue.textContent = initialLogValue.toFixed(0);
  
    sliderContainer.appendChild(incidenceLabel);
    sliderContainer.appendChild(incidenceSlider);
    sliderContainer.appendChild(incidenceValue);
  
    // Event listener for the slider
    incidenceSlider.addEventListener('input', () => {
      const logValue = Math.exp(logMin + scale * incidenceSlider.value);
      incidenceValue.textContent = logValue.toFixed(1); // Display the logarithmic value
      // Adjust the appearance of diseases based on logarithmic incidence
      this.adjustDiseasesByIncidence(logValue);
    });
  
    return sliderContainer;
  }
  
  adjustDiseasesByAge(age) {
    document.querySelectorAll('.disease').forEach((disease) => {
      const onsetAge = parseInt(disease.getAttribute('data-onset-age'));
      const intensity = Math.min(1, Math.pow(age / onsetAge, 3));
      disease.style.opacity = String(intensity);
      disease.style.filter = `brightness(${intensity})`;
      disease.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    });
  }

  adjustDiseasesByIncidence(incidence) {
    document.querySelectorAll('.disease').forEach((disease) => {
      const diseaseIncidence = parseInt(disease.getAttribute('data-incidence'));
      const intensity = Math.min(1, Math.pow(diseaseIncidence / incidence, 3)); 
      disease.style.opacity = String(intensity);
      disease.style.filter = `brightness(${intensity})`;
      disease.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    });
  }
}


// Bootstrap the app
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PeriodicTableApp("app");
});

// Disable scrolling
document.addEventListener("touchmove", function (e) {
  e.preventDefault();
});
