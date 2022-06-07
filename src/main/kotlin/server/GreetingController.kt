package server

import database.DatabaseOperations
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import routeHandler.getRouteHandler.getResponse.ConfigNames
import routeHandler.getRouteHandler.getResponse.HomePage


@RestController
class GreetingController {

    private val homePage = HomePage()
    private val configNames = ConfigNames(DatabaseOperations(database.Connector()))

    @GetMapping("/")
    fun getHTML() :String {
        return homePage.getResponse("/index.html")
    }

    @GetMapping("/main.js")
    fun getJs() :String {
        return homePage.getResponse("/main.js")
    }

    @GetMapping("/main.css")
    fun getCSS() :String {
        return homePage.getResponse("/main.css")
    }

    @GetMapping("/get-config-files")
    fun getConfigFiles() :String {
        return  configNames.getResponse("/get-config-files")
    }
}