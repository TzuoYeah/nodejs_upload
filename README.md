# Nodejs-upload
用來上傳檔案(圖片)用的。  

# API
| url位置 | 參數 | 功能說明 |
| --- | --- | --- |
| /uploadFile | field: <file>
userId: <string> | 上傳檔案。 |
| /agetFile/:id | 無 | 取出url參數id中所有存在的檔案列表。 |
| /agetFile/:id/:filename | 無 | 從url參數id取出名為filename的檔案。 |