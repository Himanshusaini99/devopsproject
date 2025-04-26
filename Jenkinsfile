pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'himanshusaini99/devopsproject'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                         branches: [[name: '*/master']],
                         extensions: [],
                         userRemoteConfigs: [[url: 'https://github.com/Himanshusaini99/devopsproject.git']]
                        ])
            }
        }
        
        stage('Verify Docker') {
            steps {
                script {
                    // Verify Docker is installed and accessible
                    def dockerVersion = bat(script: 'docker --version', returnStdout: true).trim()
                    echo "Docker version: ${dockerVersion}"
                    
                    // Alternative check if Docker Pipeline plugin is installed
                    try {
                        docker.withRegistry('') {}
                        echo "Docker Pipeline plugin is available"
                    } catch (Exception e) {
                        error "Docker Pipeline plugin not installed or configured"
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build with error handling
                    try {
                        docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                    } catch (Exception e) {
                        error "Failed to build Docker image: ${e.message}"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    bat """
                    echo Stopping and removing any existing container...
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
        failure {
            echo 'Pipeline failed! See logs for details.'
            // Optional: Send notification
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}