const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    
    fs.readFile("student.json", "utf8", (err, data) => {
        
        if (err) {
            res.write("Read File Error");
            res.end();
            return
        }


        const students =JSON.parse(data);

        res.write("<h1>Student List</h1>");


        students.forEach(student => {

            res.write(`
                <p>
                    ${student.id}
                    ${student.name}
                    ${student.major}
                </p>
            `);

        });

        res.end();

    });

});

server.listen(3000, () => {
    console.log("Server Running...");
});