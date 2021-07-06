import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CopyPermissionsApp {
	
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

	private static JSONArray GetSharedUsersWithPermissions(File source) {
		try {
			Path sourcePath 			= source.toPath();
			String jsonStruct           = "{\"username\":\"\",\"permission\":\"\"}";
			String command              = "getfacl -cp \'"+ sourcePath.toString() +"\' | grep 'default:user:' | awk -v FS=\"(user:|\\n)\" '{print $2}'";
			JSONArray sharedOutputArray = new JSONArray();
			ArrayList<String> users     = RunCommand(command);
			
			if(users.size() > 0) {
				for(int i=0; i<users.size(); i++) {
					JSONObject json    = new JSONObject(jsonStruct);
					String[] parsed    = users.get(i).split(":");
					String username    = parsed[0];
					String permissions = parsed[1];
					
					String owner = java.nio.file.Files.getOwner(source.toPath()).getName();
					String name = username.length() != 0 ? username : owner;					
					json.put("username", name);
					json.put("permission", permissions);
					sharedOutputArray.put(json);
				}
			}
			return sharedOutputArray;
			
		}catch(Exception e) {
			return null;
		}
	}
	
	private static void SetPermission(File destination, ArrayList<String> permissionData) throws IOException {
		String data = String.join(",", permissionData);
		String clearPermissionCommand = "setfacl -Rbk \'" + destination.toPath()+"\' && setfacl -Rm o:--x \'" + destination.toPath() + "\'";
		String copyPermissionCommand  = "setfacl -Rm "+data+" \'"+ destination.getPath() + "\'";
		String command = clearPermissionCommand + " && " + copyPermissionCommand;
		Runtime.getRuntime().exec(new String[] {"bash","-c",command});
	}
	
	public static void main(String[] args) throws JSONException, IOException {
		// TODO Auto-generated method stub
		File source      = new File(args[0]);
		File destination = new File(args[1]);
		
		ArrayList<String> permissionData = new ArrayList<String>();
		
		JSONArray usersAndPermissions = GetSharedUsersWithPermissions(source);
		for(int i=0; i<usersAndPermissions.length();i++) {
			JSONObject tempObject = usersAndPermissions.getJSONObject(i);
			String username   = tempObject.optString("username");
			String permission = tempObject.optString("permission");
			
			String uvalue = "u:"+username+":"+permission;
			String dvalue = "d:"+username+":"+permission;
			String value  = uvalue+","+dvalue;
			permissionData.add(value);
		}
		
		SetPermission(destination, permissionData);
	}

}
