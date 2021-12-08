const mongoose = require('mongoose');
const User = require('../models/user_model');
const Tag = require('../models/tags_model');

const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		tag_ids: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'tags',
				required: true,
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model('post', postSchema);