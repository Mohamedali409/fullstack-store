import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/products");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
export const uploadProductImage = upload.single("image");
