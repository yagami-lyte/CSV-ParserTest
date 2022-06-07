package routeHandler.getRouteHandler.getResponse

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test

internal class HomePageTest {

    private val homePage = HomePage()

    @Test
    fun shouldBeAbleToReturnResponseForHtmlGetRequest() {
        val htmlPath = "/index.html"
        val expected = "<html lang=\"en\" xmlns:border=\"http://www.w3.org/1999/xhtml\">"
        val response = homePage.getResponse(htmlPath)

        val actual = response.split("\n")[1].split(";")[0]

        assertEquals(expected , actual)
    }

    @Test
    fun shouldBeAbleToReturnResponseForJavascriptGetRequest() {
        val htmlPath = "/main.js"
        val expectedContentType = "var result = []"
        val response = homePage.getResponse(htmlPath)

        val actualContentType = response.split("\n")[1].split(";")[0]

        assertEquals(expectedContentType , actualContentType)
    }

    @Test
    @Disabled
    fun shouldBeAbleToReturnResponseForCssGetRequest() {
        val htmlPath = "/main.css"
        val expectedContentType = "     scroll-behavior: smooth"
        val response = homePage.getResponse(htmlPath)

        val actualContentType = response.split("\n")[1].split(";")[0]

        assertEquals(expectedContentType , actualContentType)
    }
}