---
layout: home
---

<ClientOnly>
  <RemoteInput />
  <VpEditor />
</ClientOnly>

<script setup>
import microApp from "@micro-zoe/micro-app"
import RemoteInput from './.vitepress/theme/components/RemoteInput.vue'
import { onMounted } from 'vue'
onMounted(() => {
  microApp.start()
})
</script>

