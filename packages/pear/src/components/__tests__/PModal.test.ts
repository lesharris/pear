import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vite-plus/test'
import PModal from '../PModal.vue'
import PModalProvider from '../PModalProvider.vue'
import { useModal } from '../../lib/useModal'

describe('PModal', () => {
  it('opens, closes, labels, and emits from modal dialogs', async () => {
    const wrapper = mount(PModal, {
      props: { modelValue: false },
      slots: {
        header: '<h2>Confirm</h2>',
        default: '<p>Are you sure?</p>',
        footer: '<button>OK</button>',
      },
    })

    await wrapper.setProps({ modelValue: true } as never)
    const dialog = wrapper.get('dialog').element as HTMLDialogElement
    expect(dialog.open).toBe(true)
    expect(wrapper.get('dialog').attributes('aria-labelledby')).toBe(
      wrapper.get('header span').attributes('id'),
    )

    await wrapper.get('header button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])

    dialog.open = true
    await wrapper.get('dialog').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])

    const closeCount = wrapper.emitted('afterClose')?.length ?? 0
    await wrapper.get('dialog').trigger('close')
    expect(wrapper.emitted('afterClose')?.length).toBeGreaterThan(closeCount)

    const locked = mount(PModal, {
      props: { modelValue: true, closeOnBackdrop: false },
    })
    await locked.get('dialog').trigger('click')
    expect(locked.emitted('update:modelValue')).toBeUndefined()
  })

  it('provides an imperative modal API that resolves action and close results', async () => {
    const action = vi.fn(() => 'accepted')
    const Consumer = defineComponent({
      setup() {
        const modal = useModal()
        async function openAction() {
          return modal.open({
            title: 'Confirm',
            description: 'Continue?',
            actions: [{ label: 'Accept', action }],
          })
        }
        async function openComponent() {
          return modal.open({
            component: defineComponent({ template: '<strong>Custom body</strong>' }),
            props: { ignored: true },
          })
        }
        return { modal, openAction, openComponent }
      },
      template: '<button type="button" @click="openAction">Open</button>',
    })

    const wrapper = mount(PModalProvider, {
      slots: { default: h(Consumer) },
    })

    await nextTick()
    const consumer = wrapper.findComponent(Consumer)
    const promise = consumer.vm.openAction()
    await nextTick()

    expect(wrapper.get('h3').text()).toBe('Confirm')
    expect(wrapper.text()).toContain('Continue?')

    await wrapper.get('footer button').trigger('click')
    await expect(promise).resolves.toBe('accepted')
    expect(action).toHaveBeenCalledOnce()

    const componentPromise = consumer.vm.openComponent()
    await nextTick()
    expect(wrapper.get('strong').text()).toBe('Custom body')
    consumer.vm.modal.close('manual')
    await expect(componentPromise).resolves.toBe('manual')
  })
})
