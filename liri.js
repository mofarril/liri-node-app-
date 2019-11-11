//Depends

//reads & sets environment vars
require("dotenv").config();
//import axios NPM
const axios = require("./node_modules/axios");
//import spotify NPM
const Spotify = require("node-spotify-api");
//import fs package
const fs = require("fs");
//import API keys
const keys = require("./keys.js");
// import request moment.js
const moment = require("moment");
// Init spotify API client using client id and secret
const spotify = new Spotify(keys.spotify);


// FUNCTIONS

//idk if this works///

//appends history.txt file - not working

//fs.appendFile("history.txt", options, function (err) {
//     if (err) throw err;
//     console.log("history.txt was appeneded")
//   });/

//var getArtistNames = function (artist) {
  //  return artist.name;
//};

// Function for Spotify search

let getSpotify = (songName) => {

    //if no song entered the default is:

    if (!songName) {
        songName = "The Sign";
    }

    //idk how to say this; something to do with using API keys and spotify module to search
    spotify.search(
        {
            type: "track",
            query: songName
        },
        (err, data) => {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            // var getArtistNames = function (artist) {
            //     return artist.name;
            //     console.log(artist);
            // };
            console.log(data.tracks.items[0].album.artists[0].name)
            let songs = data.tracks.items;
           // console.log(songs.artists)
             for (let i = 0; i < songs.length; i++) {
                
                 console.log("artist(s): " + songs[i].album.artists[0].name); //not working dunno why!?!
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
             }
        }
    );
};
// Function for running a BandsInTown Search
let getTour = (artist) => {
    artist = encodeURI(artist)
    const urlHit =
        "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=3bf94057849bab04d58bc26c6e5ac4d1&date=upcoming";

    console.log(urlHit);

    axios.get(urlHit).then((response) => {
        var concerts = response.data
        for (let i = 0; i < concerts.length; i++) {
            console.log("Venue: " + concerts[i].venue.name); //says name is undefined
            console.log("Location: " + concerts[i].venue.city);// 
            console.log("Date:" + moment(concerts[i].datatime).format("MM/DD/YYYY"));
            console.log('===========================================================')
        }

    });
};

// Function for running a Movie Search

let getMovie = (movieName) => {

    if (!movieName) {
        movieName = "Mr.Nobody";
    }

    var urlHit =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=full&tomatoes=true&apikey=7af38222";

    axios.get(urlHit)
        .then((response) => {

            let r = response.data

            console.log("Title: " + r.Title);
            console.log("Year: " + r.Year);
            console.log("Rated: " + r.Rated);
            console.log("IMDB Rating: " + r.Ratings[0].Value);
            console.log("Country: " + r.Country);
            console.log("Language: " + r.Language);
            console.log("Plot: " + r.Plot);
            console.log("Actors: " + r.Actors);
            console.log("Rotton Tomatoes Rating: " + r.Ratings[1].Value);
        }
        )
};

// Function for running a command based on text file

let doWhatItSays = () => {

    fs.readFile('./random.txt', (err, data) => {
        if (err) throw err;
        console.log(data);


        let dataArr = data
        console.log(dataArr)

        if (dataArr.length === 2) {
            options(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            options(dataArr[0]);
        }
    });
};
// Function for determining which command is executed; calling var options above to print results to history.txt
let options = (caseData, functionData) => {
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
const runLiri = (argOne, argTwo) => {
    options(argOne, argTwo);
};
// LIRI SHOULD WORK
// ===================================== 
runLiri(process.argv[2], process.argv.slice(3).join(" "));