package models

import "gorm.io/gorm"

type Author struct {
	gorm.Model
	Name    string  `json:"name" gorm:"size:30"`
	Surname string  `json:"surname" gorm:"size:30"`
	Books   []*Book `gorm:"many2many:AuthorBook;"`
}
