pcexport() {
  local SRC_DIR=/Library/Projects/git/pcexport

  jbRedeploy $SRC_DIR pcexport-server
  jbRedeploy $SRC_DIR pcexport-premiumcentral-mock
  jbRedeploy $SRC_DIR pcexport-admin2
  jbRedeploy $SRC_DIR pcexport-admin
  jbRedeploy $SRC_DIR sanity-check-service
}

backend() {
  local SRC_DIR=/Library/Projects
  jbRedeploy $SRC_DIR PMLBackend
}


backendVersion() {
  jbFetch PMLBackend 5.0.0
}


pcexport-admin() {
  local SRC_DIR=/Library/Projects/git/pcexport
  jbRedeploy $SRC_DIR pcexport-admin2
}

pcexport-admin-old() {
  local SRC_DIR=/Library/Projects/git/pcexport
  jbRedeploy $SRC_DIR pcexport-admin
}

versions() {
	local SRC_DIR=/Library/Projects
	jbRedeploy $SRC_DIR VersionsApp
}

sanity-check() {
  local SRC_DIR=/Library/Projects/git/pcexport
  jbRedeploy $SRC_DIR sanity-check-service
}

icOnline() {
  local SRC_DIR=/Library/Projects/git/insclearonline
  jbRedeploy $SRC_DIR insclearonline-proxy
  jbRedeploy $SRC_DIR insclearonline-mock
}

extApp() {
  local SRC_DIR=/Library/Projects/PmlWeb

  deploy $SRC_DIR PMLBackend
  jbRedeploy $SRC_DIR ExternalApp
  deploy $SRC_DIR InstrumentBackend
  deploy $SRC_DIR VersionsApp
}

maxcustFrontend() {
  local SRC_DIR=/Library/Projects/git/maxcust
  jbRedeploy $SRC_DIR maxcust-frontend
}

maxcustBackend() {
    local SRC_DIR=/Library/Projects/git/maxcust
    jbRedeploy $SRC_DIR maxcust-backend
}