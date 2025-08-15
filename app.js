const express =  require("express");
const app = express();
const path = require("path"); //path
// for socket io we are calling http from node 
const http = require("http");
// for socket 
const socketio = require("socket.io");


// http and socket creation 
const server = http.createServer(app);
const io = socketio(server);

// setup 
app.set("view engine", "ejs");
// path set up 
app.use(express.static(path.join(__dirname,"public")));

// io setup 
io.on("connection" , function (socket) {
    socket.on("send-location",function (data){
        io.emit("receive-location",{id:socket.id , ...data});
    });
// connected disconnected 
socket.on("disconnect",function() {
io.emit("user-disconnected",socket.id);
});
});

app.get("/",function(req,res){
    res.render("index");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});


