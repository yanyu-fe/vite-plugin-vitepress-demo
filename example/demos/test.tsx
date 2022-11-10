import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Test',
  setup() {
    const counter = ref(0)
    return () => {
      return (
        <>
          counter: {counter.value}
          <br />
          <button onClick={() => counter.value++}>Add</button>
        </>
      )
    }
  },
})
