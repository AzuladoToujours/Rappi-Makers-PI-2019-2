const { Router } = require('express');
const router = Router();

const { getUsersService } = require('../services/get-users.service');
const { getUserByIdService } = require('../services/get-user-by-id.service');
const { getEmailByIdService } = require('../services/get-email.service');
const { getUserByDniService } = require('../services/get-user-by-dni.service');
const { createUserService } = require('../services/create-user.service');
const { getUserFromAuthService } = require('../services/get-user-auth.service');
const { validateToken } = require('../middlewares/user.middleware');
const {
  updateUserPhotoService
} = require('../services/update-user-photo.service');
const upload = require('../utils/multer');
const {
  requireSignIn,
  hasAuthorization
} = require('../middlewares/user.middleware');
const {
  userUpdateValidations,
  validator
} = require('../middlewares/validators/user-update.validator');
const { updateUserService } = require('../services/update-user.service');

router.get('/', getUsersService);
router.get('/:id', getUserByIdService);
router.put(
  '/updatephoto/:id',
  requireSignIn,
  upload.single('photo'),
  updateUserPhotoService
);
router.get('/getemail/:id', getEmailByIdService);
router.get('/dni/:dni', validateToken, getUserByDniService);
router.post('/create', validateToken, createUserService);
router.get('/auth/:id', validateToken, getUserFromAuthService);
router.put(
  '/:id',
  requireSignIn,
  hasAuthorization,
  userUpdateValidations,
  validator,
  updateUserService
);

module.exports = router;
