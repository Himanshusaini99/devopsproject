pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'himanshusaini99/devopsproject'
        // Remove credentials from here if not properly configured
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
                    // Check if Docker is available
                    try {
                        docker.version()
                    } catch (Exception e) {
                        error "Docker is not available. Please install Docker Pipeline plugin and configure Docker."
                    }
                    
                    // Build with fallback if credentials aren't configured
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    bat '''
                    echo Stopping and removing any existing container...
                    docker stop devopsproject || echo "No container to stop"
                    docker rm devopsproject || echo "No container to remove"
                    
                    echo Starting new container...
                    docker run -d -p 9090:80 --name devopsproject %DOCKER_IMAGE%:%BUILD_NUMBER%
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Wrapped in node context
                node {
                    cleanWs()
                }
            }
        }
        failure {
            echo 'Pipeline failed! Check Docker configuration and credentials.'
        }
    }
}