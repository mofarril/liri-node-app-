//Depends

//reads & sets environment vars
require("dotenv").config();
//import axios NPM
var axios = require("axios");
//import spotify NPM
let Spotify = require("node-spotify-api");
//import fs package
let fs = require("fs");
//import API keys
var keys = require("./keys.js");
//import request npm
var request = require("request");
// Init spotify API client using client id and secret
var spotify = new Spotify(keys.spotify);

// FUNCTIONS

// Writes to history.txt file
var getArtistNames = function (artist) {
    return artist.name;
};
// Function for Spotify search
var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};
// Function for running a BandsInTown Search
var getTour = function () {
    var urlHit =
        "https://rest.bandsintown.com/artists/" + artistname + "/events?app_id=3bf94057849bab04d58bc26c6e5ac4d1&date=upcoming";

    request(urlHit, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var jsonData = JSON.parse(body);
            console.log("Venue: " + jsonData.venue);
            console.log("Location: " + jsonData.city);
            console.log("Date:" + jsonData.datetime);

            //need to format with moment.js
        }
    });
};
// Function for running a Movie Search
var getMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }
    var urlHit =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=full&tomatoes=true&apikey=7af38222";
    request(urlHit, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
    });
};
// Function for running a command based on text file
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        var dataArr = data.split(",");
        if (dataArr.length === 2) {
            options(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            options(dataArr[0]);
        }
    });
};
// Function for determining which command is executed
var options = function (caseData, functionData) {
    switch (caseData) {
        case "concert-this":
            getTour(functionData);
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI isn't sure");
    }
};
// Function which takes in command line arguments and executes correct function accordigly
var runLiri = function (argOne, argTwo) {
    options(argOne, argTwo);
};
// LIRI SHOULD WORK
// ===================================== 
runLiri(process.argv[2], process.argv[3]);


//commented this stuff out and started over
/*default movie Mr. Nobody

if (args[0] === "movie-this") {
    if (args[1] === undefined) {
        gotMovie("Mr.+Nobody");
    }
    else {
        getMovie(args.slice(1).join("+"));
    }
};
//spotify this song, default "The Sign"
if (args[0] === "spotify-this-song") {

    if (args[1] == undefined) {
        spotifySong("The Sign");
    }
    else {
        let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};

// reads from random.txt

if (args[0] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        dataArr = data.split(",");
        if (dataArr[0] === "movie-this") {
            if (dataArr[1] === undefined) {
                getMovie("Mr.+Nobody")
            }
            else {
                getMovie(dataArr[1].split().join("+"))
            }
        };
        if (dataArr[0] === "spotify-this-song") {
            if (dataArr[1] === undefined) {
                spotifySong("The Sign")
            } else {
                spotifySong(dataArr[1])
            }
        };

    })
}
function spotifySong(songName) {

    spotify.search(({ type: 'track', query: songName, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        data.tracks.items.forEach(function (element) {
            console.log("");
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`Song: ${songName}`);
            console.log(`Spotify Preview Link:${element.preview_url}`);
            console.log(`Album: ${element.album.name}`);
        });
    }))
}


//movie title through omdb api to get more info

function getMovie(movieName) {

    axios
        .get(`http://www.omdbapi.com/?t=${movieName}&apikey=7af38222`)
        .then(function (movie) {

            console.log("");
            console.log(`Title:${movie.data.Title}`);
            console.log(`Realeased: ${movie.data.year}`);
            console.log(`IMDB Rating: ${movie.data.Ratings[1].Value}`);
            console.log(`Rotten Tomatoes Rating: ${movie.data.Ratings[1].Value}`);
            console.log(`Produced in: ${movie.data.Country}`);
            console.log(`Plot: ${movie.data.Plot}`);
            console.log(`Starring: ${movie.data.Actors}`);

        })
        .catch(function (err) {
            console.log(err);
        });
};