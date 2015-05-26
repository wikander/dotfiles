#!/bin/bash

# Configuration script to be used together with deploydev.sh.
#
# Usage:
# Set up your own config methods to be used as arguments in deploydev.sh. See "example()" for instance.

example() {
	local SRC_DIR=/Library/Projects/application
	 
	# This artifact will be installed from the maven repo if it is not already deployed
    jbFetch InstrumentBackend 2.0.29

	# This artifact will be linked from the target dir if it is not already deployed
	# The script tries to find the artifact "PMLBackend" somewhere in the file tree based at "/Library/Projects/application PMLBackend"
    jbDeploy $SRC_DIR PMLBackend

	# This artifact will be linked from the target dir and is always redployed
	# The script tries to find the artifact "WebCounseling" somewhere in the file tree based at "/Library/Projects/application PMLBackend"
    jbRedeploy $SRC_DIR WebCounseling	
}

publicweb() {
	local SRC_DIR=/Library/Projects/pmlweb
	
	jbDeploy $SRC_DIR InstrumentBackend
	jbDeploy $SRC_DIR PMLBackend
	jbDeploy $SRC_DIR PublicWebBackend
	jbDeploy $SRC_DIR PublicWebApp
	jbRedeploy $SRC_DIR PublicWebAdminApp
}

mts() {
	local SRC_DIR=/Library/Projects/mts

	jbRedeploy $SRC_DIR mts-fakexph
	jbRedeploy $SRC_DIR mts-server	
}



wf_intApp() {
	local SRC_DIR=/Library/Projects/pmlweb-devbranch-wildfly

	deploy $SRC_DIR PMLBackend
	jbRedeploy $SRC_DIR InternalApp
	deploy $SRC_DIR InstrumentBackend
	deploy $SRC_DIR VersionsApp
	jbRedeploy $SRC_DIR MTSMock
}

wf_pml() {
  local SRC_DIR=/Library/Projects/pmlweb-devbranch-wildfly

  deploy $SRC_DIR PMLBackend
  deploy $SRC_DIR InstrumentBackend
  jbRedeploy $SRC_DIR PMLApp
}

intApp() {
	local SRC_DIR=/Library/Projects/Linda

	deploy $SRC_DIR PMLBackend
	jbRedeploy $SRC_DIR InternalApp
	deploy $SRC_DIR InstrumentBackend
	deploy $SRC_DIR VersionsApp
}

intAppMock() {
	local SRC_DIR=/Library/Projects/Linda

	deploy $SRC_DIR PMLBackend
	jbRedeploy $SRC_DIR InternalApp
	deploy $SRC_DIR MTSMock
	deploy $SRC_DIR InstrumentBackend
	deploy $SRC_DIR VersionsApp
}

deployBasicPml() {
  local SRC_DIR=/Library/Projects/Linda

  deploy $SRC_DIR PMLBackend
  deploy $SRC_DIR InstrumentBackend
  jbRedeploy $SRC_DIR PMLApp
}

styleTemplateInternalApp() {
  jbFetch StyleTemplateInternalApp 5.0.99
}

eclipsePML() {
   local SRC_DIR=/Library/Projects/pmlweb
   
   jbDeployWithoutLink $SRC_DIR PMLBackend
   jbDeployWithoutLink $SRC_DIR PMLApp
   jbDeployWithoutLink $SRC_DIR InternalApp
}

eclipseInstrument() {
   local SRC_DIR=/Library/Projects/pmlweb
   
   jbDeployWithoutLink $SRC_DIR InstrumentBackend
}

eclipseCounseling() {
   local SRC_DIR=/Library/Projects/pmlweb
   
   jbDeployWithoutLink $SRC_DIR CounselingBackend
   jbDeployWithoutLink $SRC_DIR CounselingApp
}

eclipsePublicWeb() {
   local SRC_DIR=/Library/Projects/pmlweb
   
   jbDeployWithoutLink $SRC_DIR ExternalApp
   jbDeployWithoutLink $SRC_DIR PublicWebBackend
   jbDeployWithoutLink $SRC_DIR PublicWebApp
   jbDeployWithoutLink $SRC_DIR PublicWebAdminApp
   jbDeployWithoutLink $SRC_DIR WebCounseling
}

externalApp() {
   local SRC_DIR=/Library/Projects/pmlweb

   jbDeployWithoutLink $SRC_DIR ExternalApp
}

eclipseAll() {
   local SRC_DIR=/Library/Projects/pmlweb
   
   eclipseInstrument
   eclipsePML
   eclipseCounseling
   eclipsePublicWeb
}


deployCounseling() {
  local SRC_DIR=/Library/Projects/Linda
  
  redeploy $SRC_DIR PMLBackend
  redeploy $SRC_DIR InstrumentBackend
  deploy $SRC_DIR CounselingBackend
  redeploy $SRC_DIR CounselingApp
}

deployWebCounseling() {
  local SRC_DIR=/Library/Projects/Linda
  fetch WebCounselingStatic 3.0.31   
  deploy $SRC_DIR PMLBackend
  deploy $SRC_DIR PublicWebBackend
  deploy $SRC_DIR InstrumentBackend
  deploy $SRC_DIR PublicWebAdminApp
  redeploy $SRC_DIR WebCounseling
}

redeployAll() {
  local SRC_DIR=/Library/Projects/pmlweb
  fetch WebCounselingStatic 3.0.31  
  redeploy $SRC_DIR PMLBackend
  redeploy $SRC_DIR PublicWebBackend
  redeploy $SRC_DIR InstrumentBackend
  redeploy $SRC_DIR PublicWebAdminApp
  redeploy $SRC_DIR WebCounseling
  redeploy $SRC_DIR CounselingBackend
  redeploy $SRC_DIR CounselingApp
  redeploy $SRC_DIR PublicWebApp
  redeploy $SRC_DIR PublicWebAdminApp
  redeploy $SRC_DIR PMLApp
  redeploy $SRC_DIR InternalApp
  redeploy $SRC_DIR ExternalApp
}

ls() {
  local SRC_DIR=/Library/Projects/pmlweb
  deploy $SRC_DIR InternalApp
  deploy $SRC_DIR InstrumentBackend
  deploy $SRC_DIR PMLBackend
  deploy $SRC_DIR MTSMock  
}

deployInstrument() {
  local SRC_DIR=/Library/Projects/pmlweb
  deploy $SRC_DIR InstrumentBackend
}

deployPcExport() {
  local SRC_DIR=/Library/Projects/pcexport
  jbRedeploy $SRC_DIR pcexport-server
  jbRedeploy $SRC_DIR pcexport-premiumcentral-mock
  jbRedeploy $SRC_DIR pcexport-admin
}

deployPcExportAdmin() {
  local SRC_DIR=/Library/Projects/pcexportadmin
  jbRedeploy $SRC_DIR pcexport-admin
}

deployInsClearOnline() {
  local SRC_DIR=/Library/Projects/insclearonline
  jbRedeploy $SRC_DIR insclearonline-proxy
  jbRedeploy $SRC_DIR insclearonline-mock
}

deployPmlBackend() {
	local SRC_DIR=/Library/Projects/pmlweb

	jbRedeploy $SRC_DIR PMLBackend
} 

source $(dirname $0)/deploydevConfigMine.sh

