package main

import (
	"api/src/router"
	"api/src/service"
)

func main() {
	service.CreateTables()
	router.InitializeRoutes()
}
