import express from 'express';
import Item from '../schemas/items.schema.js';

const router = express.Router();

// 아이템 생성
router.post('/items', async (req, res) => {
  try {
    const { item_code, item_name, item_stat } = req.body;
    const newItem = new Item({ item_code, item_name, item_stat });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 아이템 수정
router.put('/items/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { item_name, item_stat } = req.body;
    const updatedItem = await Item.findOneAndUpdate(
      { item_code: code },
      { item_name, item_stat },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: '해당 아이템을 찾지 못했습니다!' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 아이템 목록 조회
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find({}, { item_code: 1, item_name: 1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 아이템 상세 조회
router.get('/items/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const item = await Item.findOne({ item_code: code });
    if (!item) {
      return res.status(404).json({ message: '해당 아이템을 찾지 못했습니다!' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
