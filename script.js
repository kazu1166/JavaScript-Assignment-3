// Smoothie class definition
class Smoothie {
  constructor(base, second, milk, size, topping, sweetness, ice) {
    this.base = base;
    this.second = second || "None";
    this.milk = milk;
    this.size = size;
    this.topping = topping || "None";
    this.sweetness = sweetness;
    this.ice = ice;
    this.price = this.calculatePrice();
  }

  // Calculate price based on ingredients
  calculatePrice() {
    let price = 5; // Base price for the smoothie
    if (this.second !== "None") price += 1; // Add $1 for a second fruit
    if (this.size == "Large") price += 1; // Add $1 for large size
    if (this.topping == "Boba" || this.topping == "Coconut Chunk") price += 0.5;
    else if (this.topping == "Crunched Cookies") price += 1; // Add for a topping
    return price.toFixed(2); // Return price with 2 decimal places
  }

  // Method to return a description of the smoothie
  getDescription() {
    return `
        <p><strong>Your Smoothie Order:</strong></p>
        <ul>
          <li>Base Fruit: ${this.base}</li>
          <li>Second Fruit: ${this.second}</li>
          <li>Milk: ${this.milk}</li>
          <li>Size: ${this.size}</li>
          <li>Topping: ${this.topping}</li>
          <li>Sweetness Level: ${this.sweetness}%</li>
          <li>Ice Level: ${this.ice}</li>
          <li><strong>Total Price:</strong> $${this.price}</li>
          <li><strong>Price including tax:</strong> $${(
            this.price * 1.13
          ).toFixed(2)}</li>
        </ul>
      `;
  }
}

// Function to capitalize strings in values
function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Function to handle form submission
function handleOrder(event) {
  event.preventDefault();

  // Get values from the form
  const base = capitalize(document.getElementById("base").value);
  const second = capitalize(document.getElementById("second").value);
  const milk = capitalize(document.getElementById("milk").value);
  const size = capitalize(document.getElementById("size").value);
  const topping = capitalize(document.getElementById("topping").value);
  const sweetness = document.getElementById("sweetness").value;
  const ice = capitalize(document.getElementById("ice").value);

  // Validate required fields
  if (base == second) {
    alert("You cannot choose same fruit for second option.");
    return;
  }

  // Create a new Smoothie object
  const smoothie = new Smoothie(
    base,
    second,
    milk,
    size,
    topping,
    sweetness,
    ice
  );

  // Add flex class to separate form and output
  const wrapper = document.querySelector(".wrapper");
  wrapper.classList.add("flex");

  // Display the smoothie details on the page
  const output = document.getElementById("output");
  output.innerHTML = smoothie.getDescription();
}

function reset() {
  output.innerHTML = "";
  const wrapper = document.querySelector(".wrapper");
  wrapper.classList.remove("flex");
}

// Attach the event listener to the form
const form = document.querySelector("form");
form.addEventListener("submit", handleOrder);

document.getElementById("reset").addEventListener("click", reset);
