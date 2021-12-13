# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] A link appears in the navigation to register as a new user (only when not logged in)
- [ ] A link appears on the login page to register as a new user (only when not logged in)
- [ ] When an unregistered user clicks on the registration link/button, they are prompted to enter a desired username, email address, and password, and to confirm their password.
- [ ] If the registration information is invalid, the unregistered user is alerted of the errors in their input(s).
- [ ] If the registration information is valid, a new user is created and the user is logged in.
- [ ] Once successfully registered and logged in, the user is redirected to their profile/splash page and links to post reviews, view their reviews, post recipes, view their recipes, view their collections will appear.

### Log In

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] User can enter my email and password in a login form
- [ ] Upon successful completion of the log-in form, the website would redirect user to the homepage of the website
- [ ] When user enters invalid data on the login form, the page will inform user of the failed validations and repopulate the form with the valid entries (except password), so that the user can try again without needing to refill every input field.
- [ ] When clicking the add or update information, the page will render a form for the user to update the information.
- [ ] When a user submits the form, they will be able to view their new profile information without needing to refresh the page.
- [ ] A user may not update profile features of other users.

### Log Out

* As a logged in user, I can log out of my account so I can ensure that it isn’t used without my permission.
    * When I am on any page and I am logged in, I would like to be able to click a button in the navigation bar to log out.
* When I click the log out button and navigate to a different page, I should remain logged out.
* When I am logged out, I can log in with a different account.
* When I am logged out, I should be able to log back in.

#### Acceptance Criteria

- [ ] When the user is logged in, a button appears in the navigation bar to log out.
- [ ] When the user clicks this button, the session ends and the user is logged out.
- [ ] When refreshing the page or traveling to other pages the user does not appear to be logged in.
- [ ] The logged out user can log in with a separate account without issue.

### Demo User Enablement

* As an unregistered and unauthorized user who wants to demo Recipeople, I can enter the site via a single-button click on the login and signup form
    * so that I can view features of the website without creating an account.

#### Acceptance Criteria
- [ ] On the login page, any user can view a “Log in as Demo User” button.
    - [ ] Upon clicking the button, the user can access all features of the site with session-based authentication.

## Recipes

### Create Recipes
* As a logged in user, when I am on the `/recipes/` page, create recipes to share with other users.
    * I can see a `Create New Recipe` button when I am on the `/recipes/` page.
* When I click the `Create New Recipe` button, I see a form for creating a new recipe.
* When I enter invalid data on the `Create New Recipe` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* I can see a button to submit the recipe.

#### Acceptance Criteria.
- [ ] A logged in user who is on the `/recipes/` page, the users sees a `Create New Recipe` button.
- [ ] When clicking the button, takes user to a form for creating recipe
- [ ] Form has inputs where the user can fill out the name of the recipe, directions, ingredients, ingredient amounts, and an optional picture.
- [ ] When user enters invalid data on the login form, the page will inform user of the failed validations and repopulate the form with the valid entries (except password), so that the user can try again without needing to refill every input field.
- [ ] A button to submit the recipe
- [ ] When a user submits the recipe, the user will be redirected to `recipes/:recipesId`, where it can be viewed by other users.

### Viewing Recipes
* As a logged in or logged out user, I can view the most recently posted recipes.
    * I can also view specific recipes and the associated reviews so that I can decide whether or not to try the recipe.
* If I am not the creator of the recipe, I will not be able to edit the recipe.

#### Acceptance Criteria
- [ ] When any user is on home page, the user can see most recent 9 recipes.
- [ ] The user can click on a recipe to view its details (directions, ingredients, pictures, etc) and the reviews other users have left on the recipe.
- [ ] Only the user who created the recipe can edit the recipe if they are logged in.

### Editing Recipes
* As a logged in user visiting `/recipes/:recipeId`, I can edit the recipes that I have created
    * so that I can fix any errors, upload a photo, or make changes to the recipe.
* I should not be able to edit any recipes that I have not created.

#### Acceptance Criteria
- [ ] When the user is viewing a recipe that they have created, the user can click a button to edit the recipe.
- [ ] When pressing the button, the user will be taken to a pre-filled form with the recipe’s information. The user can then change any of the sections that the user would like.
- [ ] When the user presses the submit button, the recipe will update and the changes will be shown on the website.
- [ ] When viewing a recipe that the user did not create, the user will not be able to edit the recipe.

### Deleting Recipes
* As a logged in user visiting `/recipes/:recipeId`, I can delete the recipes that I have created
    * so that when I no longer want to share a recipe with others, I can remove it.
* I should not be able to delete any recipes that I have not created.

#### Acceptance Criteria
- [ ] When the user is viewing a recipe that they have created, the user can click a button to delete their recipe.
- [ ] When the user clicks the button, the recipe will be removed from any collections it is part of

## Collections

### Creating a Collection
* As a logged in user, I can create collections in which to store recipes.
* When I am viewing my profile page, in order to create a new collection, I can click a button to create a new collection and a `Create a New Collection` form will appear.
* When I am viewing a recipe and don't have any collections, I can see a button to create a new collection.
    * When I click this button, a `Create a New Collection` form will pop up and allow me to create a new collection.
* When I enter invalid data on the `Create a New Collection` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.

#### Acceptance Criteria
- [ ] As a user I can go to my user page and click a button to create a new collection.
- [ ] The button will pop up a form for the user to put the name in for the new collection.
- [ ] A user can also create a collection if they don’t have any collections when viewing a recipe. A create collection button will appear instead of the option to add to collection.

### Adding Recipes to a Collection
* As a logged in user, and I am viewing the recipe on the `recipes/recipeId` page, I can add recipes to a collection
    * so that I have the recipes that I want in a collection.
* When I am viewing a recipe, I have the option to use a dropdown menu to add the recipe to an existing collection of mine.
    * I should be able to see an `Add to Collection` button.
* When I click the `Add to Collection` button, the recipe will be saved to the collection that I selected.

#### Acceptance Criteria
- [ ] When viewing a recipe on the `recipes/recipeId` page, the user has the option to use a dropdown to select an existing collection of theirs.
- [ ] When the user clicks an `Add` button, the recipe will be added to the selected collection.

### Removing Recipes from a Collection
* As a logged in user and viewing a specific collection of mine on the `/collections/:collectionId` page, I can remove recipes from a collection
    * so that I only have the recipes that I want in a collection.
* I will see a `Remove from Collection` button.
    * When I click this button, the recipe will disappear from the collection.
* If I change my mind, I can add the recipe to the same collection again when I am viewing the recipe on the `/recipes/:recipeId` page.

#### Acceptance Criteria
- [ ] When viewing a collection on the `/collections/:collectionId` page, the user can remove recipes from the collection.
- [ ] When the user clicks the `Remove from Collection` button, the recipe will disappear from the collection.
- [ ] The user can add the recipe back to the same collection when they are viewing the recipe on the `/recipes/:recipeId` page.

### Deleting a Collection
* As a logged in user and viewing my collection on the `/collections/:collectionId` page, I can delete the entire collection when I no longer have a use for it.
* I will only see a `Delete Collection` button if I am the user who created the collection.
* When I click the `Delete Collection` button, the collection will no longer exist.
* If I try to navigate to the URL of the collection that I have deleted, I will get a `404` error.
* I will not be able to delete the collections that other users have created.
* I will be able to create a new collection with the same name as the collection that I have deleted.

#### Acceptance Criteria
- [ ] When a user is viewing a collection that they have created on the `/collections/:collectionId` page, a `Delete Collection` button appears.
- [ ] The user will only see a `Delete Collection` button if they are the user who created the collection.
- [ ] When the user clicks the `Delete Collection` button, the collection will be deleted.
- [ ] If the user tries to navigate to the URL of the collection that they have deleted, they will get a `404` error.
- [ ] A user cannot delete a collection they they have not created.
- [ ] A user will be able to create a new collection with the same name as the collection that they have deleted.

## Recipe Reviews

### Creating a Review for a Recipe
* As a logged in user, when I am viewing a recipe on the `/recipes/:recipeId` page, I can leave a review on any recipe
    * so that all users can see my rating and review.
* I will be able to see a `Leave a Review` button.
* When I click the `Leave a Review` button, I will see a form where I can enter my recipe rating and reviews.
* I will be able to upload an optional image for the review.
* When I enter invalid data on the `Leave a Review` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* I will see a `Submit` button for my review.
* When I click on the `Submit` button, my review will appear on the page
    * If I have uploaded an image, it will also appear on the page.

#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see a `Leave a Review` button.
- [ ] When logged in users click on the `Leave a Review` button, they will see a form in which to enter a review.
- [ ] When users enter invalid data on the `Leave a Review` form, the page will inform them of the failed validations and repopulate the form with the valid entries.
- [ ] Users will see a `Submit` button for their review.
- [ ] Users will be able to upload an image.
- [ ] When the user submits their review, the review will appear on the page.

### Viewing Reviews of a Recipe
* story
    * follow up/sub story

#### Acceptance Criteria
- [ ]
- [ ]
- [ ]

### Editing a Review of a Recipe
* story
    * follow up/sub story

#### Acceptance Criteria
- [ ]
- [ ]
- [ ]

### Deleting a Review of a Recipe
* story
    * follow up/sub story

#### Acceptance Criteria
- [ ]
- [ ]
- [ ]
