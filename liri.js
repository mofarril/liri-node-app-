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
// import request moment.js
var moment= require("moment");
// Init spotify API client using client id and secret
var spotify = new Spotify(keys.spotify);


// FUNCTIONS

 //idk if this works///

//appends history.txt file

fs.appendFile("history.txt", options, function(err) {
    if (err) throw err;
  });
// Function for Spotify search
var getSpotify = function (songName) {
    if (!songName) {
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
                console.log("artist(s): " + songs[i].artists);
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};
// Function for running a BandsInTown Search
var getTour = function (artist) {
    
    var urlHit =
        "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=3bf94057849bab04d58bc26c6e5ac4d1&date=upcoming";
           
        console.log(urlHit);

    axios.get(urlHit).then(function (response) {
           
    console.log("Venue: " + response.venue); //
    console.log("Location: " + response.venue.city);// 
    console.log("Date:" + moment(response.data[1].datatime).format("MM/DD/YYYY"));
    });
};
// Function for running a Movie Search

var getMovie = function (movieName) {

    if(!movieName){
        movieName ="Mr.Nobody";
    }
    
    var urlHit =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=full&tomatoes=true&apikey=7af38222";
       
        axios.get(urlHit)
        .then(function (response) {

            var r = response.data
            console.log("Title: " + r.Title);
            console.log("Year: " + r.Year);
            console.log("Rated: " + r.Rated);
            console.log("IMDB Rating: " + r.Ratings[0].Value);
            console.log("Country: " + r.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + r.Plot);
            console.log("Actors: " + r.Actors);
            console.log("Rotton Tomatoes Rating: " + r.Ratings[1].Value);
        } 
        )};

// Function for running a command based on text file

var doWhatItSays = function () {

    fs.readFile('random.txt', (err, data) => {
        if (err) throw err;
        console.log(data);
      

        var dataArr = data;

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
runLiri(process.argv[2], process.argv.slice(3).join(" "));