# OMDB Movie Search

## Overview

This project is a movie search application built using React and TypeScript. It leverages the OMDB API to allow users to search for movies by title, view basic information, and explore additional details in a responsive and well-designed UI. The app also includes features like theming (light/dark mode), a favorites list, and responsive design.

## Features

- **Movie Search**: Search for movies by title and view results in a grid layout.
- **Movie Details**: Click on a movie poster to view additional details in a modal.
- **Theming**: Light and dark mode support with a toggle button.
- **Favorites**: Save movies to a favorites list using local storage.
- **Responsive Design**: Optimized for various screen sizes.
- **Error Handling**: Displays appropriate messages for loading states and errors.
- **Reusable Components**: Includes reusable components like `MovieCard`, `MovieGrid`, and `ThemeToggle`.

## How to Run Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jcsoftdev/movie-search.git
   cd movies-searcher
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   bun install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```
   VITE_API_URL=https://www.omdbapi.com/
   VITE_API_KEY=your_omdb_api_key
   ```

4. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   or

   ```bash
   bun dev
   ```

5. **Open in Browser**:
   Visit `http://localhost:5173` to view the app.

## Key Decisions

### 1. **State Management**

- **Zustand**: Used for managing global state, such as movie data and favorites. Zustand was chosen for its simplicity and lightweight nature.
- **React Context**: Used for theming (light/dark mode) to provide a global and scalable solution.

### 2. **Theming**

- **MUI (Material-UI)**: Used for theming and styling. The `ThemeProvider` and `sx` prop provide a scalable and consistent way to manage styles across the app.
- **Light/Dark Mode**: Implemented using React Context and persisted in local storage.

### 3. **Component Design**

- **Reusable Components**: Components like `MovieCard`, `MovieGrid`, and `ThemeToggle` are designed to be reusable and modular.
- **Separation of Concerns**: Logic is abstracted into hooks (e.g., `useMoviesList`, `useInfiniteScroll`) for better maintainability.

### 4. **Performance**

- **Memoization**: Used `useMemo` to optimize rendering and avoid unnecessary re-renders.

### 5. **Error Handling**

- **Loading States**: Displayed using `CircularProgress` from MUI.
- **Error Messages**: Shown when API calls fail or no results are found.

### 6. **Favorites Feature**

- **Local Storage**: Favorites are stored in local storage to persist data across sessions.
- **Favorites List**: Users can view their saved movies in a dedicated tab.

## Deployment

The app is deployed on [Vercel](https://vercel.com/) and can be accessed at:
[https://movie-search-swart-five.vercel.app/](https://movie-search-swart-five.vercel.app/)

## Screenshots

### Light Mode

![Light Mode Screenshot](./main-light.png)

### Dark Mode

![Dark Mode Screenshot](./main.png)

### Favorites

![Favorites Screenshot](./favorites-dark.png)
