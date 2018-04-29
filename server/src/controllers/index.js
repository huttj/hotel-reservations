import express from 'express';

import reservation from './reservation';

export default express.Router()
  .use(reservation)
;