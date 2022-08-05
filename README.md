# Something Borrowed
#### Something Borrowed is your neighbourhood's lending and borrowing platform that is easy to use! 
#### Create a profile and visit the Marketplace page to search for items to borrow based on category, location, or rating. You can also put up items you aren't using to lend and toggle their availability for others. With features like viewing your borrowing history, you can always keep track of your activities and get the items you need without having to buy them yourself. 
#### Something Borrowed is a free sustainable solution to endless buying, so sign up!

## Project Description
This team project for UBC CPSC 455 is a webapp that lets users lend or borrow household items. Initially the app will be for users in the UBC neighbourhood, but in the future it can be expanded to other areas. Users can create a profile and add items they are lending with information such as item condition etc. Users can also view, search, and filter a list of items from other users that are available to borrow, and borrow and rate items. 

### Who is it for?
For anyone living in a supported area who doesn’t want to buy a new item for a short-time use, and is tired of asking to borrow things from their friends, on Facebook Marketplace, or in neighbourhood groups.

### What will it do?
Let users in a supported area lend and borrow items from each other.

### What type of data will it store?
- User profiles including login names and passwords
- User location information
- Items that users have added
- Item attributes (e.g. condition, category, rating, etc.) and status (e.g. available/borrowed)

### What will users be able to do with this type of data?
- Log in and out of the app using their username and password
- Create, view, edit, and delete their user profile
- View, add, edit, and delete items
- Change the status of items by borrowing other user’s items, or marking their own items as returned
- Add to the rating of another user’s item
- Search and filter items based on the item’s attributes

## Additional functionality/Stretch goals?
- Instead of claiming items on a first-come first-served basis, borrowers can be required to make a borrow request. Lenders can receive multiple borrow requests for the same item, and can choose which request to accept
- Expand the supported locations to be beyond UBC by adding more Vancouver neighbourhoods
- Introduce fine-grained location filtering based on the user’s current geolocation (e.g. search for all items in a 5km radius of their location)
- Keep a record of the items each user has borrowed
- Introduce some concept of renting (rather than borrowing) and include some payment procedures

## Project Task Requirements
### Minimal requirements 
 - Should be able to create an account and enter basic profile information like name and password
 - Should be able to log in and out of the app
 - Should be able to view a list of items available for borrowing from other users
 - Should be able to create/delete/edit/view my owned items
 - Should be able to select an item from the list of items and borrow it on a first-come first-served basis
### Standard requirements
 - Should be able to change the status of an item I own from “borrowed” to “returned”
 - Should be able to rate an item
 - Should be able to search for items
 - Should be able to filter items in the list (e.g. by rating, category)
 - Should be able to add basic location information to my profile, where the location is based on a set number of pre-filled neighbourhoods
### Stretch requirements
 - Should be able to view a list of the items I’ve borrowed, and only be able to rate item’s I’ve borrowed
 - Should be able to send a request to borrow an item, view a list of requests for my items, and accept or decline a request
 - Should be able to filter items based on their distance from my current geolocation

## Task Breakdown
 - Should be able to create an account and enter basic profile information like name and password
   - Create a signup page
   - Create a database table to store user information
   - Set up a backend API route to register a new user
 - Should be able to view a list of items available for borrowing from other users
   - Create a page that shows the user a list of items
   - Create a database table to store items
   - Set up a backend API route to list items
   - Create a backend handler that queries the database to show all available items from other users

## Prototype Sketches

### Creating an account
![Create Account](https://user-images.githubusercontent.com/6674293/170805887-bb7be604-394e-4400-a280-3ee4f5aa7d34.jpg)

### Adding an item 
![Add Item to profile](https://user-images.githubusercontent.com/61811702/170810501-3fff1a7c-d621-42d7-87cd-5e72df25e240.jpg)

### User home page
![pasted image 0](https://user-images.githubusercontent.com/6674293/170806017-3dae5203-5f66-4fe4-87cc-a66d1feb7c1b.png)
