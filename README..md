# Architecture

## Backend

The backend workflow consist of the following steps in the section below. All needed for API testing is on a file called `thunder-collection*`

You can import that on postman or use the Thunder Client extension on VS Code

Domain modeling is done with Prisma.

How to run:

- Create `.aws.env` file with at the root project:
 ```.env
  AWS_ACCESS_KEY_ID="xxxxxxxxxxxxx"
  AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxx"
  AWS_REGION="us-west-2"
  COGNITO_API_VERSION="2016-04-18"
  GIMWORK_COGNITO_POOL_ID="xxxxxxxxxxxx"
  GIMWORK_COGNITO_POOL_CLIENT_ID="xxxxxxxxxxxxxxxx"
 ```
-  Create another `.env` file, for prisma:
  ```
  DATABASE_URL="mongodb+srv://user:password@mongocluster.net/gimwork?retryWrites=true&w=majority"
  ```

- `npm i`
- `npm start`

Seeding is missing (lack of time...)

### Overview

- Human ->  POST/users/signup -> New user created!
- User -> POST/users/login -> Authenticated user! Yet to be confirmed (it uses AWS Cognito under the hood, returns a JWT), creates a new user in the MongoDB Atlas Cluster. Sends a confirmation email with a token (i.e 657847)
- User -> Token -> POST/users/confirm -> Confirmed user!

From now on every request must have an auth jwt token in the headers ("Bearer xxxxxxxxxxxx...")

#### User endpoints

- User -> GET/users/{userId} -> Returns User(i.e to populate the profile)
- User -> PATCH/users/{userId} -> Returns the patched user
- User -> DELETE/users/{userId} -> Deletes the user

- User -> GET/users/{userId}/wishlist -> Retrieves wishlisted items
- User -> PUT/users/{userId}/wishlist -> Updates the wishlist, creates a new one if its the first time (this could obviously be changed, when creating a user a default empty wishlist could be created. Didn't realize that until later)
- User -> DELETE/users/{userId}/wishlist -> Deletes items from the wishlist

#### Offer endpoints

- User -> GET/offers -> Get offers (i.e accepts queries such as       minPrice,      maxPrice,      category,      minDate,      maxDate,      userId,      limit,      skip,)
- User -> POST/offers -> New offer
- User -> PATCH/offer/{offerId} -> Patched offer
- User -> DELETE/offer/{offerId} -> Deleted offer

## Frontend

Incomplete...
- `npm i`

To display in web
- `npm run web`

To display on phone
- `npm start`

Download expo and scan the QR Code. This is obviously a dev build. Final packagin was not done due to a lack of time...
