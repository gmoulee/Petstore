Petstore server 

built using express framework

Node js and Mongodb is required

To run the server : 1. Install Node js and Mongo db ( if not installed already )
		    2. Run npm install
		    3. Run node server.js 


------------------------------------------------------------------------------------------------------------

Docker : docker image for the application is created and pushed to docker hub - moulee23/petstore

To run the application using docker

1. RUN - docker run -d --name mongodb mongo:latest

2. RUN - docker run -d -p 3000:3000 --link mongodb:mongo --name petstore moulee23/petstore
-------------------------------------------------------------------------------------------------------------

To run the application using docker-compose

1. RUN - docker-compose up

------------------------------------------------------------------------------------------------------------------

postman collection is added to validate the behaviour of the server : Filename : Petstore API.postman_collection

--------------------------------------------------------------------------------------------------------------------

Authorization schema : JsonWebTokens is used to authorize the user

Before executing the required function, server will verify the jsonwebtoken sent with the request header("x-access-token")

Once a user logs in , a jsonwebtoken is created(expiry in 24 hrs) and sent to the user. Once logged out, it is then set to null and returned. 

Which service requires authorization ? 1. Update user, 2. Delete user, 3. Delete pet, 4. Delete order. (It can be extended to other services as well)

--------------------------------------------------------------------------------------------------------------------------

Not done : 1. image upload for pets

---------------------------------------------------------------------------------------------------------------------------


