
# react-file-manager-rfm

  

> Created with create-react-library package

  

[![NPM](https://img.shields.io/npm/v/react-file-manager-rfm.svg)](https://www.npmjs.com/package/react-file-manager-rfm) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Introduction

  

This project builded for viewing data(folders, images, etc.) on cloud storage. You can import this file manager component to your project. You can create, upload or remove file with this component. Also we are using the rest api for processing request with jwt. So we must create rest api for this project. And this api request details explained on `api requests` page.

  

## Installation

  

Download packed file `react-file-manager-rfm-1.0.0.tgz`. If you want to change some property on file manager you must be pack with `npm pack` command. This command will generate .tgz file.

```bash

npm install ./react-file-manager-rfm-1.0.0.tgz

```

## Usage

  
  

```jsx

import  React, { Component } from  'react'

  

import  RFM  from  'react-file-manager-rfm'

import  'react-file-manager-rfm/dist/index.css' // It must be included

  

class  Example  extends  Component {
render() {
	return  
		<RFM
			location = "YOUR_LOCATION"  // e.g. /home/user
			rfmWindow = "SHARED_WITH_ME"  // Explained on "windows" page
			username = "user1"  			// Logged username
			API_URL = "http://192.168.91.130:3030"
			API_URL_UserAuthentication = "/api/open-service/userAuthentication"
			API_URL_AddToDrive = "/api/secured/addToDrive"
			API_URL_RemoveItemPermanently = "/api/secured/removeItemPermanently"
			API_URL_RemoveSharedItem = "/api/secured/removeSharedItem"
			API_URL_CreateCopy = "/api/secured/createCopy"
			API_URL_CreateDirectory = "/api/secured/createDirectory"
			API_URL_Download = "/api/secured/download"
			API_URL_EmptyTrash = "/api/secured/emptyTrash"
			API_URL_GetDirectory = "/api/secured/getDirectory"
			API_URL_GetDataSingle = "/api/secured/getDataSingle"
			API_URL_GetImage = "/api/secured/getImage"
			API_URL_MoveItems = "/api/secured/moveItems"
			API_URL_MoveToTrash = "/api/secured/moveToTrash"
			API_URL_MoveToDrive = "/api/secured/moveToDrive"
			API_URL_RemovePermission = "/api/secured/removePermission"
			API_URL_UpdatePermission = "/api/secured/updatePermission"
			API_URL_RenameItem = "/api/secured/renameItem"
			API_URL_RestoreItems = "/api/secured/restoreItems"
			API_URL_NewShareItem = "/api/secured/newShareItem"
			API_URL_ExistShareItem = "/api/secured/existShareItem"
			API_URL_UploadItem = "/api/secured/uploadItem"
			API_URL_IsUserExist = "/api/secured/isUserExist"
			tokenName = "user-token" // When you logging you must use local.storageItem("your token name here")
			language = "tr" // Currently only supports Turkish. Other languages will be add soon
		/>
	}
}
```

## Screenshots

![enter image description here](https://github.com/onurryazici/react-file-manager-rfm/blob/main/screenshots/scr1.png)
  
![enter image description here](https://github.com/onurryazici/react-file-manager-rfm/blob/main/screenshots/scr2.png)

![enter image description here](https://github.com/onurryazici/react-file-manager-rfm/blob/main/screenshots/scr3.png)


## License

  

MIT © [onurryazici](https://github.com/onurryazici)