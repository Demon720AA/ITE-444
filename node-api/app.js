const http = require('http');
 
const students = [
    { id: 1, name: 'Somchai' },
    { id: 2, name: 'Suda' }
];
 
const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' }
];

const carBrand = [
    { id: 1, name: 'Audi'},
    { id: 2, name: 'BMW'},
    { id: 3, name: 'Mercedes benz'},
    { id: 4, name: 'Porsche'},
    { id: 5, name: 'Alpine'}
];

const color = [
    { id: 1, name: 'Red'},
    { id: 2, name: 'Blue'},
    { id: 3, name: 'Green'},
    { id: 4, name: 'Pink'},
    { id: 5, name: 'Yellow'}
]

const server = http.createServer((req, res) => {
 
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
 
    if (req.url === '/') {
 
        res.end(JSON.stringify({
            message: 'Welcome API'
        }));
 
    }
    else if (req.url === '/students') {
 
        res.end(JSON.stringify(students));
 
    }
    else if (req.url === '/products') {
 
        res.end(JSON.stringify(products));
 
    }
    else if (req.url === '/carBrand'){

        res.end(JSON.stringify(carBrand));

    }
    else if (req.url === '/color'){

        res.end(JSON.stringify(color));
        
    }
    else {
 
        res.writeHead(404);
 
        res.end(JSON.stringify({
            message: 'Not Found'
        }));
 
    }
 
});
 
server.listen(3000);