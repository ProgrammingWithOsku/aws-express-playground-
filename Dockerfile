# Step 1: Use the official Node.js image from Docker Hub
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that the app will run on
EXPOSE 4000

# Step 7: Set the environment variables (optional)
ENV PORT=4000

# Step 8: Start the application
CMD ["npm", "start"]