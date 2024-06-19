package models

import "time"

type BookAtHall struct {
	LibraryHallID int       `json:"hall_id" gorm:"primaryKey;autoIncrement:false"`
	BookID        int       `json:"book_id" gorm:"primaryKey;autoIncrement:false"`
	VisitorID     int       `json:"visitor_id" gorm:"default:null"`
	Code          int       `json:"code"`
	BookedAt      time.Time `json:"booked_at" gorm:"default:null"`
	DeletedAt     time.Time `json:"deleted_at" gorm:"default:null"`

	LibraryHall LibraryHall `json:"-"`
	Book        Book        `json:"-"`
	Visitor     *Visitor    `json:"-"`
}
