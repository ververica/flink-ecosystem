# Proposal for ecosystem website api.

## API's

---

### Package List

We could have some specifc string matching for categories and tags in the query if thats what the user is searching for to maybe speed things up. `cat:<category>` and `tag:<string>`.

- GET `/api/v1/packages?query=:string&page=:number`
  ```
    items: [<package>]
  ```

### Package

- GET `/api/v1/package/:package`
  ```
  data: {
    package: <package>
    comments: [<comment>]
    releases: [<release>]
    tags: [<tag>]
  }
  ```
- POST `/api/v1/package`
  ```
  data: {
    package: <package>
    releases: [<release>]
    tags: [<tag>]
  }
  ```
- PATCH `/api/v1/package/:package`
  ```
  data: {
    package: <package>
    release: [<release>] // updated array to remove a release
    tags: [<tag>] // updated array to remove or add tags
  ```

### Tags

- GET `/api/v1/tags`
  ```
  items: [<tag>]
  ```

### Release

- POST `/api/v1/release`
  ```
  data {
    packageName,
    release: <release>
  }
  ```
- PATCH `/api/v1/release/:id`
  ```
  data: <release>
  ```
- DELETE `/apk/v1/release/:id`

### Comments

- POST `/api/v1/comment`
  ```
  data {
    packageName,
    comment: <comment>
  }
  ```
- PATCH `/api/v1/comment/:id`
  ```
  {
    data: <comment>
  }
  ```
- DELETE `/api/v1/comment/:id`
