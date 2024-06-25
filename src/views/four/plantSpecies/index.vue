<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="俗名或常用名" prop="commonName">
        <el-input
          v-model="queryParams.commonName"
          placeholder="请输入俗名或常用名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学名" prop="scientificName">
        <el-input
          v-model="queryParams.scientificName"
          placeholder="请输入学名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="植物科" prop="family">
        <el-input
          v-model="queryParams.family"
          placeholder="请输入植物科"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="植物属" prop="genus">
        <el-input
          v-model="queryParams.genus"
          placeholder="请输入植物属"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生长地" prop="habitat">
        <el-input
          v-model="queryParams.habitat"
          placeholder="请输入生长地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生长习性" prop="growthHabit">
        <el-input
          v-model="queryParams.growthHabit"
          placeholder="请输入生长习性"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开花季节" prop="floweringSeason">
        <el-input
          v-model="queryParams.floweringSeason"
          placeholder="请输入开花季节"
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
          v-hasPermi="['four:plantSpecies:add']"
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
          v-hasPermi="['four:plantSpecies:edit']"
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
          v-hasPermi="['four:plantSpecies:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['four:plantSpecies:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="plantSpeciesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="俗名或常用名" align="center" prop="commonName" />
      <el-table-column label="学名" align="center" prop="scientificName" />
      <el-table-column label="植物科" align="center" prop="family" />
      <el-table-column label="植物属" align="center" prop="genus" />
      <el-table-column label="生长地" align="center" prop="habitat" />
      <el-table-column label="生长习性" align="center" prop="growthHabit" />
      <el-table-column label="开花季节" align="center" prop="floweringSeason" />
      <el-table-column label="果实或种子的描述" align="center" prop="fruitOrSeedDescription" />
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
            v-hasPermi="['four:plantSpecies:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['four:plantSpecies:remove']"
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

    <!-- 添加或修改植物种类基础对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="俗名或常用名" prop="commonName">
          <el-input v-model="form.commonName" placeholder="请输入俗名或常用名" />
        </el-form-item>
        <el-form-item label="学名" prop="scientificName">
          <el-input v-model="form.scientificName" placeholder="请输入学名" />
        </el-form-item>
        <el-form-item label="植物科" prop="family">
          <el-input v-model="form.family" placeholder="请输入植物科" />
        </el-form-item>
        <el-form-item label="植物属" prop="genus">
          <el-input v-model="form.genus" placeholder="请输入植物属" />
        </el-form-item>
        <el-form-item label="生长地" prop="habitat">
          <el-input v-model="form.habitat" placeholder="请输入生长地" />
        </el-form-item>
        <el-form-item label="生长习性" prop="growthHabit">
          <el-input v-model="form.growthHabit" placeholder="请输入生长习性" />
        </el-form-item>
        <el-form-item label="开花季节" prop="floweringSeason">
          <el-input v-model="form.floweringSeason" placeholder="请输入开花季节" />
        </el-form-item>
        <el-form-item label="果实或种子的描述" prop="fruitOrSeedDescription">
          <el-input v-model="form.fruitOrSeedDescription" type="textarea" placeholder="请输入内容" />
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
import { listPlantSpecies, getPlantSpecies, delPlantSpecies, addPlantSpecies, updatePlantSpecies } from "@/api/four/plantSpecies";

export default {
  name: "PlantSpecies",
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
      // 植物种类基础表格数据
      plantSpeciesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        commonName: null,
        scientificName: null,
        family: null,
        genus: null,
        habitat: null,
        growthHabit: null,
        floweringSeason: null,
        fruitOrSeedDescription: null,
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
    /** 查询植物种类基础列表 */
    getList() {
      this.loading = true;
      listPlantSpecies(this.queryParams).then(response => {
        this.plantSpeciesList = response.rows;
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
        commonName: null,
        scientificName: null,
        family: null,
        genus: null,
        habitat: null,
        growthHabit: null,
        floweringSeason: null,
        fruitOrSeedDescription: null,
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
      this.title = "添加植物种类基础";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPlantSpecies(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改植物种类基础";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePlantSpecies(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPlantSpecies(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除植物种类基础编号为"' + ids + '"的数据项？').then(function() {
        return delPlantSpecies(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('four/plantSpecies/export', {
        ...this.queryParams
      }, `plantSpecies_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
