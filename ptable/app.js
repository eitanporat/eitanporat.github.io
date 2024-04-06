import diseaseColors from "./constants.js";

class PeriodicTableApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.diseases = []; // This would be populated with AJAX or Fetch API
    this.diseaseClasses = [
      { disease: "Degenerative", color: "#D9D9D9", row: 1, column: 1 },
      { disease: "Progressive Fibrotic", color: "#97B6D3", row: 2, column: 1 },
      { disease: "Cancer", color: "#9ee5d4", row: 1, column: 2 },
      { disease: "Autoimmune", color: "#D7B1C5", row: 2, column: 2 },
      { disease: "Toxic Adenoma", color: "#B9D4A5", row: 1, column: 3 },
      {
        disease: "Immune Hypersensitivity",
        color: "#EDCD7D",
        row: 2,
        column: 3,
      },
    ];
    this.selectedDiseaseIndex = null;
    // Initialize the app
    this.init();
  }

  async init() {
    await this.fetchDiseases();
    this.fetchDiseaseClasses();
    this.render();
  }

  async fetchDiseases() {
    const response = await fetch("diseases.json");
    this.diseases = await response.json();
  }

  fetchDiseaseClasses() {
    // No need to fetch since we already have the data
  }

  createDiseaseElement(disease, index) {
    const element = document.createElement("div");
    element.className = `disease ${disease.diseaseClass}`;
    element.style.backgroundColor = this.diseaseClasses.find(
      (dc) => dc.disease === disease.diseaseClass
    ).color;

    // Calculate grid position based on row and column properties
    element.style.gridRow = disease.row;
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

    element.addEventListener("click", () => this.selectDisease(index));
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

    return container;
  }

  selectDisease(index) {
    this.selectedDiseaseIndex = index;
    // Apply selected class or any other identifier to the selected disease
    this.render(); // Re-render to update the view
  }

  createSelectedDiseaseElement() {
    const disease =
      this.selectedDiseaseIndex !== null
        ? this.diseases[this.selectedDiseaseIndex]
        : null;

    const element = document.createElement("div");
    element.className = "selected-disease"; // Change class to match the selected disease panel styling

    if (disease) {
      // Create a container for the scrollable content
      const contentContainer = document.createElement("div");
      contentContainer.className = "selected-disease-content";
      element.appendChild(contentContainer);

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
      const color = this.diseaseClasses.find(
        (dc) => dc.disease === disease.diseaseClass
      )?.color;
      element.style.backgroundColor = color || "#fff";
    } else {
      element.textContent = "No disease selected";
    }

    return element;
  }

  highlightDiseases(diseaseClass) {
    this.diseases.forEach((disease, index) => {
      const diseaseElement = this.container.querySelector(
        `.disease:nth-child(${index + 1})`
      );
      if (disease.diseaseClass !== diseaseClass) {
        diseaseElement.classList.add("dimmed");
      }
    });
  }

  resetHighlight() {
    const diseaseElements = this.container.querySelectorAll(".disease");
    diseaseElements.forEach((element) => element.classList.remove("dimmed"));
  }
  // Function to create the selected disease container
  createSelectedDiseaseContainer() {
    const selectedDiseaseContainer = document.createElement("div");
    selectedDiseaseContainer.className = "selected-disease-container";
    selectedDiseaseContainer.appendChild(this.createSelectedDiseaseElement());
    selectedDiseaseContainer.classList.add("selected-disease-panel"); // Add the class for specific styling
    return selectedDiseaseContainer;
  }

  render() {
    // Clear the container before rendering
    this.container.innerHTML = '';

    // Create a layout container to hold all elements flexibly
    const layoutContainer = document.createElement('div');
    layoutContainer.className = 'layout-container';

    // Container for disease classes and diseases
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';

    // Append disease class elements
    const diseaseClassContainer = document.createElement('div');
    diseaseClassContainer.className = 'disease-class-container';
    this.diseaseClasses.forEach(diseaseClass => {
        diseaseClassContainer.appendChild(this.createDiseaseClassElement(diseaseClass));
    });
    contentContainer.appendChild(diseaseClassContainer);

    // Append disease elements
    const diseasesContainer = document.createElement('div');
    diseasesContainer.className = 'diseases-container';
    this.diseases.forEach((disease, index) => {
        diseasesContainer.appendChild(this.createDiseaseElement(disease, index));
    });
    contentContainer.appendChild(diseasesContainer);

    // Append content container to the layout container
    layoutContainer.appendChild(contentContainer);

    // Create and append the selected disease element, styled as a side panel
    const selectedDiseaseContainer = document.createElement('div');
    selectedDiseaseContainer.className = 'selected-disease-container';
    selectedDiseaseContainer.classList.add('selected-disease-panel'); // Add the class for specific styling
    selectedDiseaseContainer.appendChild(this.createSelectedDiseaseElement());
    layoutContainer.insertBefore(selectedDiseaseContainer, contentContainer);

    // Append the layout container to the main container
    this.container.appendChild(layoutContainer);
  }

}

// Bootstrap the app
document.addEventListener("DOMContentLoaded", () => {
  new PeriodicTableApp("app");
});
