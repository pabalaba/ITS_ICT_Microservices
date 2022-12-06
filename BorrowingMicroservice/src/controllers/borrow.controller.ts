import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { createBorrow, getAllBorrows, getBorrowById, updateBorrow, returnBorrow, deleteBorrow } from "../services/borrow.services"

const borrowRouter = Router();

borrowRouter.get('/api/borrows', async (req: Request, res: Response) => {
  res.json(await getAllBorrows())
  
});

borrowRouter.get('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const data = await getBorrowById(id);
  if(!data)
    return res.status(404).json(data);
  return res.status(200).json(data);
});

borrowRouter.post('/api/borrows', async (req: Request, res: Response) => {
  const data = await createBorrow(req);
  if(!data)
    return res.status(400).json({"message": "Fileds missing"});
  return res.status(201).json(data);
});

borrowRouter.put('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const data = await updateBorrow(id,req);
  if(!data)
    return res.status(404).json(data);
  return res.status(200).json(data);
});

borrowRouter.put('/api/borrows/return/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const data = await returnBorrow(id);
  if(!data)
    return res.status(404).json(data);
  return res.status(200).json(data);
});

borrowRouter.delete('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const result = await deleteBorrow(id);
  res.status(result?204:410).json();
});

export default borrowRouter;