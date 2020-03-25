export default {
  name: 'VTextarea',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 300
    },
    noControls: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      history: {
        stack: [''],
        currentNumber: 0,
        currentCooldownNumber: 0
      }
    }
  },
  created() {
    this.history.stack[0] = this.value
  },
  methods: {
    historyRecond(data, force) {
      const { history, cooldownNumber } = this
      //checking for regular history updates
      if (history.currentNumber === history.stack.length - 1) {
        //history updates after a new cooldown
        if ((history.currentCooldownNumber >= cooldownNumber || history.currentCooldownNumber === 0) && force !== true) {
          history.stack.push(data)
          history.currentNumber++
          history.currentCooldownNumber = 1
        //history updates during cooldown
        } else if (history.currentCooldownNumber < cooldownNumber && force !== true) {
          this.historyCurrent(data)
          history.currentCooldownNumber++
        //force to record without cooldown
        } else if (force === true) {
          history.stack.push(data)
          history.currentNumber++
          history.currentCooldownNumber = cooldownNumber
        }
      //checking for history updates after undo
      } else if (history.currentNumber < history.stack.length - 1) {
        //history updates after undo
        if (force !== true) {
          history.stack.length = history.currentNumber + 1
          history.stack.push(data)
          history.currentNumber++
          history.currentCooldownNumber = 1
        ////force to record after undo
        } else if (force === true) {
          history.stack.length = history.currentNumber + 1
          history.stack.push(data)
          history.currentNumber++
          history.currentCooldownNumber = cooldownNumber
        }
      }
    },
    historyUndo(readOnly) {
      const { history } = this
      if (history.currentNumber > 0) {
        if (readOnly !== true) {
          history.currentNumber--
          return history.stack[history.currentNumber]
        } else {
          return history.stack[history.currentNumber - 1]
        }
      }
    },
    historyRedo(readOnly) {
      const { history } = this
      if (history.currentNumber < history.stack.length - 1) {
        if (readOnly !== true) {
          history.currentNumber++
          return history.stack[history.currentNumber]
        } else {
          return history.stack[history.currentNumber + 1]
        }
      }
    },
    historyCurrent(data) {
      const { history } = this
      if (data) {
        history.stack[history.currentNumber] = data
      }
      return history.stack[history.currentNumber]
    },
    onInput(event) {
      const textareaValue = event.target.value
      const historyCurrent = this.historyCurrent()
      if (historyCurrent !== textareaValue) {
        // Check for pastes, auto corrects..
        if (
          (textareaValue.length - historyCurrent.length) > 1 ||
          (textareaValue.length - historyCurrent.length) < -1 ||
          (textareaValue.length - historyCurrent.length) === 0
        ) {
          // Record the textarea value and force to bypass cooldown
          this.historyRecond(textareaValue, true)
        // Check for single key press, single chacacter paste..
        } else {
          // Record the textarea value
          this.historyRecond(textareaValue)
        }
      }
      this.$emit('input', textareaValue)
    },
    onUndo() {
      if (this.historyUndo(true) !== undefined) {
        const updatedValue = this.historyUndo()
        this.$refs.textarea.value = updatedValue
        this.$emit('input', updatedValue)
      }
    },
    onRedo() {
      if (this.historyRedo(true) !== undefined) {
        const updatedValue = this.historyRedo()
        this.$refs.textarea.value = updatedValue
        this.$emit('input', updatedValue)
      }
    },
    onKeydown(event) {
      /**
       * event.code not present in MS Edge
       */
      const isCtrl = event.metaKey || event.ctrlKey
      if (isCtrl) {
        if (event.keyCode === 89 || event.keyCode === 90) {
          event.preventDefault()
        }
        if (
            event.keyCode === 89 ||
            event.shiftKey && event.keyCode === 90
          ) {
            this.onRedo()
        } else if (event.keyCode === 90) {
          this.onUndo()
        }
      }

      if (event.keyCode === 13 ) {
        if (!(isCtrl || event.shiftKey)) {
          event.preventDefault()
          this.$emit('enterKey')
        } else {
          const updatedValue = this.$refs.textarea.value + '\n'
          this.$refs.textarea.value = updatedValue
          this.onInput({ target: { value: updatedValue } })
        }
      }
    }
  }
}