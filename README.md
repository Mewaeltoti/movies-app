# Trending Movie App

A modern web application for discovering and browsing movies with search functionality and trending movie lists.

## Demo
(You can include a link to your deployed app here)

## Table of Contents
- [Project Title](#project-title)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

This Movie App allows users to search for movies, view their ratings, release dates, and posters. It also includes a trending movies section, powered by the Movie Database API (TMDb) and allows users to see the most popular movies at the moment.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mewaeltoti/movie-app.git
### 2. Install Dependencies
Navigate to the project directory and install the required dependencies using npm or yarn:
cd movie-app
npm install
# or
yarn install
### 3. Set Environment Variables
Create a .env file in the root of your project and add your environment variables:
VITE_TMDB_API_KEY=your-tmdb-api-key
VITE_APPWRITE_PROJECT_ID=your-appwrite-project-id
VITE_APPWRITE_DATABASE_ID=your-appwrite-database-id
VITE_APPWRITE_COLLECTION_ID=your-appwrite-collection-id
You can obtain the TMDb API Key from the TMDb website, and Appwrite credentials from the Appwrite dashboard.
### 4. Run the Development Server
Start the development server with the following command:
npm run dev
# or
yarn dev
Usage
Search for Movies: Use the search bar to search for your favorite movies.
Trending Movies: Check out the list of trending movies on the homepage.
Click on a Movie: Get detailed information on movies, including ratings and release year.
Contributing
If you'd like to contribute to the project, feel free to open a pull request or create an issue for any bugs or improvements.
Steps to contribute:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Credits
This project was inspired by the JavaMastery YouTube channel.

A big thank you to JavaMastery for their tutorials and guidance throughout the development of this application.

Check out their channel for more amazing content related to web development and programming.
