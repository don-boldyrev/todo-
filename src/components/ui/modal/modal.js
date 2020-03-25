import IcClose from '@/assets/svg/ic-close.svg?inline'

export default {
  name: 'Modal',
  props: {
    blockClose: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IcClose
  },
  data() {
    return {
      isOpen: false,
      transitionStart: false
    }
  },
  methods: {
    show() {
      this.isOpen = true
      this.$nextTick(() => {
        this.transitionStart = true
      })
      const appEl = document.getElementById('app')
      appEl.classList.add('has-modal')
    },
    close() {
      if (!this.blockClose) {
        this.isOpen = false
        this.transitionStart= false
        this.$nextTick(() => {
          if (!document.getElementsByClassName('modal-overlay').length) {
            const appEl = document.getElementById('app')
            appEl.classList.remove('has-modal')
          }
        })
        this.$emit('close')
      } else {
        this.$emit('blockClose')
      }
    }
  }
}