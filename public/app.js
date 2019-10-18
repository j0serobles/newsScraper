// Grab the articles as a json
$(document).ready( function() {

  var dialog;   //Modal dialog for comments
  var form;     //Comment form
  
  var commentTextArea = $( "#commentTextArea" ); // Comment Text


  //What happens when scrape button is clicked
  $(".scrape-button").on( "click", function ( event )  {
    //Show "Loading..." message.
    $(".loading-msg").text("Loading..."); 
    //Send ajax request to scrape the website
    $.ajax("/scrape/nyt", {}
    ).done ( function () {
      console.log ("Scraping done."); 
      //Hide "Loading..." message.
      $(".loading-msg").text(""); 
      location.reload(); 
      $(".loading-msg").text(""); 
    }).fail ( function (error) {
      $(".loading-msg").text ("An error occurred while scraping site: " + JSON.stringify(error));
    }); 
  });

 

  //Funtion to add a comment to the database
  function addComment() {
    if ($( "#commentTextArea" ).val().length === 0) {
      console.log ("Cannot add empty comment"); 
      return;
    }
    else {
      
      // Run a POST request to save the comment, using what's entered in the textarea.
      // The data to send is a Note object, as per models/Note.js
      $.ajax({
        method: "POST",
        url: "/articles/" + dialog.data("articleID"),
        data: {
          // Value taken from title input
          title: $("#commentTitle").val(),
          // Value taken from note textarea
          body: $("#commentTextArea").val()
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          renderCommentsTable();
          form[ 0 ].reset();
          $( ".comment-link" ).text("View Comments"); 
          //dialog.dialog( "close" );
        });
    }
  }


  //Define a jQuery modal dialog based on the
  // dialog-form div from the page
  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: "auto",
    width: "auto",
    modal: true,
    buttons: {
      "Add comment": addComment,
      "Close"      : function() {
        dialog.dialog( "close" );
      }
    },
    open : function () { 
      renderCommentsTable();
    },
    close: function() {
      form[ 0 ].reset();
      commentTextArea.removeClass( "ui-state-error" );
    }
  });


  //What happens when the "View Comments" link is clicked.
  $( ".comment-link" ).click(function() {
    dialog.data("articleID", $(this).attr("data-id")); 
    dialog.data("articleTitle", $(this).attr("data-title"));  
    console.log (dialog.data("articleID")); 
    console.log (dialog.data("articleTitle")); 
    var dialogWidth = $(window).width() / 3;
    dialogWidth += (dialogWidth < 300) ? dialogWidth : 300; 
    dialog.dialog( "option", "width", dialogWidth ); 
    dialog.dialog( "option", "title", "Comments for " + $(this).attr("data-title") ); //+ ($(this).attr("data-title").length) > 60 ? "..." : "" );
    dialog.dialog( "open" );
    return false;
  });



  //What happens when the "Comments" form is submitted
  form = $("#modalForm").on( "submit", function( event ) {
    event.preventDefault();
    addComment();
  });


  //When user clicks the "trash" icon to delete a comment:  
  $(document).on("click", ".article-comment", function() {
    // Grab the id associated with the article from the dialog's data
    var thisId = dialog.data("articleID");

    // Run a DELETE request to delete the note
    $.ajax({
      method: "DELETE",
      url: "/articles/" + thisId + "/notes/" + $(this).attr("data-id")
    }).then(function(data) {
      // Log the response
      console.log("Note deleted from article : " + data);
      renderCommentsTable();
    });
    return false;
  });


  //Refreshes the "Comments" table in the dialog .
  function renderCommentsTable() { 
    $.get("/articles/"+ dialog.data("articleID") + "/notes/", function (data) {
      $("#commentsTable").empty();
      $("#commentsTable").append(data); 
    });
  }















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
        //console.log(data);
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
