pipeline {
    agent any

    options {
        // Limits build timeout to 30 minutes
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        // Set a local Maven repository for caching
        MAVEN_OPTS = '-Dmaven.repo.local=.m2/repository'
    }

    stages {
        stage('Preparation') {
            steps {
                script {
                    // Show environment details
                    echo "Running on ${env.JENKINS_URL} - Node: ${env.NODE_NAME}"
                }
            }
        }

        stage('Checkout') {
            steps {
                // Perform a lightweight Git checkout
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    doGenerateSubmoduleConfigurations: false, 
                    extensions: [[$class: 'CloneOption', shallow: true, depth: 1]], 
                    userRemoteConfigs: [[url: 'https://github.com/skkumar97260/Customer_Labs_Sivakumar.git']]
                ])
            }
        }

        stage('Build and Test in Parallel') {
            parallel {
                stage('Build') {
                    steps {
                        echo 'Building project...'
                        sh 'mvn clean install -T 2C' // Use multi-threaded Maven build
                    }
                }
                stage('Unit Tests') {
                    steps {
                        echo 'Running Unit Tests...'
                        sh 'mvn test -T 2C' // Run tests in parallel
                    }
                }
            }
        }

        stage('Quality Analysis') {
            steps {
                echo 'Running Code Quality Tools...'
                // Example: Run SonarQube (if configured)
                sh 'mvn sonar:sonar'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application to environment...'
                // Example deployment logic
                sh './deploy.sh'
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment were successful!'
        }
        failure {
            echo 'Build or Deployment failed. Check logs!'
        }
        always {
            // Archive build artifacts for review
            archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            junit '**/target/surefire-reports/*.xml'
        }
    }
}
