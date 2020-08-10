const s3 = require('../config/aws-config');

exports.uploadToS3 = async (req, res, restaurantId, photo) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;

  params.Key = params.Key + '/' + restaurantId;
  params.Body = photo.buffer;
  params.ContentEncoding = photo.encoding;
  params.ContentType = photo.mimetype;

  try {
    const response = await s3Client.upload(params).promise();

    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
};
