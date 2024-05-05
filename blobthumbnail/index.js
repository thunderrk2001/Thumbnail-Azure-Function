const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, myBlob) {
    try {
        context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
        let imageThumbnail = null;
        try {
            imageThumbnail = require('image-thumbnail');

        }
        catch (err) {
            context.log("GOT ERROR while importing image-thumnail");
            throw err;
        }

        let thumbnail = '';
        try {
            thumbnail = await imageThumbnail(myBlob,{jpegOptions: { force:true, quality:4 }});
            // context.bindings.outputBlob = thumbnail;
            context.log("SUCCESS")
            context.log(thumbnail.length);

        } catch (err) {
            context.log("GOT ERROR")
            context.log(err);
        }
        const connectionString = process?.env?.AzureWebJobsStorage;

        context.log(connectionString);

        context.log(context.bindingData);
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        // Specify the container and blob name

        const containerName = 'files2';
        const blobName = "thumbnail/" + context.bindingData.name;

        // Get the container client
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Get the blob client

        const blobClient = containerClient.getBlockBlobClient(blobName);


        // Get the blob properties
        // const blobProperties = await blobClient.getProperties();

        // Retrieve metadata
        // const metadata = blobProperties.metadata;

        // Log metadata
        // context.log('Metadata:', metadata);
        try {
            await blobClient.upload(thumbnail, thumbnail.length);
            await blobClient.setHTTPHeaders({ blobContentType: "image/jpeg" });

        }
        catch (err) {
            context.log("GOT ERR UPLOAD")
            context.log(err);
        }

        try {
            context.httpRes = {
                status: 200,
                body: { message: "done" }
            }
        }
        catch (err) {
            context.log("Got err http res");
            context.log(err);
        }

        context.done();
    }
    catch (err) {
        context.log("OUTER LOG ERR");
        context.log(err);
    }

};
