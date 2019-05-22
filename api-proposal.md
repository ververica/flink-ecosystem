# Proposal for Ecosystem Website API

## API's

---

### Error handling

On error, each endpoint returns a HTTP status code 500, and the following body
```javascript
data: {
  error: string // containing an error message to be displayed in the UI
}
```

### Authentication

An authenticated user is authenticated against GitHub.
An authenticated administrator is defined by a set of GitHub usernames in the configuration of the backend.

### Endpoints

#### Package

- **Schema**

  ```javascript
  <package> {
    id: string // a unique, immutable string identifiying this package. allowed: [a-z-_]{2,}
    name: string // human readable name
    description: string 
    readme: string // user can enter a markdown description
    image: blob // blob limited to 15kb for hosting a package image.
    website: string
    repository: string
    license: string
    commentsCount: number
    upvotes: number
    downvotes: number
    tags: string[] // tags are created automatically if they don't exist yet. Only [a-z-_]{2,} is allowed for tags.
    added: datetime
    updated: datetime
    owner: string // github username
  }

  ```

- **Get a package by id**

  GET `/api/v1/packages/:package`
  ```javascript
  data: {
    package: <package>
  }
  ```
  
  
- **Get packages by search query**
  
  GET `/api/v1/packages?query=:queryString&page=:number&order=:order&direction=:dir`
  ```javascript
  data: {
    package: [<package>] // array of packages matching the queryString
    resultCount: <number> // total number of search query results
  }
  ```
  * The `:queryString` supports a special syntax for selecting packages based on a tag: `tag:<string>`. No (or an empty query string) returns all packages.
  * The `:order` parameter supports: `upvotes`, `comments`, `added`, `updated`.
  * The `:dir` parameter supports: `asc`, `desc`.
  * The call returns at most 30 packages per call. Additional packages need to be retrieved by going through the `page`s. `page`s are 1-indexed (1 is the 1st page, 2 is the 2nd page and so on)
    
- **Create a new package**
  POST `/api/v1/packages`
  ```
  data: <package>
  ```
  Access to this endpoint is restricted to authenticated users.
  
  The authenticated user will be put into the `owner` field.

- **Upvote a package**

  POST `/api/v1/packages/:package/upvote`

  Note: The system must keep an internal list of users who have up- or down-voted a package, to avoid duplicate voting.

  Access to this endpoint is restricted to authenticated users.

- **Downvote a package**

  POST `/api/v1/packages/:package/downvote`

  Access to this endpoint is restricted to authenticated users.


  
- **Change a package by id**

  PATCH `/api/v1/packages/:package`
  ```
  data: <package>
  ```

  Only the following fields are editable: name, description, readme, image, website, repository, license, tags.

  On an update, the `updated` field is set to the current date.
  
  Access to this endpoint is restricted to authenticated administrators or the user who created the package.

- **Delete a package by id**

  DELETE `/api/v1/packages/:package`

  Access to this endpoint is restricted to authenticated administrators.

#### Package Comments endpoint

- **Schema**

  ```
  <comment> {
    id: number
    username: string // github username
    text: string // markdown
    added: datetime
  }
  ```

- GET `/api/v1/packages/:package/comments?page=:number`
  ```
  data: [<comment>] // array of comments
  resultCount: <number> // total number of comments
  ```
  
- POST `/api/v1/packages/:package/comments`
  ```
  data: <comment>
  ```
 
  Access to this endpoint is restricted to authenticated users.
 
- PATCH `/api/v1/packages/:package/comments/:id`
  ```
  data: <comment>
  ```
  Access to this endpoint is restricted to authenticated administrators or the user who created the package.
 
- DELETE `/api/v1/packages/:package/comments/:id`

  Access to this endpoint is restricted to authenticated administrators or the user who created the package.

#### Package Releases

- **Schema**

  ```
  <release> {
    id: number
    number: string //(semver probably)
    description: string
    download_url: string
    added: datetime
  }
  ```

- GET `/api/v1/packages/:package/releases?page=:number`
  ```
  data: [<release>] // (x10)
  ```
- POST `/api/v1/packages/:package/releases`
  ```
  data: <release>
  ```
  
  Access to this endpoint is restricted to the user who created the package.
 
- PATCH `/api/v1/packages/:package/releases/:id`
  ```
  data: <release>
  ```
  Access to this endpoint is restricted to the user who created the package or administrators.

- DELETE `/apk/v1/packages/:package/releases/:id`
  Access to this endpoint is restricted to the user who created the package or administrators.

---

#### Tags

Return a list of all tags for autocomplete for search.

- GET `/api/v1/tags`
  ```
  items: [<tag>]
  ```

---

#### User

Returns information about the currently signed-in user.

- GET `/api/v1/user`
  ```
  {
    username: string // github username
    avatarURL: string // string with an image URL pointing to the GitHub avatar
  }
  ```

  If the user is not authenticated, the server returns a 405 error code.