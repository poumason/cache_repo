$file = "./web.config"
$xml = [xml](Get-Content $file)
# $node=$xml.SelectSingleNode("//add[@key='F13SERVICE_HEADER']")

# echo $node.Value

$nodes = $xml.SelectNodes("//add")
$pairs = [System.Collections.ArrayList]::new()

foreach ($node in $nodes) {
    if ($node.key.IndexOf("SQL_CONNECTION") -ne -1 -or
        $node.key -eq "SERVICE_HEADER" ) {
        $node.ParentNode.RemoveChild($node)
        continue
    }

    if ($node.key.IndexOf("SERVICE_HEADER") -ne -1) {
        $pairs.add($node)
        $node.ParentNode.RemoveChild($node)
        continue
    }
}

$temp_file = "./output/web.config.temp"
$xml.Save($temp_file)

foreach ($pair in $pairs) {
    $temp_xml = [xml](Get-Content $temp_file)
    $settings = $temp_xml.SelectSingleNode("//appSettings")
    $new_node = $temp_xml.CreateElement("add")
    $new_node.SetAttribute("key", "SERVICE_HEADER")
    $new_node.SetAttribute("value", $pair.value)
    $settings.AppendChild($new_node)
    $temp_xml.Save("./output/$($pair.key).web.config")
}
