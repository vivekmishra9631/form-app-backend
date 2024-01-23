import { Schema, model } from 'mongoose';

const FileDataSchema = new Schema({
  authKey: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  software: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
    required: true,
  },
  sourceImage: {
    type: String,
    required: true,
  },
});

const FileDataModel = model('fileData', FileDataSchema);

export default FileDataModel;
