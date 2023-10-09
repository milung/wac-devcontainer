# get the name of the folder from the ${PSScriptRoot}
$TemplateName =  Split-Path ${PSScriptRoot} -Leaf

. "${PSScriptRoot}/../scripts/common.ps1" -TemplateName $TemplateName


Write-Host "Running test $TemplateName"
try {
    apply_template $TemplateName
    test_ufe_build
}
finally {
   clean_template_output
}


