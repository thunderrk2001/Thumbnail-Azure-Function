# Azure Function: Image Thumbnail Generator

## Overview

This Azure Function automatically generates a thumbnail image when an image file is uploaded to a specified path within a container in Azure Blob Storage. The function is written in Node.js.

## Functionality

When an image file is uploaded to the specified path in the container, the function triggers and generates a thumbnail image of the same image. The thumbnail is stored in a new folder within the container, alongside the original image.

## Setup Instructions

### Pre-requisites
- **Azure Storage Account**: You need an Azure Storage account to host your blob containers.
- **Azure Functions**: Ensure that you have Azure Functions set up in your Azure account.

### Configuration
1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up your Azure Function:
   - Create a new Azure Function App in the Azure Portal.
   - Configure the Function App settings in `local.settings.json` (for local development) and in the Azure Portal (for deployment).
   - Make sure to configure the Azure Storage connection string in your Azure Function App settings.
4. Deploy the function to Azure Functions.

### Usage
1. Upload an image file to the specified path within your Azure Blob Storage container.
2. Wait for a few moments, and the function will automatically generate a thumbnail image in a new folder within the same container.

## Folder Structure

- `src/`: Contains the source code for the Azure Function.
- `README.md`: This file, providing an overview and instructions for the function.

## Dependencies

- `@azure/storage-blob`: To interact with Azure Blob Storage.
- `image-thumbnail`: For image processing and thumbnail generation.

