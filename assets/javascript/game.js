var gifs = ["tacos", "pizza", "burritos", "enchiladas"]

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < movies.length; i++) {

        var a = $("<button>");

        a.addClass("gif");

        a.attr("data-name", gifs[i]);
        
        a.text(gifs[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-button").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#name-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

var name = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

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


// function displayGifInfo() {
//     var movie = $(this).attr("data-name")
//     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
//     // Creates AJAX call for the specific movie button being clicked
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         var gifWrapper = $("<div>");
//         var gifTitle = $("<h2>" + response.Title + "</h2>")
//         var gifPoster = $("<img>").attr("src", response.Poster);
//         var gifRating = $("<h3>" + response.Rated + "</h3>")
//         var gifCast = $("<ul>")
//         var castMembers = response.Actors.split(", ");
//         castMembers.forEach(function (member) {
//             movieCast.append("<li>" + member + "</li>");

//         });

//         movieWrapper.append(gifTitle, gifRating, gifPoster, gifCast);
//         $("#gifs-appear-here").prepend(gifWrapper);
//     });
// }


// $("#cat-button").on("click", function () {

//     // giphy reference url
//     var queryURL =
//       "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cats&limit=10";

//     // call for the url
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       })

//       // shows the object of the gifs
//       .then(function (response) {

//         //  grabs the url from the response/data/imagae_original_url in the image url
//         var imageUrl = response.data.image_original_url;

//         //  catImage creates a new image tag
//         var catImage = $("<img>");

//         //  grabs the url of the gif and also the image
//         catImage.attr("src", imageUrl);
//         catImage.attr("alt", "cat image");

//         // prepends the image/gif in order of button clicked
//         $("#images").prepend(catImage);
//       });
//   });