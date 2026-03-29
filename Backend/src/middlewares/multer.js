import multer from "multer";
import slugify from "slugify";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    const productName = req.body.name
      ? slugify(req.body.name, { lower: true })
      : "product";

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);

    cb(null, `${productName}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage: storage });

export const uploadProductImage = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);
