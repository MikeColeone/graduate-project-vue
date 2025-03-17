<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
const selectMenu = computed(() => store.state.menu.selectMenu);

const closeTad = (item: { path: string }, index: number) => {
  store.commit("closeMenu", item);

  //删除当前的tag
  if (route.path !== item.path) {
    return;
  }
  const selectMenuData = selectMenu.value;
  //删除最后一项的逻辑

  if (index == selectMenuData.length) {
    console.log(index);
    console.log(selectMenuData.length);
    //只有一个元素
    if (!selectMenuData.lenghth) {
      router.push("/");
    } else {
      router.push({
        path: selectMenuData[index - 1].path,
      });
    }
  } else {
    router.push({
      path: selectMenuData[index].path,
    });
  }
};
</script>
<template>
  <div>
    <div class="header-container" style="height: 35px">
      <div class="header-left">
        <ul class="flex-box" style="text-decoration: none">
          <li
            v-for="(item, index) in selectMenu"
            :key="item.path"
            class="tad flex-box"
          >
            <el-icon class="icon" size="18px"
              ><component :is="item.icon"></component
            ></el-icon>
            <router-link
              :to="{ path: item.path }"
              style="text-decoration: none"
            >
              {{ item.name }}
            </router-link>
            <el-icon
              @click="closeTad(item, index)"
              class="icon close"
              size="12px"
              ><Close
            /></el-icon>
          </li>
        </ul>
      </div>

      <!-- 头像位置 -->
      <div class="example-showcase">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar
              shape="square"
              size="small"
              src="https://cube.elemecdn.com/6/9c/03f4d5c4b4f0f7b4e3b3b6e4e4e7dpng.png"
            ></el-avatar>
            <!-- <span>{{ form.name }}</span> -->
          </span>
          <el-dropdown-menu v-slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: rgb(217, 196, 196);
  padding-right: 25px;
  padding-left: 0px;
  padding: 10px;
  margin: 0px;
  .header-left {
    height: 100%;
    display: flex;
    align-items: center;
    .icon {
      height: 100%;
      width: 45px;
    }
    .icon:hover {
      background-color: rgb(209, 177, 177);
      cursor: pointer;
    }
    .tad {
      padding: 0px 10px;
      height: 100%;
      .text {
        margin: 0px;
      }
      .close {
        visibility: hidden;
      }
    }
    .tad:hover {
      background-color: #f5f5f5;
      .close {
        visibility: inherit;
        cursor: pointer;
      }
    }
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
