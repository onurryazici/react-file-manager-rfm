import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import org.json.JSONObject;


public class MoveItemApp {
	/// INPUT
	/// args[0] 	: Where to move items
	/// args [1..n] : Location of items to move
	///
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
	
	private static void MoveItem(String target, String[] args) throws IOException {
		for(int i=1; i<args.length; i++) {
			String source = args[i];
			String destination  = target;
			String itemName = source.substring(source.lastIndexOf('/') + 1, source.length());
			String newItemName = FindSuitableName(destination, itemName);
			File sourceF = new File(source);
			File destinationF = new File(destination+"/"+newItemName);
			if(sourceF.isDirectory()) {
				Files.move(sourceF.toPath(), destinationF.toPath(), StandardCopyOption.ATOMIC_MOVE);
				String clearPermissions = "setfacl -Rbk \'" + destinationF.toPath()+"\' && setfacl -Rm o:--x \'" + destinationF.toPath() + "\'";
				String setParentPermission = "getfacl -pa \'" + destination + "\' | setfacl -RM- \'" + destinationF.toPath() + "\'";
				String command = clearPermissions + " && " + setParentPermission;
				Runtime.getRuntime().exec(new String[] {"bash","-c",command});				
			}
			else {
				sourceF.renameTo(destinationF);
				String clearPermissions = "setfacl -Rbk \'" + destinationF.toPath()+"\' && setfacl -Rm o:--x \'" + destinationF.toPath() + "\'";
				String setParentPermission = "getfacl -pa \'" + destination + "\' | setfacl --set-file=- \'" + destinationF.toPath() + "\'";
				String command = clearPermissions + " && " + setParentPermission;
				Runtime.getRuntime().exec(new String[] {"bash","-c",command});			
			}
		}
	}
	public static void main(String[] args) throws Exception {
		try {
			String target = args[0];
			MoveItem(target,args);
			JSONObject output = new JSONObject();
			output.put("statu", true);
			output.put("message", "MOVE_ITEM_SUCCESS");
			//System.out.println(output.toString(4));
		}catch (Exception e) {
			JSONObject output = new JSONObject();
			output.put("statu", false);
			output.put("message", e.getMessage());
			System.out.println(output.toString(4));
		}
	}

}