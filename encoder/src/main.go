package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Word struct {
	Word    string `json:"word"`
	Encoded string `json:"encoded"`
}

func encode(tobeEncoded string, key string) string {
	encoded := base64.StdEncoding.EncodeToString([]byte(tobeEncoded))
	return string(encoded)
}
func decode(tobeDecoded string, key string) string {
	sDec, _ := base64.StdEncoding.DecodeString(tobeDecoded)
	return (string(sDec))
}

func encodeHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	encodedString := encode(vars["tobeEncoded"], vars["key"])
	forParsing := Word{vars["tobeEncoded"], encodedString}
	json.NewEncoder(w).Encode(forParsing)
}

func decodeHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	decodedString := decode(vars["tobeDecoded"], vars["key"])
	forParsing := Word{decodedString, ""}
	json.NewEncoder(w).Encode(forParsing)
}

func ping(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "OK")
}
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", ping)
	r.HandleFunc("/encode/{tobeEncoded}/{key}", encodeHandler).Methods("POST")
	r.HandleFunc("/decode/{tobeDecoded}/{key}", decodeHandler).Methods("POST")
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"POST", "HEAD", "OPTIONS"})
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":3456", handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
