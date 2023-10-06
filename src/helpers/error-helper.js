/**
 * error-helper.js - Helper module to construct error objects.
 *
 * Copyright notice at the end of the document.
 *
 */

const serverError = {
  status: 0,
  message: ""
}

/**
 * Builds and returns an error object.
 * @param status
 * @param message
 * @returns {Error}
 */
exports.getError = (status, message) => {
  //const retobj = Object.create(serverError)
  const retobj = new Error()
  retobj.status = status
  retobj.message = message
  return retobj
}

/*

CareFinder API.  A RESTful API to deliver V.A. hospital data.  A student project.
Copyright (C) 2020  Timothy H. Knautz

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Contact: knautz@uwp.edu

*/