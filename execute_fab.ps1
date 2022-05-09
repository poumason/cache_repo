$file = "./config.xml"
$xml=[xml](Get-Content $file)
$node=$xml.SelectSingleNode("//add[@key='FAB']")
$node.SetAttribute("value", $args[0])
$xml.Save($file)

# Execute instance with args