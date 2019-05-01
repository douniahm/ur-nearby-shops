# Web Coding Challenge
A Restful application that lists nearby shops. The application is split between:
  - **front-end** : as a single page application using Angular
  - **back-end** : as a JEE application using Spring Boot
 
## Implemented Functionnalities
* As a User, I can sign up using my login & password
* As a User, I can sign in using my login & password
* As a User, I can display the list of shops ordred by distance
* As a User, I can like a shop, so it can be added to my preferred shops
* Liked shops will not be displayed on the main page
* As a User, I can dislike a shop, so it won’t be displayed on the main page(by storing them in local storage) untill the next connection
* As a User, I can display the list of preferred shops
* As a User, I can remove a shop from my preferred shops list by unliking or desliking it

## Running The Application
* In MySql, create a database named: **ur_nearbyshops**
* Download and unzip, or clone the app using Git:
'''
git clone https://github.com/douniahm/ur-nearby-shops
'''
### Spring Boot
* Import Backend using an IDE, for Eclipse:
'''
file -> import -> maven existing project
'''
Then Execute as Spring Boot App
* In MySql,in shop table, import **shop.sql** from [here](shop.sql)

### Angular 
'''
cd FrontEnd
npm install 
ng build
ng build --prod
ng serve
'''

## Built With
- Spring Boot1.5, Java 1.8
- Angular 7
- MySql
- VSCode
- Eclipse IDE 


