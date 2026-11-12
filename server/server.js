import express from "express";


const app = express();
const PORT = 5000;


// 
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Tilo API Running",
    })
})




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})