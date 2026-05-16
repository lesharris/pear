import type { Component, InjectionKey } from 'vue'

export type PModalAction = {
  label: string
  variant?: 'secondary' | 'contrast'
  outline?: boolean
  action?: () => unknown | Promise<unknown>
}

export type PModalOptions = {
  title?: string
  description?: string
  component?: Component
  props?: Record<string, unknown>
  actions?: PModalAction[]
  closeOnBackdrop?: boolean
}

export type PModalContext = {
  open: (options: PModalOptions) => Promise<unknown>
  close: (result?: unknown) => void
}

export const PModalKey: InjectionKey<PModalContext> = Symbol('PModal')
