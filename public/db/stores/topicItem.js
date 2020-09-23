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
        }).sort({ topictext: 1 }).exec();
    }

    readTopicDetail(id) {
        return this.db.find({
            topicparent: id,
        }).sort({ order: 1 }).exec();
    }

    readTopicMax(id) {
        return this.db.find({
            topicparent: id,
        }).sort({ order: -1 }).limit(1).exec();
    }

    deleteTopic(_id) {
        return this.db.remove({
            _id
        });
    }

    deleteCategory(category) {
        return this.db.remove({
            topicgroup:category.topicgroup,
        },
        { multi: true});
        
    }

    updateCat(topic) {
        return this.db.update({_id: topic._id}, {$set: {topictext: topic.topictext}});
    }

    updateTopic(topic) {
        return this.db.update({_id: topic._id}, {$set: {topictext: topic.topictext}});
    }

    updateComment(topic) {
        return this.db.update({_id: topic._id}, {$set: {topictext: topic.topictext}});
    }

    updateTopicCat(topic) {
        return this.db.update({topicgroup: topic.oldtext}, {$set: {topicgroup: topic.topictext}}, { multi: true });
    }
}

module.exports = new TopicItemStore();
