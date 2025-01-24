# API Documentation

## Endpoints

### `POST /users/register`
Register a new user.

**Request Body:**
```json
{
    "username": "string",
    "password": "string",
    "email": "string"
}
```

**Response:**
- `201 Created`: User registered successfully.
- `400 Bad Request`: Invalid input.

### `POST /users/login`
Login a user.

**Request Body:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Response:**
- `200 OK`: Login successful.
- `401 Unauthorized`: Invalid credentials.

### `GET /users/profile`
Get the profile of the logged-in user.

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `200 OK`: Profile data.
- `401 Unauthorized`: Invalid or missing token.

### `POST /users/logout`
Logout the current user.

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `200 OK`: Logout successful.
- `401 Unauthorized`: Invalid or missing token.