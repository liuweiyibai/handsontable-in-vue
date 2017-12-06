<template>
   <div class="table-mine-wrapper">
        <table class="table-mine">
        <tr v-for="(item,index) in data" :key="index">
            <td v-for="(i,ins) in item" :key="ins">{{i}}</td>
        </tr>
    </table>
   </div>
</template>
<script>
export default {
  name: "tables",
  props: ["data"]
};
</script>
<style>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 1;
  border-spacing: 0;
}
table td {
  word-break: break-all;
  word-wrap: break-word;
  border-right: 1px solid #939598;
  border-bottom: 1px solid #939598;
  font: 500 14px Arial;
}
.table-mine-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #e6ebf5;
  padding: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.table-mine-wrapper .table-mine tr {
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e6ebf5;
}
.table-mine-wrapper .table-mine tr td {
  box-sizing: border-box;
  border-right: 1px solid #e6ebf5;
  border-bottom: 1px solid #e6ebf5;
  padding: 7px 10px;
}
</style>

  