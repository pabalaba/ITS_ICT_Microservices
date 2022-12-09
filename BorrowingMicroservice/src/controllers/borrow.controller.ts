import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { createBorrow, getAllBorrows, getBorrowById, updateBorrow, returnBorrow, deleteBorrow } from "../services/borrow.services"
import { Logger } from "tslog";

const log = new Logger();

const borrowRouter = Router();

borrowRouter.get('/api/borrows', async (req: Request, res: Response) => {
  log.info('[BorrowContoller]:[List] Operation read all');
  res.json(await getAllBorrows());
});

borrowRouter.get('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  log.info('[BorrowContoller]:[Index] Operation read one. ID: ' + id);
  const data = await getBorrowById(id);
  if(!data){
    log.error('[BorrowContoller]:[Index] Borrow not found');
    return res.status(404).json(data);
  }
  return res.status(200).json(data);
});

borrowRouter.post('/api/borrows', async (req: Request, res: Response) => {
  log.info('[BorrowContoller]:[Create] Operation create');
  const data = await createBorrow(req);
  if(!data){
    log.error('[BorrowContoller]:[Create] Create fields are missing or null');
    return res.status(400).json({"message": "Fileds missing"});
  }
  return res.status(201).json(data);
});

borrowRouter.put('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  log.info('[BorrowContoller]:[Update] Operation update one. ID: ' + id);
  const data = await updateBorrow(id,req);
  if(!data){
    log.error('[BorrowContoller]:[Update] Borrow not found');
    return res.status(404).json(data);
  }
  return res.status(200).json(data);
});

borrowRouter.put('/api/borrows/return/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  log.info('[BorrowContoller]:[Return] Operation return one. ID: ' + id);
  const data = await returnBorrow(id);
  if(!data){
    log.error('[BorrowContoller]:[Update] Borrow not found');
    return res.status(404).json(data);
  }
  return res.status(200).json(data);
});

borrowRouter.delete('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  log.info('[BorrowContoller]:[Delete] Operation delete one. ID: ' + id);
  const result = await deleteBorrow(id);
  res.status(result?204:410).json();
});

export default borrowRouter;