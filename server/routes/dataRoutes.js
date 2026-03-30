const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/create', dataController.createDocument);
router.get('/:collectionId', dataController.listDocuments);
router.get('/:collectionId/:documentId', dataController.getDocument);
router.put('/:collectionId/:documentId', dataController.updateDocument);
router.delete('/:collectionId/:documentId', dataController.deleteDocument);

module.exports = router;
