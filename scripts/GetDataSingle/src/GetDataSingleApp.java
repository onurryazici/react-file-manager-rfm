import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
///////////////OUTPUT //////////////
//	Created by onurryazici at 30.12.2020 
//	github : github.com/onurryazici
//
//	{
//		"statu":true,
//		"items":[{
//			"type":"",
//			"name":"",
//			"absolutePath":"",
//			"owner":"",
//			"lastAccessTime":"",
//			"lastModifyTime":"",
//			"read":false,
//			"write":false,
//			"execute":false,
//			"sharedWith":[{
//				"username":"",
//				"read":false,
//				"write":false,
//				"execute":false
//			}]
//		}]
//	}

public class GetDataSingleApp {
	
	private static ArrayList<String> RunCommand(String command)
	{
		ArrayList<String> result = new ArrayList<String>();
		try {
			String cmd      = command;
		    Process process = Runtime.getRuntime().exec(new String[] {"bash","-c",cmd});
		    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		    
		    String line;
		    while ((line = reader.readLine()) != null) {
		        result.add(line);
		    }
		    reader.close();
		} catch (IOException e) {
			result = new ArrayList<String>();
			return result;		
		    //Nothing
		}
		return result;
	}

	private static JSONArray GetSharedUsersWithPermissions(String itemPath) {
		try {
			String jsonStruct           = "{\"username\":\"\",\"read\":false,\"write\":false,\"execute\":false}";
			String command              = "getfacl -cp \'"+ itemPath +"\' | grep 'default:user:' | awk -v FS=\"(user:|\\n)\" '{print $2}'";
			JSONArray sharedOutputArray = new JSONArray();
			ArrayList<String> users     = RunCommand(command);
			
			if(users.size() > 0) {
				
				for(int i=0; i<users.size(); i++) {
					JSONObject json    = new JSONObject(jsonStruct);
					String[] parsed    = users.get(i).split(":");
					String username    = parsed[0];
					String permissions = parsed[1];
					
					if(username.length() != 0) {
						boolean read    = (permissions.charAt(0) == 'r') ? true : false;
						boolean write	= (permissions.charAt(1) == 'w') ? true : false;
						boolean execute = (permissions.charAt(2) == 'x') ? true : false;					
						json.put("username", username);
						json.put("read",     read);
						json.put("write",    write);
						json.put("execute",  execute);
						sharedOutputArray.put(json);
					}
				}
			}
			return sharedOutputArray;
			
		}catch(Exception e) {
			return null;
		}
	}
	
	private static String GetFileExtension(String fileName) {
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
        return fileName.substring(fileName.lastIndexOf(".")+1);
        else return "";
    }
	
	private static JSONObject GetInfo(File target) throws JSONException, IOException, ParseException {
		JSONObject output       = new JSONObject();
		JSONObject values 		= new JSONObject();
		Path path 				= target.toPath();
		BasicFileAttributes fileAttributes = Files.readAttributes(path, BasicFileAttributes.class);
		DateFormat outputFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm",Locale.US);
		DateFormat inputFormat  = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss.SSSSSS'Z'");
		Date lastAccessDate     = inputFormat.parse(fileAttributes.lastAccessTime().toString());
		Date lastModifyDate     = inputFormat.parse(fileAttributes.lastAccessTime().toString());

		values.put("type", target.isDirectory() ? "directory" : "file");
		values.put("name", target.getName());
		values.put("absolutePath", target.getAbsolutePath());
		values.put("realPath", target.toPath().toRealPath());
		values.put("owner", Files.getOwner(path));
		values.put("lastAccessTime", outputFormat.format(lastAccessDate));
		values.put("lastModifyTime", outputFormat.format(lastModifyDate));
		values.put("read"      , target.canRead());
		values.put("write"     , target.canWrite());
		values.put("execute"   , target.canExecute());
		values.put("sharedWith", GetSharedUsersWithPermissions(path.toString()));
		values.put("extension" , GetFileExtension(target.getName()));
		output.put("item", values);
		output.put("statu", true);
		return output;
	}
	
	public static void main(String[] args) throws JSONException {
		try {
			String parentPath = args[0];
			File target       = new File(parentPath);
			JSONObject result = new JSONObject();
			if(target.isDirectory())
			{
				RunCommand("find \'" + target + "\' -xtype l -delete"); // Clearing for broken symlinks
				result = GetInfo(target);
			}
			else 
			{
				result = GetInfo(target);
			}
			System.out.println(result.toString(4));
		} catch (Exception e) { 
			JSONObject output = new JSONObject();
			output.put("statu", false);
			output.put("message", e.getMessage());
			System.out.println(output.toString(4));
        } 
	}
}