# get the name of the folder from the ${PSScriptRoot}
$TemplateName =  Split-Path ${PSScriptRoot} -Leaf

. "${PSScriptRoot}/../scripts/common.ps1" -TemplateName $TemplateName


Write-Host "Running test $TemplateName"
try {
    apply_template $TemplateName

    openapi_webapi_stub
    test_webapi_build
    
    test_ufe_build
    openapi_ufe_client
    docker_build_ufe
    
    try_cluster localhost
    try_cluster wac-aks

}
finally {
   clean_template_output
}


