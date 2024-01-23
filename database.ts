import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://root:example_password@localhost:27017/test?authSource=admin'
    );
    console.log('connected to database');
  } catch (error) {
    console.error(error);

    console.log('There was an error connecting to the database');
  }
};

connectDB();
