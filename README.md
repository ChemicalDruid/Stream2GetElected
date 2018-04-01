# Get Yourself Elected

Stream 2 project for Code Institute course 

## About
A data-driven frontend and backend website using the technologies that I have learned throughout Streams 1 and 2 of my Code Institute course on full-stack development.

I pretend to run for Governor of a US state. As part of my campaign, I use a dataset taken from DonorsChoose.org, a US-based public charity providing a platform for fundraising for schools. The data is presented to the user in the form of an interactive dashboard containing a variety of charts. 

## Technologies
**[Flask](http://flask.pocoo.org/)** - Micro-framework for Python applications.

**[MongoDB](https://www.mongodb.com/)** - Document-oriented (NoSQL) database using JSON-like documents.

**[dc.js](https://github.com/dc-js/dc.js/wiki)** - Multi-dimensional charting library built to work natively with crossfilter and using d3.js for rendering.

**[d3.js](https://d3js.org/)** - JavaScript library for manipulating documents based on data.

**[d3-queue](https://github.com/d3/d3-queue)** - Lightweight asynchronous helper library used to load the donation data from the database and the GeoJSON data from a local file.

**[Crossfilter](https://square.github.io/crossfilter/)** - JavaScript library for exploring large multivariate datasets in the browser. Crossfilter enables easy manipulation of the data so that applied filters can be readily shown across all charts.

**[Bootstrap](http://getbootstrap.com/)** provides a responsive framework to the application. This was enhanced with media queries and additional code to resize some of the dc.js charts, which are not natively responsive.

**[Dashboards by keen IO](https://keen.github.io/dashboards/)** - Responsive dashboard templates for Bootstrap.

**[Intro.js](http://introjs.com/)** - Used to provide a step-by step guide to the application.

## dc.js Charts

### Total Number of Donations
Simple number display

### Total Donations in USD
Simple number display

### Number of Donations over time
Vertical bar chart

### Poverty Level
Horizontal bar chart

### Resources Type
Horizontal bar chart

### Area
Pie chart

### Funding Status
Donut chart

### Primary Focus Subject
Pie chart

### Grade Range
Donut chart

## Testing

Manually tested for responsiveness and compatibility against various configurations.

## Hosting
The application is deployed on the [Heroku](https://.heroku.com) PAAS (platform as a service) platform using a free dyno and a MongoDB add-on. Config variables are utilised in the Flask framework to automatically switch the application between local development and production modes.
