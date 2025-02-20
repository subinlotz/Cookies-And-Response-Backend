const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors({
    origin: "https://cookies1.netlify.app",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

//set cookie
app.get("/set-cookie", (req,res)=>{
    res.cookie("sampleCookie","12345", {
        maxAge: 230000,
        httpOnly: true,
        secure: true, 
        sameSite: "None" 
    })
    res.json({ message: "Cookie has been set!" });
})

//get cookie
app.get("/get-cookie", (req,res)=>{
    const cookies = req.cookies.sampleCookie
    if (cookies) {
        res.json({message: "cookie recieved", token: cookies})
    } else {
        res.status(400).json({ error: "No cookie found" });
    }
})

//routes for different response codes
app.get("/success", (req, res) => {
    res.status(200).json({ message: "Success!" });
});

app.post("/created", (req, res) => {
    res.status(201).json({ message: "Resource created!" });
});

app.get("/bad-request", (req, res) => {
    res.status(400).json({ error: "Bad request" });
});

app.get("/not-found", (req, res) => {
    res.status(404).json({ error: "Not found" });
});

app.get("/server-error", (req, res) => {
    res.status(500).json({ error: "Internal server error" });
});



app.listen(PORT,()=>console.log(`server listening on PORT: ${PORT}`))
