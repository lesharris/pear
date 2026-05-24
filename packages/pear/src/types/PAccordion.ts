import type { InjectionKey } from 'vue'

export type PAccordionGroupContext = {
  name?: string
}

export const PAccordionGroupKey: InjectionKey<PAccordionGroupContext> = Symbol('PAccordionGroup')
