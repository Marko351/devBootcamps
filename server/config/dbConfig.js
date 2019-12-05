import mongoose from 'mongoose';

export default async () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  const connection = await mongoose.connect(process.env.MONGO_URI, options);
  console.log(
    `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
  );
};
