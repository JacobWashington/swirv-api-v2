const router = require("express").Router();
const ctrl = require("../controllers");
const multer = require("multer");

/**** PROFILE PIC STORAGE ****/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/**** USER ROUTES ****/
router.get("/test", ctrl.User.test);
router.post("/", upload.single('profilePicture'), ctrl.User.register);
router.post("/login", ctrl.User.login);
router.get("/:_id", ctrl.User.getUser);
router.get("/", ctrl.User.getAllUsers);
router.put("/:_id", ctrl.User.updateUser);

module.exports = router;
