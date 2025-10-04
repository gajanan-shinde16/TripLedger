const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const ListingController = require("../controllers/listing.js");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({storage});
//index and create route
router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.createListing));


//create route--->form top of show route because it misleading as show route
router.get("/new",isLoggedIn,ListingController.renderNewForm);

//show,update,delete
router.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing));
//edit route form
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm));
module.exports = router;
