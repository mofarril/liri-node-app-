//Depends

//reads & sets environment vars
require("dotenv").config();
//import axios NPM
var axios = require("./node_modules/axios");
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
        "https://rest.bandsintown.com/artists/" + band + "/events?app_id=3bf94057849bab04d58bc26c6e5ac4d1&date=upcoming";
        
    request(urlHit, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var jsonData = JSON.parse(body);
            let band = jsonData.lineup;
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


 