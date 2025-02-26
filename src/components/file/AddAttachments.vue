<script setup>
import { ref } from "vue";
import xlsx from "xlsx";

const fileInput = ref(null);

/** 获取 Excel 表头 */
const getHeader = (sheet) => {
  const headers = [];
  const range = xlsx.utils.decode_range(sheet["!ref"]); // 获取有效范围
  const R = range.s.r; // 取第一行
  let i = 0;

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })]; // 获取单元格
    let hdr = "UNKNOWN" + C; // 默认名称

    if (cell && cell.t) {
      hdr = xlsx.utils.format_cell(cell);
    }

    if (hdr.includes("UNKNOWN")) {
      hdr = i === 0 ? "__EMPTY" : `__EMPTY_${i}`;
      i++;
    }

    headers.push(hdr);
  }

  return headers;
};

/** 导入 Excel 文件 */
const importExcel = (e) => {
  const files = e.target.files;
  if (!files.length) return;

  if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    return alert("上传格式不正确，请上传 xls 或 xlsx 格式");
  }

  const fileReader = new FileReader();
  fileReader.onload = (ev) => {
    try {
      const data = ev.target.result;
      const workbook = xlsx.read(data, { type: "binary" });
      const wsname = workbook.SheetNames[0]; // 取第一张表
      const ws = xlsx.utils.sheet_to_json(workbook.Sheets[wsname]); // 转换为 JSON

      console.log("读取结果", ws);

      // 获取表头
      const headers = getHeader(workbook.Sheets[wsname]);
      console.log("表头", headers);
    } catch (error) {
      alert("读取失败!");
    }
  };

  fileReader.readAsBinaryString(files[0]);

  // 清空 input
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>

<template>
  <div>
    <input type="file" ref="fileInput" @change="importExcel" />
  </div>
</template>
