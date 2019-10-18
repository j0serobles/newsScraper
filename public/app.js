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

  //What happens when the "Comments" form is submitted
  form = $("#modalForm").on( "submit", function( event ) {
    event.preventDefault();
    addComment();
  });
  
  $(".loading-msg").text(""); 




});
