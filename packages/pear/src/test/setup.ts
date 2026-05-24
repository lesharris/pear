import { afterEach } from 'vite-plus/test'
import { config } from '@vue/test-utils'

config.global.renderStubDefaultSlot = true

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true
  }
}

if (!HTMLDialogElement.prototype.close) {
  HTMLDialogElement.prototype.close = function close() {
    this.open = false
    this.dispatchEvent(new Event('close'))
  }
}

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.clear()
})
