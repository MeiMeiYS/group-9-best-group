# Recipeople

<a href="https://recipeople.herokuapp.com/">Live Site</a>  |  <a href="https://github.com/MeiMeiYS/group-9-best-group/wiki"> Project Wiki</a> | <a href="https://github.com/MeiMeiYS/group-9-best-group/issue">Report Bug</a>

Recipeople is a website where users can sign up, post recipes, and curate collections of recipes published by other users. This website was designed as a Week 13 midterm project as part of App Academy's 24-week Full Stack Software Engineering Bootcamp.

## Technologies Used
[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  | [Node.js](https://nodejs.org/en/)  | [Express](https://expressjs.com/)   |   [Pug](https://pugjs.org/api/getting-started.html) |   [Sequelize](sequelize.org)   |  [PostgreSQL](https://www.postgresql.org/)   |  [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

## Launching Locally

### Prerequisites
 - [Node.js 16.13.1](https://nodejs.org/en/)

### Getting Started

1. Clone the project repository
```
   git clone https://github.com/andrewscohen/2020.11.badReads.git
```
2. Install dependencies
```
    npm install
```

3.  Create a local .env file modeled after the .env.example file in the root directory
```
   PORT=8080
   DB_USERNAME=recipeople_admin
   DB_PASSWORD=your_unique_password
   DB_DATABASE=recipeople
   DB_HOST=localhost
   SESSION_SECRET=your_session_secret
```
4. Migrate and seed the database
 ```
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
```

5. Run the project with a starting script
 ```
    npm start
 ```

## Recipeople In Action
Full user stories for the initial development phase are available on the [User Stories](https://github.com/MeiMeiYS/group-9-best-group/wiki/User-Stories) section of the project wiki. A feature list for the initial development phase is available on the MVP Feature List section of the project wiki.

### User Registration and Authentication
New users can register for an account by entering a unique email address, a username, and a secure password.

<div align="center">
<br/>
<img src="https://i.ibb.co/7ybwmS4/sample123-register.gif" alt="Explore Recent Recipes" height="300" align="center"/>
<br/>
<br/>
</div>


Existing users can log in to their account by submitting their credentials via the login form.

<div align="center">
<br/>
<img src="https://i.ibb.co/mN1vsht/sample123-login.gif" alt="Explore Recent Recipes" height="300" align="center"/>
<br/>
<br/>
</div>

Users may log out of their account by clicking the **LOGOUT** button on the sitewide header.

<div align="center">
<br/>
<img src="https://i.ibb.co/3fCRrM2/Logout-Click.gif" alt="Logout" height="300" align="center"/>
<br/>
<br/>
</div>

### Creating and Modifying A Recipe

Logged-in users can create a new recipe with a name, description, an optional image, a list of ingredients, and cooking instructions.

<div align="center">
<br/>
<img src="https://i.ibb.co/4YVPbqF/Create-Recipe.gif" alt="Add A Recipe" height="450" align="center"/>
<br/>
<br/>
</div>

When a new recipe is added, a new page is created for the recipe. All users can view the recipe information. Logged in users can add a review, add the recipe to a collection, or add a status. Recipe owners can edit or delete their own recipes.

<div align="center">
<br/>
<img src="https://i.ibb.co/yfb6Ht8/Edit-Hover.gif" alt="Add A Recipe" height="450" align="center"/>
<br/>
<br/>
</div>

When modifying a recipe, an "Edit" form will populate with the recipe's current information. A user may add, edit, or delete ingredients, and can edit the name, description, image, and instructions. If a user would like to delete the recipe, or discard their changes, they may do so from the edit form.

<div align="center">
<br/>
<img src="https://i.ibb.co/pr7Qry0/Edit-Recipe.gif" alt="Add A Recipe" height="450" align="center"/>
<br/>
<br/>
</div>

### Creating and Modifying A Collection

Users can create personalized collections in order to organize groups of curated recipes.

Users can add and remove recipes from their collections.

Users can edit and delete their collections.

### Creating and Modifying A Review

Users can add a rating, an image, and a public review on any recipes, and view the reviews that others have posted.


Users can modify and delete their reviews.


A recipe's average rating is visible on the Homepage, the Recipes page, and each recipe's detail page as indicated by a scale ranging from 1 to 5 whisks.

Users can edit and delete their collections.

### Assigning A Recipe Status
A user can create, view, update, and remove a personalized status on any recipe in to indicating whether they "Will Cook" the recipe in the future, or whether they already "Cooked" the recipe.

After assigning a status to a recipe, the user can view the recipe on the Status section of their user page.

### Search For Recipes
The most recent publicly-visible recipes are visible both on the site Homepage and the Recipes page.

<div align="center">
<br/>
<img src="https://i.ibb.co/RgCdkP7/Explore-Recent-Recipes.gif" alt="Explore Recent Recipes" height="300" align="center" />
<br/>
<br/>
</div>

The Recipes page also includes a case-insensitive search where users can search for any recipe by a case-insensitive substring of the recipe title.

<div align="center">
<br/>
<img src="https://i.ibb.co/GHdVMJJ/Search-Functionality.gif" alt="Explore Recent Recipes" height="300" align="center"/>
<br/>
<br/>
</div>

## Technical Implementation
### Database Design
The full database schema is available to view as a [linked chart on dbdiagram.io](https://dbdiagram.io/d/61afe26a8c901501c0e5914b), or as a [list of tables on the Database Schema page](https://github.com/MeiMeiYS/group-9-best-group/wiki/Database-Schema) of the wiki.

![Full Database Schema](https://i.ibb.co/4S9bs3p/Recipeople.png)

Some tables, such as Roles are reserved for such as creation of an Administrator frontend, where certain users can have access to edit and delete content posted by other users. The Tags table is reserved for creation of recipe tags that a recipe creator can assign to their recipes, or for other users to include in search criteria. Tag categories are intended for the future development of tag grouping, such a *Cuisine* tag category that may have tags such as *Japanese*, *French*, or *Mediterranean*, which can useful to organize tags as the number and diversity of recipes continues to grow.

### Frontend Routes

### API Routes

### Developmental Challenges


## Future Development
### Improved User Experience
#### Recipe Reviews and Recipe Status CRUD from Badge View
#### Implementation of Recipe Tags
#### Search With Filters
### Improved Maintainability
#### Administrator Interface
#### Normalization of Ingredient Names
### New Features
#### Shopping Lists
#### User-to-User Interaction
