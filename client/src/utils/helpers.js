import { UPDATE_USER, UPDATE_HOMES } from '../utils/actions';

export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('homefax', 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore('user', { keyPath: '_id' });
      db.createObjectStore('homes', { keyPath: '_id' });
      // db.createObjectStore('transfers', { keyPath: '_id' });
    };

    request.onerror = function (e) {
      console.log('There was an error');
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

export function effectHelper(data, dispatch, loading) {
  if (data) {
    dispatch({
      type: UPDATE_USER,
      user: data.user,
    });
    idbPromise('user', 'put', data.user);
    dispatch({
      type: UPDATE_HOMES,
      homes: data.user.homes,
    });
    data.user.homes.forEach((home) => {
      idbPromise('homes', 'put', home);
    });
  } else if (!loading) {
    idbPromise('user', 'get').then((user) => {
      dispatch({
        type: UPDATE_USER,
        user: user,
      });
    });
    idbPromise('homes', 'get').then((homes) => {
      dispatch({
        type: UPDATE_HOMES,
        homes: homes,
      });
    });
  };
};