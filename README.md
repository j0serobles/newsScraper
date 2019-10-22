# newsScraper
UCF Bootcamp Week 18 Homework - an online news scraper app using Mongo and Mongoose.

## Access and Usage
The application has been deployed to [Heroku](https://damp-tor-55631.herokuapp.com/articles).  The landing page shows article headings and bylines extracted recently from the New York Times' home page:

![newsScraper landing page](https://github.com/j0serobles/newsScraper/blob/master/images/homepage.jpg)

Cliking on an article's image or the "Read More" button below it opens the article in a new web browser tab. 
Following the "Be First to comment on this article" or "View Comments" link opens the "Comments" modal dialog for this article.  Here, the user can review existing comments other users have left for this article, and create a new one.
The user can also remove comments from the list of comments by clicking the trashcan icon.

![Article Comments modal Dialog](https://github.com/j0serobles/newsScraper/blob/master/images/commentmodal.jpg)

To retrieve the articles from the current home page for the New York Times, the user should click on the 
![NY Times button](https://github.com/j0serobles/newsScraper/blob/master/images/nytimesbutton.jpg)
The number of articles retrieved will be shown in the status mesage below the button.

Other functionality available:

 - **List all scraped articles in JSON format**: This can be done by cliking the "Articles JSON" link in the home page.
 - **Remove all articles** : This link will remove all articles downloaded to the local database (This is always done as the first step when new articles are retrieved). 


## File Structure

    +--- newsScraper
        |   .eslintignore - Files ignored by eslint
        |   .eslintrc.json - eslink rules
        |   .gitignore - f
        |   package-lock.json
        |   package.json
        |   README.md
        |   server.js
        |   
        +---images
        |       commentmodal.jpg
        |       homepage.jpg
        |       nytimesbutton.jpg
        |       
        +---models
        |       Article.js
        |       index.js
        |       Note.js
        |       
        +---public
        |   |   app.js
        |   |   left-sidebar.html
        |   |   LICENSE.txt
        |   |   no-sidebar.html
        |   |   right-sidebar.html
        |   |   
        |   +---css
        |   |   |   font-awesome.min.css
        |   |   |   modal.css
        |   |   |   skel.css
        |   |   |   style-mobile.css
        |   |   |   style-narrow.css
        |   |   |   style-narrower.css
        |   |   |   style-normal.css
        |   |   |   style-wide.css
        |   |   |   style.css
        |   |   |   
        |   |   \---ie
        |   |           backgroundsize.min.htc
        |   |           html5shiv.js
        |   |           v8.css
        |   |           
        |   +---fonts
        |   |       fontawesome-webfont.eot
        |   |       fontawesome-webfont.svg
        |   |       fontawesome-webfont.ttf
        |   |       fontawesome-webfont.woff
        |   |       FontAwesome.otf
        |   |       
        |   +---images
        |   |       bg.jpg
        |   |       pic01.jpg
        |   |       pic02.jpg
        |   |       pic03.jpg
        |   |       pic04.jpg
        |   |       
        |   +---jqueryui
        |   |   |   AUTHORS.txt
        |   |   |   index.html
        |   |   |   jquery-ui.css
        |   |   |   jquery-ui.js
        |   |   |   jquery-ui.min.css
        |   |   |   jquery-ui.min.js
        |   |   |   jquery-ui.structure.css
        |   |   |   jquery-ui.structure.min.css
        |   |   |   jquery-ui.theme.css
        |   |   |   jquery-ui.theme.min.css
        |   |   |   LICENSE.txt
        |   |   |   package.json
        |   |   |   
        |   |   +---external
        |   |   |   \---jquery
        |   |   |           jquery.js
        |   |   |           
        |   |   \---images
        |   |           ui-icons_444444_256x240.png
        |   |           ui-icons_555555_256x240.png
        |   |           ui-icons_777620_256x240.png
        |   |           ui-icons_777777_256x240.png
        |   |           ui-icons_cc0000_256x240.png
        |   |           ui-icons_ffffff_256x240.png
        |   |           
        |   \---js
        |           init.js
        |           jquery.dropotron.min.js
        |           jquery.min.js
        |           skel-layers.min.js
        |           skel.min.js
        |           
        +---routes
        |       apiRoutes.js
        |       htmlRoutes.js
        |       
        \---views
            |   home.handlebars
            |   
            +---layouts
            |       main.handlebars
            |       
            \---partials
                    notes_table.handlebars
                    



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTU0NzA3NzIwNCwxNTgxMzUyNzg3LDMwMz
c5MjE2OF19
-->