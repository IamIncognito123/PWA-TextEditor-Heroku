import { openDB } from 'idb';


const initdb = async () =>
// creating the database, giving it the name jate and version number
  openDB('jate', 1, {

    // used to specify the schema for the database
    upgrade(db) {
      // checks to see if the database exists, if exists then exit the logic with return
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // if the database doesnt exist it creates the database
      // sets the database schema
      // keypath automatically creates a new key to identify data records, keyname is named "id"
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
    // to see the data in chrome dev tools, to to inspect -> applications -> indexDB
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Update the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate')
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('data saved to the database', result.value);
}






// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from Database');
  // when the getDB function is invoked, const jateDB is created and the jate db is opened
  const jateDb = await openDB('jate', 1);
  // transaction allows for the retrieval of data from other stores
  const tx = jateDb.transaction('jate', 'readonly');
  // objectStore allows a single store to be accessed if a transaction has multiple stores (store is used for a single store)
  const store = tx.objectStore('jate');
  // get is a shortcut that retrieves data from the store 
  const request = store.getAll();
  // const result is created, awaiting the request
  const result = await request;
  // once the request is completed the result is logged, returned and exits the logic
  console.log(result.value);
  return result.value;
};

initdb();
