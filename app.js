document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();
    loadOrders();
    loadProfileInfo();

    // Add event listeners for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add event listener for profile form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', updateProfile);
});

let orders = [];

function loadMenuItems() {
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const menuItemsContainer = document.getElementById('menu-items');
            menuItemsContainer.innerHTML = '';
            data.menu.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'bg-white p-4 rounded shadow';

                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
                img.className = 'w-full h-48 object-cover rounded mb-4';
                itemElement.appendChild(img);

                const name = document.createElement('h3');
                name.className = 'text-xl font-bold mb-2';
                name.textContent = item.name;
                itemElement.appendChild(name);

                const description = document.createElement('p');
                description.className = 'mb-2';
                description.textContent = item.description;
                itemElement.appendChild(description);

                const price = document.createElement('p');
                price.className = 'mb-2';
                price.textContent = `Price: $${item.price.toFixed(2)}`;
                itemElement.appendChild(price);

                const button = document.createElement('button');
                button.className = 'bg-blue-500 text-white px-4 py-2 rounded';
                button.textContent = 'Order';
                button.onclick = () => addToOrder(item);
                itemElement.appendChild(button);

                menuItemsContainer.appendChild(itemElement);
            });
        })
        .catch(error => console.log('Error loading menu:', error));
}

function loadOrders() {
    // Simulate fetching orders from an API
    orders = [
        { id: '1', name: 'Pizza Margherita', quantity: 2, total: 17.98 },
        { id: '2', name: 'Spaghetti Carbonara', quantity: 1, total: 12.99 }
    ];
    renderOrders();
}

function renderOrders() {
    const orderListContainer = document.getElementById('order-list');
    orderListContainer.innerHTML = '';
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'bg-white p-4 rounded shadow';

        const name = document.createElement('h3');
        name.className = 'text-xl font-bold mb-2';
        name.textContent = order.name;
        orderElement.appendChild(name);

        const quantity = document.createElement('p');
        quantity.className = 'mb-2';
        quantity.textContent = `Quantity: ${order.quantity}`;
        orderElement.appendChild(quantity);

        const total = document.createElement('p');
        total.className = 'mb-2';
        total.textContent = `Total: $${order.total.toFixed(2)}`;
        orderElement.appendChild(total);

        const editButton = document.createElement('button');
        editButton.className = 'bg-yellow-500 text-white px-4 py-2 rounded mr-2';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editOrder(order.id);
        orderElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteOrder(order.id);
        orderElement.appendChild(deleteButton);

        orderListContainer.appendChild(orderElement);
    });
}

function loadProfileInfo() {
    // Simulate fetching profile info from an API
    const profile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, Anytown, USA'
    };
    const profileInfoContainer = document.getElementById('profile-info');
    profileInfoContainer.innerHTML = '';

    const name = document.createElement('h3');
    name.className = 'text-xl font-bold mb-2';
    name.textContent = `Name: ${profile.name}`;
    profileInfoContainer.appendChild(name);

    const email = document.createElement('p');
    email.className = 'mb-2';
    email.textContent = `Email: ${profile.email}`;
    profileInfoContainer.appendChild(email);

    const address = document.createElement('p');
    address.className = 'mb-2';
    address.textContent = `Address: ${profile.address}`;
    profileInfoContainer.appendChild(address);

    // Populate the form with the current profile info
    document.getElementById('name').value = profile.name;
    document.getElementById('email').value = profile.email;
    document.getElementById('address').value = profile.address;
}

function updateProfile(event) {
    event.preventDefault();
    
    const updatedProfile = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };

    // Simulate saving the updated profile to an API
    console.log('Profile updated:', updatedProfile);

    // Update the profile info displayed
    const profileInfoContainer = document.getElementById('profile-info');
    profileInfoContainer.innerHTML = '';

    const name = document.createElement('h3');
    name.className = 'text-xl font-bold mb-2';
    name.textContent = `Name: ${updatedProfile.name}`;
    profileInfoContainer.appendChild(name);

    const email = document.createElement('p');
    email.className = 'mb-2';
    email.textContent = `Email: ${updatedProfile.email}`;
    profileInfoContainer.appendChild(email);

    const address = document.createElement('p');
    address.className = 'mb-2';
    address.textContent = `Address: ${updatedProfile.address}`;
    profileInfoContainer.appendChild(address);
}

function addToOrder(item) {
    const existingOrder = orders.find(order => order.name === item.name);
    if (existingOrder) {
        existingOrder.quantity += 1;
        existingOrder.total = existingOrder.quantity * item.price;
    } else {
        orders.push({
            id: Date.now().toString(),
            name: item.name,
            quantity: 1,
            total: item.price
        });
    }
    renderOrders();
    console.log(`Item with ID ${item.id} added to order`);
}

function editOrder(orderId) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        const newQuantity = prompt("Enter new quantity", order.quantity);
        if (newQuantity !== null) {
            order.quantity = parseInt(newQuantity, 10);
            order.total = order.quantity * (order.total / order.quantity);
            renderOrders();
            console.log(`Order with ID ${orderId} is being edited`);
        }
    }
}

function deleteOrder(orderId) {
    orders = orders.filter(order => order.id !== orderId);
    renderOrders();
    console.log(`Order with ID ${orderId} deleted`);
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}
