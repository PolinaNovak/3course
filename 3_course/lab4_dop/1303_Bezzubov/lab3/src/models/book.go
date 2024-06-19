package models

import "gorm.io/gorm"

type Book struct {
	gorm.Model
	Title       string    `json:"title"`
	Year        string    `json:"year"`
	PublisherID uint      `json:"publisherID" gorm:"not null;on delete:cascade"`
	Publisher   Publisher `json:"publisher" gorm:"foreignkey:PublisherID"`
	Authors     []*Author `gorm:"many2many:AuthorBook;"`
}
