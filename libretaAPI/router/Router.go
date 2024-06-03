package router

import (
	"api/src/controller"

	"github.com/gin-gonic/gin"
)

func InitializeRoutes() {
	app := gin.Default()
	app.GET("/contacts", controller.GetContacts)
	app.POST("/contacts", controller.PostContact)
	app.GET("/contacts/:id", controller.GetContactByID)
	app.GET("/search", controller.SearchContacts)
	app.Run("localhost:8080")
}
