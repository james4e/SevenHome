//Created by Shiyang Fei on 6/16/2015
var lang = localStorage ? (localStorage.getItem('seven-education-user-lang') || 'en') : 'en';
var file = 'locale/' + lang + '.js';
document.write('<script type="text/javascript" src="' + file + '"></script>');
console.log(file);