const { uploadToS3 } = require('../utils/aws.controller');
const PropertyRequiredError = require('../errors/property-required.error');
const { updateUserPhotoDAO } = require('../dao/update-user-photo-dao');
const updateUserPhotoService = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  if (req.file) {
    let correctMimetype =
      req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg';
    if (correctMimetype) {
      const response = await uploadToS3(req, res, userId, req.file);
      if (!response) {
        return res
          .status(400)
          .json({ error: 'Error subiendo imagen al Bucket' });
      }
      let photo = response.Location;
      await updateUserPhotoDAO(userId, photo);
      return res
        .status(200)
        .json({ message: 'Foto actualizada correctamente' });
    } else {
      res.status(400).json({ error: 'Formato de imagen no permitido.' });
      return;
    }
  } else {
    let propertyRequired = new PropertyRequiredError('photo');
    return propertyRequired.errorResponse(res);
  }
};

module.exports = { updateUserPhotoService };
