import groovy.io.FileType

def dir1Path = args[0]
def dir2Path = args[1]
def resFilePath = args[2]

def dir1 = new File(dir1Path)
def dir2 = new File(dir2Path)
def resFile = new File(resFilePath)

resFile.withWriter { out ->
    toSkip = differ(dir1, dir2, out, [])
    differ(dir2, dir1, out, toSkip)
}

def differ(firstDir, secondDir, out, filesToSkip) {
    def dirFiles = []
    firstDir.eachFileRecurse(FileType.FILES) {
        if (! filesToSkip.contains(it.name)) {
            dirFiles.add(it.name)
            def dir2file = new File(secondDir, it.name)
            if (dir2file.exists()) {
                def firstFileTokens = it.text.tokenize( '\n' )
                def secondFileTokens = dir2file.text.tokenize( '\n' )
                def onlyFirst = firstFileTokens - secondFileTokens
                def onlySecond = secondFileTokens - firstFileTokens
                out.writeLine("Diff in file: " + it.name)
                if (onlyFirst.size() > 0 || onlySecond.size() > 0) {
                    out.println "+"
                    onlyFirst.each { out.writeLine it }
                    out.println "-"
                    onlySecond.each { out.writeLine it }
                } else {
                    out.writeLine("No diff")
                }

            } else {
                out.writeLine("No file match on " + it.name)
            }
            out.writeLine("-" * 100)
        }
    }
    dirFiles
}