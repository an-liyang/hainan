# 欢迎使用企业链文档说明
 ```
             .----.
           .'__     `.
       .--(O) (O)--/ #\
     .' @         /  ##\
     :   ·...·  ,  /####）
      `-..__.-'_.- ### /
            `:___:`
          .'        \
        //   start   \\
       //    成功!    \\
        `-.___ ___.-'
        ___`. | .'___
       (______|______)
```
---
## 项目包
* 项目地址：http://114.242.31.175:8090/blockchain/baas-front
* 项目安装依赖：`npm install`
* 项目启动：`npm run dev`
* 构建：`npm run build`
* 补充说明：项目环境node，webpack等等请自行配置

---
## 项目主要目录介绍（参考vue-cli2）
* lang（多语言配置）
* router（路由配置）
* view(视图界面)
* util （常用方法）
 * data.js:接口输出文档
 * util.js:检验输出文档
----
## components
----
### formMoudel（表单组件）
1. props

```javascript
props: {
    options: {
      type: Array //表单基础配置项：name,表单key值 lable 名称,
      // type：1为input，
      // 2为下拉selct，21下拉联动
      // 3为多选框。。。,
      // 4为table表
      // 5为tree
      //datalist为多选，下拉等等数据项参考ui库
    },
    formData: {
      type: Object //表单提交的格式
    },
    rules: {
      type: Object //表单检验规则
    },
    others: {
      type: Object //其他扩展信息
    }
```

2. 使用：

```html
<formMoudel
      :options="options"
      :others="others"
      :formData="ruleForm"
      :rules="rules"
      @success="success"
      @close="close"
    ></formMoudel>
```

##### 参数详细说明
* options:

```javascript
 options: [
        {
          name: "hostName",
          label: "名称",
          type: 1,
          readonly: false,
          disabled: false
        },
        {
          name: "chainType",
          label: "链类型",
          type: 21,
          readonly: false,
          disabled: false,
          dataList: [
            // { label: "FISCO", value: "fisco" },
          ],
          event:true,
          api:[findOrgByChainType],

        },
        {
          name: "id",
          label: "主键id",
          type: 1,
          readonly: false,
          disabled: false,
          show: false
        }
  ]
```
 * name:表单提交的key值
 * label:表单label值
 * type:表单项的类型
   * 1为input，2为下拉selct，21下拉联动,3为多选框。。。,4为table表,5为tree,6为单选

```javascript
<el-select v-show="false" v-model="ruleForm[item.name]" multiple></el-select>//存储树形用的数组，特殊标签
<el-tree :data="item.dataList" show-checkbox node-key="id" ref="tree" @check-change="getNodes(item.name)" :default-expanded-keys="item.extends.expanded"
:default-checked-keys="item.extends.checked"
:props="item.extends.defaultProps">
</el-tree>
```
 * readonly：是否只读
 * disabled：是否禁用
 * dataList：为多选，下拉等表单项的单元集合
 * event：是否存在联动回调
 * api：联动回调的接口。类型为array
 * show：此表单项是否展示

### 注意事项：dataList，extends为渲染数据结构，参考elementUI各类组件

* ruleForm:{
        nodeName: "",
        description: "",
        chainType: "",
        id: "", 
      }
  表单提交项与options的name匹配使用

* rules：检验规则参考elementUI  
* others：
 * api：提交表单接口
 * title：标题
 * type：add新增，modify更新，details查看详情

----
### tableMoudel（表格组件）
1. props：

```javascript
props: {
    listData: {
      type: Array //表单信息[{name:'zhangsan',age:18},{name:'lishi',age:20}]
    },
    headerList: {
      type: Array //表单头部信息[{enName:"name",label:"姓名"，enName:"age",label:"年龄"}] enName为key值,lable为头部信息
    }
  },
```
2. 使用：

```javascript
import tableMoudel from "@/components/tableMoudel";
 components: {
    "v-table": tableMoudel
  },
  <v-table :listData="listData":headerList="headerList"></v-table>
```
3. 效果:

姓名  | 年龄
------------- | -------------
zhang san  | 20
li si  | 18

