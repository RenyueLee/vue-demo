<script>
  export default {
  functional:true,
    name: "Item",
    render(h,context){
      return (
        <div class="red" {...context.data}>
          {context.props.data}
        </div>
      )
    }
  }
</script>
