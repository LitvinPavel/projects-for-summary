<template>
  <div>
    {{$t('raimRoute.airnavHead[3]')}}: {{ data.lat }} {{$t('raimRoute.airnavHead[4]')}}: {{ data.lng }}
  </div>
</template>

<script>
export default {
  name: 'TooltipContent',
  props: ['data'],
}
</script>