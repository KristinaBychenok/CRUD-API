# CRUD-API

## Install and run
1. Run `git clone https://github.com/KristinaBychenok/CRUD-API.git`
2. Run `npm install` to install all dependencies
3. Run script `npm run start:dev`

## API
1. GET http://localhost:4000/api/users - Get All users
2. GET http://localhost:4000/api/users/id - Get specific user with id (Example id: 320486bc-1914-11ee-be56-0242ac120002)
3. POST http://localhost:4000/api/users - Create user with JSON request. Example:
```
{
    "username": "Name",
    "age": 100,
    "hobbies": [
        "fly"
    ]
}
```
4. PUT http://localhost:4000/api/users/id - Edit user with id using JSON request (Example id: 320486bc-1914-11ee-be56-0242ac120002, example request: "age": 200)
5. DELETE http://localhost:3000/api/users/id - Delete user with id (Example id: 320486bc-1914-11ee-be56-0242ac120002)

## Other
- You can compile production with `npm run start:prod`
