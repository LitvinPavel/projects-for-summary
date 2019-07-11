<template>
    <div>
       {{data.icao}} - {{data.airport}}
    </div>
</template>

<script>
export default {
  name: 'popupContentLccs',
  props: ['data']

}
</script>