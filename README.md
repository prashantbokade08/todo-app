sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

docker images

minikube start

docker network ls
docker volume ls
docker network rm my-custom-net
docker ps --filter network=my-custom-net
docker rm -f <container_id>

docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume prune -f
docker network prune -f
eval $(minikube docker-env)
docker build -t backend ./backend
docker build -t frontend ./frontend

kubectl config use-context minikube
minikube delete
minikube start --driver=docker

minikube start --driver=docker
minikube status

eval $(minikube docker-env)
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

kubectl delete deployment frontend backend
docker build -t backend ./backend
docker build -t frontend ./frontend
eval $(minikube docker-env)
kubectl get pods
kubectl get all

kubectl delete pod -l app=frontend
kubectl delete pod -l app=backend
kubectl delete deployment frontend
kubectl delete deployment backend

kubectl get services
minikube service frontend-service

kubectl delete deployment --all
kubectl delete pod --all
kubectl delete service backend-service frontend-service mongo-service

kubectl delete deployment --all
kubectl get svc --no-headers | awk '!/kubernetes/ {print $1}' | xargs kubectl delete svc
kubectl delete pod --all

docker login
docker build -t backend ./backend
docker build -t frontend ./frontend
docker build -t prashantbokade08/frontend ./frontend
docker build -t prashantbokade08/backend ./backend
docker push prashantbokade08/frontend
docker push prashantbokade08/backend
image: prashantbokade08/frontend
image: prashantbokade08/backend

kubectl delete -f k8s/mongo-deployment.yaml
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/frontend-deployment.yaml

cd backend
docker build -t prashantbokade08/todo-backend .

cd ../frontend
docker build -t prashantbokade08/todo-frontend .

# Login to Docker Hub

docker login

# Push

docker push prashantbokade08/todo-backend:latest
docker push prashantbokade08/todo-frontend:latest

minikube start
minikube status

# Use docker driver inside minikube

eval $(minikube -p minikube docker-env)

kubectl apply -f k8s/namespace.yaml

kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

minikube service frontend-service -n mern-app

kubectl get all -n mern-app

kubectl delete -f .
