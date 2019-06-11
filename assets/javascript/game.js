var movies = []
// ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"]
function displayMovieInf {
    var movie = $(this).attr("data-name")
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var movieWrapper = $("<div>");
        var movieTitle = $("<h2>" + response.Title + "</h2>")
        var moviePoster = $("<img>").attr("src", response.Poster);
        var movieRating = $("<h3>" + response.Rated + "</h3>")
        var movieCast = $("<ul>")
        var castMembers = response.Actors.split(", ");
        castMembers.forEach(function (member) {
            movieCast.append("<li>" + member + "</li>");

        });

        movieWrapper.append(movieTitle, movieRating, moviePoster, movieCast);
        $("#data-info").prepend(movieWrapper);
    });
}

function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("movie");
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        // Provided the initial button text
        a.text(movies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

var person = $(this).attr("data-person");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

$("button").on("click", function () {
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
});

$("#cat-button").on("click", function () {

    // giphy reference url
    var queryURL =
      "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cats&limit=10";

    // call for the url
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      // shows the object of the gifs
      .then(function (response) {

        //  grabs the url from the response/data/imagae_original_url in the image url
        var imageUrl = response.data.image_original_url;

        //  catImage creates a new image tag
        var catImage = $("<img>");

        //  grabs the url of the gif and also the image
        catImage.attr("src", imageUrl);
        catImage.attr("alt", "cat image");

        // prepends the image/gif in order of button clicked
        $("#images").prepend(catImage);
      });
  });