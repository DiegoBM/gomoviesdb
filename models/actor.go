package models

type Actor struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	// ImageURL is a pointer because it might not have a value [i.e. optional]
	ImageURL *string `json:"image_url"`
}
