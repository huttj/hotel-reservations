import express from 'express';

import create from './create';
import findById from './findById';
import list from './list';

export default express.Router()
  .get('/reservation', list)
  .get('/reservation/:id', findById)
  .post('/reservation', create)
;