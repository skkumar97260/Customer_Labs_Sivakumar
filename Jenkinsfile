pipeline {
    agent any

    triggers {
        githubPush() // Listens for GitHub webhook push events
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/skkumar97260/Customer_Labs_Sivakumar.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }

    post {
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
