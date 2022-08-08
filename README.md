# Something Borrowed
**Something Borrowed is your neighbourhood's easy-to-use lending and borrowing platform!** 

Create a profile and visit the Marketplace page to search for items to borrow based on category, location, or rating. You can also put up items you aren't using to lend and toggle their availability for others. With features like viewing your borrowing history, you can always keep track of your activities and get the items you need without having to buy them yourself.

Something Borrowed is a free sustainable solution to endless buying, so sign up!

## Project Goals
### Minimal 
:white_check_mark: Should be able to create an account and enter basic profile information like name and password
:white_check_mark: Should be able to log in and out of the app
:white_check_mark: Should be able to view a list of items available for borrowing from other users
:white_check_mark: Should be able to create/delete/edit/view my owned items
:white_check_mark: Should be able to select an item from the list of items and borrow it on a first-come first-served basis
### Standard
:white_check_mark: Should be able to change the status of an item I own from “borrowed” to “returned”
:white_check_mark: Should be able to rate an item
:white_check_mark: Should be able to search for items
:white_check_mark: Should be able to filter items in the list (e.g. by rating, category)
:white_check_mark: Should be able to add basic location information to my profile, where the location is based on a set number of pre-filled neighbourhoods
### Stretch
:white_check_mark: Should be able to view a list of the items I’ve borrowed, and only be able to rate item’s I’ve borrowed
:white_check_mark: Should be able to send a request to borrow an item, view a list of requests for my items, and accept or decline a request
❌ Should be able to filter items based on their distance from my current geolocation

## Tech Description
### HTML & CSS

### React & Redux
We used React with the react-bootstrap library to create functional components with a consistent style. We used react-router for client-side routing, using a custom protected route component to redirect users to the login page when they try to navigate to a page they're not authorized to visit. Redux was used to manage state and perform some client-side filtering.

### Node & Express
Our project used a Node server with Express for our backend. We used a simple session-based authentication scheme for user sign-in and authorization, and used Express middleware functions to easily add authentication/authorization checks to our API routes. We also wrote Express middleware for API error handling, and all of our routes send appropriate messages when an error occurs.

### NoSQL with MongoDB
We used MongoDB to store our user, item, and request data, and Mongoose for our ODM. We wrote Mongoose middleware to do cleanup when we delete resources, for example automatically deleting uploaded images from our image storage when a user deletes an item.

### Release Engineering
Our app is deployed with Heroku, and we used automatic deployment from GitHub. We set Config Vars in Heroku to keep our API keys secret.

## Above & Beyond Functionality

## Next Steps
Our main focus would be to finish the implementation of the location services by using the Google Maps API to give a more precise location for a user and allow users to search for items in the Marketplace based on more accurate proximity of other users/items. We would also add to the functionality of the app to create a more realistic user experience, which would include including a messaging service so users can communicate via the app rather than with personal emails.

## Contributions

### Paul Reid
Wrote the backend server and database code. Built the frontend login/signup flow, the add item functionality, and the image uploading feature.

### Imogene McDonald
Built the requests functionality, including backend database models and endpoints, and the interface components. Developed the item card actions and conditionally rendered elements of the cards. Wrote most modals needed to edit, rate or request items.
