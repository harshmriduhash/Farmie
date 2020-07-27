var express     = require('express'),
    bodyParser  = require('body-parser'),
    csv         = require('csv'),
    mongoose    = require('mongoose'),
    Help        = require('./models/help'),
    Feedback    = require('./models/feedback'),
    session     = require('express-session'),
    //Farmer       = require('./models/users'),

    //passport    = require('passport'),
    app         = express(),
    csvObj      = csv();

//CSV functionality

function MyCSV(time, light){
    this.FieldOne = time;
    this.FieldTwo = light;
};

var data = [];

csvObj.from.path('lightReadings.csv').to.array(function (input){
    for (var i=1; i < input.length; i++){
        data.push(new MyCSV(input[i][0], input[i][2]));
    }
});



var port = 3000 || process.env.PORT;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret:'secret-key',
    resave: false,
    saveUninitialized: false 
}));

mongoose.connect("mongodb+srv://mihirkumar:singhisking@cluster0-elvxq.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/readings", function(req, res){
    res.render("readings", { data: data });
});

app.get("/shop", function(req, res){
    res.render("shop");
});

app.get("/chat",function(req, res){
    res.render("users/chat");
});

app.post("/help", function(req, res){
    var question = req.body.question;
    var contact = req.body.contact;

    var newHelp = { question: question, contact: contact};

    Help.create(newHelp, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.post("/feedback", function(req, res){
    var uname = req.body.uname;
    var message = req.body.message;
    // If else to be added here...
    var newMessage = { message: message};

    Feedback.create(newMessage, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});


app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});


app.get("*", function(req, res){
    res.render("error");
})

app.listen(port, function(err){
    console.log("Server running on port " + port);
})