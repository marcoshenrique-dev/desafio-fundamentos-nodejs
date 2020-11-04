import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (total < value) {
        throw Error('Balance is not more space');
      }
    }

    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
