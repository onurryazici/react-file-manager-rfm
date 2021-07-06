import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.json.JSONObject;


public class CopyItemApp {
	
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
	private static void CopyItem(String target, String[] args) throws IOException {
		for(int i=1; i<args.length; i++) {
			String source = args[i];
			String destination  = target;
			String itemName = source.substring(source.lastIndexOf('/') + 1, source.length());
			String newItemName = FindSuitableName(destination, itemName);
			File sourceF = new File(source);
			File destinationF = new File(destination+"/"+newItemName);
			if(sourceF.isDirectory()) {
				FileUtils.copyDirectory(sourceF, destinationF);
			}
			else {
				FileUtils.copyFile(sourceF, destinationF);
			}
		}
	}
	public static void main(String[] args) throws Exception {
		try{
			String target = args[0];
			CopyItem(target, args);
			JSONObject output = new JSONObject();
			output.put("statu", true);
			output.put("message", "COPY_ITEM_SUCCESS");
			System.out.println(output.toString(4));
		}catch (Exception e) {
			JSONObject output = new JSONObject();
			output.put("statu", false);
			output.put("message", e.getMessage());
			System.out.println(output.toString(4));
		}
		
	}

}