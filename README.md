
# E-Commerce Product Listing Web Site

## Overview

This project implements an e-commerce product listing page with dynamic search, filtering, and sorting functionalities. It fetches product data from the **Dummy JSON API** and displays it in a responsive grid format. The website also includes a product detail page for each product.

## Features

- **Search**: Filter products based on user input in the search bar (e.g., typing "Bike" shows only bike-related products).
- **Category Filters**: Filter products by categories such as "Electronics," "Furniture," etc.
- **Sorting**: Sort products by attributes like price or rating.
- **Skeleton Loading**: Display loading skeletons while the data is being fetched.
- **Responsive UI**: Built using **Tailwind CSS** for a flexible and modern design.

## Technologies Used

- **React**: Frontend framework for building the user interface using functional components.
- **Redux**: State management for handling search, sorting, and filtering states.
- **Tailwind CSS**: Utility-first CSS framework for building custom, responsive layouts.
- **Dummy JSON API**: Mock API to fetch product data.
- **React-Skeleton-Loader**: Used to display skeleton screens during data fetching.

## Installation

Follow these steps to run the project locally:

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShreyasGijareTipic/E-commerece-website.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd e-commerce-product-listing
   ```

3. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

4. **Run the project**:
   ```bash
   npm run dev
   ```
   Or with yarn:
   ```bash
   yarn start
   ```

   This will start the application at `http://localhost:3000` by default.

## Usage

1. **Search**: Type keywords in the search bar to filter the products based on the input.
2. **Category Filters**: Select categories from the filter section to narrow down product results.
3. **Sorting**: Sort products by price or rating using the sorting options available in the UI.
4. **Product Detail Page**: Click on a product to view more detailed information such as description and reviews.

## Folder Structure

```
/src
  /components          # Contains reusable components like ProductCard, FilterBar, etc.
  /redux               # Contains Redux store, reducers, and actions for managing state
  App.js               # Main React component rendering the UI
  index.js             # Entry point for the React app
/public
  index.html           # The HTML template
  /assets              # Static assets like images
```

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

# Acknowledgements

- **Dummy JSON API**: Used for mock product data.
- **React**, **Redux**, **Tailwind CSS** for providing excellent tools for frontend development.

## Live Demo

You can see the live demo of the project here:

[Live Demo] shreyas-ecomdemo.tipic.co.in
