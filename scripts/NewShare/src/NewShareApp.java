import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.json.JSONObject;



public class NewShareApp {

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
	
	private static void NewShare(String folderToShare, String[] args) throws IOException {
		String itemName = folderToShare.substring(folderToShare.lastIndexOf('/') + 1, folderToShare.length());
		String source   = folderToShare;
		File sourceDir  = new File(source);
		String destination  = "/home/"+System.getProperty("user.name")+"/drive-shared/";
		String targetName   = FindSuitableName(destination,itemName);
		File destinationDir = new File(destination+targetName); 
		
		// MOVE TO SHARED DRIVE
		Files.move(sourceDir.toPath(), destinationDir.toPath(),StandardCopyOption.ATOMIC_MOVE);

		for(int i=1; i<args.length; i++) {
			/// GIVE PERMISSION
			String[] parsed= args[i].split(":");
			String username    = parsed[0];
			String permissions = parsed[1];
			String shareCommandUserDefault = "setfacl -Rm d:"+username+":"+permissions+" \'"
					+ destinationDir.getPath() + "\'";
			String shareCommandUser = "setfacl -Rm u:"+username+":"+permissions+" \'"
					+ destinationDir.getPath() + "\'";
			String shareCommand = (shareCommandUserDefault + " && " +shareCommandUser);
			
			Runtime.getRuntime().exec(new String[] {"bash","-c",shareCommand});
			/// LINK TO USER
			Path userShortcutPath = Paths.get("/home/"+username+"/drive-sharedWithMe/");
			String userShortcutName = FindSuitableName(userShortcutPath.toString(), itemName);
			
			Path shortcut = Paths.get("/home/"+username+"/drive-sharedWithMe/"+userShortcutName);
			Files.createSymbolicLink(shortcut,destinationDir.toPath());
		}
		
	}
	
	public static void main(String[] args) throws Exception{
		try {
			String folderToShare = args[0];
			NewShare(folderToShare, args);
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
