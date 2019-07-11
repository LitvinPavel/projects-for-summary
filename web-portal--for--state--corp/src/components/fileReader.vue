<template>
    <b-col cols="4"> 
        <label class="text-reader send-custom mt-2 btn btn-sm" >
            {{$t('raimRoute.load')}}
            <b-form-file ref="fileinput"  @change="loadTextFromFile" plain></b-form-file>
        </label>
    </b-col>
</template>

<script>
export default {
    methods: {
        loadTextFromFile(ev) { 
            this.$emit("clear", 1)
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.$emit("load", JSON.parse(e.target.result));
            reader.readAsText(file);
            this.$refs.fileinput.reset()
            
        }
    }
};
</script>
<style>
.text-reader {
    position: relative;
}
.text-reader input {
    position: absolute;
    z-index: -1;
    opacity: 0;
}
</style>
