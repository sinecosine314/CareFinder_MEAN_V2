# CareFinder_MEAN

The CareFinder project is an assignment given in CSCI 424 Client/Server Development.
The project is a semester-long project starting with the development of the client followed by the development of the server API.

# Copyright

CareFinder Copyright (C) 2020  Timothy H. Knautz

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

A copy of the GNU General Public License is distributed with this program in the file named "COPYING" in the project root.
If not, please see <https://www.gnu.org/licenses/>.

# Version

1.0.0

# Data

The data for the project is "live" date from `data.gov`.

More here...

## Importing the Data

The data is contained in the `seeds` folder in a file called `hospitals.json`.

To im port the data, go to the `seeds` folder and type the following command:

`mongoimport --db=carefinder --collection=hospitals --file=./hospitals.json --jsonArray`

# Models

The following data models are used by the API service.

## Users

`username` - type: String, required. The user's username.

`email` - type: String, required. The user's email address.

`role` - type: String, required, enumerated value of `admin`, `user`, `guest`. The user's role in the system.

`firstname` - type: String. The user's first name.

`lastname` - type: String. The user's last name.

`salt` - type: String, generated.

`hash` - type: String, generated.

## Hospitals

`providerId` - type: Number, required. The hospitals provider identifier.

`name` - type: String. The hospitals full name.

`address` - type: String.

`city` - type: String.

`state` - type: String.

`zipCode` - type: String.

`county` - type: String.

`phoneNumber` - type: String.

`type` - type: String.

`ownership` - type: String.

`emergencyServices` - type: String.

`location`:

  `humanAddress` - type: String.
  
  `latitude` - type: Number.
  
  `longitude` - type: Number.
  
  `needsRecoding` - type: String

# Routes

The following section describes the routes supported by the CareFinfer API.
It would be typical for this API to be implemented as a subdomain or a server.
For example, `carefinder.company.com`.
Also, all routes are prefaced with `.../api/v1`.
Thus, requests would look something like: `https://carefinder.company.com/api/v1/...`.

## Users

The `users` routes support CRUD operations for users.

### Endpoints

The following are the endpoints for the `users` resource.

`POST /users` - Create a new user resource given the information payload.

`GET /users?<list of query parameters>` - Read user(s) resources in various ways. See Parameters below.

`PUT /users?<list of query parameters>` - Update/create a specific user resource. Supported parameters: id, username and email.

`PATCH /users?<list of query parameters>` - Update/patch a specific user resource. Supported parameters: id, username and email.

`DELETE /users?<list of query parameters>` - Delete a specific user resource. Supported parameters: id, username and email.

### Parameters

`id={id}` - Specifies the unique identifier for a specific user.

`username={username}` - Specifies the username of the user.

`email={email}` - Specifies the email of the user.

`firstname={firstname}` - Specifies the first name of the user(s).

`lastname={lastname}` - Specifies the last name of the user(s).

`role={role}` - Specifies the role of the user(s).

### Payload

This is an example of the user information that must be sent when crating a new user.

```
{
  "username": "testuser",
  "email": "testuser@example.com",
  "firstname": "John",
  "lastname": "Doe",
  "password": "badpassword",
  "role": "user",
}
```

### Usage

The following examples show how the `users` endpoint is used.

`POST http://localhost:3000/users`

`GET http://localhost:3000/users?firstname=john`

`PUT http://localhost:3000/users?id=5fad777c032b26732e40b3e7`

`PATCH http://localhost:3000/users?id=5fad777c032b26732e40b3e7`

`DELETE http://localhost:3000/users?id=5fad777c032b26732e40b3e7`

## Hospitals

The `hospitals` routes support CRUD operations for hospitals.

### Endpoints

The following are the endpoints for the `hospitals` resource.

`POST /hospitals` - Create a new hospital resource. (1)

`GET /hospitals[?{param=value}&{param=value}&...]` - Return a list of all hospital resources that match the given set of parameters.  See "Parameters" below.

`GET /hospitals/{hospitalId}` - Return a specific Hospital resource.

`PUT /hospitals/{hospitalId}` - Replace a specific Hospital resource with the given resource. (1)

`PATCH /hospitals/{hospitalId}` - Modify a specific Hospital resource with the given resource. (1)

`DELETE /hospitals/{hospitalId}` - Remove a specific Hospital resource. (1)

(1) Endpoints supported for administrator users only.

### Parameters

`providerid={providerid]` - Specifies the unique provider identifier for a specific hospital.

`city={city}` - Specifies the city in which the hospital(s) reside.

`state={state}` - Specifies the state in which the hospital(s) reside.

`county={county}` - Specifies the county in which the hospital(s) reside.

`name={name}` - Specifies the name if the specific hospital.

### Usage

The following examples show how the `hospitals` endpoint is used.

`POST http://localhost:3000/hospitals`

`GET http://localhost:3000/hospitals?city=CHICAGO`

`GET http://localhost:3000/hospitals?city=DECARER`

# Regression Tests

This project includes regression test scripts developed by the author.
These test scripts are unit tests for the various route combinations.
The tests can be found in the `regtests` folder in the project root.
The tests were developed in [Postman](https://www.getpostman.com/) and were exported from the program via Collections > CareFinder-Regtests > Export.
The collection was exported as a "Collection v2.1" and is called `CareFinder-RegTests.postman_collection.json`.

To import the regression tests, simply open Postman and click the "Import" button in the upper left-hand corner of the Postman window.
Navigate to the file stated above and import the file.
