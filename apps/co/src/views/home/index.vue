<template>
  <div class="card h-full flex justify-center items-center">
    <bcc-button @click="test" />
  </div>
</template>

<script lang="ts" name="home" setup>
import { BccButton } from '@bcc/components';
import { testUtil } from '@bcc/utils';

const test = () => testUtil();
</script>
