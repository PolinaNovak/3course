package models

import (
	"gorm.io/gorm"
	"time"
)

type Visitor struct {
	gorm.Model
	ReaderTicket     int       `json:"reader_ticket"`
	Surname          string    `json:"surname" gorm:"size:30"`
	Passport         string    `json:"passport" gorm:"size:11"`
	Birthday         time.Time `json:"birthday" gorm:"default:null"`
	Address          string    `json:"address" gorm:"size:50"`
	Phone            string    `json:"phone" gorm:"size:11"`
	EducationalStage string    `json:"educational_stage" gorm:"size:30"`
	AcademicDegree   bool      `json:"academic_degree"`
	LibraryHallID    uint      `gorm:"not null"`
}
