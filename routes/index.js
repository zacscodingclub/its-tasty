const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController');
const authenticationController = require('../controllers/authenticationController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/add',
  authenticationController.isLoggedIn,
  storeController.addStore
);
router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

router.get('/hearts',
  authenticationController.isLoggedIn,
  catchErrors(storeController.getHearts)
);

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.post('/login', authenticationController.login);

router.get('/logout', authenticationController.logout);

router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authenticationController.login
);

router.get('/account',
  authenticationController.isLoggedIn,
  userController.account
);

router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authenticationController.forgot));
router.get('/account/reset/:token', catchErrors(authenticationController.reset));
router.post('/account/reset/:token',
  authenticationController.confirmedPasswords,
  catchErrors(authenticationController.resetPassword)
);

router.get('/map', storeController.mapPage);

router.post('/reviews/:id',
  authenticationController.isLoggedIn,
  reviewController.addReview
);

router.get('/top', catchErrors(storeController.getTopStores));

/*
  API
*/

router.get('/api/v1/search', catchErrors(storeController.searchStores));

router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));

router.post('/api/v1/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
