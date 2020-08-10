const { uploadToS3, deleteFileS3 } = require('../utils/aws.controller');
const PropertyRequiredError = require('../errors/property-required.error');
const {
  updateRestaurantPhotoDAO
} = require('../dao/update-restaurant-photo-dao');
const updateRestaurantPhotoService = async (req, res) => {
  let restaurantId = req.params.id;
  console.log(restaurantId);
  if (req.file) {
    let correctMimetype =
      req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg';
    if (correctMimetype) {
      const response = await uploadToS3(req, res, restaurantId, req.file);
      if (!response) {
        return res
          .status(400)
          .json({ error: 'Error subiendo imagen al Bucket' });
      }
      let photo = response.Location;
      await updateRestaurantPhotoDAO(restaurantId, photo);
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

module.exports = { updateRestaurantPhotoService };
