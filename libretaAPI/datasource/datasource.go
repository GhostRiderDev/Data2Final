package datasource

// GetDatasource returns the datasource string
func GetDatasource() string {
	dataSource := "dbname=libreta password=chupalo host=localhost user=postgres sslmode=disable"
	return dataSource
}
