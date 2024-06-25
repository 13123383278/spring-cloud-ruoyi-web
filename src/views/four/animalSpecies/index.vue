<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="动物种类名称" prop="speciesName">
        <el-input
          v-model="queryParams.speciesName"
          placeholder="请输入动物种类名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物种学名" prop="scientificName">
        <el-input
          v-model="queryParams.scientificName"
          placeholder="请输入物种学名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分布区域" prop="classification">
        <el-input
          v-model="queryParams.classification"
          placeholder="请输入分布区域"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="栖息地" prop="habitat">
        <el-input
          v-model="queryParams.habitat"
          placeholder="请输入栖息地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="食物习性" prop="diet">
        <el-input
          v-model="queryParams.diet"
          placeholder="请输入食物习性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平均寿命" prop="averageLifespan">
        <el-input
          v-model="queryParams.averageLifespan"
          placeholder="请输入平均寿命"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否濒危" prop="isEndangered">
        <el-input
          v-model="queryParams.isEndangered"
          placeholder="请输入是否濒危"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="保护状态" prop="conservationStatus">
        <el-select v-model="queryParams.conservationStatus" placeholder="请选择保护状态" clearable>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createdAt">
        <el-date-picker clearable
          v-model="queryParams.createdAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updatedAt">
        <el-date-picker clearable
          v-model="queryParams.updatedAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['four:animalSpecies:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['four:animalSpecies:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['four:animalSpecies:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['four:animalSpecies:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="animalSpeciesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="动物种类名称" align="center" prop="speciesName" />
      <el-table-column label="物种学名" align="center" prop="scientificName" />
      <el-table-column label="分布区域" align="center" prop="classification" />
      <el-table-column label="栖息地" align="center" prop="habitat" />
      <el-table-column label="食物习性" align="center" prop="diet" />
      <el-table-column label="平均寿命" align="center" prop="averageLifespan" />
      <el-table-column label="是否濒危" align="center" prop="isEndangered" />
      <el-table-column label="保护状态" align="center" prop="conservationStatus" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="创建时间" align="center" prop="createdAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updatedAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatedAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['four:animalSpecies:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['four:animalSpecies:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改动物种类基础对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="动物种类名称" prop="speciesName">
          <el-input v-model="form.speciesName" placeholder="请输入动物种类名称" />
        </el-form-item>
        <el-form-item label="物种学名" prop="scientificName">
          <el-input v-model="form.scientificName" placeholder="请输入物种学名" />
        </el-form-item>
        <el-form-item label="分布区域" prop="classification">
          <el-input v-model="form.classification" placeholder="请输入分布区域" />
        </el-form-item>
        <el-form-item label="栖息地" prop="habitat">
          <el-input v-model="form.habitat" placeholder="请输入栖息地" />
        </el-form-item>
        <el-form-item label="食物习性" prop="diet">
          <el-input v-model="form.diet" placeholder="请输入食物习性" />
        </el-form-item>
        <el-form-item label="平均寿命" prop="averageLifespan">
          <el-input v-model="form.averageLifespan" placeholder="请输入平均寿命" />
        </el-form-item>
        <el-form-item label="是否濒危" prop="isEndangered">
          <el-input v-model="form.isEndangered" placeholder="请输入是否濒危" />
        </el-form-item>
        <el-form-item label="保护状态" prop="conservationStatus">
          <el-radio-group v-model="form.conservationStatus">
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAt">
          <el-date-picker clearable
            v-model="form.createdAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedAt">
          <el-date-picker clearable
            v-model="form.updatedAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择更新时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listAnimalSpecies, getAnimalSpecies, delAnimalSpecies, addAnimalSpecies, updateAnimalSpecies } from "@/api/four/animalSpecies";

export default {
  name: "AnimalSpecies",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 动物种类基础表格数据
      animalSpeciesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        speciesName: null,
        scientificName: null,
        classification: null,
        habitat: null,
        diet: null,
        averageLifespan: null,
        isEndangered: null,
        conservationStatus: null,
        description: null,
        createdAt: null,
        updatedAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询动物种类基础列表 */
    getList() {
      this.loading = true;
      listAnimalSpecies(this.queryParams).then(response => {
        this.animalSpeciesList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        speciesName: null,
        scientificName: null,
        classification: null,
        habitat: null,
        diet: null,
        averageLifespan: null,
        isEndangered: null,
        conservationStatus: null,
        description: null,
        createdAt: null,
        updatedAt: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加动物种类基础";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAnimalSpecies(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改动物种类基础";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAnimalSpecies(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAnimalSpecies(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除动物种类基础编号为"' + ids + '"的数据项？').then(function() {
        return delAnimalSpecies(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('four/animalSpecies/export', {
        ...this.queryParams
      }, `animalSpecies_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
