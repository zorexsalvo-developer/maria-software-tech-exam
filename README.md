### Maria Software Tech Exam
---
## Test #1 Maria Health Phi

|**Languages:**| `Python`, `Javascript`, `Go`|
|--------------|-----------------------------|
|**Answers:**|`maria-health-pi/ANSWER.txt`|

---
## Test #2 Data Driven

|**baseUrl:**|https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev|
|-------|---------------------------------------------------------------|
|**Directory:**|`zorex-salvo/data-driven` |
|**Tech:**|`Python`, `Django Rest`, `AWS Lambda`, `Zappa`, `Postgresql`, `Pipenv` |
|**Answers:**|`data-driven/ANSWER.txt`|
|**How-to:**|`$pipenv --python 3.6; $pipenv shell; $pipenv install; $export DATABASE_URL=psql://postgres:postgres@host/healthshop; $python manage.py migrate; $python manage.py runserver`

|Admin|https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/admin/|
|-----|----------------------------------------------------------------------|
|username|admin|
|password|password123|

##### Endpoints
|Description| URL | Method |
|-----------|-----|---------|
|Get Plans| [/v1/plans/](https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/v1/plans/)| GET|

###### Response
```javascript
[
   {
      "identifier":"b6206a2a-c19f-4823-ba60-99e2f2c20c8c",
      "name":"MyMaxicareLite",
      "hmo":{
         "name":"Maxicare"
      },
      "payment_terms":[
         {
            "term":"monthly",
            "amount":10.0
         }
      ],
      "created":"2019-08-14T08:12:35.560411Z",
      "modified":"2019-08-14T08:12:35.560411Z"
   }
]
```
|Description| URL | Method |
|-----------|-----|---------|
|Create Cart| [/v1/carts/](https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/v1/carts/)| POST|

###### Request
```javascript
{
   "cart_items":[
      {
         "plan":"b6206a2a-c19f-4823-ba60-99e2f2c20c8c",
         "payment_term":"monthly",
         "quantity":2
      }
   ]
}

```
###### Response
```javascript
{
   "identifier":"cdd06fce-3cdc-4bd3-84a3-2fe5b772d719",
   "total_amount":20.0,
   "cart_items":[
      {
         "identifier":"d8bf0ddd-c875-4312-acac-04ab85c2e073",
         "plan":{
            "identifier":"b6206a2a-c19f-4823-ba60-99e2f2c20c8c",
            "name":"MyMaxicareLite"
         },
         "payment_term":"monthly",
         "quantity":2
      }
   ],
   "status":"pending"
}

```

|Description| URL | Method |
|-----------|-----|---------|
|Get Cart| [/v1/carts/{cart_identifier}](https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/v1/carts/cdd06fce-3cdc-4bd3-84a3-2fe5b772d719/)| GET|

###### Response
```javascript
{
   "identifier":"cdd06fce-3cdc-4bd3-84a3-2fe5b772d719",
   "total_amount":20.0,
   "cart_items":[
      {
         "identifier":"d8bf0ddd-c875-4312-acac-04ab85c2e073",
         "plan":{
            "identifier":"b6206a2a-c19f-4823-ba60-99e2f2c20c8c",
            "name":"MyMaxicareLite"
         },
         "payment_term":"monthly",
         "quantity":2
      }
   ],
   "status":"pending"
}

```

|Description| URL | Method |
|-----------|-----|---------|
|Add To Cart| [/v1/carts/{cart_identifier}/add/](https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/v1/carts/cdd06fce-3cdc-4bd3-84a3-2fe5b772d719/add/)| PUT|

###### Request
```javascript
[
   {
      "plan":"9bc610cb-eb20-4203-a443-39bdc89fef05",
      "payment_term":"annually",
      "quantity":1
   }
]
```

###### Response
```javascript
{
   "identifier":"cdd06fce-3cdc-4bd3-84a3-2fe5b772d719",
   "total_amount":919.0,
   "cart_items":[
      {
         "identifier":"ffe3a5dc-5c57-4bee-b49b-076c7e8f4482",
         "plan":{
            "identifier":"9bc610cb-eb20-4203-a443-39bdc89fef05",
            "name":"EReady"
         },
         "payment_term":"annually",
         "quantity":1
      },
      {
         "identifier":"d8bf0ddd-c875-4312-acac-04ab85c2e073",
         "plan":{
            "identifier":"b6206a2a-c19f-4823-ba60-99e2f2c20c8c",
            "name":"MyMaxicareLite"
         },
         "payment_term":"monthly",
         "quantity":2
      }
   ],
   "status":"pending"
}
```

###### Error Response
```javascript
{
   "message":"Payment term 'monthly' is not available for EReady"
}
```

|Description| URL | Method |
|-----------|-----|---------|
|Remove From Cart| [/v1/carts/{cart_identifier}/items/{item_identifier}/](https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/v1/carts/cdd06fce-3cdc-4bd3-84a3-2fe5b772d719/items/d8bf0ddd-c875-4312-acac-04ab85c2e073/)| DELETE|

###### Response
```javascript
{
   "identifier":"cdd06fce-3cdc-4bd3-84a3-2fe5b772d719",
   "total_amount":899.0,
   "cart_items":[
      {
         "identifier":"ffe3a5dc-5c57-4bee-b49b-076c7e8f4482",
         "plan":{
            "identifier":"9bc610cb-eb20-4203-a443-39bdc89fef05",
            "name":"EReady"
         },
         "payment_term":"annually",
         "quantity":1
      }
   ],
   "status":"pending"
}
```

|Description| URL | Method |
|-----------|-----|---------|
|Pay| [/v1/carts/{cart_identifier}/pay/](https://ptpuimvszi.execute-api.ap-southeast-1.amazonaws.com/dev/v1/carts/cdd06fce-3cdc-4bd3-84a3-2fe5b772d719/pay/)| PUT|

###### Response
```javascript
{
   "identifier":"cdd06fce-3cdc-4bd3-84a3-2fe5b772d719",
   "total_amount":899.0,
   "cart_items":[
      {
         "identifier":"ffe3a5dc-5c57-4bee-b49b-076c7e8f4482",
         "plan":{
            "identifier":"9bc610cb-eb20-4203-a443-39bdc89fef05",
            "name":"EReady"
         },
         "payment_term":"annually",
         "quantity":1
      }
   ],
   "status":"paid"
}

```

###### Error Response
```javascript
{
   "message":"Cart not found. Invalid cart identifier or cart is already paid."
}
```



---
## Test #3 My God! I Hate Drags

 |[![Netlify Status](https://api.netlify.com/api/v1/badges/0889d17e-143c-45a4-9733-23c514a410c6/deploy-status)](https://app.netlify.com/sites/nifty-newton-f476f5/deploys)|                  |
 |------------------|--------------------|
 | **Link to app:** |  [md.zecaffeinated.space](https://md.zecaffeinated.space/) |
 | **Tech:**        | [React](https://reactjs.org/) |
 | **CI/CD:** | [Netlify](https://www.netlify.com/)|
 | **Directory:**| `zorex-salvo/my-god-i-hate-drags/`|
 |**How-To:**| Build instruction on `PROJECT_DIRECTORY/README.md`|
|**Answers:**| `my-god-i-hate-drags/ANSWER.TXT`|
|**Setup/Test Project**| https://github.com/zorexsalvo-developer/react-netlify-setup|
