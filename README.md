# cache_repo

## prepare offline installed files from visual studio build tool
```
.\vs_BuildTools.exe --layout d:\vslayout 
--add Microsoft.VisualStudio.Workload.ManagedDesktopBuildTools 
--add Microsoft.VisualStudio.Workload.MSBuildTools 
--add Microsoft.VisualStudio.Workload.VisualStudioExtensionBuildTools 
--add Microsoft.VisualStudio.Workload.WebBuildTools --includeRecommended  --lang en-US
# test code
--includeOptional
--add Microsoft.VisualStudio.Workload.VCTools 
--add Microsoft.NetCore.Component.Runtime.5.0
--add Microsoft.NetCore.Component.Runtime.6.0
--add Microsoft.Net.Component.4.5.TargetingPack 

```
- [components](https://learn.microsoft.com/en-us/visualstudio/install/workload-component-id-vs-build-tools?view=vs-2022)

### Gitlab Runner for Windows to build .NET Framework projects
- Prepare Visual Studio build tool offline installer, and following up to download components.
- Download .NET Framework 4.5.2 developer pack
- Download Nuget.exe
