// create an array of search topics
var topics = ["The GodFather", "ET", "Goonies", "Home Alone", "The Neverending Story", "The Karate Kid", "Back to the Future", "Gremlins", "Stand by Me", "Ghostbusters", "The Mask"];

// creates buttons for each of the topics
function makeButtons(){ 
  // deletes the existing buttons prior to adding new ones so there are no repeat buttons
  $('#buttonsView').empty();
  // loops through the topics array
  for (var i = 0; i < topics.length; i++){
    // dynamically makes buttons for every topic in the array
    var a = $("<button>"); 
    a.addClass("searchBtn btn-sm btn-primary"); // add a class
    a.attr("data-name", topics[i]); // add a data-attribute
    a.text(topics[i]); // make button text
    $("#buttonsView").append(a); // append the button to buttonsView div
  }
}

// handles addShow button event
$("#addShow").on("click", function(){

  // grabs the user show input
  var user = $("#show-input").val().trim();
  // that input is now added to the array
  topics.push(user);
  // the makeButtons function is called, which makes buttons for all my topics plus the user topics
  makeButtons();
  // this line is so users can hit "enter" instead of clicking the submit button
  return false; 
})

// function to display gifs
function displayGifs(){
  $('#gifsView').empty();
  var gifTopic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&limit=10&api_key=dc6zaTOxFJmzC";

    // creates ajax call
    $.ajax({url: queryURL, method: "GET"}).done(function (response) {
      console.log(response.data);
      // save results as a variable
      var results = response.data;
      // for loop goes through each gif and adds these variables
      for (var i = 0; i < results.length; i++) {
        // creates a img tags to hold the results
        var showGif = $('<img>');
        /*var rating = results[i].rating;*/
          showGif.attr('src', results[i].images.fixed_height_still.url);
          // shows the rating on hover
          showGif.attr('title', "Rating: " + results[i].rating);
          showGif.attr('data-still', results[i].images.fixed_height_still.url);
          showGif.attr('data-state', 'still');
          showGif.addClass('gif figure-img img-fluid rounded');
          showGif.attr('data-animate', results[i].images.fixed_height.url);
          /*showGif.append("<a>Rating: " + rating + "</a>");*/
        /*var ratingsLabel = $("<a>Rating: " + rating + "</a>");*/
          /*ratingsLabel.addClass('figure-caption');*/

        /*$("#gifsView").append(ratingsLabel);*/
        $("#gifsView").append(showGif);
        
      }
      
    });
}

// function for animating gifs
$(document).on('click', '.gif', function(){
  var state = $(this).attr('data-state');
    if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".searchBtn", displayGifs);

// initially calls the makeButtons function
makeButtons();