<template>
    <div class="wrapper-availability">
        <span v-if="available && !forceUnavailable" class="availability available">{{
            $t('product.availableLabel')
        }}</span>
        <span v-else class="availability unavailable">{{ $t('product.unavailableLabel') }}</span>
    </div>
</template>
<script>
export default {
    props: {
        productId: {
            type: String,
            required: true
        },
        forceUnavailable: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            available: true
        };
    }
};
</script>

<style lang="scss" scoped>
.wrapper-availability {
    flex: 1 1 auto;
}
.availability {
    display: inline-flex;
    align-items: center;
    font-size: 1.4rem;
    line-height: 18px;
    color: $grey-2;
    &::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 50%;
    }
    &.available {
        &::before {
            background: $valid;
        }
    }
    &.unavailable {
        &::before {
            background: $error;
        }
    }
}
</style>
