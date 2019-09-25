require("dotenv").config();

let axios = require("axios");
let spotify = require("node-spotify-api");
let fs = require("fs");
var keys = require("./keys.js");
var spotifyN = new Spotify(keys.spotify);


 

//default movie Mr. Nobody

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