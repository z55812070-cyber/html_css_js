# Recipe Finder App

A modern, interactive recipe discovery platform that allows users to search for recipes by ingredients, dietary preferences, and meal types. Built with vanilla JavaScript, this project showcases advanced API integration, dynamic UI rendering, and state management.

## 🌟 Features

### Core Functionality
- **Search by Ingredients**: Enter ingredients you have, and find matching recipes
- **Meal Type Filtering**: Filter recipes by breakfast, lunch, dinner, or dessert
- **Dietary Preferences**: Filter by vegetarian, vegan, gluten-free, and more
- **Recipe Details Modal**: View complete recipe instructions, nutrition info, and ingredients
- **Favorites System**: Save your favorite recipes using localStorage
- **Random Recipe**: Get inspired with a random recipe suggestion

### Technical Highlights
- Async/await for API calls
- Advanced array methods (filter, map, reduce)
- Dynamic DOM manipulation
- Event delegation
- LocalStorage for persistence
- Debouncing for search optimization
- Error handling and loading states
- Responsive design with CSS Grid and Flexbox

## 🎨 Design Features

- Modern glassmorphism UI design
- Smooth animations and transitions
- Mobile-first responsive layout
- Accessible with ARIA labels
- Dark mode support
- Recipe cards with hover effects
- Interactive filters with visual feedback

## 📚 Learning Objectives

This project demonstrates mastery of:

1. **API Integration**
   - Making REST API calls with fetch
   - Handling asynchronous operations
   - Working with JSON data
   - Error handling for network requests

2. **Advanced JavaScript**
   - Array methods and data transformation
   - Object destructuring
   - Template literals
   - Module pattern for code organization

3. **DOM Manipulation**
   - Creating and updating elements dynamically
   - Event delegation for performance
   - Form handling and validation
   - Modal/popup implementation

4. **State Management**
   - Application state object
   - State synchronization with UI
   - LocalStorage for data persistence
   - Search history tracking

5. **User Experience**
   - Loading states and skeletons
   - Error messages and recovery
   - Search debouncing
   - Keyboard shortcuts

## 🚀 Getting Started

### Prerequisites
- A free API key from [TheMealDB](https://www.themealdb.com/api.php) or [Spoonacular](https://spoonacular.com/food-api)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)

### Installation

1. Clone or download this project
2. Open the project folder in your code editor
3. Create a `.env.js` file or update the configuration in `script.js`:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```
4. Open `index.html` in your browser
5. Start exploring recipes!

### File Structure

```
04-recipe-finder/
├── index.html          # Main HTML structure
├── style.css           # Styles and animations
├── script.js           # Application logic
├── README.md           # This file
└── assets/             # Images and icons (optional)
```

## 💡 Usage Instructions

### Basic Search
1. Enter ingredients in the search box (e.g., "chicken, rice, tomato")
2. Press Enter or click the search button
3. Browse through the recipe results

### Using Filters
1. Select a meal type from the dropdown (optional)
2. Choose dietary preferences (optional)
3. Apply filters to refine your search

### Saving Favorites
1. Click the heart icon on any recipe card
2. Access saved recipes from the "Favorites" tab
3. Recipes persist even after closing the browser

### Viewing Recipe Details
1. Click on any recipe card
2. View complete ingredients list
3. Follow step-by-step instructions
4. See nutrition information (if available)

## 🎯 Key Code Concepts

### Debounced Search
```javascript
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
```

### API Fetch with Error Handling
```javascript
async function fetchRecipes(query) {
    try {
        const response = await fetch(`${API_URL}?s=${query}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Fetch error:', error);
        showError('Unable to fetch recipes. Please try again.');
        return [];
    }
}
```

### LocalStorage Management
```javascript
const favorites = {
    get: () => JSON.parse(localStorage.getItem('favorites') || '[]'),
    add: (recipe) => {
        const current = favorites.get();
        if (!current.find(r => r.id === recipe.id)) {
            localStorage.setItem('favorites', JSON.stringify([...current, recipe]));
        }
    },
    remove: (id) => {
        const current = favorites.get();
        localStorage.setItem('favorites', JSON.stringify(current.filter(r => r.id !== id)));
    }
};
```

## 🎨 Customization Ideas

Make this project your own:

1. **Add Meal Planning**: Create a weekly meal planner feature
2. **Shopping List Generator**: Auto-generate shopping lists from selected recipes
3. **Nutrition Calculator**: Calculate total nutrition for multiple recipes
4. **Recipe Sharing**: Add social media sharing buttons
5. **Rating System**: Allow users to rate and review recipes
6. **Image Upload**: Let users upload photos of their cooking attempts
7. **Multi-language Support**: Add international recipe databases

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Common Issues

**No recipes found:**
- Check your internet connection
- Verify your API key is valid
- Try different search terms

**Images not loading:**
- Some APIs provide external image URLs that may be unavailable
- Consider implementing fallback images

**LocalStorage not working:**
- Ensure cookies/local storage are enabled in your browser
- Some private browsing modes restrict localStorage

## 📝 Portfolio Tips

When adding this to your portfolio:

1. **Deploy it**: Use Netlify, Vercel, or GitHub Pages
2. **Add a demo video**: Show the app in action
3. **Document your process**: Write about challenges and solutions
4. **Highlight features**: Emphasize async operations and state management
5. **Show responsiveness**: Include mobile screenshots
6. **Mention future enhancements**: Show you think about scalability

## 🌟 Stretch Goals

Challenge yourself with these advanced features:

- [ ] Implement recipe video tutorials
- [ ] Add serving size calculator with ingredient scaling
- [ ] Create user accounts with cloud sync
- [ ] Integrate multiple recipe APIs
- [ ] Add offline support with Service Workers
- [ ] Implement voice search functionality
- [ ] Create printable recipe cards
- [ ] Add timer functionality for cooking steps

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and add your own features! Share your improvements and learnings.

---

**Happy Cooking & Coding! 👨‍🍳👩‍💻**
