param (
    $command 
)

if ( -not $command ) {
    $command = "openapi"
}

$ProjectRoot = "${PSScriptRoot}/.."



switch ($command) {
    "test" {
        if ( -not $args ) {
            $testFiles = Get-ChildItem -Path $ProjectRoot/tests -Filter test.ps1 -Recurse
            foreach ($testFile in $testFiles) {
                $testName = $testFile.Directory.Name
                & $ProjectRoot/tests/$testName/test.ps1
            }
        } else {
            $testName = $args[0]
            & $ProjectRoot/tests/$testName/test.ps1
        }
    }

    default {
        Write-Output "Unknown command: $command"
        throw "Unknown command: $command"
    }
}

Write-Output "Done"
