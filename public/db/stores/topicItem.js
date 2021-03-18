const Datastore = require('nedb-promises');
const electron = require('electron');

const { app } = electron;
const Ajv = require('ajv');

const path = require('path');
const topicItemSchema = require('../schemas/topicItem');

class TopicItemStore {
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(topicItemSchema);

    // const dbPath = `${app.getPath('userData')}/devhelp.db`; // ORIGINAL
    const dbPath = `${path.dirname(process.execPath)}/devhelp.db`; // Portabil App
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
    return null;
  }

  read(_id) {
    return this.db.findOne({ _id }).exec();
  }

  readAll() {
    return this.db.find();
  }

  readBT() {
    return this.db.find({ topictype: 'bt' }).sort({ topictext: 1 }).exec();
  }

  readTopic(category) {
    return this.db
      .find({
        topictype: 'topic',
        topicgroup: category,
      })
      .sort({ topictext: 1 })
      .exec();
  }

  readTopicDetail(id) {
    return this.db
      .find({
        topicparent: id,
      })
      .sort({ order: 1 })
      .exec();
  }

  readTopicMax(id) {
    return this.db
      .find({
        topicparent: id,
      })
      .sort({ order: -1 })
      .limit(1)
      .exec();
  }

  deleteTopic(_id) {
    return this.db.remove({
      _id,
    });
  }

  deleteCategory(category) {
    return this.db.remove(
      {
        topicgroup: category.topicgroup,
      },
      { multi: true }
    );
  }

  upSaveComment(topic) {
    this.db.update(
      { _id: topic.lastComment },
      { $set: { order: topic.order } }
    );
    this.db.update(
      { _id: topic.actualComment },
      { $set: { order: topic.order - 1 } }
    );
  }

  downSaveComment(topic) {
    this.db.update(
      { _id: topic.nextComment },
      { $set: { order: topic.order } }
    );
    this.db.update(
      { _id: topic.actualComment },
      { $set: { order: topic.order + 1 } }
    );
  }

  updateCat(topic) {
    return this.db.update(
      { _id: topic._id },
      { $set: { topictext: topic.topictext } }
    );
  }

  updateTopic(topic) {
    return this.db.update(
      { _id: topic._id },
      { $set: { topictext: topic.topictext } }
    );
  }

  updateComment(topic) {
    return this.db.update(
      { _id: topic._id },
      { $set: { topictext: topic.topictext } }
    );
  }

  upComment(topic) {
    return this.db.findOne({
      topicparent: topic.topicparent,
      order: topic.order - 1,
    });
  }

  downComment(topic) {
    return this.db.findOne({
      topicparent: topic.topicparent,
      order: topic.order + 1,
    });
  }

  updateTopicCat(topic) {
    return this.db.update(
      { topicgroup: topic.oldtext },
      { $set: { topicgroup: topic.topictext } },
      { multi: true }
    );
  }
}

module.exports = new TopicItemStore();
