module github.com/${templateOption:githubAccount}/ambulance-webapi

go ${templateOption:goVersion}

require (
	github.com/gin-gonic/gin ${templateOption:ginGonicVersion}
	github.com/google/uuid ${templateOption:googleUuidVersion} 
	go.mongodb.org/mongo-driver ${templateOption:mongoDriverVersion}
)

