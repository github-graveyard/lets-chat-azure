var azure = require('azure-storage'),
    fs = require('fs');

function Azure(options) {
  this.options = options;

  this.getUrl = this.getUrl.bind(this);
  this.save = this.save.bind(this);
}

Azure.defaults = {
  storageAccount: '',
  storageContainer: '',
  storageAccessKey: ''
}

Azure.prototype.getUrl = function(file) {
  return 'https://#{account}.blob.core.windows.net/#{container}/#{id}/#{name}'
    .replace('#{account}', this.options.storageAccount)
    .replace('#{container}', this.options.storageContainer)
    .replace('#{id}', file._id)
    .replace('#{name}', file.name);
};

Azure.prototype.save = function(options, callback) {
  var that = this,
      file = options.file,
      doc = options.doc,
      fileFolder = doc._id,
      filePath = fileFolder + '/' + doc.name,
      containerAccessLevel = 'blob', //allows anonymous read access to blob content and metadata within this container, but not to container metadata such as listing all blobs within a container.
      storageAccount = this.options.storageAccount,
      storageAccessKey = this.options.storageAccessKey,
      storageContainer = this.options.storageContainer,
      blobService,
      stream;

  if(!storageAccount || !storageAccessKey || !storageContainer) {
    return callback('lets-chat-azure: Mandatory configuration fields are missing.')
  }

  try {
    blobService = azure.createBlobService(storageAccount, storageAccessKey);
  }
  catch(err) {
    return callback(err);
  }

  blobService.createContainerIfNotExists(storageContainer, { publicAccessLevel: containerAccessLevel },
    function(err) {
      if(err) {
        return callback('There was an problem creating the azure container. ' + err.code);
      }

      stream = fs.createReadStream(file.path);

      blobService.createBlockBlobFromStream(storageContainer, filePath, stream, file.size,
        function(err, result) {
          stream.close();

          if(err) {
            return callback('There was a problem uploading or authenticating. ' + err.code);
          }

          callback(null, that.getUrl(doc), doc);
        });
    });
};

module.exports = Azure;
