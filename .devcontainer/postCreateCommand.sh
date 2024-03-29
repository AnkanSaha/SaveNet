#!/bin/bash

sudo apt-get update -y # Update apt-get cache
sudo apt-get install -y neofetch # Install curl

# Install Builder Dependencies
npm install --force # Install dependencies
npm run buildcss # Build project

# Setup Docker Containers
docker-compose up -d # Start Docker Containers in detached mode mention  in docker-compose.yml