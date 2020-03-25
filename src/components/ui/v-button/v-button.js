export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    viewType: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    IconCmp() {
      return () => import(`@/assets/svg/ic-${this.icon}.svg?inline`);
    }
  },
  methods: {
    onClick(event) {
      event.currentTarget.blur()
      this.$emit('click')
    }
  }
}