import express from 'express';
import Character from '../schemas/characters.schema.js';

const router = express.Router();

// 캐릭터 생성
router.post('/characters', async (req, res) => {
  try {
    const { name } = req.body;
    const existingCharacter = await Character.findOne({ name });
    if (existingCharacter) {
      return res.status(400).json({ message: '이미 존재하는 캐릭터 이름입니다!' });
    }
    const lastCharacter = await Character.findOne().sort({ character_id: -1 });
    const character_id = lastCharacter ? lastCharacter.character_id + 1 : 1;

    const newCharacter = new Character({ character_id, name });
    const savedCharacter = await newCharacter.save();
    res.status(201).json({ character_id: savedCharacter.character_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 캐릭터 삭제
router.delete('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCharacter = await Character.findOneAndDelete({ character_id: id });
    if (!deletedCharacter) {
      return res.status(404).json({ message: '캐릭터를 찾을 수 없습니다!' });
    }
    res.status(200).json({ message: '캐릭터가 삭제되었습니다!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 캐릭터 상세 조회
router.get('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findOne({ character_id: id });
    if (!character) {
      return res.status(404).json({ message: '캐릭터를 찾을 수 없습니다!' });
    }
    res.status(200).json(character);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
