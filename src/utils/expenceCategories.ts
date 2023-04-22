import { CreditCardIcon, HomeModernIcon, PuzzlePieceIcon, ShoppingCartIcon, TruckIcon } from '@heroicons/vue/24/solid'
import type { ExpenseCategory } from '@/types/expenses'

const categories: ExpenseCategory[] = [
  {
    id: 1,
    name: 'Продукты',
    icon: ShoppingCartIcon,
    color: '#99b731',
    limit: 0,
  },
  {
    id: 2,
    name: 'Транспорт',
    icon: TruckIcon,
    color: '#f6ad55',
    limit: 0,
  },
  {
    id: 3,
    name: 'Проживание',
    icon: HomeModernIcon,
    color: '#2795d9',
    limit: 0,
  },
  {
    id: 4,
    name: 'Развлечения',
    icon: PuzzlePieceIcon,
    color: '#9f7aea',
    limit: 0,
  },
  {
    id: 5,
    name: 'Другое',
    icon: CreditCardIcon,
    color: '#e53e3e',
    limit: 0,
  },
]

export default categories
