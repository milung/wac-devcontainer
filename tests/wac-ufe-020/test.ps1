$TemplateName = 'wac-ufe-020'

. "${PSScriptRoot}/../scripts/common.ps1" -TemplateName $TemplateName

# get the name of the test from the script name
$TestName =  Split-Path ${PSScriptRoot} -Leaf
Write-Host "Running test $TestName"
try {
    apply_template
    test_ufe_build -WithTest $false
}
finally {
   clean_template_output
}


