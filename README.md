# newsScraper
UCF Bootcamp Week 18 Homework - an online news scraper app using Mongo and Mongoose.

## Access and Usage
The application has been deployed to [Heroku](https://damp-tor-55631.herokuapp.com/articles).  The landing page shows article headings and bylines extracted recently from the New York Times' home page:

![newsScraper landing page](https://github.com/j0serobles/newsScraper/blob/master/images/homepage.jpg)

Cliking on an article's image or the "Read More" button below it opens the article in a new web browser tab. 
Following the "Be First to comment on this article" or "View Comments" link opens the "Comments" modal dialog for this article.  Here, the user can review existing comments other users have left for this article, and create a new one.
The user can also remove comments from the list of comments by clicking the trashcan icon.

![Article Comments modal Dialog](https://github.com/j0serobles/newsScraper/blob/master/images/commentmodal.jpg)

To retrieve the articles from the current home page for the New York Times, the user should click on 

![NY Times button](https://github.com/j0serobles/newsScraper/blob/master/images/nytimesbutton.jpg)

The number of articles retrieved will be shown in the status mesage below the button.

Other functionality available:

 - **List all scraped articles in JSON format**: This can be done by cliking the "Articles JSON" link in the home page.
 - **Remove all articles** : This link will remove all articles downloaded to the local database (This is always done as the first step when new articles are retrieved). 


## File Structure

    +--- newsScraper
        |   .eslintignore - Files ignored by eslint
        |   .eslintrc.json - eslink rules
        |   .gitignore - Files ignored by Git
        |   package-lock.json - Created by npm init
        |   package.json - Created by npm init
        |   README.md - This file
        |   server.js - The main server file
        |   
        +---images - Documentation images
        |       commentmodal.jpg
        |       homepage.jpg
        |       nytimesbutton.jpg
        |       
        +---models -- Mongoose/MongoDB entities.
        |       Article.js
        |       index.js
        |       Note.js
        |       
        +---public - Static/Public content
        |   |   app.js
        |   |   left-sidebar.html
        |   |   LICENSE.txt
        |   |   no-sidebar.html
        |   |   right-sidebar.html
        |   |   
        |   +---css - Stylings
        |   |   |   font-awesome.min.css
        |   |   |   modal.css
        |   |   |   skel.css
        |   |   |   style-mobile.css
        |   |   |   style-narrow.css
        |   |   |   style-narrower.css
        |   |   |   style-normal.css
        |   |   |   style-wide.css
        |   |   |   style.css
        +---routes
        |       apiRoutes.js - API routes for Express
        |       htmlRoutes.js - HTML routes for Express
        |       
        \---views - Handlebars Front End
            |   home.handlebars - Home Page
            |   
            +---layouts
            |       main.handlebars - Main HBS Layout
            |       
            \---partials
                    notes_table.handlebars - Used in Modal dialog to render comments.
                   
## Technologies Used
Front End:
HTML/CSS/Javascript
[jQuery](https://jquery.com/) - DOM Manipulation, event handling, Ajax library
[HandlebarsJS](https://handlebarsjs.com/) - View rendering engine
Back End:
[NodeJS](https://nodejs.org/en/about/) : Asynchronous, event-driven JavaScript runtime.
[Express](https://expressjs.com/) : Node.js web application framework (middleware).
[MongoDB](https://www.mongodb.com/): #### MongoDB is a general purpose, document-based, distributed database.
[Mongoose](https://mongoosejs.com/) : Schema modelling for MongoDB.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMDY0NDcxNzYsMTk4NjAxNjIxNCwxNT
gxMzUyNzg3LDMwMzc5MjE2OF19
-->