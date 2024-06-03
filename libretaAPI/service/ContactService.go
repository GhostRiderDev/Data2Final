package service

import (
	"api/src/datasource"
	"api/src/model"
	"database/sql"
	"log"
	"regexp"

	_ "github.com/lib/pq"
)

func CreateTables() {
	db, err := sql.Open("postgres", datasource.GetDatasource())
	if err != nil {
		panic(err)
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS Contact (
				id TEXT PRIMARY KEY,
				name TEXT,
				phone TEXT
		)`)

	if err != nil {
		panic(err)
	}
	defer db.Close()
}

func GetContactByID(id string) (*model.Contact, error) {
	db, err := sql.Open("postgres", datasource.GetDatasource())
	if err != nil {
		log.Fatal(err)
	}
	const query = `SELECT id,name,phone from Contact where id = $1 `
	var contact model.Contact
	err = db.QueryRow(query, id).Scan(&contact.ID, &contact.Name, &contact.Phone)
	contact.ID = id
	return &contact, err
}

func GetAllContacts() ([]model.Contact, error) {
	db, err := sql.Open("postgres", datasource.GetDatasource())
	if err != nil {
		log.Fatal(err)
	}
	const query = `SELECT id,name,phone from Contact`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var contacts []model.Contact
	for rows.Next() {
		var contact model.Contact
		if err := rows.Scan(&contact.ID, &contact.Name, &contact.Phone); err != nil {
			return nil, err
		}
		contacts = append(contacts, contact)
	}
	return contacts, nil
}

func InsertContact(contact *model.Contact) error {
	db, err := sql.Open("postgres", datasource.GetDatasource())
	if err != nil {
		log.Fatal(err)
	}
	const query = `INSERT INTO Contact (name, phone, id) VALUES ($1, $2, $3) RETURNING id`
	err = db.QueryRow(query, contact.Name, contact.Phone, contact.ID).Scan(&contact.ID)
	db.Close()
	return err
}

func SearchByNameOrPhone(search string) ([]model.Contact, error) {
	db, err := sql.Open("postgres", datasource.GetDatasource())
	if err != nil {
		log.Fatal(err)
	}
	isPhone := regexp.MustCompile(`^\d+$`).MatchString(search)

	if isPhone {
		return searchByPhone(db, search)
	}
	return searchByName(db, search)
}

func searchByName(db *sql.DB, name string) ([]model.Contact, error) {
	const query = "SELECT id,name,phone from Contact where name LIKE $1"
	rows, err := db.Query(query, "%"+name+"%")

	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var contacts []model.Contact
	contacts, _ = getContactsFromRows(rows)
	return contacts, nil
}

func searchByPhone(db *sql.DB, phone string) ([]model.Contact, error) {
	const query = `SELECT id,name,phone from Contact where phone LIKE $1`
	rows, err := db.Query(query, "%"+phone+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var contacts []model.Contact
	contacts, _ = getContactsFromRows(rows)
	return contacts, nil
}

func getContactsFromRows(rows *sql.Rows) ([]model.Contact, error) {
	var contacts []model.Contact
	for rows.Next() {
		var contact model.Contact
		if err := rows.Scan(&contact.ID, &contact.Name, &contact.Phone); err != nil {
			return nil, err
		}
		contacts = append(contacts, contact)
	}
	return contacts, nil
}
