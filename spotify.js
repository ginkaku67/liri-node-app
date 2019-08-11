var fs = require("fs");
var spotify = new Spotify(keys.spotify);
if (process.argv[4] === undefined || process.argv[4] === null) {
    var song = process.argv[3];
} else if (process.argv[4] !== undefined || process.argv[4] !== null) {
    var song = process.argv[3] + ' ' + process.argv[4];
} else {
    console.log('Please enter a valid song');
}

var spotify = new Spotify(keys.spotifyKeys);

function getSpotifySong(song) {
    if (song === undefined || song === null) {
        song = 'The Sign';
    } else {
    }

    spotify
    .search({ type: 'track', query: song, limit: 1 })
    .then(function(response) {
        console.log(`
        Song: ${song} 
        Artist: ${response.tracks.items[0].album.artists[0].name}
        Album: ${response.tracks.items[0].album.name}
        Preview URL: ${response.tracks.items[0].preview_url} `);
    })
    .catch(function(err) {
      console.log(err);
    });
};