pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')  // Add this in Jenkins credentials
        IMAGE_BACKEND = "prashantbokade08/backend"
        IMAGE_FRONTEND = "prashantbokade08/frontend"
        K8S_DIR = "k8s"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/prashantbokade08/todo-app.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${IMAGE_BACKEND}:latest ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${IMAGE_FRONTEND}:latest ."
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
                    sh "docker push ${IMAGE_BACKEND}:latest"
                    sh "docker push ${IMAGE_FRONTEND}:latest"
                }
            }
        }

        stage('Apply Kubernetes YAMLs') {
            steps {
                sh """
                    kubectl apply -f ${K8S_DIR}/namespace.yaml
                    kubectl apply -f ${K8S_DIR}/mongo-deployment.yaml
                    kubectl apply -f ${K8S_DIR}/backend-deployment.yaml
                    kubectl apply -f ${K8S_DIR}/frontend-deployment.yaml
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh "kubectl get all -n todo-app"
            }
        }
    }
}
