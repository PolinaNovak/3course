package main

import (
	"awesomeProject2/app"
	"awesomeProject2/models"
	"awesomeProject2/queries"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"time"
)

func main() {

	logger := app.SetLogger("ERROR")
	dsn := "host=localhost user=postgres password=1 dbname=postgres port=5432"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}

	err = db.AutoMigrate(
		&models.Author{},
		&models.Book{},
		&models.BookAtHall{},
		&models.LibraryHall{},
		&models.Publisher{},
		&models.Visitor{},
	)
	if err != nil {
		logger.Error("Error during migration", err)
	}

	publishers := []models.Publisher{
		{Name: "Питер"},
		{Name: "Эксмо"},
		{Name: "АСТ"},
		{Name: "Манн, Иванов и Фербер"},
		{Name: "Центрполиграф"},
	}

	books := []models.Book{
		{Title: "Война и мир", Year: "1869", PublisherID: 1},
		{Title: "Преступление и наказание", Year: "1866", PublisherID: 1},
		{Title: "Идиот", Year: "1869", PublisherID: 2},
		{Title: "1984", Year: "1949", PublisherID: 4},
		{Title: "Анна Каренина", Year: "1877", PublisherID: 5},
	}

	authors := []models.Author{
		{Name: "Федор", Surname: "Достоевский", Books: []*models.Book{&books[1], &books[2]}},
		{Name: "Лев", Surname: "Толстой", Books: []*models.Book{&books[0], &books[4]}},
		{Name: "Джордж", Surname: "Оруэлл", Books: []*models.Book{&books[3]}},
		{Name: "Агата", Surname: "Кристи"},
		{Name: "Джоан", Surname: "Роулинг"},
	}

	visitors := []models.Visitor{
		{
			ReaderTicket:     1001,
			Surname:          "Иванов",
			Passport:         "1234 678901",
			Birthday:         time.Date(1990, 5, 15, 0, 0, 0, 0, time.UTC),
			Address:          "ул. Ленина, 123",
			Phone:            "89205678901",
			EducationalStage: "Высшее",
			AcademicDegree:   true,
			LibraryHallID:    1,
		},
		{
			ReaderTicket:     1002,
			Surname:          "Петров",
			Passport:         "2345 789012",
			Birthday:         time.Date(1985, 12, 10, 0, 0, 0, 0, time.UTC),
			Address:          "ул. Пушкина, 45",
			Phone:            "89066789012",
			EducationalStage: "Среднее",
			AcademicDegree:   false,
			LibraryHallID:    1,
		},
		{
			ReaderTicket:     1003,
			Surname:          "Сидорова",
			Passport:         "3456 890123",
			Birthday:         time.Date(1995, 3, 25, 0, 0, 0, 0, time.UTC),
			Address:          "пр. Гагарина, 67",
			Phone:            "89217890123",
			EducationalStage: "Высшее",
			AcademicDegree:   true,
			LibraryHallID:    3,
		},
		{
			ReaderTicket:     1004,
			Surname:          "Козлов",
			Passport:         "4567 901234",
			Birthday:         time.Date(1982, 8, 3, 0, 0, 0, 0, time.UTC),
			Address:          "ул. Маяковского, 56",
			Phone:            "89208901234",
			EducationalStage: "Среднее",
			AcademicDegree:   false,
			LibraryHallID:    2,
		},
		{
			ReaderTicket:     1005,
			Surname:          "Михайлова",
			Passport:         "5678 012345",
			Birthday:         time.Date(1998, 7, 18, 0, 0, 0, 0, time.UTC),
			Address:          "ул. Кирова, 89",
			Phone:            "89219012345",
			EducationalStage: "Высшее",
			AcademicDegree:   false,
			LibraryHallID:    2,
		},
	}

	booksAtHall := []models.BookAtHall{
		{
			LibraryHallID: 1,
			BookID:        1,
			VisitorID:     1,
			Code:          1123,
			BookedAt:      time.Date(2023, 8, 8, 0, 0, 0, 0, time.UTC),
		},
		{LibraryHallID: 1, BookID: 2, Code: 1124},
		{
			LibraryHallID: 1,
			BookID:        3,
			VisitorID:     2,
			Code:          1125,
			BookedAt:      time.Date(2023, 10, 15, 0, 0, 0, 0, time.UTC),
		},
		{LibraryHallID: 2, BookID: 5, Code: 2123},
		{LibraryHallID: 1, BookID: 4, Code: 1126},
	}

	libraryHalls := []models.LibraryHall{
		{Name: "Классика", Capacity: 25},
		{Name: "Зарубежная", Capacity: 20},
		{Name: "Фэнтези", Capacity: 25},
	}

	// Функция для создания записей в базе данных
	createRecords := func(data interface{}) {
		result := db.Create(data)
		if result.Error != nil {
			logger.Error("Error during adding tuple", result.Error)
		}
	}

	createRecords(&publishers)
	createRecords(&authors)
	createRecords(&libraryHalls)
	createRecords(&visitors)
	createRecords(&booksAtHall)

	fmt.Printf("Query 1 results:\n")
	for _, book := range queries.GetBooksByReaderTicket(db, 1001) {
		fmt.Println(book.Title)
	}

	fmt.Printf("Query 2 results:\n")
	for _, book := range queries.GetTitleByCode(db, 2123) {
		fmt.Println(book.Title)
	}

	fmt.Printf("Query 3 results:\n")
	for _, book := range queries.GetCodeByTitle(db, "Война и мир") {
		fmt.Println(book.Code)
	}

	fmt.Printf("Query 4 results:\n")
	for _, book := range queries.GetBookedBooks(db) {
		fmt.Printf("title: %s, booked_at: %s\n", book.Title, book.BookedAt.Format("2006-01-02"))
	}

	fmt.Printf("Query 5 results:\n")
	for _, book := range queries.GetVisitorsWithBooksOverMonth(db) {
		fmt.Printf("surname: %s, reader ticket: %d, title: %s\n", book.Surname, book.ReaderTicket, book.Title)
	}

	fmt.Printf("Query 6 results:\n")
	for _, book := range queries.GetVisitorsBooksLessTwo(db) {
		fmt.Printf("surname: %s, reader ticket: %d, title: %s\n", book.Surname, book.ReaderTicket, book.Title)
	}

	fmt.Printf("Query 7 result:\nCount: %d\n", queries.GetVisitorsCount(db))

	fmt.Printf("Query 8 result:\nCount: %d\n", queries.GetYoungVisitors(db))
}
