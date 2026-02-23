package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/DiegoBM/gomoviesdb/data"
	"github.com/DiegoBM/gomoviesdb/handlers"
	"github.com/DiegoBM/gomoviesdb/logger"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("gomoviesdb.log")
	if err != nil {
		log.Fatalf("Could not initialize the logging system. - %v", err)
	}

	return logInstance
}

func main() {
	logInstance := initializeLogger()
	defer logInstance.Close()

	// Popuplate OSs Environment variables with .env file contents
	if err := godotenv.Load(); err != nil {
		logInstance.Fatal("Could not load the environtment file", err)
	}

	// Database initialization
	dbConnStr, exists := os.LookupEnv("DATABASE_URL")
	if !exists {
		logInstance.Fatal("Database connection string environment variable not defined", nil)
	}

	db, err := sql.Open("postgres", dbConnStr)
	if err != nil {
		logInstance.Fatal("Could not open a connection to the database", err)
	}
	defer db.Close()

	// Repository initialization
	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		logInstance.Fatal("Could not initialize the Movie repository", err)
	}
	accountRepo, err := data.NewAccountRepository(db, logInstance)
	if err != nil {
		logInstance.Fatal("Could not initialize the Account repository", err)
	}

	// Movie handlers
	movieHandlers := handlers.NewMovieHandler(movieRepo, logInstance)
	http.HandleFunc("/api/movies/random", movieHandlers.GetRandomMovies)
	http.HandleFunc("/api/movies/top", movieHandlers.GetTopMovies)
	http.HandleFunc("/api/movies/search", movieHandlers.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandlers.GetMovie)
	http.HandleFunc("/api/genres", movieHandlers.GetGenres)

	// Account handlers
	accountHandler := handlers.NewAccountHandler(accountRepo, logInstance)
	http.HandleFunc("/api/account/register", accountHandler.Register)
	http.HandleFunc("/api/account/authenticate", accountHandler.Authenticate)

	// Handle SPA routing
	catchAllClientRoutesHandler := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	}
	http.HandleFunc("/movies/", catchAllClientRoutesHandler)
	http.HandleFunc("/movies", catchAllClientRoutesHandler)
	http.HandleFunc("/account/", catchAllClientRoutesHandler)

	// Server handler for static files, Catches all routes to serve them from public
	// The path, use in a relative manner, is relative to your working directory
	http.Handle("/", http.FileServer(http.Dir("public")))

	const addr = ":8080"
	if err := http.ListenAndServe(addr, nil); err != nil {
		logInstance.Error("Server has failed", err)
	}
}
