// Select the form and the message div
const orderForm = document.getElementById('orderForm');
const orderMessage = document.getElementById('orderMessage');

// Initial quantities of the produce
let produceQuantities = {
    Milk: 10,
    Beef: 8,
    Tomatoes: 15,
    Onions: 20
};

// Function to update the quantity display
function updateQuantities() {
    document.getElementById('milk-quantity').textContent = produceQuantities.Milk;
    document.getElementById('beef-quantity').textContent = produceQuantities.Beef;
    document.getElementById('tomatoes-quantity').textContent = produceQuantities.Tomatoes;
    document.getElementById('onions-quantity').textContent = produceQuantities.Onions;
}

// Add an event listener to handle form submission
orderForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting

    // Get the selected produce items
    const checkboxes = orderForm.querySelectorAll('input[name="produce"]:checked');
    let itemsOrdered = false;

    checkboxes.forEach((checkbox) => {
        const item = checkbox.value;
        const units = parseInt(document.getElementById(item.toLowerCase() + "Units").value);
        
        if (produceQuantities[item] >= units) {
            // Update the quantities
            produceQuantities[item] -= units;
            itemsOrdered = true;
        }
    });

    // Display success message if items are selected and update the quantity
    if (itemsOrdered) {
        orderMessage.textContent = 'Ordered successfully!';
        orderMessage.style.color = '#28a745';  // Success color
    } else {
        orderMessage.textContent = 'Please select valid items or check available stock.';
        orderMessage.style.color = 'red';  // Error color
    }

    // Update the quantity display
    updateQuantities();
});

// Initial update of quantities
updateQuantities();
