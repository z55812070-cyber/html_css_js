// Recipe Finder - Main JavaScript File
// Demonstrates: Async/Await, API Integration, State Management, 
// Event Delegation, LocalStorage, Debouncing, and DOM Manipulation

// Configuration - Using TheMealDB API (free, no key required for basic features)
const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// Application State
const state = {
    currentView: 'search',
    recipes: [],
    favorites: [],
    searchQuery: '',
    isLoading: false
};

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const viewSections = document.querySelectorAll('.view-section');
const searchInput = document.getElementById('recipe-search');
const searchSubmit = document.getElementById('search-submit');
const clearSearch = document.getElementById('clear-search');
const mealTypeFilter = document.getElementById('meal-type');
const dietaryFilter = document.getElementById('dietary');
const recipesGrid = document.getElementById('recipes-grid');
const favoritesGrid = document.getElementById('favorites-grid');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-message');
const noResultsEl = document.getElementById('no-results');
const noFavoritesEl = document.getElementById('no-favorites');
const favoritesCount = document.getElementById('favorites-count');
const getRandomBtn = document.getElementById('get-random');
const randomLoading = document.getElementById('random-loading');
const randomContent = document.getElementById('random-content');
const modal = document.getElementById('recipe-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    setupEventListeners();
    console.log('Recipe Finder initialized successfully! 🍳');
});

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });

    // Search
    searchSubmit.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Debounced search on input
    searchInput.addEventListener('input', debounce((e) => {
        if (e.target.value.trim().length > 2) {
            handleSearch();
        }
    }, 500));

    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        recipesGrid.innerHTML = '';
        state.recipes = [];
    });

    // Filters
    mealTypeFilter.addEventListener('change', handleSearch);
    dietaryFilter.addEventListener('change', handleSearch);

    // Random Recipe
    getRandomBtn.addEventListener('click', fetchRandomRecipe);

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Print recipe
    document.getElementById('print-recipe')?.addEventListener('click', printRecipe);
}

// View Switching
function switchView(viewName) {
    state.currentView = viewName;
    
    // Update navigation buttons
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update view sections
    viewSections.forEach(section => {
        section.classList.toggle('active', section.id === `${viewName}-view`);
    });

    // Load specific view data
    if (viewName === 'favorites') {
        displayFavorites();
    } else if (viewName === 'random') {
        fetchRandomRecipe();
    }

    // Make function globally available for inline onclick
    window.switchView = switchView;
}

// Search Handler
async function handleSearch() {
    const query = searchInput.value.trim();
    const mealType = mealTypeFilter.value;
    const dietary = dietaryFilter.value;

    if (!query && !mealType && !dietary) {
        showError('Please enter ingredients or select filters');
        return;
    }

    state.searchQuery = query;
    await searchRecipes(query, mealType, dietary);
}

// Search Recipes from API
async function searchRecipes(query, mealType, dietary) {
    showLoading();
    
    try {
        let url;
        
        // Search by ingredient or name
        if (query) {
            url = `${API_BASE}/filter.php?i=${encodeURIComponent(query)}`;
        } else if (mealType) {
            url = `${API_BASE}/filter.php?c=${encodeURIComponent(mealType)}`;
        } else {
            url = `${API_BASE}/list.php?a=list`; // List all areas as fallback
        }

        const response = await fetch(url);
        const data = await response.json();

        if (!data.meals) {
            showNoResults();
            return;
        }

        let meals = data.meals;

        // Apply additional filters if needed
        if (dietary) {
            meals = await filterByDietary(meals, dietary);
        }

        // Get full details for first 12 results
        const detailedRecipes = await Promise.all(
            meals.slice(0, 12).map(meal => fetchRecipeDetails(meal.idMeal))
        );

        state.recipes = detailedRecipes;
        displayRecipes(detailedRecipes);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Unable to fetch recipes. Please check your connection and try again.');
    }
}

// Fetch Full Recipe Details
async function fetchRecipeDetails(id) {
    try {
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return null;
    }
}

// Filter by Dietary (simplified - in production would need more sophisticated approach)
async function filterByDietary(meals, dietary) {
    // Note: TheMealDB doesn't have direct dietary filtering
    // This is a simplified implementation
    const vegetarianKeywords = ['vegetable', 'veggie', 'salad', 'pasta', 'rice'];
    
    if (dietary === 'Vegetarian') {
        return meals.filter(meal => 
            vegetarianKeywords.some(keyword => 
                meal.strMeal.toLowerCase().includes(keyword)
            )
        );
    }
    
    return meals;
}

// Display Recipes Grid
function displayRecipes(recipes) {
    hideLoading();
    hideError();
    hideNoResults();

    if (!recipes || recipes.length === 0) {
        showNoResults();
        return;
    }

    recipesGrid.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
    
    // Add event listeners to cards
    setupRecipeCards();
}

// Create Recipe Card HTML
function createRecipeCard(recipe) {
    const isFavorite = state.favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    return `
        <div class="recipe-card" data-id="${recipe.idMeal}">
            <img 
                src="${recipe.strMealThumb}" 
                alt="${recipe.strMeal}" 
                class="recipe-card-image"
                loading="lazy"
            >
            <div class="recipe-card-content">
                <h3 class="recipe-card-title">${recipe.strMeal}</h3>
                <div class="recipe-card-meta">
                    <span><i class="fas fa-globe"></i> ${recipe.strArea || 'International'}</span>
                    <span><i class="fas fa-clock"></i> ${recipe.strCategory}</span>
                </div>
                <div class="recipe-card-actions">
                    <button class="view-recipe-btn">View Recipe</button>
                    <button class="card-favorite ${isFavorite ? 'active' : ''}" aria-label="Add to favorites">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Setup Recipe Card Interactions
function setupRecipeCards() {
    const cards = document.querySelectorAll('.recipe-card');
    
    cards.forEach(card => {
        // View recipe click
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.card-favorite')) {
                const recipeId = card.dataset.id;
                const recipe = state.recipes.find(r => r.idMeal === recipeId);
                if (recipe) openModal(recipe);
            }
        });

        // Favorite button click
        const favoriteBtn = card.querySelector('.card-favorite');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavoriteFromCard(card.dataset.id, favoriteBtn);
        });
    });
}

// Toggle Favorite from Card
function toggleFavoriteFromCard(recipeId, btnElement) {
    const recipe = state.recipes.find(r => r.idMeal === recipeId);
    if (!recipe) return;

    const isAlreadyFavorite = state.favorites.some(fav => fav.idMeal === recipeId);

    if (isAlreadyFavorite) {
        state.favorites = state.favorites.filter(fav => fav.idMeal !== recipeId);
        btnElement.classList.remove('active');
        btnElement.querySelector('i').classList.replace('fas', 'far');
    } else {
        state.favorites.push(recipe);
        btnElement.classList.add('active');
        btnElement.querySelector('i').classList.replace('far', 'fas');
    }

    saveFavorites();
    
    // Update favorites view if currently viewing
    if (state.currentView === 'favorites') {
        displayFavorites();
    }
}

// Favorites Management
function loadFavorites() {
    try {
        const stored = localStorage.getItem('recipeFavorites');
        state.favorites = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading favorites:', error);
        state.favorites = [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem('recipeFavorites', JSON.stringify(state.favorites));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}

function displayFavorites() {
    const favorites = state.favorites;
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '';
        noFavoritesEl.classList.remove('hidden');
        favoritesCount.textContent = '0 recipes saved';
        return;
    }

    noFavoritesEl.classList.add('hidden');
    favoritesCount.textContent = `${favorites.length} recipe${favorites.length !== 1 ? 's' : ''} saved`;
    favoritesGrid.innerHTML = favorites.map(recipe => createRecipeCard(recipe)).join('');
    
    setupRecipeCards();
}

// Random Recipe
async function fetchRandomRecipe() {
    randomLoading.classList.remove('hidden');
    randomContent.classList.add('hidden');
    
    try {
        const response = await fetch(`${API_BASE}/random.php`);
        const data = await response.json();
        
        if (data.meals && data.meals[0]) {
            const recipe = data.meals[0];
            displayRandomRecipe(recipe);
        } else {
            showError('Unable to fetch random recipe');
        }
    } catch (error) {
        console.error('Random recipe error:', error);
        showError('Failed to fetch random recipe');
    }
}

function displayRandomRecipe(recipe) {
    randomLoading.classList.add('hidden');
    
    const isFavorite = state.favorites.some(fav => fav.idMeal === recipe.idMeal);
    
    randomContent.innerHTML = `
        <div class="recipe-card" style="max-width: 600px; margin: 0 auto;">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-card-image">
            <div class="recipe-card-content">
                <h3 class="recipe-card-title">${recipe.strMeal}</h3>
                <div class="recipe-card-meta">
                    <span><i class="fas fa-globe"></i> ${recipe.strArea}</span>
                    <span><i class="fas fa-clock"></i> ${recipe.strCategory}</span>
                </div>
                <div class="recipe-card-actions">
                    <button class="view-recipe-btn" onclick="openModalFromRandom('${recipe.idMeal}')">View Full Recipe</button>
                    <button class="card-favorite ${isFavorite ? 'active' : ''}" aria-label="Add to favorites">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    randomContent.classList.remove('hidden');
    
    // Store for modal access
    state.randomRecipe = recipe;
    
    // Setup favorite button
    const favBtn = randomContent.querySelector('.card-favorite');
    favBtn.addEventListener('click', () => {
        toggleFavorite(recipe, favBtn);
    });
}

function toggleFavorite(recipe, btnElement) {
    const isAlreadyFavorite = state.favorites.some(fav => fav.idMeal === recipe.idMeal);

    if (isAlreadyFavorite) {
        state.favorites = state.favorites.filter(fav => fav.idMeal !== recipe.idMeal);
        btnElement.classList.remove('active');
        btnElement.querySelector('i').classList.replace('fas', 'far');
    } else {
        state.favorites.push(recipe);
        btnElement.classList.add('active');
        btnElement.querySelector('i').classList.replace('far', 'fas');
    }

    saveFavorites();
}

// Make function globally available
window.openModalFromRandom = (recipeId) => {
    if (state.randomRecipe && state.randomRecipe.idMeal === recipeId) {
        openModal(state.randomRecipe);
    }
};

// Modal Functions
function openModal(recipe) {
    document.getElementById('modal-image').src = recipe.strMealThumb;
    document.getElementById('modal-title').textContent = recipe.strMeal;
    document.getElementById('modal-category').textContent = recipe.strCategory;
    document.getElementById('modal-area').textContent = recipe.strArea || 'International';
    
    // Parse and display ingredients
    const ingredients = parseIngredients(recipe);
    document.getElementById('modal-ingredients').innerHTML = ingredients
        .map(ing => `<li>${ing}</li>`).join('');
    
    // Display instructions
    document.getElementById('modal-instructions').textContent = recipe.strInstructions;
    
    // Video (if available)
    const videoSection = document.getElementById('video-section');
    if (recipe.strYoutube) {
        const videoId = extractVideoId(recipe.strYoutube);
        document.getElementById('modal-video').innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}" 
                title="Recipe Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        `;
        videoSection.classList.remove('hidden');
    } else {
        videoSection.classList.add('hidden');
    }
    
    // Source link
    const sourceBtn = document.getElementById('modal-source');
    if (recipe.strSource) {
        sourceBtn.href = recipe.strSource;
        sourceBtn.parentElement.style.display = 'flex';
    } else {
        sourceBtn.parentElement.style.display = 'none';
    }
    
    // Favorite button state
    const modalFavBtn = document.getElementById('modal-favorite');
    const isFavorite = state.favorites.some(fav => fav.idMeal === recipe.idMeal);
    updateModalFavoriteButton(modalFavBtn, isFavorite, recipe);
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function parseIngredients(recipe) {
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            const amount = measure ? measure.trim() : '';
            ingredients.push(`${amount} ${ingredient.trim()}`.trim());
        }
    }
    
    return ingredients;
}

function extractVideoId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))( [\w-]{11})/);
    return match ? match[1] : url.slice(-11);
}

function updateModalFavoriteButton(btn, isFavorite, recipe) {
    btn.classList.toggle('active', isFavorite);
    btn.querySelector('i').className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
    
    // Remove old listener and add new one
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', () => {
        toggleFavorite(recipe, newBtn);
    });
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Print Recipe
function printRecipe() {
    window.print();
}

// Utility Functions
function showLoading() {
    loadingEl.classList.remove('hidden');
    recipesGrid.innerHTML = '';
    hideError();
    hideNoResults();
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    hideLoading();
    hideNoResults();
    errorEl.querySelector('p').textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

function showNoResults() {
    hideLoading();
    hideError();
    noResultsEl.classList.remove('hidden');
}

function hideNoResults() {
    noResultsEl.classList.add('hidden');
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state, searchRecipes, fetchRecipeDetails };
}

console.log('Recipe Finder loaded successfully! Happy cooking! 👨‍🍳👩‍💻');
