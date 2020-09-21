const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const topicItemSchema = require('../schemas/topicItem');
const electron = require('electron');
const { app } = electron;

class TopicItemStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(topicItemSchema);

        const dbPath = `${app.getPath('userData')}/devhelp.db`;
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data) {
        return this.schemaValidator(data);
    }

    create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return this.db.insert(data);
        }
    }

    read(_id) {
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        return this.db.find()
    }

    readBT() {
        return this.db.find({topictype: 'bt'}).exec();
    }

    readTopic(category) {
        return this.db.find({
            topictype: 'topic',
            topicgroup: category,
        }).exec();
    }

    /*archive({_id}) {
        return this.db.update({_id}, {$set: {isDone: true}})
    }*/
}

module.exports = new TopicItemStore();
