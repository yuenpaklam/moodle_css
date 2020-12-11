
## Important Notes

Tried to clone files from github and upload to testing server again, the content: "box" problem does not exist. And also I cant find any files that are using Dashicons.  

- [css output](https://github.com/yuenpaklam/moodle_css/tree/master/files) For the css files started with mod, those code inside the files should be put at the line 1 in the mod/xxx/style.css files.
For other files,they should be put in the theme/remui/style folder

- [config.php](https://github.com/yuenpaklam/moodle_css/blob/master/remui/config.php) this is the file in theme/remui/ which control the calls of all css file

- [app.js](https://github.com/yuenpaklam/moodle_css/blob/master/app.js) the programme that I used to move the css from the source remui.csso file to other files.

- [input.json](https://github.com/yuenpaklam/moodle_css/blob/master/input.json) the input that would control which selectors should be moved from remui.csso to other files.