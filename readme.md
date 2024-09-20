
# Library Management RESTful API

This is a RESTful API built with Node.js and Express.js for managing a library's book collection. It allows users to perform CRUD (Create, Read, Update, Delete) operations on books, with optional features like data validation, pagination, and authentication.

## Features

- Retrieve all books in the library.
- Retrieve details of a specific book by its ID.
- Add a new book to the library.
- Update details of an existing book.
- Delete a book from the library.
- Data validation using Joi (optional).
- Pagination for listing books (optional).
- User authentication (optional).

## Installation

1. Clone the repository:
  ```bash
   git clone https://github.com/yourusername/library-api.git
   cd library-api
   ```

2. Install the dependencies:
     ```bash
    npm install
   ```

3. Create a .env file for environment variables (such as database configuration, JWT secret for authentication, etc.).
# Example:
    PORT=3000
    DB_URL=mongodb://localhost:27017/library-api
    JWT_SECRET=yourjwtsecret
    SALT=10

4. Start the application:
      ```bash
    npm start
   ```

## API Reference

1. Retrieve all books:

```http
  GET /api/books
```

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `skip` | `Number` | **Optional**. For Pagination |
| `limit` | `Number` | **Optional**. For Pagination |

2. Get book details

```http
  GET /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to fetch |

3. Add new book:
```http
  POST /api/books
```

| Body Parameter | Type     | Description                  |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of the book|
| `author`      | `string` | **Required**. author of the book |
| `year`      | `string` | **Required**. publish year of the book |
| `genre`      | `string` | **Required**. genre of the book |

4. Update book details:
```http
  PUT /api/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to fetch |

| Body Parameter | Type     | Description                  |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Optional**. title of the book|
| `author`      | `string` | **Optional**. author of the book |
| `year`      | `string` | **Optional**. publish year of the book |
| `genre`      | `string` | **Optional**. genre of the book |

5. Delete book:
```http
  DELETE /api/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to delete |
