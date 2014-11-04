var mongojs = require('mongojs'),
    db = mongojs('webex'),
    collection1 = 'docs',
    collection2 = 'users';

try {
    db.collection(collection1).save({
        name: 'undefined',
        dateCreated: new Date(),
        dateModified: undefined,
        userCreated: 'system',
        userModified: undefined,
        data: ''
    });

    db.collection(collection2).save({
        email: 'mikemameko@mail.ru',
        fname: 'Mike',
        lname: 'Mameko',
        pass: 'admin'
    });

    console.log('Database created successfully!');
} catch(e){
    console.log(e);
}

