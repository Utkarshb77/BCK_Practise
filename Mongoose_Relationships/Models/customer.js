const mongoose = require('mongoose');

main().then(() => console.log("Mongoose connected successfully")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/customers');
};

const orderSchema = new mongoose.Schema({
    item: String,
    price: Number,
    quantity: Number
});

const customerSchema = new mongoose.Schema({
    name: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId, // Storing reference to another document
            ref: 'Order'  // Reference to the Order model
        }
    ]
});

// Middleware to perform actions before and after deleting a customer
customerSchema.pre("findOneAndDelete", async () => {
    console.log("Pre hook executed before deleting a customer");
});
// Post middleware
customerSchema.post("findOneAndDelete", async (customer) => { // Using this Middleware we'll delete the orders associated with the customer being deleted 
    if (!customer) return;
    if (customer.orders.length) {
        let res = await Order.deleteMany({
            _id: {
                $in: customer.orders // Deleting all orders whose IDs are in the customer's orders array
            }
        });
        console.log("Associated orders deleted successfully");
        console.log(res);
    }
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// Adding some customers with references to orders
const addCustomers = async () => {
    let customer1 = new Customer({
        name: 'John Doe',
        orders: []
    });

    let order1 = await Order.findOne({ item: 'Laptop' }); // Fetching an existing order to reference
    let order2 = await Order.findOne({ item: 'Phone' });
    customer1.orders.push(order1);
    customer1.orders.push(order2);

    await customer1.save();
    console.log(customer1);
}
// addCustomers();

// Finding customers and populating their orders ( populating means replacing the references with actual documents )
const findCustomers = async () => {
    let customers = await Customer.find().populate('orders'); // Populating the orders field with actual order documents
    console.log(customers);
}
// findCustomers();

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

const addCust = async () => {
    let cust = new Customer({
        name: 'Shiv Parvati',
    });
    let newOrder = new Order({ item: 'Trishul', price: 7777, quantity: 1 });
    await newOrder.save();
    cust.orders.push(newOrder);
    await cust.save();
    console.log(cust);
}
// addCust();

const deletecus = async () => {
    let data = await Customer.findByIdAndDelete("6965452186b097cd55acd8f6");
    console.log(data);
    console.log("All customers and orders deleted");
}
deletecus(); 