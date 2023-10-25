package main

import (
	"context"
	_ "embed"
	"log"
	"os"
	"strings"

	"github.com/${templateOption:githubAccount}/ambulance-webapi/api"
	"github.com/${templateOption:githubAccount}/ambulance-webapi/internal/ambulance_wl"
	"github.com/${templateOption:githubAccount}/ambulance-webapi/internal/db_service"
	"github.com/gin-gonic/gin"
)

func main() {
	log.Printf("Server started")

	port := os.Getenv("AMBULANCE_API_PORT")
	if port == "" {
		port = "8080"
	}

	environment := os.Getenv("AMBULANCE_API_ENVIRONMENT")
	if !strings.EqualFold(environment, "production") { // case insensitive comparison
		gin.SetMode(gin.DebugMode)
	}
	engine := gin.New()
	engine.Use(gin.Recovery())

	// setup context update  middleware
	dbService := db_service.NewMongoService[ambulance_wl.Ambulance](db_service.MongoServiceConfig{})
	defer dbService.Disconnect(context.Background())
	engine.Use(func(ctx *gin.Context) {
		ctx.Set("db_service", dbService)
		ctx.Next()
	})

	// request routings
	ambulance_wl.AddRoutes(engine)

	engine.GET("/openapi", api.HandleOpenApi)

	engine.Run(":" + port)
}
