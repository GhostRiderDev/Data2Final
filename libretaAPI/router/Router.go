package router

import (
	"api/src/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitializeRoutes() {
	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	app.GET("/contacts", controller.GetContacts)
	app.POST("/contacts", controller.PostContact)
	app.GET("/contacts/:id", controller.GetContactByID)
	app.GET("/contacts/search", controller.SearchContacts)

	app.Run("localhost:8080")
}
