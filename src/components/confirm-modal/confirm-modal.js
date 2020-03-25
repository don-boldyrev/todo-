export default {
  name: 'ConfirmModal',
  props: {
    question: {
      type: String,
      default: ''
    },
    applyBtnText: {
      type: String,
      default: 'Yes'
    }
  },
  data() {
    return {
      isSubmited: false,
      isOpen: false
    }
  },
  created() {
    window.addEventListener('keyup', this.onKeyPress)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyPress)
  },
  methods: {
    cancel() {
      this.$emit('cancel')
      this.close()
    },
    apply() {
      this.$emit('apply')
      this.close()
    },
    close() {
      this.isSubmited = true
      this.isOpen = false
      this.$refs['confirm-modal'].close()
    },
    show() {
      this.isSubmited = false
      this.isOpen = true
      this.$refs['confirm-modal'].show()
    },
    onClose() {
      if (!this.isSubmited) {
        this.$emit('cancel')
      }
      this.isSubmited = true
      this.isOpen = false
    },
    onKeyPress(event) {
      if (this.isOpen) {
        if (event.keyCode === 27) {
          this.cancel()
        }
        if (event.keyCode === 13) {
          this.apply()
        }
      }
    }
  }
}