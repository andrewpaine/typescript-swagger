This has been forked from typescript-rest-swagger with the following changes by me:
- updated typescript version to 5.8.3
- added support for Intersection and reference types
- Remove dependency on typescript-rest project
- Fixed security handling
- Allow decorators to have values defined in local constants as well as string literals
- Added support for Unknown keyword


The goal is for this to be a dev dependency that runs at compile time to build OpenAPI documentation for an annotated API.
There should be no dependency on Express or any implementation details about how the requests are served.

To use:
Build with `npm run build`
run `npm link` in this folder
run `npm link typescript-swagger` in the target folder
Add a script with `"swagger": "npx typescript-swagger -c swaggerConfig.json"` or similar in your linked project where you want the documentation

May need to make the binary executable: `chmod +x dist/cli.js`

