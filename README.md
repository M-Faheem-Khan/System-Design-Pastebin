# System Design Pastebin

![Action: Build & Deploy to GKE](https://github.com/M-Faheem-Khan/System-Design-Pastebin/actions/workflows/gke_deployment.yaml/badge.svg)

Pastebin implementation for the [System Design Primer](https://github.com/donnemartin/system-design-primer/tree/master/solutions/system_design/pastebin) by [donnemartin](https://github.com/donnemartin). I choose Nodejs & Mongodb as programming languages of choice and database. Kubernetes is my choice of software for deploying.

### Use cases
#### We'll scope the problem to handle only the following use cases  
* **User** enters a block of text and gets a randomly generated link
    * Expiration
        * Default setting does not expire
        * Can optionally set a timed expiration
* **User** enters a paste's url and views the contents
* **User** is anonymous
* **Service** tracks analytics of pages
    * Monthly visit stats
* **Service** deletes expired pastes
* **Service** has high availability

#### Out of scope  
* **User** registers for an account
    * **User** verifies email
* **User** logs into a registered account
    * **User** edits the document
* **User** can set visibility
* **User** can set the shortlink

### Backend Explained  
I'm using express as the webserver to create /post route where all the data will be Posted / Fetched from and I'm using Mongoose ODM to interact with the my Mongodb. There are two services api and a clean up service.

#### API Service
The api services serves the route used for creating and reteriving the posts from the database. The api serivce create two collections in the database(`Pastebin`), `posts` & `expiredPosts`. The `posts` collection stores all posts and the `expiredPosts` contains the `id(STRING)` and the `expiresOn(DATE)`. This makes the post removal faster because when querying for expired posts the we only need to search the `expiredPosts` collection which contains fewer documents/objects compared to the `posts` collection. Explained in the clean up service section how it works. 

##### Models
```Javascript
// Collection: posts
title: {
    type: String,
    required: true
},
message: {
    type: String,
    required: true
},
uri: {
    type: String,
    required: true
},
expiresIn: {
    type: Number,
    default: 0, // 0 = never expire && >0 = expires in x seconds
    required: true
},
visits: {
    type: Number,
    default: 0,
    required: true
},
lastUpdated: {
    type: Date,
    default: Date.now,
    required: true
},
dateCreated: {
    type: Date,
    default: Date.now,
    required: true
}
```

```Javascript
// Collection: expiredPosts
uri: {
    type: String,
    required: true
},
expiresOn: {
    type: String,
    required: true
}
```

##### Routes
###### GET /create
Describes the purpose of the route.  

###### GET /create/:id
Fetch a given post by **id**. The a query is made to the database by **id** if the **id** is found the expiry of the post is also checked. Incase the post cleanup service is not able to remove the post before its accessed - Backup check. If the post is expired the post is removed from the database & and a post expired error is returned.

###### POST /create
Save a post to which can be retrieved by its **id**. A user can create a post as using the following fields:
- `title(STRING)` - Title of the post
- `message(STRING)` - Message/body of the post
- `expiresIn(Number)` - Number of seconds after which the post expires

#### Clean up Service
The purpose of the clean up service is to run every 60 seconds as a cron job and remove all expired posts. This querying of the expired posts is done through a query which utilized the `lte` operator to search by dates(ISO) before the current date. This allows the service to query `expiredPosts` collection a lot faster compared to the `posts` collection because the number of documents/objects is fewer. 

#### Deployment
I've choose Google Kubernetes Engine to my platform of choice to deploy my services because of the simplicity of deployment compared to AWS ECR & EKS/ECS. No need for writing `yml` files for kubernete as you can configure everything you need through the UI and the images get updated as the newer versions of the images are uploaded the `GCR` or Google Container Registery. 

#### CI/CD
I've setup a Github Action `Build and Deploy to GKE` which builds the images and publishes them to GCR. See [.github.com/workflows/gke_deployment.yaml](https://github.com/M-Faheem-Khan/System-Design-Pastebin/blob/main/.github/workflows/gke_deployment.yaml)

![Overview_ Pastebin](https://user-images.githubusercontent.com/17150767/184065447-ec690ba6-7a39-4b80-b725-8204694cc4d6.jpg)
![Overview_ Pastebin (1)](https://user-images.githubusercontent.com/17150767/184071641-8206e507-a053-4c37-b72e-5adbf662c64d.jpg)
