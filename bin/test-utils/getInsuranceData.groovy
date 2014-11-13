import groovy.sql.Sql
import java.sql.Driver

def sqlLinda = Sql.newInstance('jdbc:jtds:sybase://lindadb.maxm.se:5000/Linda', 'LindaUser', 'VluvDuj', 'net.sourceforge.jtds.jdbc.Driver')

def insuranceDataSql = """
select b.insuranceState, b.policyNumber, b.socialSecurityNumber, ai.planPremiumPercentage from
        dbo.benefit b INNER JOIN dbo.AdditionalInfo ai
        ON b.socialSecurityNumber = ai.insuredSocialSecurityNumber
                AND b.policyNumber = ai.policyNumber
                AND b.registrationNumber = ai.registrationNumber
        WHERE b.insuranceState IN ('ACTIVE_STATE', 'CREATE_STATE')
                AND b.policyNumber in (%1s)
                AND NOT EXISTS (
                        SELECT 1 FROM dbo.CancelInfo ci
                                WHERE b.socialSecurityNumber = ci.insuredSocialSecurityNumber
                                        AND b.policyNumber = ci.policyNumber
                                        AND b.registrationNumber = ci.registrationNumber
                                        AND ci.verifiedDate IS NOT NULL
                )
"""

lines = []
System.in.eachLine {
    lines << it
}

lines.collate(100).subList(0,2).each { policyNumberInputs ->
    if (policyNumberInputs) {
        def res = sqlLinda.rows String.format(insuranceDataSql.toString(), createSqlData(policyNumberInputs))
        printResult(res)
    }
}

def createSqlData(input) {
    input = input.collect { "'" + it + "'" }
    input.join(",")
}

def printResult(res) {
    res.each {
        println it
    }
}