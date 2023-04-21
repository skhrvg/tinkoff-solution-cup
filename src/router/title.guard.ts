import type { NavigationGuard } from 'vue-router'
import { useTitle } from '@vueuse/core'

const titleGuard: NavigationGuard = function (to) {
  const { title } = to.meta
  if (title)
    useTitle(`${title} - @skhrvg/tinkoff-solution-cup`)
  else useTitle('@skhrvg/tinkoff-solution-cup')
}

export default titleGuard
