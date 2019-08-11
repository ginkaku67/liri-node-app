
function getMovie(movie) {
    if (movie === undefined || movie === null) {
        movie = "Mr Nobody";
    }
    var requestUrl = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request.get({ url: requestUrl }, function (error, response, body) {

        body = JSON.parse(body);
        if (error || body.Response === "False" || body.Error === "Movie not found!") {
            console.log("movie not found");
            return;
        }

        console.log("Year of release: " + body.Year);
        console.log("IMDB Rating: " + body.imdbRating);
        for (var i = 0; i < body.Ratings.length; i++) {
            if (body.Ratings[i].Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes Rating: " + body.Ratings[i].Value);
            }
        }
        console.log("Country of production: " + body.Country);
        console.log("Language of movie: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
    });

}