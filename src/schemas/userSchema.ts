import { User } from '@prisma/client';
import Joi from 'joi';

export type UserCreation = Omit<User, 'id' | 'accountId'>;

const userSchema = Joi.object<UserCreation>({
  username: Joi.string().min(3).required().messages({
    'string.base': `O nome de usuário deve ser do tipo texto.`,
    'string.empty': `O nome de usuário não pode ser vazio.`,
    'string.min': `O nome de usuário deve conter no mínimo {#limit} caracteres.`,
  }),
  password: Joi.string().min(8).pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')).required().messages({
    'string.base': `A senha deve ser do tipo texto.`,
    'string.empty': `A senha não pode estar vazia.`,
    'string.min': `A senha deve conter no mínimo {#limit} caracteres.`,
    'string.pattern.base': `A senha deve conter no mínimo uma letra minúscula, uma maiúscula e um número.`,
  }),
});

export default userSchema;
