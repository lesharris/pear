<script setup lang="ts">
export type DocsApiItem = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

defineProps<{
  caption: string;
  items: DocsApiItem[];
}>();
</script>

<template>
  <div class="docs-api-table">
    <h4>{{ caption }}</h4>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>
            <code>{{ item.name }}</code>
          </td>
          <td>
            <code>{{ item.type }}</code>
          </td>
          <td>{{ item.default ?? "-" }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
