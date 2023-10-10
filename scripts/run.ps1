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

    "unify-templates" {
        $devcontainerJson = Get-Content -Path "$ProjectRoot/templates/wac-base/.devcontainer/devcontainer.json" -Raw 
        $template = Get-Content -Path "$ProjectRoot/templates/wac-base/devcontainer-template.json" -Raw | ConvertFrom-Json
        $options = $template.options
        $version = $template.version
        $templateFolders = Get-ChildItem -Path "$ProjectRoot/templates" -Directory | Where-Object { $_.Name -ne "wac-base" }

        
        foreach ($templateFolder in $templateFolders) {
            Copy-Item -Path "$ProjectRoot/templates/wac-base/.devcontainer/init" -Destination "$templateFolder/.devcontainer/" -Force
            Copy-Item -Path "$ProjectRoot/templates/wac-base/.devcontainer/init.cmd" -Destination "$templateFolder/.devcontainer/" -Force
            $devcontainerPath = "$templateFolder/.devcontainer/devcontainer.json"
            $devcontainerJson | Set-Content -Path $devcontainerPath

            $template = (Get-Content -Path "$templateFolder/devcontainer-template.json" -Raw | ConvertFrom-Json)
            $template = $template | Select-Object -Property * -ExcludeProperty options,version
            $template | Add-Member -MemberType NoteProperty -Name version -Value $version
            $template | Add-Member -MemberType NoteProperty -Name options -Value $options
            $template | ConvertTo-Json -Depth 100 | Set-Content -Path "$templateFolder/devcontainer-template.json"
        }
    }

    default {
        Write-Output "Unknown command: $command"
        throw "Unknown command: $command"
    }
}

Write-Output "Done"
