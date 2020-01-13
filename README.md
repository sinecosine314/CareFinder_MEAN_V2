# CareFinder_MEAN

The CareFinder project is an assignment given in CSCI 424 Client/Server Development.
The project is a semester-long project starting with the development of the client followed by the development of the server API.

# Copyright

CareFinder Copyright (C) 2020  Timothy H. Knautz

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

A copy of the GNU General Public License is distributed with this program in the file named "COPYING" in the project root.
If not, plerase see <https://www.gnu.org/licenses/>.

# Data

The data for the project is "live" date from `data.gov`.

More here...

## Importing the Data

The data is contained in the `seeds` folder in a file called `hospitals.json`.

To im port the data, go to the `seeds` folder and type the following command:

`mongoimport --db=carefinder --collection=hospitals --file=./hospitals.json --jsonArray`

# Models

The following data models are used by the API service.

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
Also, all routes are prefaced with `.../api`.
Thus, requests would look something like: `https://carefinder.company.com/api/...`.

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
