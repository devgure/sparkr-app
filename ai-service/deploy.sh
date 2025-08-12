#!/bin/bash

# Production deployment script for Sparkr on Ubuntu

echo "Starting Sparkr deployment..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Clone repository
git clone https://github.com/your-org/sparkr-app.git
cd sparkr-app

# Set environment variables
cp .env.example .env
# Edit .env with your production values
nano .env

# Run database migrations
npx prisma migrate dev --name init
npx prisma db seed

# Start all services
sudo docker-compose up -d --build

echo "Sparkr deployment completed!"
echo "Access the app at http://localhost:3002"
echo "Admin panel at http://localhost:3001"
echo "API docs at http://localhost:3000/api-docs"