const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");


router.post("/signup", validateBody(schemas.registerSchema),  ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.verifyEmailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);



module.exports = router;
