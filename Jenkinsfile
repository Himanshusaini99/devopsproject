pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'himanshusaini99/devopsproject'  // Replace with your Docker Hub username
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
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Deploy') {
            steps {
                bat '''
                docker stop devopsproject || true
                docker rm devopsproject || true
                docker run -d -p 9090:80 --name devopsproject ${DOCKER_IMAGE}:${env.BUILD_NUMBER}
                '''
            }
        }
    }
    post {
        always {
            cleanWs()  // Clean workspace after build
        }
    }
}