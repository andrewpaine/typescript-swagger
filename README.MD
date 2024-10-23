# Swagger Documentation Generator for Typescript Project

This project is a fork version [thiagobustamante/typescript-rest-swagger](https://github.com/thiagobustamante/typescript-rest-swagger)

It also includes some of the decorator definitions declared in [thiagobustamante/typescript-rest](https://github.com/thiagobustamante/typescript-rest) - see 
`src/decorators` folder


The goal of this repo for this to be a dev dependency that runs at compile time to build OpenAPI documentation for an annotated API with no runtime dependency on Express or any implementation details about how the API is delivered.

Specific changes include:
- updated typescript version to 5.8.3
- added support for Intersection and reference types
- Remove dependency on typescript-rest project
- Fixed security handling
- Allow decorators to have values defined in local constants as well as string literals
- Added support for Unknown keyword
- Removed default annotation of numbers as "Double" 
- Added support for Tuple types
