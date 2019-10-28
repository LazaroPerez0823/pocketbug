$(document).ready(function () {

  var pageButtons = [];

  function renderButtons() {

    //This empties the button view section in order for it to be recreated from the array
    $("#buttons-view").empty();


    //Start for loop to run though the pageButtons array
    for (var i = 0; i < pageButtons.length; i++) {

      //This creates a button object and gives it a class
      var a = $("<button class=my-buttons>");
      // Added a data-name attribute to the button
      a.attr("data-name", pageButtons[i]);
      // Puts in the text from the array
      a.text(pageButtons[i]);
      // Appends the button to the button section of the DOM
     
      $("#buttons-view").append(a);
    }
  }

  // Clicking the submit button event
  $("#add-btn").on("click", function (event) {
    event.preventDefault();

    // sets what the user typed in to the input variable
    var input = $("#user-input").val().trim();

    // adds the button to the DOM
    pageButtons.push(input);
 
    // Calls the above function
    renderButtons();
  })



  //Puts a on page listener event for the buttons being clicked
  $(document).on("click", ".my-buttons", displayPictures);



  function displayPictures() {
    //Empties the DOM of previous searches images.
    $("#images").empty();
    //Sets a variable for the name of the button clicked and sets the Ajax URL
    var mySearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mySearch + "&api_key=BPR9YoVs8nWq7MpP4WkjHSt9YuHLv2Wx&limit=10";

    // Creates AJAX call for the button clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      //for loop to add the images

      for (i = 0; i < response.data.length; i++) {

        //Creates a class for the images and sets the response data from the json
        var imageDiv = $("<div class='still-images'>");
        var rating = response.data[i].rating;

        //creates a p object for the rating of the image
        var ratingText = $("<p>").text("Rating: " + rating);

        //appends the rating to the imageDiv
        imageDiv.append(ratingText);

        //sets variables to grab the still image url and the animated image url
        var stillImgURL = response.data[i].images.fixed_height_still.url;
        var animatedImgURL = response.data[i].images.fixed_height.url;

        //sets the image variable to the stillImgURL src as well as sets attributes for the image state and still and animated URLs
        var image = $("<img class='gif'>").attr("src", stillImgURL).attr("data-still", stillImgURL).attr("data-animate", animatedImgURL).attr("data-state", "still");
        // image.attr("data-state=", "still");
        //puts the Div on the DOM
        imageDiv.append(image);

        //adds the next picture to the top of the DIV
        $("#images").prepend(imageDiv);

      }

    });

  }

  //puts a page listener for clicking on the created images to call the animateThisGIF function
  $(document).on("click", ".gif", animateThisGIF);

  //Function to change state and animate or still GIF
  function animateThisGIF() {

    // sets the state variable to the data-state of the clicked object
    var state = $(this).attr("data-state");
    console.log(state);

    //If the state is still set state to animate and set the image src to the animated gif.  If not, set state to still and image src to still. 
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  };






});