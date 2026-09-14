// let score = 75;
// if (score >= 90){
//     console.log("A");
// }else if (score >= 85){
//     console.log("B");
// }else if (score >= 75){
//     console.log("B");
// }else if (score >= 65){
//     console.log("C");
// }else if (score >= 55){
//     console.log("D");
// }else if (score >= 45){
//     console.log("F");
// }

// let total = 15000;
// let discount = 0;
// let discountRate = 0;
// if (total>=10000){
//     discountRate = 10;
//     discount = (total * 0.1);
// }else if (total>=8000){
//     discountRate = 8;
//     discount = (total * 0.08);
// }else if (total>=5000){
//     discountRate = 5;
//     discount = (total * 0.05);
// }else {
//     discount = total;
// }
// console.log("totalPrice: "+ total);
// console.log("Discount "+discountRate+"%: "+ discount);
// console.log("GrandTotal: "+ (total-discount));

// const productCat = "Notebook";
// const productPrice = 28500;
// const order = 2;

// let orderTotal = productPrice * order;
// let discountRate = 0;
// let discountAmount = 0;
// let grandTotal = 0;

// console.log("Product:", productCat);
// console.log("Price:", productPrice);
// console.log("Order:", order);
// console.log("Order Total:", orderTotal);

// if (orderTotal >= 50000){
//     discountRate = 15;
// }else if (orderTotal >= 30000){
//     discountRate = 10;
// }else if (orderTotal >= 10000){
//     discountRate = 5;
// }

// discountAmount = (orderTotal * discountRate / 100);
// grandTotal = (orderTotal - discountAmount);

// console.log('discountRate:', discountRate);
// console.log('discountAmount:', discountAmount);
// console.log('grandTotal', grandTotal);

// const students = [
//     { name: "Aeaey", score: 69},
//     { name: "Ice", score: 88},
//     { name: "Dew", score: 65},
//     { name: "Harry", score: 45}
// ];
// for (let i = 0; i < students.length; i++){
//     if (students[i].score >= 50){
//         console.log(students[i].name + " : ผ่าน");
//     } else {
//         console.log(students[i].name + " : ไม่ผ่าน");
//     }
// }

// const products = [
//     {productID: "01",name: "Mouse", stock: 15},
//     {productID: "02",name: "Keyboard", stock: 3},
//     {productID: "03",name: "Monitor", stock:8 },
//     {productID: "04",name: "Notebook", stock: 2},
//     {productID: "05",name: "Printer", stock: 10}
// ];
// for (const product of products) {
//     if (product.stock <= 5){
//         console.log(product.productID,product.name + " : สินค้าใหล้หมด (" + product.stock + " ชิ้น)");
//     }
// }

// const user = {
//     username: "2513110672",
//     fullname: "supanutArun",
//     email: "2513110672@tni.ac.th",
//     role: "Hacker",
//     status: "Active"
// };
// for (const key in user) {
//     console.log(key + " : " + user[key]);
// }

// const products = [
//     {name: "Pizza", price: 450},
//     {name: "Udon", price: 80},
//     {name: "Bubble Tae", price: 35},
//     {name: "Salmon Sushi", price: 30},
//     {name: "Padthai", price: 50}
// ];
// products.forEach((product) => {
//     console.log(product.name + "ราคา" + 
//         product.price + " บาท"
//     );
// });

// function calculateTotal(price, quantity) {
//     let total = price * quantity;
//     return total;
// }
// let totalPrice = calculateTotal(299, 3);
// console.log(totalPrice);

// let calculateTotal = function(price, quantity){
//     return price * quantity;;
// }
// let totalPrice = calculateTotal(299,3);
// console.log(totalPrice);

// function calculateTotal(price, quantity = 1) {
//     return price * quantity;
// }
// let total1 = calculateTotal(299);
// let total2 = calculateTotal(299, 3);
// console.log(total1 + "\n" + total2);

const products = [
    {name: "Notebook", price: 25000, quantity: 1},
    {name: "Mouse", price: 500, quantity: 2},
    {name: "Keyboard", price: 1200, quantity: 1},
    {name: "monitor", price: 4500, quantity: 2}
];
let subtotal = 0;
let discount = 0;
let grandTotal = 0;
let discountRate = 0;
console.log("------ PRODUCT LIST ------");
for (const product of products){
    let total = product.price * product.quantity;
    console.log(
        " : ราคา " + product.price +
        " : จำนวน " + product.quantity +
        " : รวม " + total + " บาท"
    );
    subtotal += total;
}
if (subtotal >= 50000){
    discountRate = 15;
}else if (subtotal >= 30000){
    discountRate = 10;
}else if (subtotal >= 10000){
    discountRate = 5;
}
discount = subtotal*discountRate/100;
grandTotal = subtotal-discount;
console.log("========== ORDER SUMMARY ==========");
console.log("Subtotal   :", subtotal, "บาท");
console.log("Discoutn   :", discount, "บาท");
console.log("Grand Total:", grandTotal, "บาท");
