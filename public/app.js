// Grab the articles as a json
$(document).ready( function() {

  $.getJSON("/articles", function(data) {

    //console.log (data);
  
    let htmlString = '<div class="row no-collapse-1">';
    let imageURL = "";
    let commentsURL = "";

    data.forEach( function ( articleElement, elementIndex ) {

      imageURL = articleElement.imgURL ? `<img src=${articleElement.imgURL} alt="${articleElement.imgURL}"</img>` : "";
      commentsURL = (articleElement.notes.length === 0) ? `<br><br><a href="/commentModal">Add a comment.</a></div></section>` : 
        `<br><br><a href="/commentModal"${articleElement.notes.length} comments.</a> </div></section>`; 

      console.log("imageURL = "+ imageURL); 

      
      htmlString +=`<section class="4u"><a href="#" class="image featured">${imageURL}</a>`
                 + `<div class="box"><p><strong>${articleElement.title}</strong><br>`
                 + `${articleElement.summary}</p>`
                 + `<a href="https://www.nytimes.com/${articleElement.link}" class="button">Read More</a>`
                 + commentsURL;

      if ( (elementIndex + 1) % 3 === 0) {
        htmlString +="</div>";
        if ( (elementIndex + 1) !== data.length) {
          htmlString += '<div class="row no-collapse-1">';
        }
      }

    });

    $("#article-container").append(htmlString);

  });


  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
});
