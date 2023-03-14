import groovy.io.FileType
import groovy.xml.XmlUtil

def xmlDirPaths = args

xmlDirPaths.each {
    println ""
    println """Sorting ${it}"""
    sortDir(it)
}

def sortDir(path) {
    def xmlDir = new File(path)
    def sortedXmlDir = new File(path + "sorted/")
    sortedXmlDir.mkdir()
    def count = 0
    xmlDir.eachFileRecurse(FileType.FILES) {
        if (it.name.endsWith('.xml')) {
            count = count + 1
            waiter(count)
            def parsedXml = new XmlSlurper().parse(it)
            new File(sortedXmlDir, it.name).withWriter { out ->
                out.write(XmlUtil.serialize(parsedXml))
            }
        }
    }

    println ""
    println """${count} number of xml files formatted and placed in ${sortedXmlDir.name}"""
}

def waiter(count) {
    def waiterSign = "*"
    if (count % 60) {
        print waiterSign
    } else {
        println waiterSign
    }
}