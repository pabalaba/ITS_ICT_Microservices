import mongoose, {Schema, model} from 'mongoose';

export interface IBorrow extends mongoose.Document{
  id_book: number;
  id_customer: number;
  borrowing_date: Date;
  returned: boolean;
}

export const BorrowSchema = new Schema<IBorrow>({
  id_book: { type: Number, required: true},
  id_customer: { type: Number, required: true},
  borrowing_date: { type: Date, default: new Date()},
  returned: { type: Boolean, default: false},
});

const Borrow = model<IBorrow>('Borrow', BorrowSchema);

export default Borrow;