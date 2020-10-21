const express = require('express');
const app = express();
const port = 5000;

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "34.121.26.227",
    user: "root",
    database: "vibehut",
    password: "cs348vibehut"
  });

var cors = require('cors');
app.use(cors());

// test connection to database
/*
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the VibeHut server.');
  });
*/

app.get("/test", (req, res) => res.send("testing backend"));

// test query to return all songs
app.get("/getSongs", (req, res) => {
    let songquery = `SELECT * FROM songs`;
    connection.query(songquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to search for a specific song
app.get("/getMatchingSongs", (req, res) => {
    var toMatch = req.query.toMatch;
    var querystring = "SELECT * FROM songs WHERE song_title LIKE '%" + toMatch + "%'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to search for a specific book
app.get("/getMatchingBooks", (req, res) => {
    var toMatch = req.query.toMatch;
    var querystring = "SELECT * FROM books WHERE book_title LIKE '%" + toMatch + "%'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to search for a specific movie
app.get("/getMatchingMovies", (req, res) => {
    var toMatch = req.query.toMatch;
    var querystring = "SELECT * FROM movies WHERE movie_title LIKE '%" + toMatch + "%'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

app.listen(port, () => console.log(`app listening on port ${port}`));