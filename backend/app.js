const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// test connection to database

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the VibeHut server.');
  });


//app.get("/test", (req, res) => res.send("testing backend"));

// query to create a user account
app.post('/createAccount',(req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var userId = req.body.userId;
    console.log(req.body);
    var querystring = "INSERT INTO users (userId, username, email, password, isAdmin) VALUES (" + userId + ", '" + username + "', '" + email + "', '" + password + "', 0)";
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added user");
});


// query to return max user id
app.get("/getMaxId", (req, res) => {
    let userquery = `SELECT MAX(userId) as userId FROM users`;
    connection.query(userquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return max mood id
app.get("/getMaxMoodId", (req, res) => {
    let moodquery = `SELECT MAX(mood_id) as moodId FROM moods`;
    connection.query(moodquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return max song id
app.get("/getMaxSongId", (req, res) => {
    let songquery = `SELECT MAX(song_id) as song_id FROM songs`;
    connection.query(songquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return max movie id
app.get("/getMaxMovieId", (req, res) => {
    let query = `SELECT MAX(movie_id) as movie_id FROM movies`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return max book id
app.get("/getMaxBookId", (req, res) => {
    let query = `SELECT MAX(book_id) as book_id FROM books`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to see if exact user exists in database
app.get("/checkUserExists", (req, res) => {
    var username = req.query.username;
    var querystring = "SELECT * FROM users WHERE username='" + username + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to see if exact mood exists in database
app.get("/checkMoodExists", (req, res) => {
    var mood_name = req.query.moodname;
    var querystring = "SELECT * FROM moods WHERE mood_name='" + mood_name + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to check the old password
app.get('/CheckPassword', (req, res) => {
    var id = req.query.id;
    var querystring = "SELECT password FROM users WHERE userId='" + id + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to update the password in the database
app.post('/UpdatePassword', (req, res) => {
    var id = req.body.id;
    var password = req.body.password;
    var querystring = "UPDATE users SET password ='" + password + "'WHERE userId='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("password updated");
});

// query to update the username in the database
app.post('/UpdateUsername', (req, res) => {
    var id = req.body.id;
    var username = req.body.username;
    var querystring = "UPDATE users SET username ='" + username + "'WHERE userId='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("username updated");
});


// query to delete song
app.post('/deleteSong', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM songs WHERE song_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("song deleted");
});

// query to delete book mood relationships
app.post('/deleteFromPlaylists', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM playlistsongs WHERE song_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("deleted from playlists");
});

// query to delete song mood relationships
app.post('/deleteSongMoods', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM songmoods WHERE song_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("songmoods deleted");
});


// query to delete mood 
app.post('/deleteMood', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM moods WHERE mood_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("mood deleted");
});

// query to delete book mood relationships
app.post('/deleteMoodBooks', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM bookmoods WHERE mood_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("bookmoods deleted");
});

// query to delete movie mood relationships
app.post('/deleteMoodMovies', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM moviemoods WHERE mood_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("moviemoods deleted");
});

// query to delete mood song relationships
app.post('/deleteMoodSongs', (req, res) => {
    var id = req.body.id;
    var querystring = "DELETE FROM songmoods WHERE mood_id='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("songmoods deleted");
});


// query to delete user from the users table
app.post('/DeleteAccount', (req, res) => {
    var id = req.body.id;
    var queryusers = "DELETE FROM users WHERE userId='" + id + "'";
    var queryfavebooks = "DELETE FROM favebooks WHERE user_id='" + id + "'";
    var queryfavemovies = "DELETE FROM favemovies WHERE user_id='" + id + "'";
    var queryplaylists = "DELETE FROM playlists WHERE user_id='" + id + "'";
    var queryplaylistsongs = "DELETE playlistsongs FROM playlistsongs INNER JOIN playlists ON playlists.playlist_id = playlistsongs.playlist_id WHERE playlists.user_id = '" + id + "'";
    var q = "SET TRANSACTION LEVEL READ COMMITTED;";
    connection.query(  q, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
    });
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        // delete user
        connection.query(queryusers, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);
        });

        // delete fave books
        connection.query(queryfavebooks, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);
        });


        // delete fave movies
        connection.query(queryfavemovies, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);
        });

        // delete playlists songs
        connection.query(queryplaylistsongs, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);
        
            // delete playlists
            connection.query(queryplaylists, (error, results, fields) => {
                if (error) {
                    connection.rollback(function() {
                        throw error;
                    });
                }
                console.log(results);
            });
        });


        connection.commit(function(err) {
            if (err) { 
                connection.rollback(function() {
                throw err;
            });
            }
            console.log('Transaction Complete.');
        });

    });
    res.end("account deleted");
});



// query to log user in database
app.get("/login", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var querystring = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to return all songs
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


// query to return all movies
app.get("/getMovies", (req, res) => {
    let moviequery = `SELECT * FROM movies`;
    connection.query(moviequery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to return all songs
app.get("/getBooks", (req, res) => {
    let bookquery = `SELECT * FROM books`;
    connection.query(bookquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to return all moods
app.get("/getMoods", (req, res) => {
    let moodquery = `SELECT * FROM moods`;
    connection.query(moodquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to see if exact song exists in database
app.get("/checkSongExists", (req, res) => {
    var songtitle = req.query.songtitle;
    var artist = req.query.artist;
    var querystring = "SELECT * FROM songs WHERE song_title='" + songtitle + "' AND artist='" + artist + "'";
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


// query to see if exact movie exists in database
app.get("/checkMovieExists", (req, res) => {
    var movietitle = req.query.movietitle;
    var producer = req.query.producer;
    var querystring = "SELECT * FROM movies WHERE movie_title='" + movietitle + "' AND producer='" + producer + "'";
    console.log(querystring);
    let moviematchquery = querystring;
    connection.query(moviematchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to see if exact book exists in database
app.get("/checkBookExists", (req, res) => {
    var booktitle = req.query.booktitle;
    var author = req.query.author;
    var querystring = "SELECT * FROM books WHERE book_title='" + booktitle + "' AND author='" + author + "'";
    console.log(querystring);
    let bookmatchquery = querystring;
    connection.query(bookmatchquery, (error, results, fields) => {
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


// query to get songs for a playlist for a searched movie
app.get("/getPlaylistForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT s.song_id, s.song_title, s.artist FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN songmoods sm ON sm.mood_id=mm.mood_id JOIN songs s ON sm.song_id=s.song_id WHERE m.movie_id=" + movieId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get songs for a playlist for a searched book
app.get("/getPlaylistForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT s.song_id, s.song_title, s.artist FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN songmoods sm ON sm.mood_id=bm.mood_id JOIN songs s ON sm.song_id=s.song_id WHERE b.book_id=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended books for book
app.get("/getRecommendedBooksForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT b2.book_title, b2.author, b2.book_id FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN bookmoods bm2 ON bm2.mood_id=bm.mood_id JOIN books b2 ON b2.book_id=bm2.book_id WHERE b.book_id=" + bookId + " AND b2.book_id!=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for book
app.get("/getRecommendedMoviesForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT m.movie_title, m.year_released, m.movie_id FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN moviemoods mm ON mm.mood_id=bm.mood_id JOIN movies m ON mm.movie_id=m.movie_id WHERE b.book_id=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended books for movie
app.get("/getRecommendedBooksForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT b.book_title, b.author, b.book_id FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN bookmoods bm ON bm.mood_id=mm.mood_id JOIN books b ON b.book_id=bm.book_id WHERE m.movie_id=" + movieId;    
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for movie
app.get("/getRecommendedMoviesForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT m2.movie_title, m2.year_released, m2.movie_id FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN moviemoods mm2 ON mm2.mood_id=mm.mood_id JOIN movies m2 ON m2.movie_id=mm2.movie_id WHERE m.movie_id=" + movieId + " AND m2.movie_id!=" + movieId;
       let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to add a mood
app.post('/addMood',(req, res) => {
    var mood_name = req.body.moodname;
    var mood_id = req.body.moodid;
    console.log(req.body);
    var querystring = "INSERT INTO moods (mood_name, mood_id) VALUES ('" + mood_name + "', " + mood_id + ")";
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added mood");
});


// query to add a song
app.post('/addSong',(req, res) => {
    var song_title = req.body.songtitle;
    var artist = req.body.artist;
    var album_name = req.body.albumname;
    var song_id = req.body.songid;
    var mood_id_list = req.body.moodidlist;
    console.log(req.body);
    var q = "SET TRANSACTION LEVEL READ COMMITTED;";
    connection.query(  q, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
    });
    var querysongs = "INSERT INTO songs (song_id, song_title, artist, album_name) VALUES (" + song_id + ", '" + song_title + "', '" + artist + "', '" + album_name + "')";
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        console.log(querysongs);
        connection.query(querysongs, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);

            console.log("doing this");
            console.log(mood_id_list.length + " - length");
            for (let i = 0; i < mood_id_list.length; i++) {
                console.log(mood_id_list[i]);
                var querystring = "INSERT INTO songmoods (song_id, mood_id) VALUES (" + song_id + ", " + mood_id_list[i] + ")";
                console.log(querystring);
                connection.query(querystring, (error, results, fields) => {
                    if (error) {
                        connection.rollback(function() {
                            throw error;
                        });
                    }
                });
            }

            console.log("here");
        });

        connection.commit(function(err) {
            if (err) { 
                connection.rollback(function() {
                throw err;
            });
            }
            console.log('Transaction Complete.');
        });
    });
    res.end("added song");
});


// query to add a movie
app.post('/addMovie',(req, res) => {
    var movie_title = req.body.movietitle;
    var producer = req.body.producer;
    var year_released = req.body.yearReleased;
    var movie_id = req.body.movieid;
    var mood_id_list = req.body.moodidlist;
    console.log(req.body);
    var q = "SET TRANSACTION LEVEL READ COMMITTED;";
    connection.query(  q, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
    });
    var querymovie = "INSERT INTO movies (movie_title, year_released, producer, movie_id) VALUES ('" + movie_title + "', '" + year_released + "', '" + producer + "', '" + movie_id + "')";
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        console.log(querymovie);
        connection.query(querymovie, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);

            for (let i = 0; i < mood_id_list.length; i++) {
                console.log(mood_id_list[i]);
                var querystring = "INSERT INTO moviemoods (movie_id, mood_id) VALUES (" + movie_id + ", " + mood_id_list[i] + ")";
                connection.query(  querystring, (error, results, fields) => {
                    if (error) {
                        connection.rollback(function() {
                            throw error;
                        });
                    }
                });
            }
        });

        connection.commit(function(err) {
            if (err) { 
                connection.rollback(function() {
                throw err;
            });
            }
            console.log('Transaction Complete.');
        });
    });
    res.end("added movie");
});


// query to add a book
app.post('/addBook',(req, res) => {
    var book_title = req.body.booktitle;
    var author = req.body.author;
    var book_id = req.body.bookid;
    console.log(req.body);
    var q = "SET TRANSACTION LEVEL READ COMMITTED;";
    connection.query(  q, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
    });
    var querybook = "INSERT INTO books (book_title, author, book_id) VALUES ('" + book_title + "', '" + author + "', '" + book_id + "')";
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        console.log(querymovie);
        connection.query(querybook, (error, results, fields) => {
            if (error) {
                connection.rollback(function() {
                    throw error;
                });
            }
            console.log(results);
            
            for (let i = 0; i < mood_id_list.length; i++) {
                console.log(mood_id_list[i]);
                var querystring = "INSERT INTO bookmoods (book_id, mood_id) VALUES (" + book_id + ", " + mood_id_list[i] + ")";
                connection.query(  querystring, (error, results, fields) => {
                    if (error) {
                        connection.rollback(function() {
                            throw error;
                        });
                    }
                });
            }
        });

        connection.commit(function(err) {
            if (err) { 
                connection.rollback(function() {
                throw err;
            });
            }
            console.log('Transaction Complete.');
        });
    });
    res.end("added book");
});


// query to get song id from mood name
app.get('/getSongId', (req, res) => {
    var songtitle = req.query.songname;
    var artist = req.query.songartist;

    var querystring = "SELECT song_id FROM songs WHERE song_title='" + songtitle + "' AND artist='" + artist + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
})

// query to get movie id from movie name
app.get('/getMovieId', (req, res) => {
    var moviename = req.query.moviename;

    var querystring = "SELECT movie_id FROM movies WHERE movie_title='" + moviename + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
})

// query to get book id from book name
app.get('/getBookId', (req, res) => {
    var booktitle = req.query.booktitle;

    var querystring = "SELECT book_id FROM books WHERE book_title='" + booktitle + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
})


// query to get mood id from mood name
app.get('/getMoodId', (req, res) => {
    var mood_name = req.query.moodname;

    console.log(mood_name);
    var querystring = "SELECT mood_id FROM moods WHERE mood_name='" + mood_name + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
})

// query to get mood id from mood name
app.get('/getMoodIds', (req, res) => {
    var mood_names = req.query.moodnames;

    console.log(mood_names);
    var querystring = "SELECT mood_id FROM moods WHERE mood_name='" + mood_names[0] + "'";
    for (let i = 1; i < mood_names.length; i++) {
        querystring += " OR mood_name='" + mood_names[i] + "'";
    }
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
})

// query to get recommended books for book
app.get("/getRecommendedBooksForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT b2.book_title, b2.author FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN bookmoods bm2 ON bm2.mood_id=bm.mood_id JOIN books b2 ON b2.book_id=bm2.book_id WHERE b.book_id=" + bookId + " AND b2.book_id!=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for book
app.get("/getRecommendedMoviesForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT m.movie_title, m.year_released FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN moviemoods mm ON mm.mood_id=bm.mood_id JOIN movies m ON mm.movie_id=m.movie_id WHERE b.book_id=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended books for movie
app.get("/getRecommendedBooksForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT b.book_title, b.author FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN bookmoods bm ON bm.mood_id=mm.mood_id JOIN books b ON b.book_id=bm.book_id WHERE m.movie_id=" + movieId;    
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for movie
app.get("/getRecommendedMoviesForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT m2.movie_title, m2.year_released FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN moviemoods mm2 ON mm2.mood_id=mm.mood_id JOIN movies m2 ON m2.movie_id=mm2.movie_id WHERE m.movie_id=" + movieId + " AND m2.movie_id!=" + movieId;
       let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return all playlists
app.get("/getPlaylists", (req, res) => {
    let query = `SELECT * FROM playlists`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to add a playlist
app.post('/addPlaylist',(req, res) => {
    var playlist_name = req.body.playlist_name;
    var playlist_id = req.body.playlist_id;
    var user_id = req.body.user_id;
    console.log(req.body);
    var querystring = "INSERT INTO playlists (playlist_id, playlist_name, user_id) VALUES (" + playlist_id + ", '" + playlist_name + "', '" + user_id + "')";
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added playlist");
});

// query to add song to playist
app.post('/addPlaylistSongs', (req, res) => {
    var playlist_id = req.body.playlist_id;
    var song_id_list = req.body.songIdList;

    console.log(playlist_id);
    console.log(song_id_list);

    for (let i = 0; i < song_id_list.length; i++) {
        console.log(song_id_list[i]);
        var querystring = "INSERT INTO playlistsongs (playlist_id, song_id) VALUES (" + playlist_id + ", " + song_id_list[i] + ")";
        connection.query(  querystring, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results);
        });
    }
    res.end("added playlist songs");
})

// query to add favorite book
app.post('/addFaveBook', (req, res) => {
    var user_id = req.body.userid;
    var book_id = req.body.bookid;

    var querystring = "INSERT INTO favebooks (book_id, user_id) VALUES (" + book_id + ", " + user_id + ")";
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added fave book");
});

// query to add favorite movie
app.post('/addFaveMovie', (req, res) => {
    var user_id = req.body.userid;
    var movie_id = req.body.movieid;

    var querystring = "INSERT INTO favemovies (movie_id, user_id) VALUES (" + movie_id + ", " + user_id + ")";
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added fave movie");
});

// query to return favorite books
app.get("/getFaveBooks", (req, res) => {
    var user_id = req.query.userid;
    var query = "SELECT * FROM favebooks f JOIN books b ON f.book_id=b.book_id WHERE user_id=" + user_id;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return favorite movies
app.get("/getFaveMovies", (req, res) => {
    var user_id = req.query.userid;
    var query = "SELECT * FROM favemovies f JOIN movies m ON f.movie_id=m.movie_id WHERE user_id=" + user_id ;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to remove favorite movie
app.post("/removefavemovie", (req, res) => {
    var user_id = req.body.user_id;
    var movieid = req.body.movieid;
    console.log(user_id);
    console.log(movieid);
    var query = "DELETE FROM favemovies WHERE movie_id='" + movieid + "' AND user_id='" + user_id + "'"; 
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("fave movie removed");
});

//query to remove favorite book
app.post("/removefavebook", (req, res) => {
    var user_id = req.body.user_id;
    var bookid = req.body.bookid;
    var query = "DELETE FROM favebooks WHERE book_id='" + bookid + "' AND user_id='" + user_id + "'"; 
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("fave book removed");
});

// query to get playlists for user
app.get("/getPlaylistsForUser", (req, res) => {
    var user_id = req.query.userid;
    var query = "SELECT * FROM playlists p WHERE user_id=" + user_id ;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to see if exact user exists in database
app.get("/checkIfAdmin", (req, res) => {
    var userId = req.query.id;
    console.log(userId)
    var querystring = "SELECT * FROM users WHERE userId='" + userId + "' AND isAdmin=1";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// grant admin privileges
app.post('/makeAdmin', (req, res) => {
    var id = req.body.id;
    var querystring = "UPDATE users SET isAdmin=1 WHERE userId='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("admin privileges updated");
});

// query to get songs for a playlist
app.get("/getSavedPlaylistSongs", (req, res) => {
    var playlistId = req.query.playlistId;
    var querystring = "SELECT DISTINCT ps.song_id, s.song_title, s.artist FROM playlistsongs ps JOIN songs s ON ps.song_id=s.song_id WHERE ps.playlist_id=" + playlistId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to delete playlist
app.post("/deletePlaylist", (req, res) => {
    var playlistId = req.body.playlist_id;
    var querystring = "DELETE FROM playlists WHERE playlist_id = " + playlistId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        // what to return here? 
        // res.send(results);
    });
    querystring = "DELETE FROM playlistsongs WHERE playlist_id=" + playlistId;
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        // what to return here? 
        // res.send(results);
    });
});

// query to get songs by name
app.get("/getSongsByName", (req, res) => {
    var songTitle = req.query.songTitle;
    let songquery = "SELECT * FROM songs WHERE song_title LIKE '%" + songTitle + "%'";
    connection.query(songquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to add song to playlist
app.post('/addSongSavedplaylist', (req, res) => {
    var playlist_id = req.body.playlist_id;
    var song_id = req.body.song_id;

    var querystring = "INSERT INTO playlistsongs (playlist_id, song_id) VALUES (" + playlist_id + ", " + song_id + ")";
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added song to playlist");
})

// query to delete song from playlist 
app.post("/deleteSongSavedPlaylist", (req, res) => {
    var song_id = req.body.song_id;
    var playlist_id = req.body.playlist_id;
    let songquery = "DELETE FROM playlistsongs WHERE song_id=" + song_id + " AND playlist_id=" + playlist_id;
    connection.query(songquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to edit playlist name
app.post('/updatePlaylistName', (req, res) => {
    var playlist_id = req.body.playlist_id;
    var name = req.body.name;
    var querystring = "UPDATE playlists SET playlist_name = \"" + name + "\" WHERE playlist_id =" + playlist_id;
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added song to playlist");
})

// query to get number of playlists each user have
app.get("/getNumPlaylistsForAllUser", (req, res) => {
    var querystring = "SELECT p.user_id, u.username, COUNT(p.playlist_id) AS numPlaylists FROM playlists "
                      + "p JOIN users u ON (u.userId = p.user_id) GROUP BY p.user_id , u.username";
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get number of fave books each user have
app.get("/getNumFavBooks", (req, res) => {
    var querystring = "SELECT fb.user_id, u.username, COUNT(fb.book_id) AS numFavBooks FROM favebooks fb JOIN users "
                      + "u ON (u.userId = fb.user_id) GROUP BY fb.user_id , u.username";
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get number of fave movies each user have
app.get("/getNumFavMovies", (req, res) => {

    var querystring = "SELECT fm.user_id, u.username, COUNT(fm.movie_id) AS numFavMovies FROM favemovies fm JOIN users u "
                      + "ON (u.userId = fm.user_id) GROUP BY fm.user_id , u.username";
    connection.query(querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

app.listen(port, () => console.log(`app listening on port ${port}`));