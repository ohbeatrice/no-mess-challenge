const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.YOUR_APP_ID_CYCLIC_DB);
const catalogCollection = db.collection('catalog');

module.exports = {
  name: 'delete',
  description: 'Delete an item from the catalog.',
  async execute(message, args) {
    let link = args[0];

    await catalogCollection.remove(link);
    message.channel.send("Item deleted successfully.");
  }
};
