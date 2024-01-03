
# Promit Express E-commerce App

Promit Express is a full-stack E-commerce application built with Express.js. It enables users to create their own stores using drag-and-drop landing pages and facilitates buying and selling of items.

## Project Structure

The project is organized into the following directories and files:

- **promit-express:**
  - **client:** Front-end directory.
    - **public:** Public assets and static files.
      - **fav.ico, favicon.ico, index.html, logo192.png, logo512.png, manifest.json, robots.txt:** Basic front-end assets.
    - **src:** Source code for the React.js front-end.
      - **components:** React components organized by functionality.
        - **auth:** Authentication components.
        - **buyer:** Buyer-related components.
          - **dashboard:** Buyer dashboard components.
            - **cart:** Cart-related components.
            - **product:** Product-related components.
              - **Index.js, product_list.js:** Product list components.
              - **create_product.js:** Create product component.
          - **profile:** Profile-related components.
        - **homepage:** Components related to the homepage.
        - **nodemailer:** Components related to nodemailer (e.g., email handling).
        - **promoter:** Promoter-related components.
          - **dashboard:** Promoter dashboard components.
            - **product:** Product-related components.
              - **Index.js, product_list.js:** Product list components.
              - **create_product.js:** Create product component.
            - **profile:** Profile-related components.
            - **promotion:** Promotion-related components.
              - **Index.js, create_promotion.js, promotion_list.js:** Promotion components.
        - **ratings:** Components related to ratings.
        - **reactdnd:** Components related to drag-and-drop functionality.
          - **src:** Source files for drag-and-drop components.
        - **seller:** Seller-related components.
          - **dashboard:** Seller dashboard components.
            - **product:** Product-related components.
              - **Index.js, product_list.js:** Product list components.
              - **create_product.js:** Create product component.
            - **profile:** Profile-related components.
        - **css:** CSS files organized by functionality.
          - **agency.css, buyer, fonts, promoter, seller:** CSS folders for different sections of the app.
        - **images:** Image assets for the app.
          - **backgrounds, signin-image.jpg, signup-image.jpg:** Image folders and background images.
        - **js:** JavaScript files organized by functionality.
          - **agency.js, check.js, seller:** JavaScript folders for different sections of the app.
        - **store:** Redux store related files.
          - **action:** Redux action files.
            - **action.js:** Action file.
          - **constant:** Redux constant files.
            - **constant.js:** Constant file.
          - **reducer:** Redux reducer files.
            - **index.js, reducer.js:** Reducer files.
      - **vendor:** External libraries and frameworks.
        - **bootstrap:** Bootstrap CSS and JS files.
        - **fontawesome-free:** Font Awesome CSS, webfonts, and JS files.
        - **jquery:** jQuery and jQuery Slim files.
        - **jquery-easing:** jQuery Easing files.
  - **config:** Configuration files.
    - **dbconn.js, storage_engine.js:** Database connection and storage engine configuration.
  - **models:** Mongoose models for different entities.
    - **Buyer.js, Product.js, Promoter.js, Promotion.js, Seller.js:** Mongoose models for buyers, products, promoters, promotions, and sellers.
  - **routes:** Express.js route files.
    - **api:** API route files.
      - **buyer.js, product.js, promoter.js, promotion.js, seller.js:** Route files for buyers, products, promoters, promotions, and sellers.
  - **server.js:** Entry point for the Express.js server.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/promit-express.git
   cd promit-express
   ```

2. Install dependencies for both the server and client:

   ```bash
   npm install
   cd client
   npm install
   ```

3. Configure the database connection in `config/dbconn.js` and storage engine in `config/storage_engine.js`.

4. Run the Express.js server:

   ```bash
   npm start
   ```

5. Run the React.js front-end (in the `client` directory):

   ```bash
   npm start
   ```

6. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## Dependencies

The project uses the following major dependencies:

- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
  
- **React.js:** JavaScript library for building user interfaces.
  
- **Redux:** State management library for React.js applications.
  
- **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
  
- **Bootstrap:** Front-end framework for styling.
  
- **Font Awesome:** Icon toolkit.

## License

This Promit Express E-commerce App is licensed under the [MIT License](LICENSE).

