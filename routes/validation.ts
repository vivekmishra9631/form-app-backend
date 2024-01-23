import { Router } from 'express';
import multer from 'multer';
import { date, object, string } from 'zod';
import FileDataModel from '../schema/fileData.modal';

const validationRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(req.body);

      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.')[1];

      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        const err = new Error('File type is not supported');
        err.name = 'MulterError';
        return cb(err, 'filename');
      }
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

const uploadFiles = upload.fields([
  {
    name: 'thumbnailImage',
    maxCount: 1,
  },
  {
    name: 'sourceImage',
    maxCount: 1,
  },
]);

validationRouter.post('/upload', uploadFiles, async (req, res, next) => {
  const schema = object({
    authKey: string().length(8),
    title: string().min(3).max(100),
    description: string().min(3).max(1000),
    tags: string().min(3).max(1000),
    date: date(),
    software: string().min(3).max(100),
    thumbnailImage: string().url(),
    sourceImage: string().url(),
  });

  try {
    const files = req.files as any;

    const thumbnailImageUrl = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/images/${files.thumbnailImage[0].filename}`;
    const sourceImage = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/images/${files.sourceImage[0].filename}`;
    console.log(req.body);

    return;

    const data = schema.parse({
      ...req.body,
      thumbnailImage: thumbnailImageUrl,
      sourceImage,
    });

    const fileData = new FileDataModel({
      authKey: data.authKey,
      description: data.description,
      title: data.title,
      date: data.date,
      software: data.software,
      tags: data.tags,
      thumbnailImage: data.thumbnailImage,
      sourceImage: data.sourceImage,
    });

    await fileData.save();

    return res.json({
      msg: 'done',
    });
  } catch (error) {
    next(error);
  }
});

export default validationRouter;
