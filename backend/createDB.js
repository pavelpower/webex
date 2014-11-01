var mongojs = require('mongojs'),
    db = mongojs('webex'),
    collection = 'docs';

try {
    db.collection(collection).save({
        name: 'undefined',
        dateCreated: new Date(),
        dateModified: undefined,
        userCreated: 'system',
        userModified: undefined,
        data: ''
    });

    console.log('Database created successfully!');
} catch(e){
    console.log(e);
}

