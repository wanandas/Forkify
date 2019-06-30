import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'

import { elements, renderLoader, clearLoader } from './views/base'

/** Global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Stopping object
 *  - Liked recipes
*/
const state = {}


/**
 *  SEARCH CONTROLLER
 */

const controlSearch = async () => { 
    // 1) Get query from view
    const query = searchView.getInput // TODO 

    if (query) { 
        
        // 2) New Search object and add to state
        state.search = new Search(query)
    
        // 3) Prepare UI for results
        searchView.clearInput()
        searchView.clearResults()
        renderLoader(elements.searchRes)

        try{

            // 4) Search for recipes
            await state.search.getResults()
    
            // 5) Render results on UI
            clearLoader()
            searchView.renderResults(state.search.result)
        } catch(err) { 
            console.log('Something wrong with the search ...!!!!!!')
            clearLoader()
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})



// click btn for next and prev 
elements.searchRes.addEventListener('click', e => { 
    const btn = e.target.closest('.btn-inline')
    if (btn) { 
        const gotopage = parseInt((btn.dataset.goto), 10)
        searchView.clearResults() 
        searchView.renderResults((state.search.result), gotopage)
    }
    
})

////////////////////////////////
/**
 *  RECIPE CONTROLLER
 */
const controlRecipe = async () => { 
    // Get ID from url
    const id = window.location.hash.replace('#','')
    console.log(id)

    if (id) { 
        // Prepare UI changes
        recipeView.clearRecipe()
        renderLoader(elements.recipe)

        //Create new recipe object 
        state.recipe = new Recipe(id)

        // Highlight selected search item
        if (state.search) searchView.highlightSelector(id)

        try { 
            // Get recipe data and parse Ingredients
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()

            // Calculate servings and time 
            state.recipe.calcTime()
            state.recipe.calcServings()

            // Render recipe
            clearLoader()
            recipeView.renderRecipe(state.recipe)
        } catch (err){ 
            console.log(err)
            alert('ERROR PROCESSING RECIPE !!!!!!!!!!!!')
            
        }
   
    }
}

// How to add the same event listener to multiple events
// window.addEventListener('hashchange', controlReicpe)
// window.addEventListener('load', contro)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


