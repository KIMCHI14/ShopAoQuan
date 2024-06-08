const cloudinary = require("cloudinary")


cloudinary.config({
  cloud_name: 'dcrmoppem',
  api_key: '712484481354275',
  api_secret: 'NQRdgJoLvo_MqYfsA-h2NxeofeY'
});
// cho phép upload ảnh lên cloudinary
const cloudinaryUploadImg = async (fileToUpLoads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUpLoads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
}

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
}


module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg }