const order = [
    {id:1, customer: 'demon1', total: 1500, status: 'Success'},
    {id:2, customer: 'demon2', total: 2500, status: 'Pending'},
    {id:3, customer: 'demon3', total: 4000, status: 'Success'},
    {id:4, customer: 'demon4', total: 3600, status: 'Success'},
    {id:5, customer: 'demon5', total: 1700, status: 'Shipping'}
];

//server
function loadOrder(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(order);
        }, 3000);
    }); 
}

//asyn await
async function displayOrder() {
    console.log('Loading Order...');
    const data = await loadOrder();

    console.log('---------- order list ----------');

    let orderTotal = 0;
    
    for (const order of data){
        console.log(
            order.id,
            order.customer,
            order.total,
            order.status
        )
         orderTotal += order.total
    }
    console.log('--------------------------------');
    console.log('Total Success Sales : ' + orderTotal + ' Baht.')
}
displayOrder();