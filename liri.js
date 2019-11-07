require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var musicNetflix = new Spotify(keys.musicNetflix);

if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        processRequest(dataArr[0], dataArr[1].replace(/"/g, ""));
    });
} else {
    processRequest(process.argv[2], process.argv[3]);
}

function processRequest(command, subject) {
    switch (command) {
        case "concert-this":
            sweatyMusicFestivalFinder(subject);//Self explainitory
            break;
            
        case "spotify-this-song":
            if (subject === "") {
                siriPlayThatOneSong("The Sign Ace of Base");//Spotify doohicky
            }
            else {
                siriPlayThatOneSong(subject);
            }
            break;

        case "movie-this":
            if (subject === "") {
                netflixAndDill("Mr. Nobody");//I really like eating pickles while watching movies
            }
            else {
                netflixAndDill(subject);
            }
            break;

        default:
            console.log(`Command '${command}' not recognized.`);
            break;
    }
}

function netflixAndDill(movieName) {
    var output = "";
    movieQuery = `http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`;
    axios.get(movieQuery).then(function (result, err) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        output += `${result.data.Title} (${result.data.Year})\n  IMDB Rating: ${result.data.imdbRating}`;
        if (result.data.Ratings.length > 0) {
            var foundRT = false;
            result.data.Ratings.forEach(function (element) {
                if (element.Source === "Rotten Tomatoes") {
                    output += `\n  Rotten Tomatoes Rating: ${element.Value}`;
                    foundRT = true;
                }
            });
            if (!foundRT)
                output += `\n  Rotten Tomatoes Rating: Doesn't Matter, You'll Watch It Anyway`;
        }
        else {
            output += `\n  Rotten Tomatoes Rating: not available`;
        }
        output += `\n  Country: ${result.data.Country} | Language: ${result.data.Language}`;
        output += `\n  Plot: ${result.data.Plot}`;
        output += `\n  Starring: ${result.data.Actors}`;

        console.log(output);
    });
}

function siriPlayThatOneSong(songName) {
    var output = "";
    musicNetflix.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        output += `${data.tracks.items.length} result(s) for ${songName}:`;
        data.tracks.items.forEach(function (result) {
            output += `\n  ${result.artists[0].name} | ${result.name} | ${result.album.name} | ${result.external_urls.spotify}`;
        });
        console.log(output);
    });
}

function sweatyMusicFestivalFinder(artist) {
    var output = "";
    var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandQuery).then(function (response) {
        output += `${response.data.length} result(s) for ${artist}:`;
        response.data.forEach(function (result) {
            var eventDate = moment(result.datetime).calendar();
            output += `\n  ${result.venue.name} | ${result.venue.city}, ${result.venue.region ? result.venue.region : result.venue.country} | ${eventDate}`;
        });
        console.log(output);
    });
}