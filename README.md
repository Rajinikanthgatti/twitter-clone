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

    LikePost or disLikePost - http://localhost:3005/api/posts/618bcec61a2d1db726a859c7/like
    requestType - PUT
    JSON - {
	        "email" : "rgattikoppul@gmail.com",
	        "password" : "123456"
            }
    Retweet or removeRetweet - http://localhost:3005/api/posts/618bcec61a2d1db726a859c7/retweet
    requestType - PUT

    SinglePost - http://localhost:3005/api/posts/618bcec61a2d1db726a859c7
    requestType - GET

    DeletePost - http://localhost:3005/api/posts/618bcff41a2d1db726a859e1
    requestType - DELETE

    User Profile - http://localhost:3005/profile/name
    requestType - GET

    Following or unfollowing a specific user - http://localhost:3005/api/users/618fa6e6d756215118905350/follow
    requestType - PUT

    List of Following users - http://localhost:3005/api/users/618bceb31a2d1db726a859c4/following
    requestType - GET

    List of Followed users - http://localhost:3005/api/users/618fa6e6d756215118905350/followers
    requestType - GET

    Uploading profile picture - http://localhost:3005/api/users/profilePicture
    requestType - POST
        form-data : {
            type: File,
            data : {
                croppedImage : Image.jpg
            }
        }
    Getting the profile-pic - http://localhost:3005/uploads/images/c92be1f2ff4681daff82c6031008c39c.png
    requestType - GET

    Searching in Users - http://localhost:3005/search/users?query=c
    requestType - GET

    Searching in Posts - http://localhost:3005/search/posts?query=tweet
    requestType - GET