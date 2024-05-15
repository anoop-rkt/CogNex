
# CogNex - GPT

CogNex is an advanced conversational AI project designed to generate chat messages dynamically, akin to ChatGPT. By harnessing the cutting-edge capabilities of OpenAI's GPT-3.5 Turbo model, CogNex facilitates seamless and contextually relevant conversations across various domains. Whether it's assisting users with inquiries, providing recommendations, or engaging in informative exchanges, CogNex empowers applications with human-like conversational abilities.



## API Reference



#### Sign Up user

```http
  POST /api/v1/user/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.Name of the user |
| `email`      | `string` | **Required**.Email of the user |
| `password`      | `string` | **Required**.Password of the user |

#### Login user

```http
  POST /api/v1/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.Email of the user |
| `password`      | `string` | **Required**.Password of the user |

#### Check Authentication Status

```http
  GET /api/v1/user/auth-status
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwtData`      | `string` | **Required**.JWT token containing user data |

#### Logout user

```http
  GET /api/v1/user/logout
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwtData`      | `string` | **Required**.JWT token containing user data |

#### Create a New Chat

```http
  POST /api/v1/chat/new
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwtData`      | `string` | **Required**.JWT token containing user data |
| `message`      | `string` | **Required**.Message content |

#### Fetch All Chats

```http
  GET /api/v1/chat/all-chats
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwtData`      | `string` | **Required**.JWT token containing user data |

#### Delete Chat

```http
  DELETE /api/v1/chat/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `jwtData`      | `string` | **Required**.JWT token containing user data |

## Authentication
 
Authentication is required to access these endpoints. Include your JWT token containing user data in the request body.

## Response Codes and Descriptions

All endpoints return data in JSON format. Below are the response codes used:

- **200 OK**: The request was successful. This status is returned when retrieving or creating resources without any errors.

- **201 Created**: The resource was successfully created. This status is returned when a new resource, such as a user account, is successfully registered.

- **400 Bad Request**: The request was malformed or contained invalid data. This status is returned when the request body is missing required parameters or contains incorrect data.

- **401 Unauthorized**: The request lacks valid authentication credentials. This status is returned when the user is not authenticated or the provided credentials are invalid.

- **403 Forbidden**: The server understood the request but refuses to authorize it. This status is returned when the user does not have sufficient permissions to perform the requested action.

- **404 Not Found**: The requested resource could not be found. This status is returned when attempting to access a resource that does not exist.

- **429 Too Many Requests**: The user has sent too many requests in a given amount of time. This status is returned to indicate that the user has exceeded the rate limit for accessing the API.

- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request. This status is returned when an unexpected error occurs on the server-side.

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Background Color | ![#05101c](https://via.placeholder.com/10/05101c?text=+) #05101c |
| Shadow Color | ![#64f3d5](https://via.placeholder.com/10/64f3d5?text=+) #64f3d5 |
| Chat Color | ![#004d56](https://via.placeholder.com/10/004d56?text=+) #004d56 |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`OPEN_AI_SECRET`

`OPEN_AI_ORGANIZATION_ID`

`MONGODB_URL`

`JWT_SECRET`

`COOKIE_SECRET`


## Features

- **OpenAI GPT-3.5 Turbo** Integration: Harness the full power of OpenAI's latest GPT model for intelligent conversation generation.
- **JWT & Cookie Authentication** : Ensures secure user authentication, protecting user data and privacy.
- **Context API**: Utilize the Context API for efficient management of authentication within the ReactJS application.
- **Material UI** Styling: Employ Material UI for beautifully styled components, ensuring a sleek and modern user interface.
- **MongoDB** Database: Store user data securely using MongoDB, providing scalability and reliability.
- **TypeScript + ReactJS**: Leverage TypeScript for strong typing and enhanced code readability within the ReactJS application.
- **ExpressJS** : Build a robust backend with ExpressJS, providing a scalable and performant server environment.
- **NodeJS** Runtime Environment: Utilize NodeJS for the project's runtime environment, offering flexibility and efficiency.


## 🚀 About Me
I'm a full stack software developer with a passion for building robust and scalable applications. My tech stack includes MongoDB, Express, ReactJS with Typescript, and Node.js.

In addition to web development, I'm also a contributor in the Dart language based App development. I enjoy leveraging Dart's features to create cross-platform mobile applications that are fast and reliable.

Java holds a special place in my heart as it was the first programming language I learned. Its versatility and wide range of libraries make it my go-to language for various projects and solutions.


