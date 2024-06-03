package datasource

// GetDatasource returns the datasource string
func GetDatasource() string {
	dataSource := "dbname=libreta password=root host=localhost user=postgres sslmode=disable"
	return dataSource
}
