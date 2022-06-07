package routeHandler.postRouteHandler

import com.google.gson.Gson
import io.mockk.every
import io.mockk.mockk
import jsonTemplate.ConfigurationTemplate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import routeHandler.postRouteHandler.postResponse.HandleCsv
import java.io.*
import java.net.Socket

private fun getMetaData(data: String): Array<ConfigurationTemplate> {
    val gson = Gson()
    return gson.fromJson(data, Array<ConfigurationTemplate>::class.java)
}


