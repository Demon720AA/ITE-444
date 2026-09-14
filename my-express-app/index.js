const express = require('express')
const app = express()
 
app.get('/', (req,res)=>{
   res.send('หน้าแรก')
})
 
app.get('/about', (req,res)=>{
   res.send('เกี่ยวกับเรา')
})
 
app.get('/contact', (req,res)=>{
   res.send('ติดต่อเรา')
})

app.get('/about-me', (req,res)=>{
   res.send('Name: Supanut Arun \n IG: aeaey_spnt.a')
})
 
app.listen(3000)