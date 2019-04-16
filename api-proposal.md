# Proposal for ecosystem website api.

## API's

---

### Package List

these 3 return a list of packages, they would all use the same schema.

- GET `/api/v1/packages`
- GET `/api/v1/categories/:category`
- GET `/api/v1/search?query=:query`
  ```
    items: [<package|quick>]
  ```

### Package

- GET `/api/v1/package/:package`
  ```
  data: <package>
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
