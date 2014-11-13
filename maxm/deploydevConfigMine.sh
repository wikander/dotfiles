pcexport() {
  local SRC_DIR=/Library/Projects/git/pcexport

  jbRedeploy $SRC_DIR pcexport-server
  jbRedeploy $SRC_DIR pcexport-premiumcentral-mock
  jbRedeploy $SRC_DIR pcexport-admin2
}

backend() {
  local SRC_DIR=/Library/Projects
  jbFetch InstrumentBackend 2.0.29
  jbRedeploy $SRC_DIR PMLBackend
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