<template>
    <div class="help-footer">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.help-footer{
    padding: 10px;
    border: 1px solid #eee;
    height: 150px;
    overflow-y: scroll;
    .help-item{
        margin-bottom: 8px;
    }
}
</style>