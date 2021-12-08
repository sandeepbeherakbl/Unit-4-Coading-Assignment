const express = require('express');
const Comment = require('../models/comment_model');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const comments = await Comment.create(req.body);
		return res.status(201).send(comments);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/', async (req, res) => {
	try {
		const comments = await Comment.find().lean().exec();
		return res.send(comments);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const comments = await Comment.findById(req.params.id).lean().exec();
		return res.send(comments);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const comments = await Comment.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.lean()
			.exec();
		return res.send(comments);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const comments = await Comment.findByIdAndDelete(req.params.id)
			.lean()
			.exec();
		return res.send(comments);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

module.exports = router;