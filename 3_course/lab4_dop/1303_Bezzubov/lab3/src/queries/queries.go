package queries

import (
	"awesomeProject2/models"
	"gorm.io/gorm"
	"time"
)

func GetBooksByReaderTicket(db *gorm.DB, readerTicket int) (result []models.Book) {
	db.Joins("INNER JOIN book_at_halls ON books.id = book_at_halls.book_id").
		Joins("INNER JOIN visitors ON visitors.id = book_at_halls.visitor_id").
		Where("visitors.reader_ticket = ?", readerTicket).
		Find(&result)
	return
}

func GetTitleByCode(db *gorm.DB, code int) (result []models.Book) {
	db.Joins("INNER JOIN book_at_halls ON books.id = book_at_halls.book_id").
		Where("code = ?", code).
		Find(&result)
	return
}

func GetCodeByTitle(db *gorm.DB, title string) (result []models.BookAtHall) {
	db.Select("code").
		Joins("INNER JOIN books ON books.id = book_at_halls.book_id").
		Where("title = ?", title).
		Find(&result)
	return
}

type Query4 struct {
	Title    string    `json:"title"`
	BookedAt time.Time `json:"booked_at" gorm:"default:null"`
}

func GetBookedBooks(db *gorm.DB) (result []Query4) {
	db.Table("book_at_halls").
		Joins("INNER JOIN books ON books.id = book_at_halls.book_id").
		Where("book_at_halls.booked_at IS NOT NULL").
		Order("title").
		Select("books.title,book_at_halls.booked_at").
		Find(&result)
	return
}

type Query5 struct {
	Surname      string `json:"surname"`
	ReaderTicket int    `json:"reader_ticket"`
	Title        string `json:"title"`
}

func GetVisitorsWithBooksOverMonth(db *gorm.DB) (result []Query5) {
	db.Table("visitors").
		Select("visitors.surname, visitors.reader_ticket, books.title").
		Joins("INNER JOIN book_at_halls ON visitors.id = book_at_halls.visitor_id").
		Joins("INNER JOIN books ON books.id = book_at_halls.book_id").
		Where("current_date - book_at_halls.booked_at > interval '1 month'").
		Find(&result)
	return
}

func GetVisitorsBooksLessTwo(db *gorm.DB) (result []Query5) {
	subQuery := db.Table("book_at_halls").
		Select("title").
		Joins("INNER JOIN books ON book_at_halls.book_id = books.id").
		Group("title").
		Having("count(title) < 2")

	db.Table("visitors").
		Select("visitors.reader_ticket, visitors.surname, books.title").
		Joins("INNER JOIN book_at_halls ON visitors.id = book_at_halls.visitor_id").
		Joins("INNER JOIN books ON book_at_halls.book_id = books.id").
		Where("books.title IN (?)", subQuery).
		Scan(&result)
	return
}

func GetVisitorsCount(db *gorm.DB) (result int64) {
	db.Table("visitors").Count(&result)
	return
}

func GetYoungVisitors(db *gorm.DB) (result int64) {
	db.Table("visitors").
		Where("current_date - visitors.birthday < interval '20 year'").
		Count(&result)
	return
}
