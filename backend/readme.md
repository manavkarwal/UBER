# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their first name, last name, email, and password. The endpoint validates the input data and creates a new user in the database if the data is valid.

## Request Body
The request body should be a JSON object with the following fields:

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
} 
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
} 
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'

## User Login Endpoint
Endpoint
POST /users/login

## Description
This endpoint allows an existing user to log in by providing their email and password. The endpoint validates the input data and returns an authentication token if the credentials are correct.

## Request Body
The request body should be a JSON object with the following fields:

email (string, required): The email address of the user. Must be a valid email format.
password (string, required): The password for the user. Must be at least 6 characters long.
Example:{
  "email": "john.doe@example.com",
  "password": "password123"
}

## Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the authentication token and user details.
Example:{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
## Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}

## GitHub Copilot
Here is the updated README.md file with documentation for both the /users/register and /users/login endpoints:

Responses
Success
Status Code: 201 Created
Response Body: A JSON object containing the authentication token and user details.
Example:

Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:

Example Request
User Login Endpoint
Endpoint
POST /users/login

Description
This endpoint allows an existing user to log in by providing their email and password. The endpoint validates the input data and returns an authentication token if the credentials are correct.

Request Body
The request body should be a JSON object with the following fields:

email (string, required): The email address of the user. Must be a valid email format.
password (string, required): The password for the user. Must be at least 6 characters long.
Example:

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the authentication token and user details.
Example:

Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:

Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:{
  "message": "Invalid email or password"
}
Example Request
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'