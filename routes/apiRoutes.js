//Require all models
var db = require("../models");
var util = require('util');
var Handlebars = require ('handlebars'); 

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
 
    // A GET route for scraping the echoJS website
app.get("/scrape/:source", function(req, res) {
    // First, we grab the body of the html with axios
    // axios.get("http://www.echojs.com/").then(function(response) {
    if (req.params.source === "nyt" || ! req.params.source) {
      scrapeURL = "http://www.nytimes.com"; 
    }
    axios.get(scrapeURL).then(function(response) {
      db.Note.remove({});
      db.Article.remove({});

      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      //Remove any existing documents from the Article collection


      // Now, we grab every h2 within an article tag, and do the following:
      $("article").each(function(i, element) {
        
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.link  = $(this).find("a").attr("href");
        result.title = $(this).find("h2").text();
        result.summary = $(this).find("p").text();
        result.imgURL = $(this).find("a figure img").attr("src");

        console.log(util.inspect(this));
        console.log (`result is :` + JSON.stringify(result,'',2));

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      res.send("scraped"); 

    });
  });


// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
    db.Article.find({})
      .populate("notes")
      .then(function(dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      // res.json(dbArticle);
        console.log (`${dbArticles.length} articles found.`);
        res.render("home", { 
          articles :  dbArticles, 
          helpers : {
            insertNewRow : function(indexNumber) {
              if( (parseInt(indexNumber) % 3) === 0 )  {
                return new Handlebars.SafeString(`</div><div class="row no-collapse-1">`);
              } else {
                return "";
              }
            } // end function
          } // end helpers object
        } //end context object
        ); // end render method
      }) // end .then
      .catch(function(err) {
      // If an error occurred, send it to the client
        res.json(err);
      });
  });

// Route for grabbing a specific Article by id, populate it with its notes
app.get("/articlesJSON/", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.find({})
      // ..and populate all of the notes associated with it
      .populate("notes")
      .then(function(dbArticles) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticles);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });



// Route for inserting an Article's associated Note
app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push : { notes: dbNote._id } }, { new: true, upsert: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  //Route for deleting a note associated to an Article
  app.delete("/articles/:id/notes/:note_id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Article.update({ _id: req.params.id }, {$pull : { notes: req.params.note_id } }, { new: true }
    ).then(function(dbArticle) {
      // If we were able to successfully delete the note from the Article, delete the note document
      console.log ("Removed notes from dbArticle " + dbArticle); 
      db.Note.remove( { _id : req.params.note_id }
      ).then(function (dbNote) {
        console.log ("Removed document from Note collection");
        res.json(dbNote);
      }).catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
    });
  });  

  //route for deleting all articles and notes
  app.get("/deleteAll", function (req, res) { 
    db.Note.remove({})
      .then( function (data) {
        db.Article.remove({})
          .then ( function (data) {
            res.redirect("/articles");
          });
      })
  });




  //Route for fetching all notes associated to an Article.
  app.get("/articles/:id/notes/", function(req, res) {

    db.Article.findOne({ _id: req.params.id })
      .populate("notes")
      .then(function(dbNotes) {
        // If we were able to successfully retrieve the article, render the notes in partial and send
        res.render("partials/notes_table", { 
          layout: false,
          notes : dbNotes.notes
        }); // end render method
      })  // End then block and call
      .catch(function(err) {
      // If an error occurred, send it to the client
        res.json(err);
      });

  });




};
