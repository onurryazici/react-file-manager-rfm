import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.json.JSONObject;

public class ExistShareApp {
	
	private static String FindSuitableName(String destination, String fileName) {
		if(!destination.endsWith("/"))
			destination = destination + "/";
		
		String fullPath = destination + fileName;
		String newName  = fileName;
		int backupNumber = 1;
		while(new File(fullPath).exists()) {
			newName = String.format("[%d] %s", backupNumber++, fileName);
			fullPath = destination + newName;
		}
		return newName;
	}
	
	private static void ExistShare(String destination, String folderToShare, String userAndPermission) throws IOException {
		String itemName     = folderToShare.substring(folderToShare.lastIndexOf('/') + 1, folderToShare.length());
		String[] parsed		= userAndPermission.split(":");
		String username    	= parsed[0];
		String permissions 	= parsed[1];
		File destinationDir = new File(folderToShare);
		/// GIVE PERMISSION
		
		String shareCommandUserDefault = "setfacl -Rm d:"+username+":"+permissions+" "
				+ folderToShare;
		String shareCommandUser = "setfacl -Rm u:"+username+":"+permissions+" "
				+ folderToShare;
		String shareCommand = (shareCommandUserDefault + " && " +shareCommandUser);
			
		Runtime.getRuntime().exec(new String[] {"bash","-c",shareCommand});
		/// LINK TO USER
		Path userShortcutPath = Paths.get("/home/"+username+"/drive-sharedWithMe/");
		String userShortcutName = FindSuitableName(userShortcutPath.toString(), itemName);
			
		Path shortcut = Paths.get("/home/"+username+"/drive-sharedWithMe/"+userShortcutName);
		Files.createSymbolicLink(shortcut,destinationDir.toPath());
		
	}
	public static void main(String[] args) throws Exception {
		try {
			String target			 = args[0];
			String folderToShare 	 = args[1];
			String userAndPermission = args[2];
			ExistShare(target, folderToShare, userAndPermission);
			JSONObject output = new JSONObject();
			output.put("statu", true);
			output.put("message", "NEW_SHARE_SUCCESS");
			System.out.println(output.toString(4));
			
		}catch (Exception e) {
			JSONObject output = new JSONObject();
			output.put("statu", false);
			output.put("message", e.getMessage());
			System.out.println(output.toString(4));
		}
	}

}
