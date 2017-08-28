# Wordcounter

This is a simple service, that takes two parametrs, text (string) and word (string) and then returns how many times the word appeared in the text.
It converts all text to lower case letters, so "Hello" will always return 0 for example.

It is called in this manner:

http://localhost:5000/?word=hello&text=hello%20hello%20world%20I%20just%20wanted%20to%20say%20HELLO

with result (in json): 
3

Full deployment is found in the Dockerfile and Kubernetes yml.
