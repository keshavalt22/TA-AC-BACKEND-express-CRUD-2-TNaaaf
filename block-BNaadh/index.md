writeCode

Q. write express generator command with varying options to generate express app with following features:

- using ejs as template engine
:- express --view=ejs sample

- no views for express application
:-express --no-view sample2

- express app with gitignore
:-express --git sample3

- express app with sass support for styling.
:-express --css sass  sample4

- ejs as template engine and sass for styling
:-express --view=ejs --css sass  
sample5

- pug as template engine and gitignore together
:-express --view=pug --git  sample6


