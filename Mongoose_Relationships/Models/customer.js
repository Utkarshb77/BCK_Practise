const mongoose = require('mongoose');

main().then(() => console.log("Mongoose connected successfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/customers');
};

const orderSchema = new mongoose.Schema({
    item: String,
    price : Number,
    quantity: Number
});

const customerSchema = new mongoose.Schema({
    name: String,
    orders : [
        {
            type: mongoose.Schema.Types.ObjectId, // Storing reference to another document
            ref: 'Order'  // Reference to the Order model
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// Adding some customers with references to orders
// const addCustomers = async () => { 
//     let customer1 = new Customer({
//         name: 'John Doe',
//         orders: []
//     });

//     let order1 = await Order.findOne({ item: 'Laptop' }); // Fetching an existing order to reference
//     let order2 = await Order.findOne({ item: 'Phone' }); 
//     customer1.orders.push(order1);
//     customer1.orders.push(order2);

//     await customer1.save();
//     console.log(customer1);
// }

// addCustomers();

// Finding customers and populating their orders ( populating means replacing the references with actual documents )
const findCustomers = async () => {
    let customers = await Customer.find().populate('orders'); // Populating the orders field with actual order documents
    console.log(customers);
}
findCustomers();

// Adding some orders to the orders collection
// const addOrders = async () => {
//   await Order.insertMany([
//     { item: 'Laptop', price: 1000, quantity: 2 },
//     { item: 'Phone', price: 500, quantity: 5 },
//     { item: 'Tablet', price: 700, quantity: 77 }
//   ]
//   );
//   console.log("Orders added successfully");
// };

// addOrders();