<template>
  <div>
    <el-container style="height:  500px; border: 1px solid #eee">
      <el-header style="height:  50px;font-size: 40px;color: red;">MiniBom
      </el-header>
     
      <el-container>

        <!--左侧边框-->
        <el-aside width="230px" style="border: 1px solid #eee">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '2']">

              <el-menu-item index="1-1"><router-link to="/bu">部件管理</router-link></el-menu-item>
              <el-menu-item index="1-2"><router-link to="/Bom">BOM管理</router-link></el-menu-item>

            </el-menu>
          </el-aside>
        </el-aside>

        <el-main style="padding-top: 0px;">
          <!--Form表单-->

          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="按编码查询">
              <el-input v-model="searchForm.partNumber" placeholder="按编码查询"></el-input>

            </el-form-item>

            <el-form-item style="margin-left: 100px;" label="按部件名称">
              <el-input v-model="searchForm.partName" placeholder="按部件名称"></el-input>

            </el-form-item>


            <el-form-item>
              <el-button type="primary" style="margin-left: 50px;" @click="onSubmit">查询</el-button>              
              <el-button type="danger" style="margin-left: 50px;" @click="showAdd = true">创建</el-button>
            </el-form-item>
          </el-form>


<!--展示查询结果-->
          <el-table :data="tableData" border style="margin-top: 0px;">
            <el-table-column prop="partNumber" label="部件编码" width="200"></el-table-column>
           
            <el-table-column prop="partName" label="部件名称" width="200">
            </el-table-column>
            <el-table-column prop="version" label="版本号" width="200"></el-table-column>
            <el-table-column prop="partType" label="装配模式" width="200"></el-table-column>
            <el-table-column prop="businessCode" label="分类编码" width="200"></el-table-column>
            <el-table-column #default="{row}" label="操作">
              <el-button type="primary" size="mini" @click="dialogFormVisible = true; form = row">修改</el-button>
              <el-button type="danger" style="margin-left: 10px;" size="mini" @click="DeletePart(row)">删除</el-button>
            </el-table-column>
          </el-table>

        

          <!--part修改模块-->
          <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-tabs type="border-card">
                  <el-tab-pane label="基本属性">
                      <el-collapse v-model="activeNames1" @change="handleChange">

                          <el-collapse-item title="基本属性" name="1">
                              <div class="set">产品：笔记本电脑</div>
                              <el-form-item label="部件名称：" :label-width="formLabelWidth" required>
                                  <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="来源：" :label-width="formLabelWidth" required>
                                  <el-select v-model="form.partSource" placeholder="请选择">
                                      <el-option
                                        v-for="item in options1"
                                        :key="item.value1"
                                        :label="item.label1"
                                        :value="item.value1">
                                      </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="装配模式：" :label-width="formLabelWidth">
                                  <el-select v-model="form.assemblyMode" placeholder="请选择">
                                      <el-option
                                        v-for="item in options2"
                                        :key="item.value2"
                                        :label="item.label2"
                                        :value="item.value2">
                                      </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="分类代码：" :label-width="formLabelWidth" required>
                                  <el-input v-model="form.number" @blur="getcls($event)" autocomplete="off"></el-input>
                                </el-form-item>                                   

                          </el-collapse-item>
                      
                          <el-collapse-item title="扩展属性" name="2">
                           
                                <el-form-item v-for="(item, index) in clsData" :key="index" :label="item.name" :label-width="formLabelWidth">
                                  <el-input v-model="item.value" autocomplete="off"></el-input>
                                </el-form-item>
                          </el-collapse-item>
                         
                        </el-collapse>

                  </el-tab-pane>

                  <el-tab-pane label="BOM清单">BOM清单</el-tab-pane>
                  <el-tab-pane label="版本管理">版本管理</el-tab-pane>
                  
                </el-tabs>
             
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="UdatePart(form)">提交</el-button>
            </div>
          </el-dialog>

          <!--part创建模块-->
          <!-- add window -->
          <el-dialog title="" :visible.sync="showAdd">
            <el-form :model="addform">
              <el-tabs type="border-card">
                  <el-tab-pane label="基本属性">
                      <el-collapse v-model="activeNames" @change="handleChange">

                          <el-collapse-item title="基本属性" name="1">
                              <div class="set">产品：笔记本电脑</div>
                              <el-form-item label="部件名称：" :label-width="formLabelWidth" required>
                                  <el-input v-model="addform.name" autocomplete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="来源：" :label-width="formLabelWidth" required>
                                  <el-select v-model="addform.partSource" placeholder="请选择">
                                      <el-option
                                        v-for="item in options1"
                                        :key="item.value1"
                                        :label="item.label1"
                                        :value="item.value1">
                                      </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="装配模式：" :label-width="formLabelWidth">
                                  <el-select v-model="addform.assemblyMode" placeholder="请选择">
                                      <el-option
                                        v-for="item in options2"
                                        :key="item.value2"
                                        :label="item.label2"
                                        :value="item.value2">
                                      </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="分类代码：" :label-width="formLabelWidth" required>
                                  <el-input v-model="addform.number" @blur="getcls($event)" autocomplete="off"></el-input>
                                </el-form-item>                                   

                          </el-collapse-item>



                          
                          <el-collapse-item title="扩展属性" name="2">
                           
                                <el-form-item v-for="(item, index) in clsData" :key="index" :label="item.name" :label-width="formLabelWidth">
                                  <el-input v-model="item.value" autocomplete="off"></el-input>
                                </el-form-item>
                          </el-collapse-item>
                         
                        </el-collapse>

                  </el-tab-pane>
                  
                  <el-tab-pane label="BOM清单">BOM清单</el-tab-pane>
                  <el-tab-pane label="版本管理">版本管理</el-tab-pane>
                </el-tabs>
             
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="showAdd = false">取 消</el-button>
              <el-button type="primary" @click="addPart(form)">提交</el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<script>

  import axios from 'axios';

  export default {
    data() {
      return {
  options1: [{
        value1: '选项1',
        label1: '制造'
      }, {
        value1: '选项2',
        label1: '购买'
      },{
        value1: '选项3',
        label1: '购买-单一供应源'
      }
      
  ],

  options2: [{
        value2: '选项1',
        label2: '可分离'
      }, {
        value2: '选项2',
        label2: '不可分离'
      },{
        value2: '选项3',
        label2: '零件'
      }
    
    ],
          activeNames: ['1'],
          activeNames1: ['1'],
        dialogFormVisible: false,
        showAdd: false,

        //修改
        form: {},


        //创建
        addform: {},

        formLabelWidth: '120px',
        tableData: [],//接受传来的数组，并渲染
        clsData:[],
        searchForm: {//输入的
          //v-model的东西要在这里声明

          partNumber: "",
          
          partName: ""

        }
      }
    },
    methods: {
      handleChange(val) {
      console.log(val);
    },

      onSubmit: function (searchForm) {
        
//有用，联调阶段启用
      //   var partNumber1 = this.searchForm.partNumber;
      //   var name1 = this.searchForm.partName;
        // axios.post("http://localhost:8080/part/query", {
          
        //   partNumber:this.searchForm.partNumber,
        //   partName:this.searchForm.partName

        // }).then(
        //   (result) => {
        //     console.log(result);
        //     console.log(searchForm);
        //     this.tableData = result.data;

        //   }
        // );
//测试数据
        let result = { "code": 20041, "message": "查询成功", "data": [ { "partId": 643938945230446593, "partName": "PART", "partNumber": "Part000000032", "version": "A", "iteration": 4, "partType": "零件", "businessCode": null }, { "partId": 10000001, "partName": "华为Mate60Pro", "partNumber": "Part000000033", "version": "A", "iteration": 4, "partType": "零件", "businessCode": null }, { "partId": 644609559540797441, "partName": "PART(555555)", "partNumber": "Part000000039", "version": "A", "iteration": 1, "partType": "零件", "businessCode": null }, { "partId": 10000002, "partName": "6.8英寸屏幕", "partNumber": "Part000000035", "version": "A", "iteration": 2, "partType": "零件", "businessCode": null } ] };
        console.log(result.data);
        console.log(searchForm);
        this.tableData = result.data;
      },

      //查询扩展属性
      getcls(e){
        console.log(e);
        var businessCode1=this.addform.businessCode;
        console.log(businessCode1);

        //有用，目前先注释，联调阶段在启用
        // axios({
        //   methods:"GET",
        //   url:"http://localhost:8080/part/ClassificationNode/getCategoryNodeInfo?id="+businessCode1
        // }).then(
        //   (result)=>{
        //     console.log(result);
            
        //     this.clsData = result.data;
        //   }
        // );
        //测试数据
        let result = { "code": 20041, "message": "查询指定分类结点的全部分类属性 成功", "data": [ { "id": "642731228134379525", "name": "宽度", "nameEn": "Width", "description": "宽度", "descriptionEn": "", "type": "DECIMAL", "inherit": false, "holderNameEn": "", "holderId": null, "selfHolderId": null, "constraints": { "graphIndex": false, "iot": false, "length": 0, "precision": 8, "readLength": null, "readRange": null, "uniqueKey": false, "variable": true, "unit": null, "enumValue": null, "notnull": false, "range": "", "secretLevel": "internal", "encryption": false, "defaultVal": "", "isListAttribute": 0, "fileStorageType": null, "enumName": null, "measurementName": null, "measurementValue": null, "referenceEntityNumber": null, "multiValue": false, "caseMode": "DEFAULT", "legalValueType": null, "index": false, "stockInDB": true }, "defaultValue": null, "disabled": false, "eosTime": null, "createVersion": null, "isExtensionAttribute": 1, "isUse": 0, "createTime": "2024-06-17T08:07:10.469+0000", "bindingAttribute": false, "unitTypeId": null, "measuringUnitId": null, "enumTypeId": null, "enumDefaultValueId": null, "measuringUnitName": null, "measuringUnitValue": null, "enumName": null, "enumVal": null, "isMasterAttribute": 0, "enumValue": null, "order": 0, "extendedInformation": null, "readOnly": false, "damAttributeNumber": null, "damDataStandardNumber": null, "damAttributeName": null, "idStandardNumber": null, "typeStandardNumber": null, "tenantName": null, "measuringUnit": null, "extendAttr": false }, { "id": "642731228134379524", "name": "重量", "nameEn": "Weight", "description": "重量", "descriptionEn": "", "type": "DECIMAL", "inherit": false, "holderNameEn": "", "holderId": null, "selfHolderId": null, "constraints": { "graphIndex": false, "iot": false, "length": 0, "precision": 8, "readLength": null, "readRange": null, "uniqueKey": false, "variable": true, "unit": null, "enumValue": null, "notnull": false, "range": "", "secretLevel": "internal", "encryption": false, "defaultVal": "", "isListAttribute": 0, "fileStorageType": null, "enumName": null, "measurementName": null, "measurementValue": null, "referenceEntityNumber": null, "multiValue": false, "caseMode": "DEFAULT", "legalValueType": null, "index": false, "stockInDB": true }, "defaultValue": null, "disabled": false, "eosTime": null, "createVersion": null, "isExtensionAttribute": 1, "isUse": 0, "createTime": "2024-06-17T08:07:10.469+0000", "bindingAttribute": false, "unitTypeId": null, "measuringUnitId": null, "enumTypeId": null, "enumDefaultValueId": null, "measuringUnitName": null, "measuringUnitValue": null, "enumName": null, "enumVal": null, "isMasterAttribute": 0, "enumValue": null, "order": 0, "extendedInformation": null, "readOnly": false, "damAttributeNumber": null, "damDataStandardNumber": null, "damAttributeName": null, "idStandardNumber": null, "typeStandardNumber": null, "tenantName": null, "measuringUnit": null, "extendAttr": false }, { "id": "642731228134379523", "name": "长度", "nameEn": "Length", "description": "长度", "descriptionEn": "", "type": "DECIMAL", "inherit": false, "holderNameEn": "", "holderId": null, "selfHolderId": null, "constraints": { "graphIndex": false, "iot": false, "length": 0, "precision": 8, "readLength": null, "readRange": null, "uniqueKey": false, "variable": true, "unit": null, "enumValue": null, "notnull": false, "range": "", "secretLevel": "internal", "encryption": false, "defaultVal": "", "isListAttribute": 0, "fileStorageType": null, "enumName": null, "measurementName": null, "measurementValue": null, "referenceEntityNumber": null, "multiValue": false, "caseMode": "DEFAULT", "legalValueType": null, "index": false, "stockInDB": true }, "defaultValue": null, "disabled": false, "eosTime": null, "createVersion": null, "isExtensionAttribute": 1, "isUse": 0, "createTime": "2024-06-17T08:07:10.469+0000", "bindingAttribute": false, "unitTypeId": null, "measuringUnitId": null, "enumTypeId": null, "enumDefaultValueId": null, "measuringUnitName": null, "measuringUnitValue": null, "enumName": null, "enumVal": null, "isMasterAttribute": 0, "enumValue": null, "order": 0, "extendedInformation": null, "readOnly": false, "damAttributeNumber": null, "damDataStandardNumber": null, "damAttributeName": null, "idStandardNumber": null, "typeStandardNumber": null, "tenantName": null, "measuringUnit": null, "extendAttr": false }, { "id": "642731228134379522", "name": "型号", "nameEn": "Mode", "description": "型号", "descriptionEn": "", "type": "STRING", "inherit": false, "holderNameEn": "", "holderId": null, "selfHolderId": null, "constraints": { "graphIndex": false, "iot": false, "length": 30, "precision": 0, "readLength": null, "readRange": null, "uniqueKey": false, "variable": true, "unit": null, "enumValue": null, "notnull": false, "range": null, "secretLevel": "internal", "encryption": false, "defaultVal": "", "isListAttribute": 0, "fileStorageType": null, "enumName": null, "measurementName": null, "measurementValue": null, "referenceEntityNumber": null, "multiValue": false, "caseMode": "DEFAULT", "legalValueType": null, "index": false, "stockInDB": true }, "defaultValue": null, "disabled": false, "eosTime": null, "createVersion": null, "isExtensionAttribute": 1, "isUse": 0, "createTime": "2024-06-17T08:07:10.469+0000", "bindingAttribute": false, "unitTypeId": null, "measuringUnitId": null, "enumTypeId": null, "enumDefaultValueId": null, "measuringUnitName": null, "measuringUnitValue": null, "enumName": null, "enumVal": null, "isMasterAttribute": 0, "enumValue": null, "order": 0, "extendedInformation": null, "readOnly": false, "damAttributeNumber": null, "damDataStandardNumber": null, "damAttributeName": null, "idStandardNumber": null, "typeStandardNumber": null, "tenantName": null, "measuringUnit": null, "extendAttr": false }, { "id": "642731228134379521", "name": "大小", "nameEn": "Size", "description": "大小", "descriptionEn": "", "type": "DECIMAL", "inherit": false, "holderNameEn": "", "holderId": null, "selfHolderId": null, "constraints": { "graphIndex": false, "iot": false, "length": 0, "precision": 8, "readLength": null, "readRange": null, "uniqueKey": false, "variable": true, "unit": null, "enumValue": null, "notnull": false, "range": "", "secretLevel": "internal", "encryption": false, "defaultVal": "", "isListAttribute": 0, "fileStorageType": null, "enumName": null, "measurementName": null, "measurementValue": null, "referenceEntityNumber": null, "multiValue": false, "caseMode": "DEFAULT", "legalValueType": null, "index": false, "stockInDB": true }, "defaultValue": null, "disabled": false, "eosTime": null, "createVersion": null, "isExtensionAttribute": 1, "isUse": 0, "createTime": "2024-06-17T08:07:10.469+0000", "bindingAttribute": false, "unitTypeId": null, "measuringUnitId": null, "enumTypeId": null, "enumDefaultValueId": null, "measuringUnitName": null, "measuringUnitValue": null, "enumName": null, "enumVal": null, "isMasterAttribute": 0, "enumValue": null, "order": 0, "extendedInformation": null, "readOnly": false, "damAttributeNumber": null, "damDataStandardNumber": null, "damAttributeName": null, "idStandardNumber": null, "typeStandardNumber": null, "tenantName": null, "measuringUnit": null, "extendAttr": false }, { "id": "642731228134379520", "name": "高度/厚度", "nameEn": "Height or thickness", "description": "高度/厚度", "descriptionEn": "", "type": "DECIMAL", "inherit": false, "holderNameEn": "", "holderId": null, "selfHolderId": null, "constraints": { "graphIndex": false, "iot": false, "length": 0, "precision": 8, "readLength": null, "readRange": null, "uniqueKey": false, "variable": true, "unit": null, "enumValue": null, "notnull": false, "range": "", "secretLevel": "internal", "encryption": false, "defaultVal": "", "isListAttribute": 0, "fileStorageType": null, "enumName": null, "measurementName": null, "measurementValue": null, "referenceEntityNumber": null, "multiValue": false, "caseMode": "DEFAULT", "legalValueType": null, "index": false, "stockInDB": true }, "defaultValue": null, "disabled": false, "eosTime": null, "createVersion": null, "isExtensionAttribute": 1, "isUse": 0, "createTime": "2024-06-17T08:07:10.469+0000", "bindingAttribute": false, "unitTypeId": null, "measuringUnitId": null, "enumTypeId": null, "enumDefaultValueId": null, "measuringUnitName": null, "measuringUnitValue": null, "enumName": null, "enumVal": null, "isMasterAttribute": 0, "enumValue": null, "order": 0, "extendedInformation": null, "readOnly": false, "damAttributeNumber": null, "damDataStandardNumber": null, "damAttributeName": null, "idStandardNumber": null, "typeStandardNumber": null, "tenantName": null, "measuringUnit": null, "extendAttr": false } ] }
        console.log(result.data);
        this.clsData = result.data;
      },
      


      //删除
      DeletePart: function (row) {
        console.log(row);

        axios.delete("http://localhost:8080/part/delete/" + row.partId, {

        }).then(
          (result) => {
            console.log(result);
            this.tableData = result.data;
            //把删除后的结果展示出来
            axios.post("http://localhost:8080/part/query", {
                
        }).then(
          (result) => {
            console.log(result);
          
            this.tableData = result.data;

          }
        );
            
          }
        );
      },




      //修改part
      UdatePart: function (row) {
        
        console.log(row);

        console.log(this.clsData);
        let ret = {};
        for(let i = 0;i < this.clsData.length;i++){
          ret[this.clsData[i].nameEn] = this.clsData[i].value ?? "";
        }

        console.log(ret);

        axios.put("http://localhost:8080/part/updateAndCheckin", {

          masterId:this.clsData.partId,           
          name: this.form.name,
          partSource: this.form.partSource,
          assemblyMode: this.form.assemblyMode,
          clsAttrs: ret,
          number: this.form.number

        }).then((result) => {
          console.log(result)
          this.dialogFormVisible = false
          //修改之后的结果再次渲染上去
        axios.post("http://localhost:8080/part/query", {


        }).then(
          (result) => {
            console.log(result);
            console.log(11111111)
            this.tableData = result.data;

          }
        );            
        }
        );

      },



      //创建模块
      addPart: function (row) {
       
        console.log(row);
        console.log(this.clsData);
        let ret = {};
        for(let i = 0;i < this.clsData.length;i++){
          ret[this.clsData[i].nameEn] = this.clsData[i].value ?? "";
        }

        console.log(ret);

        axios.post("http://localhost:8080/part/create", {
          name: this.addform.name,
          partSource: this.addform.partSource,
          assemblyMode: this.addform.assemblyMode,
          clsAttrs: ret,
          clsnumber: this.addform.number


        }).then((result) => {
          console.log(result)
          this.dialogFormVisible = false

          axios.post("http://localhost:8080/part/query", {
          
          partNumber:this.searchForm.partNumber,
          partName:this.searchForm.partName

        }).then(
          (result) => {
            console.log(result);
            // console.log(searchForm);
            this.tableData = result.data;

          }
        );
        }
        );

      },
    },

  }


</script>


<style>
  .set{
      margin-left: 52px;
      font-size: 15px;
      margin-bottom: 5px;
  }

</style>