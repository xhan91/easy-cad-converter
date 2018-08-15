# easy-cad-converter
Just to add tax and then convert CAD to other currencies

Several steps for the application to run:
- Using fixer API to get daily rates and store them at database
- Backend server reading from database
- Listen on requests

Or maybe:
- Store rates in memory and update by comparing current date and last updated date