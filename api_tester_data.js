const API_SCHEMA_DEFS = {
  "TableDataInfo": {
    "schema": {
      "type": "object",
      "properties": {
        "total": {
          "type": "integer",
          "description": "总记录数",
          "format": "int64"
        },
        "rows": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {}
          },
          "description": "列表数据"
        },
        "code": {
          "type": "integer",
          "description": "消息状态码"
        },
        "msg": {
          "type": "string",
          "description": "消息内容"
        }
      }
    }
  },
  "AjaxResult": {
    "schema": {
      "type": "object",
      "properties": {
        "key": {
          "type": "object",
          "properties": {}
        }
      }
    }
  }
};

const API_DEFS = [
  {
    "id": "api-1",
    "group": "QueryController",
    "method": "GET",
    "path": "/query/fetchFlow",
    "responseSchemaRef": "TableDataInfo",
    "name": "车流量查询",
    "params": [
      {
        "key": "devId",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceIdList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectDay",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "mergeServer",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "startTime",
        "value": "",
        "desc": "selectTime2改为传开始时间结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "userId",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "monthStart",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "monthEnd",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-2",
    "group": "QueryController",
    "method": "GET",
    "path": "/query/fetchFlow2",
    "responseSchemaRef": "TableDataInfo",
    "name": "断面车流汇总",
    "params": [
      {
        "key": "devId",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceIdList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectDay",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "mergeServer",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "startTime",
        "value": "",
        "desc": "selectTime2改为传开始时间结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "userId",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "monthStart",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "monthEnd",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-3",
    "group": "QueryController",
    "method": "GET",
    "path": "/query/fetchFlow4",
    "responseSchemaRef": "TableDataInfo",
    "name": "卡口记录汇总",
    "params": [
      {
        "key": "devId",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceIdList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectDay",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "mergeServer",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "startTime",
        "value": "",
        "desc": "selectTime2改为传开始时间结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "userId",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "monthStart",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "monthEnd",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-4",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/manageFlowList",
    "responseSchemaRef": "AjaxResult",
    "name": "卡口汇总月报（公司）",
    "params": [
      {
        "key": "year",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "devCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNo",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNoList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "curDeptId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "后端设置参数",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-5",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/manageFlowListForDev",
    "responseSchemaRef": "AjaxResult",
    "name": "卡口汇总月报（服务区）",
    "params": [
      {
        "key": "year",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "devCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNo",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNoList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "curDeptId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "后端设置参数",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-6",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statAreaRate2",
    "responseSchemaRef": "TableDataInfo",
    "name": "入区率查询（按月）",
    "params": [
      {
        "key": "type",
        "value": "",
        "desc": "前端传入条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "pDepCode",
        "value": "",
        "desc": "父部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverCode",
        "value": "",
        "desc": "服务区编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "所有权",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "是否边界",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "是否省界",
        "required": false,
        "in": "query"
      },
      {
        "key": "beginDate",
        "value": "",
        "desc": "开始时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endDate",
        "value": "",
        "desc": "结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "dataYear",
        "value": "",
        "desc": "数据年份",
        "required": false,
        "in": "query"
      },
      {
        "key": "tabFlag",
        "value": "",
        "desc": "查询类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "机构类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "searchType",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "时间列表",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-7",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statAreaRate2Summary",
    "responseSchemaRef": "AjaxResult",
    "name": "入区率查询（按月）-汇总",
    "params": [
      {
        "key": "type",
        "value": "",
        "desc": "前端传入条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "pDepCode",
        "value": "",
        "desc": "父部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverCode",
        "value": "",
        "desc": "服务区编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "所有权",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "是否边界",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "是否省界",
        "required": false,
        "in": "query"
      },
      {
        "key": "beginDate",
        "value": "",
        "desc": "开始时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endDate",
        "value": "",
        "desc": "结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "dataYear",
        "value": "",
        "desc": "数据年份",
        "required": false,
        "in": "query"
      },
      {
        "key": "tabFlag",
        "value": "",
        "desc": "查询类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "机构类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "searchType",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "时间列表",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-8",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statAreaRate3",
    "responseSchemaRef": "TableDataInfo",
    "name": "入区率查询（按日）",
    "params": [
      {
        "key": "type",
        "value": "",
        "desc": "前端传入条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "pDepCode",
        "value": "",
        "desc": "父部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverCode",
        "value": "",
        "desc": "服务区编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "所有权",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "是否边界",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "是否省界",
        "required": false,
        "in": "query"
      },
      {
        "key": "beginDate",
        "value": "",
        "desc": "开始时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endDate",
        "value": "",
        "desc": "结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "dataYear",
        "value": "",
        "desc": "数据年份",
        "required": false,
        "in": "query"
      },
      {
        "key": "tabFlag",
        "value": "",
        "desc": "查询类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "机构类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "searchType",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "时间列表",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-9",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statAreaRate3Summary",
    "responseSchemaRef": "AjaxResult",
    "name": "入区率查询（按日）-汇总",
    "params": [
      {
        "key": "type",
        "value": "",
        "desc": "前端传入条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "pDepCode",
        "value": "",
        "desc": "父部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverCode",
        "value": "",
        "desc": "服务区编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "所有权",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "是否边界",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "是否省界",
        "required": false,
        "in": "query"
      },
      {
        "key": "beginDate",
        "value": "",
        "desc": "开始时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endDate",
        "value": "",
        "desc": "结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "dataYear",
        "value": "",
        "desc": "数据年份",
        "required": false,
        "in": "query"
      },
      {
        "key": "tabFlag",
        "value": "",
        "desc": "查询类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "机构类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "searchType",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "时间列表",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-10",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statAreaRate1",
    "responseSchemaRef": "TableDataInfo",
    "name": "入区率统计",
    "params": [
      {
        "key": "type",
        "value": "",
        "desc": "前端传入条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "pDepCode",
        "value": "",
        "desc": "父部门id",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverCode",
        "value": "",
        "desc": "服务区编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "所有权",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "是否边界",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "是否省界",
        "required": false,
        "in": "query"
      },
      {
        "key": "beginDate",
        "value": "",
        "desc": "开始时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endDate",
        "value": "",
        "desc": "结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "dataYear",
        "value": "",
        "desc": "数据年份",
        "required": false,
        "in": "query"
      },
      {
        "key": "tabFlag",
        "value": "",
        "desc": "查询类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "机构类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "searchType",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "时间列表",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-11",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/manageFlowList2",
    "responseSchemaRef": "AjaxResult",
    "name": "断面汇总月报（公司）",
    "params": [
      {
        "key": "year",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "devCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNo",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNoList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "curDeptId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "后端设置参数",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-12",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/manageFlowListForDev2",
    "responseSchemaRef": "AjaxResult",
    "name": "断面汇总月报（服务区）",
    "params": [
      {
        "key": "year",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "devCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNo",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceNoList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "curDeptId",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "timeList",
        "value": "",
        "desc": "后端设置参数",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-13",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statisticsYearFlow",
    "responseSchemaRef": "AjaxResult",
    "name": "断面汇总年报",
    "params": [
      {
        "key": "year",
        "value": "",
        "desc": "前端传参",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "parentDep",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverList",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "beginDate",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      },
      {
        "key": "endDate",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "key": {}
    }
  },
  {
    "id": "api-14",
    "group": "StatisticsController",
    "method": "GET",
    "path": "/statistics/statHumanFlow",
    "responseSchemaRef": "TableDataInfo",
    "name": "客流分类统计",
    "params": [
      {
        "key": "startTime",
        "value": "",
        "desc": "dateRange条件转换成直接传开始时间结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "statType",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "orgType",
        "value": "",
        "desc": "替换原功能的depLevel",
        "required": false,
        "in": "query"
      },
      {
        "key": "ownership",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isBoundaries",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "isProvince",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-15",
    "group": "QryHumanFlowController",
    "method": "GET",
    "path": "/qryHumanFlow/qryByDay",
    "responseSchemaRef": "TableDataInfo",
    "name": "客流记录查询",
    "params": [
      {
        "key": "startTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "endTime",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "devCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceArea",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "serviceAB",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      },
      {
        "key": "deviceCode",
        "value": "",
        "desc": "",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  },
  {
    "id": "api-16",
    "group": "VehicleCheckDataController",
    "method": "GET",
    "path": "/vehicleCheckData/fetchCarTime",
    "responseSchemaRef": "TableDataInfo",
    "name": "卡口记录查询",
    "params": [
      {
        "key": "inOutValue",
        "value": "",
        "desc": "进出场方向",
        "required": false,
        "in": "query"
      },
      {
        "key": "depCode",
        "value": "",
        "desc": "部门编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "manageCode",
        "value": "",
        "desc": "管理单位编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "virtualServerNo",
        "value": "",
        "desc": "虚拟服务器编号",
        "required": false,
        "in": "query"
      },
      {
        "key": "serverCode",
        "value": "",
        "desc": "服务编码",
        "required": false,
        "in": "query"
      },
      {
        "key": "selectTime",
        "value": "",
        "desc": "查询时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "license",
        "value": "",
        "desc": "车牌号",
        "required": false,
        "in": "query"
      },
      {
        "key": "origin",
        "value": "",
        "desc": "来源",
        "required": false,
        "in": "query"
      },
      {
        "key": "vehicleType",
        "value": "",
        "desc": "车辆类型",
        "required": false,
        "in": "query"
      },
      {
        "key": "startTime",
        "value": "",
        "desc": "开始时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "endTime",
        "value": "",
        "desc": "结束时间",
        "required": false,
        "in": "query"
      },
      {
        "key": "isDangerous",
        "value": "",
        "desc": "是否危险品车辆",
        "required": false,
        "in": "query"
      },
      {
        "key": "isGreenCar",
        "value": "",
        "desc": "是否绿通车",
        "required": false,
        "in": "query"
      },
      {
        "key": "curDeptId",
        "value": "",
        "desc": "后端设置条件",
        "required": false,
        "in": "query"
      }
    ],
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjcwNzhkOWFjLWQwZDQtNGNlZC05ZmQ2LTRmZTgyZDRhMjk0MyIsInVzZXJuYW1lIjoiYWRtaW4ifQ.BpBksY6wDjTnEzgkUj51lLBxJAyF8fqzKE7Ko2pW6W3bhd52PJ_3QkZa1627DFQOg1wK-iiCMS8CyrIY-wcvUA",
        "desc": "",
        "required": false,
        "in": "header"
      }
    ],
    "body": null,
    "mock": {
      "total": 0,
      "rows": [
        {}
      ],
      "code": 0,
      "msg": ""
    }
  }
];
