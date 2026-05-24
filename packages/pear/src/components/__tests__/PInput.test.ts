import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vite-plus/test'
import PCheckbox from '../PCheckbox.vue'
import PInput from '../PInput.vue'

describe('PInput', () => {
  it('updates text, number, and file models', async () => {
    const textUpdates: unknown[] = []
    const text = mount(PInput, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: unknown) => textUpdates.push(value),
      },
    })
    await text.get('input').setValue('Pear')
    expect(textUpdates).toEqual(['Pear'])

    const numberUpdates: unknown[] = []
    const number = mount(PInput, {
      props: {
        type: 'number',
        modelValue: 1,
        'onUpdate:modelValue': (value: unknown) => numberUpdates.push(value),
      },
    })
    await number.get('input').setValue('42')
    expect(numberUpdates).toEqual([42])
    await number.get('input').setValue('')
    expect(numberUpdates.at(-1)).toBe('')

    const fileUpdates: unknown[] = []
    const file = mount(PInput, {
      props: {
        type: 'file',
        modelValue: null,
        'onUpdate:modelValue': (value: unknown) => fileUpdates.push(value),
      },
    })
    await file.get('input').trigger('change')
    expect(fileUpdates).toHaveLength(1)
  })

  it('reacts to parent model changes in a small form composition', async () => {
    const Form = defineComponent({
      components: { PInput, PCheckbox },
      setup() {
        const name = ref('Pear')
        const enabled = ref(false)
        return { name, enabled }
      },
      template: `
        <form>
          <PInput v-model="name" />
          <PCheckbox v-model="enabled">Enabled</PCheckbox>
        </form>
      `,
    })

    const wrapper = mount(Form)
    await wrapper.get('input[type="text"]').setValue('Pearl')
    await wrapper.get('input[type="checkbox"]').setValue(true)
    await nextTick()

    expect(wrapper.vm.name).toBe('Pearl')
    expect(wrapper.vm.enabled).toBe(true)
  })
})
