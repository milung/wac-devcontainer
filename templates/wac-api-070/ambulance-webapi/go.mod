module github.com/${templateOption:githubAccount}/ambulance-webapi

go ${templateOption:goVersion}

require (
	github.com/gin-gonic/gin v1.9.1
	github.com/google/uuid v1.3.0
	github.com/stretchr/testify v1.8.3
	go.mongodb.org/mongo-driver v1.12.1
	golang.org/x/exp v0.0.0-20230817173708-d852ddb80c63
)
