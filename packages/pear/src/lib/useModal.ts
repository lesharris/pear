import { inject } from 'vue'
import { PModalKey } from '@/types/PModal'

export function useModal() {
  const modal = inject(PModalKey)

  if (!modal) {
    throw new Error('useModal() must be used inside <PModalProvider>.')
  }

  return modal
}
