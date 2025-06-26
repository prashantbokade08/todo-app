pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')  // Add DockerHub creds in Jenkins
        IMAGE_BACKEND = "prashantbokade08/backend"
        IMAGE_FRONTEND = "prashantbokade08/frontend"
        K8S_DIR = "k8s"
        KUBECONFIG = "${HOME}/.kube/config"
    }

    stages {

        stage('Clone GitHub Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/prashantbokade08/todo-app.git'
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh "docker build -t ${IMAGE_BACKEND}:latest ."
                        }
                    }
                }

                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh "docker build -t ${IMAGE_FRONTEND}:latest ."
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
                    sh "docker push ${IMAGE_BACKEND}:latest"
                    sh "docker push ${IMAGE_FRONTEND}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    echo "Deploying to Kubernetes..."
                    kubectl apply --validate=false -f ${K8S_DIR}/namespace.yaml
                    kubectl apply --validate=false -f ${K8S_DIR}/mongo-deployment.yaml
                    kubectl apply --validate=false -f ${K8S_DIR}/backend-deployment.yaml
                    kubectl apply --validate=false -f ${K8S_DIR}/frontend-deployment.yaml
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh "kubectl get pods -n todo-app"
                sh "kubectl get svc -n todo-app"
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed. Check logs above for errors."
        }
        success {
            echo "TODO App deployed successfully to Kubernetes!"
        }
    }
}
