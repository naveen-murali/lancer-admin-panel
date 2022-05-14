# Lancer Admin Panel

-   Admin panal for [**Lancer**](https://github.com/naveen-murali/lancer-admin-panel.git) a freelancers platform.

##### Technologies Used:

-   <b>NodeJS</b> (v16.14.2)
-   <b>ExpressJS</b> (v4.17.3)
-   <b>ReactJS</b> (v17.0.2)
-   <b>Yarn</b> (v1.22.18)
-   <b>Socket.io</b> (v4.4.1)
-   <b>Redux Toolkit</b> (v1.5.1)

##### Hosting:

-   <b>AWS EC2</b>
-   <b>Nginx</b>

<br>

**API**

Website : [`https://lancer.unityshop.shop`](https://lancer.unityshop.shop)<br>
Source Code: [`https://github.com/naveen-murali/lancer.git`](https://github.com/naveen-murali/lancer.git)

<br>

**Admin Panal**

Website : [`https://lancer-admin.unityshop.shop`](https://lancer-admin.unityshop.shop)<br>
Source Code : [`https://github.com/naveen-murali/lancer-admin-panel.git`](https://github.com/naveen-murali/lancer-admin-panel.git)<br>

<br>

![MarineGEO circle logo](/public/assets/readme-imge.png "MarineGEO logo")

---

## **Requirements**

For running Lancer, you will only need [**Docker**](https://docs.docker.com/engine/install/) and [**Docker Compose**](https://docs.docker.com/compose/install/) or [**Nodejs**](https://nodejs.org/en/) (_make sure that the nodejs version is 16.14.2_) installed.

**Clone Repository**

    $ git clone https://github.com/naveen-murali/lancer.git
    $ cd lancer

<br>

## **Running the project**

Running the application without docker<br>

**For Development**

    $ yarn start

<br>

Running the application with docker

**For Production**

    $ docker-compose -f docker-compose-dev.yml up

**For Production**

    $ docker-compose up -d

---
