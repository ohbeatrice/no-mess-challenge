const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.YOUR_APP_ID_CYCLIC_DB);
const catalogCollection = db.collection('catalog');

module.exports = {
  name: 'show',
  description: 'Show all items in the catalog.',
  async execute(message) {
    let items = await catalogCollection.all();
    message.channel.send(JSON.stringify(items));
  }
};
