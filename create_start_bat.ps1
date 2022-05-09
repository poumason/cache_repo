echo $args

foreach ($fab in $args) {
    $file="./output/start_$fab.bat"
    New-Item -Force $file -ItemType File -Value "powershell ../execute_fab.ps1 $fab`r`npause"
}