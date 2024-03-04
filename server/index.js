const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.listen(8080, () => {
    console.log("Server listnening on port 8080");
})

app.get('/', (req, res) => {
    res.send("Hello from the server");
})