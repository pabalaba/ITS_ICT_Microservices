import {Request} from 'express';
import mongoose, { Schema } from 'mongoose';
import Borrow, { IBorrow } from '../entities/borrow'

export async function getAllBorrows():Promise<IBorrow[]> {
  const data = await Borrow.find().select("-__v");
  return await data;
}

export async function getBorrowById(id:mongoose.Types.ObjectId):Promise<IBorrow | null> {
  const data = await Borrow.findById(id).select("-__v");
  return await data;
}

export async function createBorrow(req: Request):Promise<IBorrow | null> {
  const borrow = new Borrow({
    id_book: req.body.id_book,
    id_customer: req.body.id_customer,
  });
  return await getBorrowById((await borrow.save()).id);
}

export async function updateBorrow(id:mongoose.Types.ObjectId, req: Request):Promise<IBorrow | null> {

  const borrowFromDb = await getBorrowById(id);
  if(!borrowFromDb)
    return null;
  
  Object.hasOwn(req.body,"id_book") ? borrowFromDb.id_book = req.body.id_book : null;
  Object.hasOwn(req.body,"id_customer") ? borrowFromDb.id_customer = req.body.id_customer : null;
  Object.hasOwn(req.body,"borrowing_date") ? borrowFromDb.borrowing_date = req.body.borrowing_date : null;
  Object.hasOwn(req.body,"returned") ? borrowFromDb.returned = req.body.returned : null;

  await borrowFromDb.save();
  
  return borrowFromDb;
}

export async function deleteBorrow(id:mongoose.Types.ObjectId):Promise<Boolean>{
  return (await (await Borrow.deleteOne(id)).deletedCount===1)?true:false;
}