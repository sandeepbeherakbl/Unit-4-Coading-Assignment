const express = require('express');
const Tag = require('../models/tags_model');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const tags = await Tag.create(req.body);
		return res.status(201).send(tags);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/', async (req, res) => {
	try {
		const tags = await Tag.find().lean().exec();
		return res.send(tags);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.get('/tags/:id', async (req, res) => {
	try {
		const tags = await Tag.findById(req.params.id).lean().exec();
		return res.send(tags);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.patch('/tags/:id', async (req, res) => {
	try {
		const tags = await Tag.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.lean()
			.exec();
		return res.send(tags);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

router.delete('/tags/:id', async (req, res) => {
	try {
		const tags = await Tag.findByIdAndDelete(req.params.id).lean().exec();
		return res.send(tags);
	} catch (e) {
		return res.status(500).json({ message: e.message, status: 'Failed' });
	}
});

module.exports = router;