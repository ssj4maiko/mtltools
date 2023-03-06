pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/ssj4maiko/mtltools.git'
      }
    }

    stage('Install') {
      parallel {
        stage('Front-end') {
          steps {
            sh 'cd resources/frontend; npm install;'
            archiveArtifacts 'node_modules'
          }
        }

        stage('Back-end') {
          steps {
            sh 'composer install;'
            archiveArtifacts 'vendor'
          }
        }

      }
    }

    stage('Compile') {
      steps {
        sh 'cd resources/frontend/; bash build2php-production.sh;'
      }
    }

    stage('Chuck Norris') {
      steps {
        chuckNorris()
      }
    }

  }
}