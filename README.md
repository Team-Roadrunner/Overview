# System Design & Scaling | Forever 32

Forever 32 is an e-commerce clothing website. For this project I inherited front-end work and was assigned to building an optimized back-end that is able to handle high web traffic (minimum requirement: 100 RPS with low latency <2000ms and <1% error rate). I worked with three other engineers, each of us focusing on a different component. I was assigned to Product Overview. 

## Achievements/Optimizations

* Stess tested locally between MongoDB and PostgreSQL to see which program would be faster for the queries of my component.
   * _Result: PostgreSQL was 10ms faster than MongoDB._ 
* Seeded a PostgreSQL database with over 2 million records and consolidating three tables to optimize the queries. 
* Implemented horizontally scaling by making 4 AWS EC2 instances and adding Nginx load balancer (least conn) which resulted in increasing the server to handle 1000 clients per second to 10k clients per second. 

## Technologies/Tools
* ReactJS
* Node.JS
* Express
* PostgreSQL
* AWS EC2
* Loader.io
* New Relic
* K6
* Nginx

## Image of the Front-End
The image's data below is being generated by the my database records. <br/>
<img width="1000" src="https://media.giphy.com/media/FHoK7xpxAkge9Qbmen/giphy.gif" />

## Developement 
``` 
npm install
``` 
```
npm run build
```
```
npm run start
```
