package data

import "api/src/model"

// GetData returns a list of contacts
func GetData() []model.Contact {
	contacts := []model.Contact{
		{ID: "dbb3c1af-6498-4e8a-8f95-80fc1c1fd6e3", Name: "Blue Train", Phone: "32343434"},
		{ID: "efe32c1af-6498-4e8a-8f95-80fc1c1fd6e2", Name: "Sunset", Phone: "32343434"},
		{ID: "asd23c1af-6498-4e8a-8f95-80fc1c1fd6ea", Name: "Sunrise", Phone: "32343434"},
	}
	return contacts
}
