# Flow OAuth

## Entity

- USER: person who have credential (email, password,...)

- CLIENT: front end web page
- SERVER: back end server

- GG_SERVER_AUTH: google server that authenticate (give id to request token)
- GG_SERVER_TOKEN: google server that provide token (access, refresh)
- GG_SERVER_API: google server that provide service (user info, drive, calender, ...)

## Flow

![Authentication Flow](/flow.png "Authentication flow")

- **Step 1**: USER redirect (with query value from google console) CLIENT to GG_SERVER_AUTH
- **Step 2**: GG_SERVER_AUTH give authentication code to SERVER
- **Step 3**: SERVER give authentication code to GG_SERVER_TOKEN to exchange for token
- **Step 4**: GG_SERVER_TOKEN send token to SERVER
- **Step 5**:
  - SERVER use token to access GG_SERVER_API (get user info, use drive, calender,...)
  - SERVER redirect (with token) CLIENT
  - ......

## Ref

- https://developers.google.com/identity/protocols/oauth2
- https://developers.google.com/identity/protocols/oauth2/web-server
