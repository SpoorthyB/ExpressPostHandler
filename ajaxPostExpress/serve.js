var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tomcat123',
    database: 'register'
});
var port = 3000;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get(function(req, res) {
    res.render('index.html');
});

app.post('/', function(req, res) {

            var post = {
                user_id: req.body.userid,
                passwd: req.body.password,
                email: req.body.email,
                q1: req.body.q1,
                ans1: req.body.a1,
                q2: req.body.q2,
                ans2: req.body.a2,
                mobile: req.body.tel,
                address: req.body.address,
                areas: req.body.area
            };

            connection.connect(function(err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('connected as id ' + connection.threadId);
                var query = connection.query('insert into customer set ?', post, function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }
                        console.log('success!');


                    });


                });
                console.log(query.sql);


                

            });
            
                var body = "You are registered";
                res.writeHead(200, {'Content-Type': 'text/html'});                        	
                res.end(body);
                
});

            /*app.use(function(req,res){
            	var data = '<h1>Hello World</h1>';
            	res.writeHead(200,{'Content-type':'text/html'});
            	res.end(data);
            });*/

app.listen(port);
console.log('Listening on port 3000');
