# SSR-Online-Store🛒⭐

This is a simple e-commerce store web application built as a server-side rendered (SSR) app with an MVC pattern using Express, Node.js, EJS, and MongoDB. The project covers fundamental features of SSR web applications and serves as an educational resource. It includes the following features:

## Features

1. **Session Authentication and Password Reset**
   - Secure user authentication with session management.
   - Password reset functionality via email.

2. **Email Integration with Nodemailer**
   - Utilizes Nodemailer for sending transactional emails.

3. **CSRF Tokens Protection**
   - Implements Cross-Site Request Forgery (CSRF) token protection to enhance security.

4. **Validation with Express-Validator**
   - Implements data validation using the Express-Validator library for robust input validation.

5. **File Download and Upload with PDFKit**
   - Allows users to download and upload files.
   - Generates PDF documents using PDFKit.

6. **Pagination**
   - Implements pagination for a seamless user experience when browsing through products.

7. **Stripe Payment Integration**
   - Facilitates secure online payments using the Stripe payment gateway.

8. **Database Options**
   - Two branches available:
     - `pure-sql`: CRUD operations are handled with SQL queries.
     - `sequelize`: Uses Sequelize for CRUD operations and implements SQL relationships (one-to-many, many-to-many).

## Technologies Used

- Express.js: A Node.js framework for building web applications.
- EJS: A templating engine for rendering dynamic HTML content.
- MongoDB: A NoSQL database for storing application data.
- SQL (in the `pure-sql` branch): Utilized for CRUD operations in the traditional SQL way.
- Sequelize (in the `sequelize` branch): An ORM for working with SQL databases.
- Nodemailer: A Node.js module for sending emails.
- Stripe: A payment gateway for handling online payments.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ar-ilyes/ssr-online-store.git
   cd ssr-online-store
   ```
2. **install Dependecies**
   ```bash
   npm install
   ```
3. **Run the Application**
   ```bash
   npm start
   ```

## Branches

This repository includes multiple branches, each serving a specific purpose:

- `main`: The main branch, where the project is built with MongoDB as the database.
- `pure-sql`: In this branch, CRUD operations are handled with SQL queries.
- `sequelize`: The `sequelize` branch uses Sequelize, an ORM, for CRUD operations and implements SQL relationships such as one-to-many and many-to-many.

You can switch between branches to explore different aspects of the project or choose the one that aligns with your preferred database and development approach.

