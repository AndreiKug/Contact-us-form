import { body } from 'express-validator';

export const formValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('name', 'Имя должно быть минимум 2 символа').isLength({min: 2}),
    body('question', 'Вопрос должен быть минимум 10 символов').isLength({min: 10}),
    // body('uploadFile', 'Неверная ссылка на файл').optional().isURL(),
    body('tag', 'Не выбран тег').notEmpty(),
];