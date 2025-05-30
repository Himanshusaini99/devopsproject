pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'himanshusaini99/devopsproject'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm  
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
            
                    def dockerVersion = bat(script: 'docker --version', returnStdout: true).trim()
                    echo "Docker Version: ${dockerVersion}"
                    
                    
                    bat """
                    docker build -t ${DOCKER_IMAGE}:${env.BUILD_NUMBER} .
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    bat """
                    echo Stopping existing container...
                    docker stop devopsproject || echo "No container to stop"
                    docker rm devopsproject || echo "No container to remove"
                    
                    echo Starting new container...
                    docker run -d -p 9090:80 --name devopsproject ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}