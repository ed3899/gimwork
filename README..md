# Architecture

## Backend

The backend workflow consist of the following steps in the section below. All needed for API testing is on a file called `thunder-collection*`

You can import that on postman or use the Thunder Client extension on VS Code

Domain modeling is done with Prisma.

How to run:
`npm i`
`npm start`

Seeding is missing (lack of time...)

### Overview

Human ->  POST/users/signup -> New user created!
User -> POST/users/login -> Authenticated user! (it uses AWS Cognito under the hood, returns a JWT), creates a new user in the MongoDB Atlas Cluster

From now on every request must have an auth token in the headers ("Bearer xxxxxxxxxxxx...")

#### User endpoints

User -> GET/users/{userId} -> Returns User(i.e to populate the profile)
User -> PATCH/users/{userId} -> Returns the patched user
User -> DELETE/users/{userId} -> Deletes the user

User -> GET/users/{userId}/wishlist -> Retrieves wishlisted items
User -> PUT/users/{userId}/wishlist -> Updates the wishlist, creates a new one if its the first time (this could obviously be changed, when creating a user a default empty wishlist could be created. Didn't realize that until later)
User -> DELETE/users/{userId}/wishlist -> Deletes items from the wishlist

#### Offer endpoints

User -> GET/offers -> Get offers (i.e accepts queries such as       minPrice,      maxPrice,      category,      minDate,      maxDate,      userId,      limit,      skip,)
User -> POST/offers -> New offer
User -> PATCH/offer/{offerId} -> Patched offer
User -> DELETE/offer/{offerId} -> Deleted offer

## Frontend

Incomplete...
`npm i`

To display in web
`npm run web`

To display on phone
`npm start`

Download expo and scan the QR Code. This is obviously a dev build. Final packagin was not done due to a lack of time...
