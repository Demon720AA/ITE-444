const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
 console.log('Server Running...');
});

const mysql = require('mysql2');
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'rootpass',
 database: 'workshop_db'
});
db.connect((err) => {
 if(err){
 console.log(err);
 }else{
 console.log('MySQL Connected');
 }
});

app.get('/products', (req,res)=>{
    db.query(
        'SELECT * FROM products',
        (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json(result);
        }
    );
});

app.post('/products',(req,res)=>{
    const {name,price,stock} = req.body;
    db.query(
        'INSERT INTO products(name,price,stock) VALUES(?,?,?)',
        [name,price,stock],
        (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json({
                message:'Insert Success'
            });
        }
    );
});

app.put('/products/:id',(req,res)=>{
    const {name,price,stock} = req.body;
    db.query(
    'UPDATE products SET name=?,price=?,stock=? WHERE id=?',
    [name,price,stock,req.params.id],
    (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json({
                message:'Update Success'
            });
        }
    );
});

app.delete('/products/:id',(req,res)=>{
 db.query(
        'DELETE FROM products WHERE id=?',
        [req.params.id],
        (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json({
                message:'Delete Success'
            });
        }
    );
});

//car

app.get('/car', (req,res)=>{
    db.query(
        'SELECT * FROM car',
        (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json(result);
        }
    );
});

app.post('/car',(req,res)=>{
    const {name,engine,power,price,stock} = req.body;
    db.query(
        'INSERT INTO car(name,engine,power,price,stock) VALUES(?,?,?,?,?)',
        [name,engine,power,price,stock],
        (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json({
                message:'Insert Success'
            });
        }
    );
});

app.put('/car/:id',(req,res)=>{
    const {name,engine,power,price,stock} = req.body;
    db.query(
    'UPDATE car SET name=?,engine=?,power=?,price=?,stock=? WHERE id=?',
    [name,engine,power,price,stock,req.params.id],
    (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json({
                message:'Update Success'
            });
        }
    );
});

app.delete('/car/:id',(req,res)=>{
 db.query(
        'DELETE FROM car WHERE id=?',
        [req.params.id],
        (err,result)=>{
            if(err){
            return res.status(500).json(err);
            }
            res.json({
                message:'Delete Success'
            });
        }
    );
});
