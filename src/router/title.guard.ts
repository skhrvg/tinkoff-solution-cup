import type { NavigationGuard } from 'vue-router'
import { useTitle } from '@vueuse/core'

const titleGuard: NavigationGuard = function (to) {
  const { title } = to.meta
  if (title)
    useTitle(`${title} - Учет расходов`)
  else useTitle('Учет расходов')
}

export default titleGuard
