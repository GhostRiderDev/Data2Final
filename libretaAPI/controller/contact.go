package controller

import (
	"api/src/model"
	"api/src/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func SearchContacts(c *gin.Context) {
	search := c.Query("filter")

	contact, err := service.SearchByNameOrPhone(search)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if contact == nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "contact not found"})
		return
	}
	c.IndentedJSON(http.StatusOK, contact)
}

func GetContactByID(c *gin.Context) {
	id := c.Param("id")

	contact, err := service.GetContactByID(id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if contact != nil {
		c.IndentedJSON(http.StatusOK, contact)
		return
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}

func PostContact(c *gin.Context) {
	var newContact model.Contact

	if err := c.BindJSON(&newContact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newContact.ID = uuid.NewString()

	// Ahora puedes pasar db a insertContact
	err := service.InsertContact(&newContact)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusCreated, newContact)
}

func GetContacts(c *gin.Context) {
	contacts, err := service.GetAllContacts()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusOK, contacts)
}
