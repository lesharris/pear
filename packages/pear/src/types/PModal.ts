import type { Component, InjectionKey } from 'vue'

export type PModalAction = {
  label: string
  variant?: 'secondary' | 'contrast'
  outline?: boolean
  action?: () => void | Promise<void>
}

export type PModalOptions = {
  title?: string
  component?: Component
  props?: Record<string, unknown>
  actions?: PModalAction[]
  closeOnBackdrop?: boolean
}

export type PModalContext = {
  open: (options: PModalOptions) => void
  close: () => void
}

export const PModalKey: InjectionKey<PModalContext> = Symbol('PModal')
