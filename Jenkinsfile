pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'himanshusaini99/devopsproject'  // Your Docker Hub username/repo
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials') // Add Docker Hub credentials in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Himanshusaini99/devopsproject.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                bat '''
                echo Stopping and removing any existing container...
                docker stop devopsproject || echo "No container to stop"
                docker rm devopsproject || echo "No container to remove"
                
                echo Starting new container...
                docker run -d -p 9090:80 --name devopsproject %DOCKER_IMAGE%:%BUILD_NUMBER%
                
                echo Deployment complete!
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()  // Clean workspace after build
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}