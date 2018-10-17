REACTIFY THEME


LOCAL DEVELOPMENT

React components and build tools are located in 'react' folder.
Enter 'react' folder and install node modules necessary for theme
and development by running 'npm i'.

Theme uses Webpack for development and build processes.
There are 2 webpack configuration files for development and
 production build.

For development run 'npm run dev' and theme will be available on
the address 'http://localhost:8080' with hot reloading enabled.
It uses webpack.dev.config.js

For building run 'npm run build' and it will use
webpack.prod.config.js. Created files are called
bundle.js and bundle.css and files will be placed to 'build'
folder in theme root. Theme's libraries.yml file defines
created files as theme's assets.

Reactify uses 'reactify_utilities' module for creation of theme settings,
REST endpoints and authentication.

Even though Drupal 8 provides good foundation for REST services,
some features still were added.
Module can serve as example for building custom functionality.


THEME STRUCTURE

Compiled React app is located in 'build' folder and is attached as a library
in theme info.yml file
App's source code lives in 'src' folder and structured in various folders
for further maintainability.

The theme uses Redux for state management and React router for routing.
Theme was designed as single page app, though it excludes paths to
'/user*' and '/admin*' sections for accessing Drupal backend.
This is relevant for projects using theme on the same domain as Drupal's
backend.

It can be used as well on another domains. In that case it would need only
'build' folder and some .html file for mounting app.
Also, backend's url should be specified in 'src/config.js' file for
REST requests to backend.
By default there is empty string and, thus, theme requests endpoints on the
same domain.

Reactify has public and protected areas. Protected area is available after
signing in on /dashboard* urls.

Reactify has multilingual support for theme enerface. Backend REST endpoints
should be configured separately.
