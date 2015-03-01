# Let's Chat - Azure Plugin

Add Azure file support to [Let's Chat](http://sdelements.github.io/lets-chat/).

The plugin will create the specified storage container if necessary.
If you are using an existing container, make sure you allow anonymous read access to it.

### Install
```
npm install lets-chat-azure
```

### Configure

#### YAML
Add (and customize) these settings to your ```settings.yml``` file:

```yml
files:
  enable: true
  provider: azure

  azure:
    storageAccount: lets-chat
    storageAccessKey: dVRx...
    storageContainer: files
```

#### Environment Variables
| YAML Path | Env Variable |
|-----------|--------------|
| files.enable | LCB_FILES_ENABLE |
| files.provider | LCB_FILES_PROVIDER |
| files.azure.storageAccount | LCB_FILES_AZURE_STORAGE_ACCOUNT |
| files.azure.storageAccessKey | LCB_FILES_AZURE_STORAGE_ACCESS_KEY |
| files.azure.storageContainer | LCB_FILES_AZURE_STORAGE_CONTAINER |
