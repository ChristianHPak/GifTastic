var gifs = ["tacos", "pizza", "burritos", "enchiladas"]

function displayGifs() {
    var name = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(response)
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("giphy");

                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);
                console.log(results[i].images.fixed_height.url);
                
                $("#gifs-appear-here").prepend(gifDiv);
            }
        });

    $("#gifs-appear-here").empty();
};

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {

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
    var gifName = $("#name-input").val().trim();

    if (!gifName) return false;

    // The movie from the textbox is then added to our array
    gifs.push(gifName);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    
    $("input, textarea").val("");
});

// Calling the renderButtons function to display the intial buttons
renderButtons();

$("#buttons-view").on("click", ".gif", displayGifs);

$(".giphy").on("click", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {

        $(this).attr("src", $(this).data("animate"));

        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));

        $(this).attr("data-state", "still");
    }
});