param (
    $command
)

if (-not $command)  {
    $command = "start"
}

$env:AMBULANCE_API_ENVIRONMENT="Development"
$env:AMBULANCE_API_PORT="8080"
$env:AMBULANCE_API_MONGODB_USERNAME="root"
$env:AMBULANCE_API_MONGODB_PASSWORD="neUhaDnes"

# get script file folder
$ProjectRoot = "${PSScriptRoot}/.."

function mongo {
    docker compose --file ${ProjectRoot}/deployments/docker-compose/compose.yaml $args
}

switch ($command) {
    "openapi" {
        docker run --rm  -v ${ProjectRoot}:/local openapitools/openapi-generator-cli:${templateOption:openApiCliImgVersion} generate -c /local/scripts/generator-cfg.yaml 
    }
    "start" {
        try {
            mongo up --detach
            go run ${ProjectRoot}/cmd/ambulance-api-service
        } finally {
            mongo down
        }
    }    
    "test" {
        go test -v ./...
    }
    "mongo" {
       mongo up
    }
    default {
        throw "Unknown command: $command"
    }
}

