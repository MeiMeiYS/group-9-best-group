const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => {
    return (res, req, next) => {
        return handler(res, req, next).catch(next);
    }
};

let addAverageRatingProperty = (recipes) => {
    recipes.forEach(recipe => {
      if (recipe.Reviews && recipe.Reviews.length) {
        recipe.averageRating = Math.ceil(recipe.Reviews.map(review => review.rating).reduce((acc, el) => acc + el) / recipe.Reviews.length).toString()
      } else {
        recipe.averageRating = `No Ratings`
      }
    })
    return recipes
  }

module.exports = {
    csrfProtection,
    asyncHandler,
    addAverageRatingProperty
}
