### Twitter-Clone api
    Tech-stack
        Node JS
        MongoDB
        Mongoose
        ExpressJS
## API end points
    Register - http://localhost:3005/register
    requestType - POST
        JSON - {
                "firstName" : "First Name",
	            "lastName" :"Last Name",
	            "userName" : "name",
	            "email" : "email@gmail.com",
	            "password" : "password"
                }

    Login   -   http://localhost:3005/login
    requestType - POST
        JSON - {
	            "email" : "email@gmail.com",
	            "password" : "password"
                }

    Logout - http://localhost:3005/logout
    requestType - GET

    HomePage - http://localhost:3005/
    requestType - GET

    Post - http://localhost:3005/api/posts
    requestType - POST
        JSON - {
                "content": "First twitter post",
                }

    GetPosts - http://localhost:3005/api/posts
    requestType - GET

    LikePost - http://localhost:3005/api/posts/618bcec61a2d1db726a859c7/like
    requestType - PUT
    JSON - {
	        "email" : "rgattikoppul@gmail.com",
	        "password" : "123456"
            }
    Retweet - http://localhost:3005/api/posts/618bcec61a2d1db726a859c7/retweet
    requestType - PUT

    SinglePost - http://localhost:3005/api/posts/618bcec61a2d1db726a859c7
    requestType - GET

    DeletePost - http://localhost:3005/api/posts/618bcff41a2d1db726a859e1
    requestType - DELETE

    User Profile - http://localhost:3005/profile/name
    requestType - GET