const { Op } = require("sequelize");

const excludeParams = ["page", "size", "fields", "search", "sort"];
const operators = ["gte", "gt", "lt", "lte", "in"];

class Querybuilder {
  constructor(queryParams) {
    this.queryParams = queryParams;
    this.queryOptions = {};
  }

  filter() {
    const filterFields = { ...this.queryParams };
    excludeParams.forEach((p) => delete filterFields[p]);
    const filterObject = {};
    Object.keys(filterFields).forEach((k) => {
      const filterItem = filterFields[k];

      if (typeof filterItem === "object") {
        Object.keys(filterItem).forEach((ik) => {
          if (operators.includes(ik)) {
            filterObject[k] = { [Op[ik]]: filterItem[ik] };
          }
        });
      } else {
        filterObject[k] = { [Op[eq]]: filterItem };
      }
    });

    if (this.queryOptions.where) {
      this.queryOptions.where = { ...filterObject, ...this.queryOptions.where };
    } else {
      this.queryOptions.where = filterObject;
    }

    return this;
  }

  limitFields() {
    if (this.queryParams.fields) {
      const attributes = this.queryParams.fields.split(",");
      this.queryOptions.attributes = attributes;
    } else {
      console.error("There is no fields property");
    }
    return this;
  }

  paginate() {
    const page = (this.queryParams.page ||= 1);
    const limit = (this.queryParams.size ||= 100);
    this.queryOptions.limit = limit;
    this.queryOptions.offset = (page - 1) * limit;
    return this;
  }

  search(searchFields) {
    if (!this.queryParams.search) return this;
    const searchObj = {
      [Op.or]: searchFields.map((field) => ({
        [field]: { [Op.iLike]: `%${this.queryParams.search}%` },
      })),
    };

    if (this.queryOptions.where) {
      this.queryOptions.where = { ...searchObj, ...this.queryOptions.where };
    } else {
      this.queryOptions.where = searchObj;
    }

    return this;
  }

  createPage(queryResult) {
    if (!queryResult.count && !queryResult.rows) return queryResult;

    const allPagesCount = Math.ceil(
      queryResult.count / this.queryOptions.limit
    );
    const page = +this.queryParams.page;

    const isLastPage = allPagesCount > 0 && page > 1;
    const hasNextPage = allPagesCount > page;
    return {
      content: queryResult.rows,
      pagination: {
        allItemsCount: queryResult.count,
        page,
        allPagesCount,
        isFirstPage: page === 1,
        isLastPage,
        pageSize: this.queryOptions.size,
        hasNextPage,
      },
    };
  }

  #createOrderArray() {
    const orderArr = this.queryParams.sort.split(",").map((i) => {
      const orderItem = [];
      const isDesc = i.startsWith("-");

      orderItem[0] = isDesc ? i.slice(1) : i;
      orderItem[1] = isDesc ? "desc" : "asc";

      return orderItem;
    });

    return orderArr;
  }

  sort() {
    if (this.queryParams.sort) {
      this.queryOptions.order = this.#createOrderArray();
    } else {
      this.queryOptions.order = [["createdAt", "desc"]];
    }

    return this;
  }
}

module.exports = Querybuilder;

// const paginationFunc = async (query, model, modelConfig, fields) => {
//   const page = query.page || 1;
//   const size = query.size || 100;
//   const search = query.search || null;
//   const data = {};
//   const allTable = await model.findAndCountAll({
//     offset: (page - 1) * size,
//     limit: size,
//     where: search && {
//       [Op.eq]: [
//         fields.map((f) => {
//           return { f: { [Op.iLike]: `%${search}%` } };
//         }),
//       ],
//     },
//     ...modelConfig,
//   });

//   data.content = allTable.rows;
//   data.pagination = {};
//   data.pagination.totalPages = Math.ceil(allTable.count / size);
//   data.pagination.hasNextPage = data.pagination.totalPages > page;
//   data.pagination.page = page;
//   data.pagination.isLastPage = data.pagination.totalPages > 0 && page > 1;
//   data.pagination.totalItems = allTable.count;

//   return data;
// };

// module.exports = paginationFunc;
