$(document).ready(function () {

            var pageButtons = [];

            function renderButtons() {
                
                // Deleting the movies prior to adding new movies
                // (this is necessary otherwise we will have repeat buttons)
                $("#buttons-view").empty();
              


                for (var i = 0; i < pageButtons.length; i++) {

                    // Then dynamically generating buttons for each movie in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                    var a = $("<button>");
                    // Adding a class
                    a.addClass("my-buttons");
                    // Added a data-attribute
                    a.attr("data-name", pageButtons[i]);
                    // Provided the initial button text
                    a.text(pageButtons[i]);
                    // Added the button to the HTML
                    $("#buttons-view").append(a);
                }
            }

            // This function handles events where one button is clicked
            $("#add-btn").on("click", function (event) {
                    event.preventDefault();

                    // This line grabs the input from the textbox
                    var input = $("#user-input").val().trim();

                    // The movie from the textbox is then added to our array
                    pageButtons.push(input);


                  


                    // Calling renderButtons which handles the processing of our movie array
                    renderButtons();
                })


                $(document).on("click", ".my-buttons", displayPictures);



                function displayPictures() {

                    $("#images").empty();

                    var mySearch = $(this).attr("data-name");
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mySearch + "&api_key=BPR9YoVs8nWq7MpP4WkjHSt9YuHLv2Wx&limit=10";
            
                    // Creates AJAX call for the specific movie button being clicked
                    $.ajax({
                      url: queryURL,
                      method: "GET"
                    }).then(function(response) {

                        console.log("fixed height url " + response.data[0].images.fixed_height.url);
                        console.log("fixed height still url " + response.data[0].images.fixed_height_still.url);
                        console.log("rating " + response.data[0].rating);

                        for (i = 0; i < response.data.length; i++) {
                            
                            var imageDiv = $("<div class='still-images'>");
                            var rating = response.data[i].rating;

                            var ratingText = $("<p>").text("Rating: " + rating);

                            imageDiv.append(ratingText);

                            var stillImgURL = response.data[i].images.fixed_height_still.url;
                            var animatedImgURL = response.data[i].images.fixed_height.url;
                            var image = $("<img>").attr("src", stillImgURL).attr("data-still", stillImgURL).attr("data-animate", animatedImgURL).attr("data-state", "still");
                     
                            imageDiv.append(image);

                            
                            $("#images").prepend(imageDiv);
                     

                        }
                       
                    });
                   
                }

                
                $(document).on("click", "still-images", animateThisGIF);

                function animateThisGIF() {
                   
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    console.log(state);
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                 
                  };

               




            });