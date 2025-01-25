# API Endpoints Documentation

## User Endpoints

### User Registration Endpoint

#### Endpoint
`POST /users/register`

#### Description
This endpoint allows a new user to register by providing their first name, last name, email, and password. The endpoint validates the input data and creates a new user in the database if the data is valid.

#### Request Body
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

Responses
Success
Status Code: 201 Created
Response Body: A JSON object containing the authentication token and user details.

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

Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
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
Example Request
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
User Login Endpoint
Endpoint
POST /users/login

Description
This endpoint allows an existing user to log in by providing their email and password. The endpoint validates the input data and returns an authentication token if the credentials are correct.
Request Body
The request body should be a JSON object with the following fields:

email (string, required): The email address of the user. Must be a valid email format.
password (string, required): The password for the user. Must be at least 6 characters long.
Example:{
  "email": "john.doe@example.com",
  "password": "password123"
}
Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the authentication token and user details.
Example:
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
Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:
{
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

GitHub Copilot
Here is the updated README.md file with documentation for all routes, including /users/register, /users/login, /users/profile, /users/logout, /captains/register, /captains/login, /captains/profile, and /captains/logout endpoints:

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
Example:
{
  "message": "Invalid email or password"
}
Example Request
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
User Profile Endpoint
Endpoint
GET /users/profile

Description
This endpoint allows an authenticated user to retrieve their profile information.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the user's profile information.
Example:{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:{
  "message": "Unauthorized"
}
Example Request
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer your_jwt_token"

User Logout Endpoint
Endpoint
GET /users/logout

Description
This endpoint allows an authenticated user to log out by invalidating their authentication token.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing a success message.
{
  "message": "Logged out"
}
Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:
{
  "message": "Unauthorized"
}
Example Request
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer your_jwt_token"

Captain Endpoints
Captain Registration Endpoint
Endpoint
POST /captains/register

Description
This endpoint allows a new captain to register by providing their first name, last name, email, password, and vehicle details. The endpoint validates the input data and creates a new captain in the database if the data is valid.

Request Body
The request body should be a JSON object with the following fields:

fullname.firstname (string, required): The first name of the captain. Must be at least 3 characters long.
fullname.lastname (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
email (string, required): The email address of the captain. Must be a valid email format.
password (string, required): The password for the captain. Must be at least 6 characters long.
vehicle.color (string, required): The color of the vehicle. Must be at least 3 characters long.
vehicle.plate (string, required): The plate number of the vehicle. Must be at least 3 characters long.
vehicle.capacity (number, required): The capacity of the vehicle. Must be at least 1.
vehicle.vehicleType (string, required): The type of the vehicle. Must be one of car, motorcycle, or auto.
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
Responses
Success
Status Code: 201 Created
Response Body: A JSON object containing the authentication token and captain details.
Example:
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:
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
    },
    {
      "msg": "Color must be at least 3 character long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 character long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
Example Request
curl -X POST http://localhost:3000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
Captain Login Endpoint
Endpoint
POST /captains/login

Description
This endpoint allows an existing captain to log in by providing their email and password. The endpoint validates the input data and returns an authentication token if the credentials are correct.

Request Body
The request body should be a JSON object with the following fields:

email (string, required): The email address of the captain. Must be a valid email format.
password (string, required): The password for the captain. Must be at least 6 characters long.
Example:
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the authentication token and captain details.
Example:
{
  "token": "your_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:
{
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
Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:
{
  "message": "Invalid email or password"
}
Example Request
curl -X POST http://localhost:3000/captains/login \
-H "Content-Type: application/json" \
-d '{
  "email": "jane.doe@example.com",
  "password": "password123"
}'
Captain Profile Endpoint
Endpoint
GET /captains/profile

Description
This endpoint allows an authenticated captain to retrieve their profile information.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the captain's profile information.
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}

GitHub Copilot
Here is the updated README.md file with documentation for all routes, including /users/register, /users/login, /users/profile, /users/logout, /captains/register, /captains/login, /captains/profile, and /captains/logout endpoints:

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
Example:

Example Request
User Profile Endpoint
Endpoint
GET /users/profile

Description
This endpoint allows an authenticated user to retrieve their profile information.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the user's profile information.
Example:

Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:

Example Request
User Logout Endpoint
Endpoint
GET /users/logout

Description
This endpoint allows an authenticated user to log out by invalidating their authentication token.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing a success message.
Example:

Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:

Example Request
Captain Endpoints
Captain Registration Endpoint
Endpoint
POST /captains/register

Description
This endpoint allows a new captain to register by providing their first name, last name, email, password, and vehicle details. The endpoint validates the input data and creates a new captain in the database if the data is valid.

Request Body
The request body should be a JSON object with the following fields:

fullname.firstname (string, required): The first name of the captain. Must be at least 3 characters long.
fullname.lastname (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
email (string, required): The email address of the captain. Must be a valid email format.
password (string, required): The password for the captain. Must be at least 6 characters long.
vehicle.color (string, required): The color of the vehicle. Must be at least 3 characters long.
vehicle.plate (string, required): The plate number of the vehicle. Must be at least 3 characters long.
vehicle.capacity (number, required): The capacity of the vehicle. Must be at least 1.
vehicle.vehicleType (string, required): The type of the vehicle. Must be one of car, motorcycle, or auto.
Example:

Responses
Success
Status Code: 201 Created
Response Body: A JSON object containing the authentication token and captain details.
Example:

Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:

Example Request
Captain Login Endpoint
Endpoint
POST /captains/login

Description
This endpoint allows an existing captain to log in by providing their email and password. The endpoint validates the input data and returns an authentication token if the credentials are correct.

Request Body
The request body should be a JSON object with the following fields:

email (string, required): The email address of the captain. Must be a valid email format.
password (string, required): The password for the captain. Must be at least 6 characters long.
Example:

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the authentication token and captain details.
Example:

Validation Errors
Status Code: 400 Bad Request
Response Body: A JSON object containing the validation errors.
Example:

Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:

Example Request
Captain Profile Endpoint
Endpoint
GET /captains/profile

Description
This endpoint allows an authenticated captain to retrieve their profile information.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing the captain's profile information.
Example:

Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:
{
  "message": "Unauthorized"
}
Example Request
curl -X GET http://localhost:3000/captains/profile \
-H "Authorization: Bearer your_jwt_token"
Captain Logout Endpoint
Endpoint
GET /captains/logout

Description
This endpoint allows an authenticated captain to log out by invalidating their authentication token.

Responses
Success
Status Code: 200 OK
Response Body: A JSON object containing a success message.
{
  "message": "Logged out"
}
Authentication Errors
Status Code: 401 Unauthorized
Response Body: A JSON object containing the error message.
Example:
{
  "message": "Unauthorized"
}
Example Request
curl -X GET http://localhost:3000/captains/logout \
-H "Authorization: Bearer your_jwt_token"