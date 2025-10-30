<template>
  <a-card title="图层控制" size="small" class="layer-controller">
    <a-list item-layout="horizontal" :data-source="localLayers">
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="layer-item-content">
            <div class="layer-item-header">
              <a-checkbox
                :checked="item.visible"
                @change="(e) => handleVisibilityChange(item.id, e.target.checked)"
              >
                {{ item.name }}
              </a-checkbox>
            </div>
            <div class="layer-item-slider">
              <span>透明度:</span>
              <a-slider
                :min="0"
                :max="1"
                :step="0.1"
                :value="item.opacity"
                :disabled="!item.visible"
                @change="(value) => handleOpacityChange(item.id, value)"
              />
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup>
defineOptions({ name: 'LayerControllerComponent' });
import { computed } from 'vue';
import ACard from 'ant-design-vue/lib/card';
import AList from 'ant-design-vue/lib/list';
import AListItem from 'ant-design-vue/lib/list/Item';
import ACheckbox from 'ant-design-vue/lib/checkbox';
import ASlider from 'ant-design-vue/lib/slider';

// 使用 v-model:layers 实现双向绑定
const props = defineProps({
  layers: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['update:layers']);

// 使用 computed 属性来避免直接修改 props
const localLayers = computed({
  get: () => props.layers,
  set: (value) => emit('update:layers', value),
});

const handleVisibilityChange = (id, visible) => {
  const newLayers = localLayers.value.map(layer =>
    layer.id === id ? { ...layer, visible } : layer
  );
  localLayers.value = newLayers;
};

const handleOpacityChange = (id, opacity) => {
  const newLayers = localLayers.value.map(layer =>
    layer.id === id ? { ...layer, opacity } : layer
  );
  localLayers.value = newLayers;
};
</script>

<style scoped>
.layer-controller {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.layer-controller :deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 16px;
  background: #0d3051;
  border-radius: 8px 8px 0 0;
}

.layer-controller :deep(.ant-card-head-title) {
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.layer-controller :deep(.ant-card-body) {
  padding: 12px 16px;
  max-height: 480px;
  overflow-y: auto;
}

.layer-controller :deep(.ant-list-item) {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.layer-controller :deep(.ant-list-item:last-child) {
  border-bottom: none;
}

.layer-item-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-item-header {
  width: 100%;
}

.layer-item-header :deep(.ant-checkbox-wrapper) {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  cursor: pointer;
  transition: color 0.2s;
}

.layer-item-header :deep(.ant-checkbox-wrapper):hover {
  color: #1890ff;
}

.layer-item-slider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 24px;
}

.layer-item-slider span {
  white-space: nowrap;
  font-size: 12px;
  color: #8c8c8c;
  min-width: 48px;
}

.layer-item-slider .ant-slider {
  flex-grow: 1;
}

/* 滚动条样式优化 */
.layer-controller :deep(.ant-card-body)::-webkit-scrollbar {
  width: 6px;
}

.layer-controller :deep(.ant-card-body)::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.layer-controller :deep(.ant-card-body)::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 3px;
}

.layer-controller :deep(.ant-card-body)::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
