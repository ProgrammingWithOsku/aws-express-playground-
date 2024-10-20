# Express.js Quiz Playground

This is a playground created by Osku to demonstrate deploying a Node.js and Express.js app to AWS Elastic Beanstalk. The app includes a basic quiz powered by a PostgreSQL database and is fully Dockerized for local development and deployment.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Deploying to Elastic Beanstalk](#deploying-to-elastic-beanstalk)
- [Environment Variables](#environment-variables)

---

## Prerequisites
Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v14+ recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/download/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
- [Docker](https://docs.docker.com/get-docker/) (for Dockerized development)
- [Git](https://git-scm.com/)

---

## Project Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/osku/express-playground.git
   cd express-playground

	2.	Install dependencies:
Run the following command to install all the required packages:

npm install


	3.	Set up environment variables:
Create a .env file in the root of your project with the following content:

DATABASE_URL=your_postgresql_connection_string
PORT=4000

Replace your_postgresql_connection_string with the actual PostgreSQL connection string.

Database Setup

	1.	Install PostgreSQL:
Follow the official guide to install PostgreSQL: PostgreSQL Installation Guide.
	2.	Create a PostgreSQL database:
Connect to PostgreSQL and create a new database:

psql -U postgres -h localhost

Once inside the PostgreSQL shell:

CREATE DATABASE myappdb;


	3.	Create tables and seed data:
Run the following SQL commands to create the questions table and insert sample data:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL
);

INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer) VALUES
('What does the "A" in AWS stand for?', 'Amazon', 'Apple', 'Azure', 'Alibaba', 'A'),
('Which AWS service is used for object storage?', 'RDS', 'S3', 'EC2', 'Lambda', 'B');



Running Locally

To run the application locally, follow these steps:

	1.	Start the application:
Use nodemon to automatically restart the server when code changes:

npm run dev


	2.	Access the application:
Open your browser and go to http://localhost:4000.

Running with Docker

If you prefer to run the application using Docker, follow these steps:

	1.	Build the Docker image:
Build the Docker image for the application:

docker build -t express-playground .


	2.	Run the Docker container:
Run the application in a Docker container:

docker run -p 4000:4000 express-playground

The application will now be accessible at http://localhost:4000.

Using Docker Compose (Optional)

If you want to run both the Express app and PostgreSQL in a Dockerized environment, you can use Docker Compose:

	1.	Create a docker-compose.yml:
Ensure your docker-compose.yml contains the following:

version: '3'
services:
  web:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/myappdb
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myappdb
    ports:
      - "5432:5432"


	2.	Start the services:
Use Docker Compose to start both services (the Express app and PostgreSQL database):

docker-compose up


	3.	Access the application:
The application will be available at http://localhost:4000.

Deploying to Elastic Beanstalk

To deploy the application to AWS Elastic Beanstalk, follow these steps:

	1.	Initialize Elastic Beanstalk:

eb init -p node.js --region eu-north-1

	•	Choose your application name or leave it as default.
	•	Select a region (use eu-north-1 or change to your desired region).
	•	Configure your Elastic Beanstalk environment.

	2.	Create an environment:
Create a new Elastic Beanstalk environment for your application:

eb create my-express-env


	3.	Deploy the application:
Deploy your application using:

eb deploy


	4.	Set environment variables:
Set the DATABASE_URL environment variable for Elastic Beanstalk:

eb setenv DATABASE_URL=your_postgresql_connection_string

Alternatively, you can set environment variables via the AWS Management Console.

	5.	Access your app:
After deployment, you can access the app via the Elastic Beanstalk-provided URL (e.g., http://my-express-env.eu-north-1.elasticbeanstalk.com).

Environment Variables

	•	DATABASE_URL: The connection string for your PostgreSQL database.
	•	PORT: The port number for the application (default is 4000).
