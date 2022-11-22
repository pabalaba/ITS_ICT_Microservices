import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { createBorrow, getAllBorrows, getBorrowById, updateBorrow, deleteBorrow } from "../services/borrow.services"

const borrowRouter = Router();

borrowRouter.get('/api/borrows', async (req: Request, res: Response) => {
  res.json(await getAllBorrows())
});

borrowRouter.get('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  res.json(await getBorrowById(id));
});

borrowRouter.post('/api/borrows', async (req: Request, res: Response) => {
  res.json(await createBorrow(req));
});

borrowRouter.put('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  res.json(await updateBorrow(id,req));
});

borrowRouter.delete('/api/borrows/:id', async (req: Request, res: Response) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const result = await deleteBorrow(id);
  res.status(result?204:410).json();
});

export default borrowRouter;