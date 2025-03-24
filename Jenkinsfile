pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
        DOCKER_HUB_REPO = 'swethasweris/devops-project'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/swethasweris/devops-project.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_HUB_REPO:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_HUB_REPO:latest'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
            echo 'Docker image pushed to Docker Hub!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
