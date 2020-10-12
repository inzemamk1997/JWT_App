# REST API with JWT user Authenticattion


## Installation

install Node.JS, express


## Language Used

JAVASCRIPT

## Usage

```
Used to create a REST API server handle multiple client requests simultaneously.
User Authentication using JWT 
Specifications:
1) Rest API server
2) JWT token generator
3) User code to query API endpoint
```
## How to Run
```
node app.js
```
Make appropriate query to API endpoint.
For Authentication of a mock user use the below as a JSON object
{
	"userId" : "Inzi",
	"password" : "inzi@viasat"
}
For Authorization or Accessing the private data send "key" as "x-auth-token" and "value" the token which you get after the login.
## Testing

Recommended POSTMAN.It is a collaboration platform for API development.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author
INZEMAM KHAN