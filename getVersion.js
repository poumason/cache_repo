/*
�� script �|�h���w���ɮר��o�u���㪩���s���v�A�p 1.4.0.0_build_0001 �o�ˡA��X���ɮ׸̡C
*/

var WshShell = new ActiveXObject("WScript.Shell");

var verFile, outFile, targetPlatform;
if (WScript.Arguments.Count() != 3) {
	WScript.Echo("Usage: cscript GetVersion.js input_name output_name target_platform");
	WScript.Echo("Example: cscript GetVersion.js version.cs version_string.txt #if WINDOWS_PHONE_APP");
    WScript.Quit(1);
} else {
	verFile = WScript.Arguments.Item(0);
	outFile = WScript.Arguments.Item(1);
	targetPlatform = WScript.Arguments.Item(2);
}

var CompleteVersion;
CompleteVersion = GetCompleteVersionStringFromPackage(verFile, targetPlatform);    // �q version.h ���o�����s���A�p: 1.4.0.0_build_0001

WScript.Echo("Writing" + CompleteVersion + " into file " + outFile);
WriteFile(outFile, CompleteVersion);
WScript.Quit(0);

// ��X���㪩���s�����ɮ׸�
function WriteFile(OutputFile, VersionString) {
	var fso, f;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	f = fso.CreateTextFile(OutputFile, true);
	f.WriteLine(VersionString);
	f.Close();
}

// �ǤJ�����������W�٩M�@��r��A���o�����������s��
// �p�G�p�G line �O #define HIFREE_MAIN_VERSION (1)�AVersionMacroName �O HIFREE_MAIN_VERSION �h�|�Ǧ^ 1
//#define HIFREE_MAIN_VERSION (1)
//#define HIFREE_SUB_VERSION (4)
//#define HIFREE_MINOR_VERSION_0 (0)
//#define HIFREE_MINOR_VERSION_1 (0)
//#define HIFREE_BUILD_NUMBER (1)
// �t�X C# �S�� header �ҥH�令 cs �榡��
//public const int KKBOXWP_MAJOR_MAIN_VERSION = (2);
//public const int KKBOXWP_MAJOR_SUB_VERSION = (5);
//public const int KKBOXWP_MINOR_MAIN_VERSION = (0);
//public const int KKBOXWP_MINOR_SUB_VERSION = (0);
//public const int KKBOXWP_BUILD_NUMBER = (3);
function GetVersion(line, VersionMacroName) {
	var reg_Int2 = VersionMacroName + " = \\w*[\(](\\d+)[\)]"; // ���X�Q () �]�_�Ӫ��Ʀr
	var result;
	
	var reStr2 = new RegExp(reg_Int2, "g"); // ��Q () �]�_�Ӫ��Ʀr

	result = line.match(reStr2);
	
	if (result != null) {
		// �p�G�� match�A�h�� RegExp.$1 ���X
		var version = RegExp.$1;
		return version;
	} else {		
		return null;
	}
}

// �q VersionFile ���o���㪺�����s���A�����s���O�� "1.4.0.0_build_0001" �o�˪��r��
function GetCompleteVersionString(VersionFile, platformName) {
	var MainVersion = "0", SubVersion = "0",  MinorVersion0 = "0",  MinorVersion1 = "0";
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var file = fso.OpenTextFile(VersionFile, 1, false); // 1 �O ForReading
	var canKeep = false;
	while (!file.AtEndOfStream) {
		line = file.ReadLine();
		if (line.indexOf(platformName) != -1) {
			canKeep = true;
		} else if (line.indexOf("#endif") != -1) {
			canKeep = false;
		}
		if (canKeep == false) continue;
		var result = GetVersion(line, "KKBOXWP_MAJOR_MAIN_VERSION");
		if (result != null) {
			MainVersion = result;
			// WScript.Echo(result);
		}
		
		result = GetVersion(line, "KKBOXWP_MAJOR_SUB_VERSION");
		if (result != null) {
			SubVersion = result;
			// WScript.Echo(result);
		}

		result = GetVersion(line, "KKBOXWP_MINOR_MAIN_VERSION");
		if (result != null) {
			MinorVersion0 = result;
			// WScript.Echo(result);
		}

		result = GetVersion(line, "KKBOXWP_MINOR_SUB_VERSION");
		if (result != null) {
			MinorVersion1 = result;
			// WScript.Echo(result);
		}
	}
	file.Close();
	fso=null;
	// 1.4.0.0_build_0001
	var result = MainVersion + "." + SubVersion + "." + MinorVersion0 + "." + MinorVersion1;
	WScript.Echo(result);
	return result;
}

// �q VersionFile ���o���㪺�����s���A�����s���O�� "1.4.0.0_build_0001" �o�˪��r��
function GetCompleteVersionStringFromPackage(VersionFile, platformName) {
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var file = fso.OpenTextFile(VersionFile, 1, false); // 1 �O ForReading
	var result = "";
	while (!file.AtEndOfStream) {
		line = file.ReadLine();
		if (line.indexOf("Identity") != -1) {
			var prefix = line.indexOf("Version=");
			var midfix = line.substring(prefix + 9);
			result = midfix.substring(0, midfix.lastIndexOf("\""));
			break;
		} else {
			continue;			
		}
	}
	file.Close();
	fso=null;
	WScript.Echo(result);
	return result;
}
