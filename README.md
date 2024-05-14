# CookHub

## Project links
* [srs.md](https://github.com/SE-TINF22B6/CookHub/blob/main/Project_Doc/srs.md)
* [Figma -> Landing page, login page, profile page](https://www.figma.com/file/YHS8HmBRaxqjHzQbqMhtNq/CookHub?type=design&node-id=0-1&mode=design&t=vMBnJrB1Yd5jKPKg-0)
* [Figma -> Settings page](https://www.figma.com/file/iW8TJhQ7snE6523q0IxiQS/Untitled?type=design&node-id=0-1&mode=design&t=2PGnPwCH4JaiCH0N-0)

<br><br>

## How to start the backend ( Rider | Shell )

> [!warning]
> You need to have `.NET 8` and  `iisexpress amd64` installed on your local system.

<br>

### With Rider

1. Open */Backend/Backend.sln* with [Rider](https://www.jetbrains.com/de-de/rider/)
2. Click the **Run**-button at the top right
3. Wait till the Swagger UI opens in your browser

<br>

### With Windows Power Shell

1. Start Shell
2. Insert the following commands:
```shell
cd C:\Users\[userName]\IdeaProjects\CookHub\Backend\API
```
```shell
dotnet run --launch-profile https --urls=https://localhost:44328/
```
4. After successfull build and start open in browser the following url:
```shell
https://localhost:44328/swagger/index.html
```

<br>

> [!tip]
> If you'd like to use a script to start the backend create a .bat file and insert the code below.
> Mind to change "[userName]" with your actual local user name in windows and if you're not using "chrome" to change it too.

<br>

```bat
@echo off
cd C:\Users\[userName]\IdeaProjects\CookHub\Backend\API
start chrome https://localhost:44328/swagger/index.html
dotnet run --launch-profile https --urls=https://localhost:44328/
timeout /t 10 > nul
```


<br><br>

## How to start the frontend
1. Open the *Frontend* folder in [WebStorm](https://www.jetbrains.com/de-de/webstorm/)
2. (If you need to install/update dependencies, run ***npm install*** in the terminal) 
3. Run ***npm start*** in the terminal
4. Wait till the frontend opens in your browser

<br><br>

## Other useful links
* [React documentation & tutorial](https://react.dev/)
* [React deployment](https://create-react-app.dev/docs/deployment/)
* [TMetric](https://app.tmetric.com/)
* [Moodle room](https://moodle.dhbw.de/course/view.php?id=8728)
