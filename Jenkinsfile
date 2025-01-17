pipeline {
	environment {
        IMAGE_REPO_NAME_HARBOR = "harbor-dc.psw.gov.pk/psw/${(env.JOB_NAME.tokenize('/') as String[])[0]}"
        IMAGE_REPO_NAME = "dev.docker.registry:5000/${(env.JOB_NAME.tokenize('/') as String[])[0]}"
        SONAR_PROJECT= "${env.JOB_NAME.split('/').first()}"
        REPO_NAME = "${scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]}" //Repository name - must be a recognized parameter for Deployment job.
        APP = "On-Demand-QA-K8's-Deployment"
    }
    agent { label 'slave' }

    stages {
        stage('Figuring out the Committer') {
               steps {
                   echo "Figuring out the committer!"
                   script {
                         env.committerEmail = sh (
                           script: 'git --no-pager show -s --format=\'%ae\'',
                           returnStdout: true
                           ).trim()
                         println "Committer email is ${committerEmail}"
                   }
               }
        }
        stage('Pulling NPM Packages') {
            steps {
                sh "npm install"
            }
        }
        stage('Removing Duplicate Packages') {
            steps {
                sh "npm dedupe" //this will clean the node_mudules of any confilcting duplicate packages.
            }
        }
		stage('Building Project') {
            steps {
				sh "npm run build"
            }
        }

stage('Code Scanning & Analysis with SonarQube') {
    steps {
        withSonarQubeEnv('sonarqube-10.6') {
            sh 'npm install'  // Installing dependencies
            
            // Correct way to run SonarQube scanner without string concatenation
            sh '''
                /home/jenkins/sonar-scanner-6.2.0.85879-net/sonar-scanner-5.0.1.3006/bin/sonar-scanner \
                -Dsonar.projectKey=$SONAR_PROJECT \
                -Dsonar.projectName=$SONAR_PROJECT \
                -Dsonar.host.url=http://10.41.255.39:9000 \
                -Dsonar.login=sqa_73c19873065561b8e6b8352931aeff933b0413af \
                -Dsonar.sources=src \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
            '''
        }
    }
}

        stage('Check SonarQube Quality Gate') {
            steps {
        script {
            //def response = sh(script: 'curl -u sqa_73c19873065561b8e6b8352931aeff933b0413af: http://10.41.255.39:9000/api/qualitygates/project_status?projectKey=fss', returnStdout: true).trim()
            //echo "SonarQube Response: ${response}"
                timeout(time: 1, unit: 'HOURS') {
                def qg = waitForQualityGate()
                if (qg.status != 'OK'){
                  error "Pipeline aborted due to quality gate failure: ${qg.status}"    
                              
        }
        }
    }
}
}

        stage('Building Docker image') {
			environment {
                BUILD_IMAGE_REPO_HARBOR_TAG = "${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}-latest"
                BUILD_IMAGE_REPO_TAG = "${env.IMAGE_REPO_NAME}:${env.BRANCH_NAME}-latest"
            }
            steps   {
				sh "docker build -f Dockerfile.Jenkins . -t $BUILD_IMAGE_REPO_TAG --build-arg ARG_REACT_APP_WEBOC_SITE=https://test.weboc.gov.pk --network=host"
                sh "docker tag $BUILD_IMAGE_REPO_TAG ${env.IMAGE_REPO_NAME}:${env.BRANCH_NAME}_$BUILD_NUMBER"
                sh "docker tag $BUILD_IMAGE_REPO_TAG ${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}-latest"
                sh "docker tag $BUILD_IMAGE_REPO_TAG ${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}_$BUILD_NUMBER"
                sh "docker login -u admin -p Harbor12345 https://harbor-dc.psw.gov.pk"
			}
		}
	    stage('Container Image Vulnerability/Threat Scanner') {
            steps {
                script {
                    sh """trivy image ${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}-latest """
                    sh """trivy image ${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}_$BUILD_NUMBER """
                }
            }
        }
		stage('Docker Push') {
            environment {
                BUILD_IMAGE_REPO_HARBOR_TAG = "${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}-latest"
                BUILD_IMAGE_REPO_TAG = "${env.IMAGE_REPO_NAME}:${env.BRANCH_NAME}-latest"
            }
            steps {
                    //sh "docker push $BUILD_IMAGE_REPO_TAG"
                    //sh "docker push ${env.IMAGE_REPO_NAME}:${env.BRANCH_NAME}_$BUILD_NUMBER"
                    sh "docker push $BUILD_IMAGE_REPO_HARBOR_TAG"
                    sh "docker push ${env.IMAGE_REPO_NAME_HARBOR}:${env.BRANCH_NAME}_$BUILD_NUMBER"
            }
        }
        stage('SIT CD for Develop') {
            when {
                branch 'develop'    //This stage is only going to be executed for develop branch.
            }
            steps {
                echo "CI was successful. Triggering deployment because this is develop branch!"
                echo "The branch name is ${env.BRANCH_NAME}"
                echo "The repository name is: ${env.REPO_NAME} and the service being triggered are $REPO_NAME,"
                build job: 'On-Demand-SIT-Deployment', parameters: [string(name: 'Services', value: "$REPO_NAME,")]
                build job: "$APP", parameters: [string(name: 'Services', value: "$REPO_NAME,")]
            }
        }
    }
    post {
        //In case of a entirely successful CI/CD cycle, the deployment email will be sent by the remote CD Job.
        //In case the CI fails, an email will be sent out to the committer + DevOps.
        failure {
            echo "The committer email was: ${env.committerEmail}"
            emailext to: "${env.committerEmail}, DevOps@psw.gov.pk", from: 'no-reply-jenkins@psw.gov.pk',
                subject: "[Jenkins] Build failure email for ${env.JOB_NAME}",
                body: "Job failed - \"${env.JOB_NAME}\" build: ${env.BUILD_NUMBER}\n\nView the log at:\n ${env.BUILD_URL}"
         }
    }
}
