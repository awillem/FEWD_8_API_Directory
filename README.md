**Project 8 - Treehouse Front End Web Deveopment Techdegree**    
***Public API Employee Directory***

For this project, we were given a mockup of an employee directory, showing 12 employee pictures with name, email, and location.  A 2nd mockup showed a modal window with more details of that employee. The requirements for this project were to create the html for the project, add stying, and a working modal window that can close.  To close the modal window, there are 3 options: clicking the "x", clicking outside of the modal-content window, or by pressing esc. We were to use the RandomUser.me API to request 12 random users (update anytime the page is reloaded) to be displayed on the page




***Exceeds Expectations***
* Add a way to filter the directory by name or username.  The search should work with the current group of "employees" and should not request new users from the API.  My search works on both the name and username, and displays a "not found" message when no employees are returned.
* Add a way to move back and forth between employee detail windows when the modal window is open.  I have the prev/next buttons set to move between employees.  When you reach the first/last employee, and hit the prev/next button, you'll get the last/first employee, so that you can continually cycle through the list.  

***Additional***
I also set up the prev/next buttons to work with the search results.  If only 3 people are returned, you'll only cycle through those 3 employees.  
