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

<style scoped>
.docs-api-table {
  overflow-x: auto;
}

.docs-api-table table {
  width: 100%;
  table-layout: fixed;
}

.docs-api-table th,
.docs-api-table td {
  vertical-align: top;
  overflow-wrap: anywhere;
}

.docs-api-table th:nth-child(1),
.docs-api-table td:nth-child(1) {
  width: 22%;
}

.docs-api-table th:nth-child(2),
.docs-api-table td:nth-child(2) {
  width: 28%;
}

.docs-api-table th:nth-child(3),
.docs-api-table td:nth-child(3) {
  width: 14%;
}

.docs-api-table th:nth-child(4),
.docs-api-table td:nth-child(4) {
  width: 36%;
}

.docs-api-table code {
  white-space: normal;
  overflow-wrap: anywhere;
}

@media (max-width: 700px) {
  .docs-api-table table {
    min-width: 38rem;
  }
}
</style>
