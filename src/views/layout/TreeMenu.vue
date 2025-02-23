<script setup lang="ts">
import router from "../../router";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import type {
  RouteLocationAsRelativeGeneric,
  RouteLocationAsPathGeneric,
} from "vue-router";

const props = defineProps(["menuData", "index"]);

const handleClick = (item: {
  meta: {
    path: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  };
}) => {
  router.push(item.meta.path);
  store.commit("addMenu", item.meta);
};
const store = useStore();
</script>

<template>
  <div>
    <template
      v-for="(item, index) in props.menuData"
      :key="`${props.index}-${item.meta.id}`"
    >
      <div>
        <el-menu-item
          @click="handleClick(item, index)"
          v-if="!item.children || item.children.length === 0"
          :index="`${props.index}-${item.meta.id}`"
        >
          <el-icon size="20">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </el-menu-item>

        <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
          <template #title>
            <el-icon size="20">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <tree-menu
            :index="`${props.index}-${item.meta.id}`"
            :menuData="item.children || []"
          />
        </el-sub-menu>
      </div>
    </template>
  </div>
</template>
