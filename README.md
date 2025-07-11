# WTWR (What to Wear?)

## Project Description

WTWR is a weather-based clothing recommendation application built with React. The app displays current weather conditions and suggests appropriate clothing items based on the temperature. Users can view clothing recommendations, add new garments to their wardrobe, and interact with clothing items through a responsive and intuitive interface.

## Functionality

- **Weather Integration**: Real-time weather data from OpenWeatherMap API
- **Clothing Recommendations**: Smart clothing suggestions based on current temperature
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modal Interactions**: Add new clothing items and view item details in modals
- **Temperature Display**: Weather card showing current temperature in Fahrenheit
- **Dynamic Backgrounds**: Weather-appropriate background images for different conditions
- **Mobile Menu**: Hamburger menu navigation for mobile devices

## Technologies and Techniques Used

- **React 18**: Functional components with hooks (useState, useEffect)
- **Vite**: Fast build tool and development server
- **JavaScript ES6+**: Modern JavaScript features and syntax
- **CSS3**: Advanced CSS with flexbox, grid, and media queries
- **Responsive Web Design**: Mobile-first approach with breakpoints
- **API Integration**: RESTful API calls to OpenWeatherMap
- **Component Architecture**: Modular, reusable React components
- **State Management**: React hooks for local state management
- **Font Integration**: Custom Cabinet Grotesk font family
- **CSS Modules**: Component-scoped styling

## Project Structure

- **Components**: Header, Main, Footer, WeatherCard, ItemCard, ItemModal, ModalWithForm, AddItemModal
- **Utils**: Weather API integration and constants
- **Vendor**: Normalize.css and font files
- **Images**: Weather backgrounds and clothing item images

## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Future Enhancements

- User authentication and personal wardrobe storage
- More detailed weather information (humidity, wind speed)
- Clothing item categories and filtering
- User preferences and customization options
