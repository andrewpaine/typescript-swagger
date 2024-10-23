/**
* Creates a mapping between a fragment of the requested path and
* a method argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ GET
*   @ Path(':id')
*   getPerson(@ PathParam('id') id: string) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests like:
*
* ```
* GET http://mydomain/people/123
* ```
*
* And pass 123 as the id argument on getPerson method's call.
*/
export declare function PathParam(name: string): any;
/**
* Creates a mapping between a file on a multipart request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ POST
*   @ Path('id')
*   addAvatar(@ PathParam('id') id: string,
*             @ FileParam('avatar') file: Express.Multer.File) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests and bind the
* file with name 'avatar' on the requested form to the file
* argument on addAvatar method's call.
*/
export declare function FileParam(name: string): any;
/**
* Creates a mapping between a list of files on a multipart request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ POST
*   @ Path('id')
*   addAvatar(@ PathParam('id') id: string,
*             @ FilesParam('avatar[]') files: Array<Express.Multer.File>) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests and bind the
* files with name 'avatar' on the request form to the file
* argument on addAvatar method's call.
*/
export declare function FilesParam(name: string): any;
/**
* Creates a mapping between a query parameter on request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ GET
*   getPeople(@ QueryParam('name') name: string) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests like:
*
* ```
* GET http://mydomain/people?name=joe
* ```
*
* And pass 'joe' as the name argument on getPerson method's call.
*/
export declare function QueryParam(name: string): any;
/**
* Creates a mapping between a header on request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ GET
*   getPeople(@ HeaderParam('header') header: string) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests and bind the
* header called 'header' to the header argument on getPerson method's call.
*/
export declare function HeaderParam(name: string): any;
/**
* Creates a mapping between a cookie on request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ GET
*   getPeople(@ CookieParam('cookie') cookie: string) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests and bind the
* cookie called 'cookie' to the cookie argument on getPerson method's call.
*/
export declare function CookieParam(name: string): any;
/**
* Creates a mapping between a form parameter on request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ GET
*   getPeople(@ FormParam('name') name: string) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests and bind the
* request paramenter called 'name' to the name argument on getPerson
* method's call.
*/
export declare function FormParam(name: string): any;
/**
* Creates a mapping between a parameter on request and a method
* argument.
*
* For example:
*
* ```
* @ Path('people')
* class PeopleService {
*   @ GET
*   getPeople(@ Param('name') name: string) {
*      // ...
*   }
* }
* ```
*
* Will create a service that listen for requests and bind the
* request paramenter called 'name' to the name argument on getPerson
* method's call. It will work to query parameters or form parameters
* received in the current request.
*/
export declare function Param(name: string): any;
