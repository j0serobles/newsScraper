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


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU4MTM1Mjc4NywzMDM3OTIxNjhdfQ==
-->