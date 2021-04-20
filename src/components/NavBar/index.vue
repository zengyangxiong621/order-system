<template>
  <sticky>
    <div id="nav-bar">
      <div id="left">
        <Icon
          name="arrow-left"
          size="0.5rem"
          v-show="isSearched"
          @click="()=> {$router.back();}"
        ></Icon>
      </div>
      <div id="center">
        <Search
          id="inputId"
          shape="round"
          placeholder="请输入商品名"
          @click="itemClick(isSearched)"
          @keypress.native.enter="onSearch"
          :disabled="!isSearched"
          :show-action="isSearched"
          clearable
          v-model="searchValue"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </Search>

      </div>
      <div id="right">
        <Popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="popSelect"
          theme="dark"
          placement="bottom-end"
          arrowPointAtCenter
        >
          <template #reference>
            <Icon
              name="ellipsis"
              size="0.6rem"
              v-show="!isSearched"
            >
            </Icon>
          </template>
        </Popover>
      </div>
    </div>
  </sticky>

</template>

<script>
import { Search, Icon, Popover, Toast, Sticky } from 'vant';
import NativeShare from 'nativeshare';

export default {
  name: 'index',
  data() {
    return {
      searchValue: '',
      actions: [{
        text: '呼叫商家',
        icon: 'phone-o'
      },
        {
          text: '分享',
          icon: 'share-o'
        }],
      showPopover: false,
      nativeShare: new NativeShare({
        wechatConfig: {
          appId: '',
          timestamp: '',
          nonceStr: '',
          signature: '',
        },
        // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
        // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
        syncDescToTag: false,
        syncIconToTag: false,
        syncTitleToTag: false,

      }),
      shareData: {
        icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
        link: 'https://github.com/fa-ge/NativeShare',
        title: 'NativeShare',
        desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
        from: '@fa-ge',

      }
    };
  },
  props: {
    isSearched: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Search,
    Icon,
    Popover,
    Toast,
    Sticky
  },
  methods: {
    itemClick(value) {
      if (!value) {
        this.$router.push('/search');
      }
    },
    popSelect(action) {
      Toast(action.text);
      if (action.text == '分享') {
        // this.$emit('shareAction', action.text)
        try {
          this.nativeShare.call();
          // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
          // 类似的命令下面有介绍
        } catch (err) {
          // 如果不支持，你可以在这里做降级处理
          Toast('该浏览器不支持');
        }
      }
    },
    onSearch() {
      this.$emit('searchDish', this.searchValue)
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(_ => {
      document.getElementById('inputId')
        .focus();
    });
  }
};
</script>

<style scoped lang="less">
#nav-bar {
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  #left {
    margin-left: 10px;
  }

  #center {
    flex: 1;
  }

  #right {
    margin-right: 10px;
  }
}

</style>
