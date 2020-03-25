import VTextarea from '@/components/ui/v-textarea/v-textarea.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ConfirmModal from '@/components/confirm-modal/confirm-modal.vue'
import { v1 as uuid } from 'uuid'

export default {
  name: 'AddEditForm',
  props: {
    label: {
      type: String,
      default: ''
    },
    inModal: {
      type: Boolean
    },
    startForm: {
      type: Object
    },
    type: {
      type: String,
      default: 'add' // add edit
    }
  },
  components: {
    VTextarea,
    ValidationProvider,
    ValidationObserver,
    ConfirmModal
  },
  data() {
    return {
      form: {
        description: ''
      },
      isSubmited: false,
      idPortal: uuid()
    }
  },
  computed: {
    portalNameId() {
      return this.portalName + `-${this.idPortal}`
    },
    notSaveChanges() {
      let diff = false
      if (this.startForm) {
        const keys = Object.keys(this.form)
        for (let i=0; i<keys.length; i++) {
          const key = keys[i]
          if (this.form[key] !== this.startForm[key]) {
            diff = true
            break
          }
        }
      }
      return diff
    }
  },
  methods: {
    setDefaultForm() {
      this.form.description = ''
    },
    setStartForm() {
      if (this.startForm) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.startForm[key]
        })
      } else {
        this.setDefaultForm()
      }
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('submit', this.form)
        this.setDefaultForm()
        this.$nextTick(() => {
          this.$refs.observer.reset()
          if (this.inModal) {
            this.close()
          }
        })
      }
    },
    cancel() {
      if (this.startForm) {
        if (this.notSaveChanges) {
          this.$refs['cancel-modal'].show()
        } else {
          this.cancelApply()
        }
      } else {
        this.$refs['cancel-modal'].show()
      }
    },
    cancelApply() {
      this.$emit('cancel')
      if (this.startForm) {
        this.setStartForm()
      } else {
        this.setDefaultForm()
      }
      this.$nextTick(() => {
        this.$refs.observer.reset()
        if (this.inModal) {
          this.close()
        }
      })
    },
    show() {
      this.$refs['form-modal'].show()
    },
    close() {
      this.$refs['form-modal'].close()
    },
    onBlockClose() {
      this.$refs['cancel-modal'].show()
    }
  },
  watch: {
    startForm: {
      immediate: true,
      handler() {
        this.setStartForm()
      }
    }
  }
}