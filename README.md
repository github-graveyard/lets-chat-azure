# Let's Chat - Azure Plugin

Add Azure file support to [Let's Chat](http://sdelements.github.io/lets-chat/).

### Install
```
npm install lets-chat-azure
```

### TODO
- [ ] Create Azure container if not exists
- [ ] Update/Set container privacy settings to public


### Configure
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
