import type { InjectionKey, Ref } from 'vue'

export type PFieldContext = {
  id: string
  describedBy: Ref<string | undefined>
  invalid: Ref<boolean>
  disabled: Ref<boolean>
}

export const PFieldKey: InjectionKey<PFieldContext> = Symbol('PField')
