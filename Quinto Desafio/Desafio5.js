const http = require("http");

const server = http.createServer((req, res) => {

    let random1 = Math.floor(Math.random() * 10 + 1);
    let random2 = parseInt((Math.random() * 9999.99 + 0.00).toFixed(2));

    let responseObject = {
        id: random1,
        title: "Producto " + random1,
        price: random2,
        thumbnail: "Foto " + random1,
    };
    res.end(JSON.stringify(responseObject))
})

server.listen(8080, () => {
    console.log("Listening on port 8080...")
})