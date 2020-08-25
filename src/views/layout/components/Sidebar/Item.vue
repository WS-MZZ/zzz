<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, img } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }

    if (img) {
      vnodes.push(<img src={img} style='width:100px' />)
    }

    return vnodes
  }
}
</script>
