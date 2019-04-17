# Proposal for ecosystem website api.

## API's

---

### Package List

We could have some specifc string matching for categories and tags in the query if thats what the user is searching for to maybe speed things up. `cat:<category>` and `tag:<string>`.

- GET `/api/v1/packages?query=:string&page=:number`
  ```
    items: [<package>]
  ```

---

### Package

- GET `/api/v1/package/:package`
  ```
  data: {
    package: <package>
    comments: [<comment>] // first 50(?) comments
    releases: [<release>] // first 10(?) releases
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
    tags: [<tag>] // updated array to remove or add tags
  ```

#### Package Comments

- GET `/api/v1/package/:package/comments?page=:number`
  ```
  data: [<comment>] // (x50)
  ```
- POST `/api/v1/package/:package/comments`
  ```
  data: <comment>
  ```
- PATCH `/api/v1/package/:package/comments/:id`
  ```
  data: <comment>
  ```
- DELETE `/api/v1/package/:package/comments/:id`

#### Package Releases

- GET `/api/v1/package/:package/releases?page=:number`
  ```
  data: [<release>] // (x10)
  ```
- POST `/api/v1/package/:package/releases`
  ```
  data: <release>
  ```
- PATCH `/api/v1/package/:package/releases/:id`
  ```
  data: <release>
  ```
- DELETE `/apk/v1/package/:package/releases/:id`

---

### Tags

Return a list of all tags for autocomplete for search.

- GET `/api/v1/tags`
  ```
  items: [<tag>]
  ```
