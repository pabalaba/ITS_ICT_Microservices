import {Request} from 'express';
import mongoose, { Schema } from 'mongoose';
import Borrow, { IBorrow } from '../entities/borrow'
import { Logger } from 'tslog';

const log = new Logger();

export async function getAllBorrows():Promise<IBorrow[]> {
  var time = new Date().getTime();
  const data = await Borrow.find({}).select("-__v").exec();
  time = new Date().getTime() - time;
  log.info("[BorrowService]:[List] Time required to retrieve all borrows: " + time + "ms");
  return data;
}

export async function getBorrowById(id:mongoose.Types.ObjectId):Promise<IBorrow | null> {
  
  var time = new Date().getTime();
  const data = await Borrow.findById(id).select("-__v");
  time = new Date().getTime() - time;
  log.info("[BorrowService]:[Index] Time required to retrieve a borrow: " + time + "ms");
  return data;
}

export async function createBorrow(req: Request):Promise<IBorrow | null> {
  try{
    const borrow = new Borrow({
      id_book: req.body.id_book,
      id_customer: req.body.id_customer,
    });
    
  var time = new Date().getTime();
  const id = (await borrow.save()).id;
  time = new Date().getTime() - time;
  log.info("[BorrowService]:[Create] Time required to create a borrow: " + time + "ms");
  return await getBorrowById(id);
  }catch(err){
    log.error("[BorrowService]:[Create] Error during creation");
    return null;
  }
}

export async function updateBorrow(id:mongoose.Types.ObjectId, req: Request):Promise<IBorrow | null> {

  const borrowFromDb = await getBorrowById(id);
  if(!borrowFromDb)
    return null;
  
  Object.hasOwn(req.body,"id_book") ? borrowFromDb.id_book = req.body.id_book : null;
  Object.hasOwn(req.body,"id_customer") ? borrowFromDb.id_customer = req.body.id_customer : null;
  Object.hasOwn(req.body,"borrowing_date") ? borrowFromDb.borrowing_date = req.body.borrowing_date : null;
  Object.hasOwn(req.body,"returned") ? borrowFromDb.returned = req.body.returned : null;
  
  var time = new Date().getTime();
  await borrowFromDb.save();
  time = new Date().getTime() - time;
  log.info("[BorrowService]:[Update] Time required to update a borrow: " + time + "ms");
  
  return borrowFromDb;
}

export async function returnBorrow(id:mongoose.Types.ObjectId): Promise<IBorrow | null> {

  const borrowFromDb = await getBorrowById(id);

  console.log(borrowFromDb);

  if(!borrowFromDb)
    return null;

  borrowFromDb.returned = true;

  var time = new Date().getTime();
  await borrowFromDb.save();
  time = new Date().getTime() - time;
  log.info("[BorrowService]:[Return] Time required to return a borrow: " + time + "ms");
  
  return borrowFromDb;
}

export async function deleteBorrow(id:mongoose.Types.ObjectId):Promise<Boolean>{
  var time = new Date().getTime();
  const ret = ((await Borrow.deleteOne(id)).deletedCount===1)?true:false;
  time = new Date().getTime() - time;
  log.info("[BorrowService]:[Delete] Time required to delete a borrow: " + time + "ms");
  return ret;
}