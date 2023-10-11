param (
    [Parameter(Mandatory=$true)]
    [string]$TemplateName
)

$ProjectRoot = (Resolve-Path "${PSScriptRoot}/../..").Path
$TestsRoot = "${ProjectRoot}/tests"

$TestOutput = "${ProjectRoot}/out/$TemplateName"
$TestTemplate = "${ProjectRoot}/templates/$TemplateName"

function msg($Message) {
    Write-Host -Foreground Yellow  -NoNewLine "${TemplateName}: " 
    Write-Host $Message
}

function apply_template {
    msg "Applying template $TemplateName into $TestOutput ..."

    New-Item -Path $TestOutput -ItemType Directory -Force | Out-Null

    if (Test-Path -Path $TestOutput) {
        Remove-Item -Recurse -Force $TestOutput
    }

    Copy-Item -Path $TestTemplate -Destination $TestOutput -Recurse -Force
    $Options = Get-Content -Path "${TestsRoot}/options.jsonc" | ConvertFrom-Json

    $Files = Get-ChildItem -Path $TestOutput -Recurse | where { !$_.PSisContainer }
    $Files | ForEach-Object {
        $File = $_
        $Options | Get-Member -MemberType NoteProperty  | ForEach-Object {
            $Name = $_.Name
            $Value = $Options.$Name
        
            $Content = Get-Content -Path $File.FullName
            $Content | ForEach-Object {
                $Line = $_
                $Line -replace "\`${templateOption:$Name}", $Value
            } | Set-Content -Path $File.FullName
        }
    }
}

function clean_template_output {
    if ($env:KeepTestOutput) {
        msg "Keeping test output $TestOutput"
        return
    }
    else {
        if ($IsLinux) {
            sudo chown -R ${USER}:${USER} $TestOutput
        }
        if (Test-Path -Path $TestOutput ) {
            Remove-Item -Recurse -Force $TestOutput
        }
    }
}

function test_ufe_build($WithTest=$true) {
    $location = Get-Location
    Set-Location -Path $TestOutput/ambulance-ufe

    msg "Running ambulance-ufe npm install ..."
    try {
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: npm install failed"
            throw "npm install failed"
        }
        
        msg  "Running ambulance-ufe npm run build ..."
        npm run build

        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: npm run build failed"
            throw "npm run build failed"
        }

        if ($WithTest) {
            msg "${TemplateName}: Running ambulance-ufe npm run test ..."
            npm run test

            if ($LASTEXITCODE -ne 0) {
                Write-Error "${TemplateName}: npm run test failed"
                throw "npm run test failed"
            }
        }
    }
    finally {
        Set-Location -Path $location
    }
}

function test_webapi_build($WithTest=$true) {
    $location = Get-Location
    Set-Location -Path $TestOutput/ambulance-webapi

    msg "Running webapi go mod tidy ..."
    try {
        go mod tidy
        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: go mod tidy failed"
            throw "go mod tidy failed"
        }
        
        msg  "Running ambulance-webapi build ..."
        go build ./cmd/ambulance-api-service

        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: ambulance-webapi build failed"
            throw "ambulance-webapi build failed"
        }

        if ($WithTest) {
            msg "Running ambulance-webapi tests ..."
            go test ./...

            if ($LASTEXITCODE -ne 0) {
                Write-Error "${TemplateName}: ambulance-webapi tests failed"
                throw "ambulance-webapi tests failed"
            }
        }
    }
    finally {
        Set-Location -Path $location
    }
}


function docker_build_ufe {
    $location = Get-Location
    Set-Location -Path $TestOutput/ambulance-ufe

    msg "Running ambulance-ufe docker build ..."
    try {
        docker build -t ambulance-ufe:${TemplateName} -f build/docker/Dockerfile .

        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: docker build failed"
            throw "docker build failed"
        }
    }
    finally {
        Set-Location -Path $location
    }
}

function openapi_ufe_client {
    $location = Get-Location
    Set-Location -Path $TestOutput/ambulance-ufe

    msg "Generating axios client from openapi ..."
    try {
        npm run openapi
        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: openapi client generation failed"
            throw "openapi client generation failed"
        }
    }
    finally {
        Set-Location -Path $location
    }
}

function openapi_webapi_stub {
    $location = Get-Location
    Set-Location -Path $TestOutput/ambulance-webapi

    msg "Generating webapi stub from openapi ..."
    try {
        ./scripts/run.ps1 openapi
        if ($LASTEXITCODE -ne 0) {
            Write-Error "${TemplateName}: openapi stub generation failed"
            throw "openapi stub generation failed"
        }
    }
    finally {
        Set-Location -Path $location
    }
}

function try_cluster {

    # get cluster name as first argument or default to localhost
    $clusterName = $args[0]
    if (!$clusterName) {
        $clusterName = "localhost"
    }
    # get directories in the ambulance-gitops/clusters/localhost directory that contains kustomization.yaml
    $manifests = Get-ChildItem -Path "${TestOutput}/ambulance-gitops/clusters/$clusterName" -Directory | where { Test-Path -Path "$($_.FullName)/kustomization.yaml" }

    #run kustomize in all of this directories
    $manifests | ForEach-Object {
        $dir = $_.FullName

        $name = Split-Path -Path $dir -Leaf

        msg "Running kustomize build in $dir ..."
        try {
            kubectl kustomize $dir >> $TestOutput/${$name}.kustomize.log
            if ($LASTEXITCODE -ne 0) {
                Write-Error "${TemplateName}: kustomize build failed"
                throw "kustomize build failed"
            }
        }
        catch {
            Write-Error "${TemplateName}: kustomize build failed"
            throw "kustomize build failed"
        }
    }
}