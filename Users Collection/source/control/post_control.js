const express = require('express');
const Post = require('../models/post_model');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const posts = await Post.create(req.body);
		return res.status(201).send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({})
			.populate('tag_ids', 'name')
			.populate('user_id')
			.lean()
			.exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const posts = await Post.findById(req.params.id).lean().exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.lean()
			.exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const posts = await Post.findByIdAndDelete(req.params.id).lean().exec();
		return res.send(posts);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

module.exports = router;