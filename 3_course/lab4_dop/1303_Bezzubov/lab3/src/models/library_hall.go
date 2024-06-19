package models

import "gorm.io/gorm"

type LibraryHall struct {
	gorm.Model
	Name     string `json:"name" gorm:"size:30"`
	Capacity int    `json:"capacity"`
	Visitors []*Visitor
}
