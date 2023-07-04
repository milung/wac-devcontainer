param(
    [Parameter(Mandatory)] $prefix,
    $oldPrefix = "pfx"

)

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

$nodePath = (Get-Command node).Source
$renamePfxPath = Join-Path $scriptPath "rename-pfx.mjs"

# check if current working directory contains folder ambulance-ufe
# and if so, then change to that folder and execute npm init

$workingDir = Get-Location
$ambulanceUfePath = Join-Path $workingDir "ambulance-ufe"

if (Test-Path $ambulanceUfePath) {
    Set-Location $ambulanceUfePath
    $nodePath $renamePfxPath --new-prefix $prefix --old-prefix $oldPrefix
    npm install
}

#return to original working directory
Set-Location $workingDir
