## A little background
Recently I've been woring on a project which generated using the awesome jHipster tool. However, the guy who generated it remove all of the package.json, bower.json, gulpfile.js etc. but the bower\_components folder. So, not suprisingly, I searched the internet for such a tool that can generate the bower.json file according to the files in bower\_components. And surprisingly, I found nothing. Eventually, I decide to write my own tool for this situation.

```
  Usage: bowerfg [options] <targetDir>

  Options:

    -f, --file [file]  the file name generated. Defaut to bower.json
    -p, --path [path]  the path of the generated file. Defaut to the current woring directory
    -h, --help         output usage information

```

## Screenshots

![screenshot](screenshots/Screen_Shot_1.jpg?raw=true "screenshot")

![screenshot](screenshots/Screen_Shot_2.jpg?raw=true "screenshot")