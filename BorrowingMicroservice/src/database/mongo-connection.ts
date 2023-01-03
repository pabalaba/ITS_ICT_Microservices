import mongoose from 'mongoose';

async function atlasConnection() {
  const username = encodeURIComponent(process.env.MONGO_USER!);
  const password = encodeURIComponent(process.env.MONGO_PASS!);
  const atlasCluster = process.env.MONGO_CLUSTER;
  const atlasDatabase = process.env.MONGO_DB;

  console.log(username, password, atlasDatabase, atlasCluster);

  const uri = `mongodb+srv://${username}:${password}@${atlasCluster}/${atlasDatabase}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri,
      () => console.log('Database connection established!')
    );
  } catch (err) {
    console.error(`Error connecting to the database. \n ${err}`);
  }

  const dbConnection = mongoose.connection;
  dbConnection.on('error', (err) => console.log(`Connection error ${err}`));
  dbConnection.once('open', () => console.log('Connected to DB!'));
}

export default atlasConnection;