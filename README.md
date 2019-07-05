# 我的餐廳清單
餐廳清單第二版, 使用node.js,express及mongoose開發。除了可以檢視餐廳詳細資訊,搜尋餐廳, 新增及修改餐廳資料之外, 也打造了使用者認證系統

## 安裝環境要求

+ Node.js v10.16.0
+ Express v4.17.1
+ Express-handlebars v3.1.0
+ method-override : v3.0.0
+ mongoose : v5.6.0

## 安裝過程
1. 下載檔案
```
$ git clone https://github.com/jimmypan-tw/restaurant_finder.git
```
2. 以npm安裝相關套件
```
$ npm install
```
3. 執行專案
```
$ npm run dev
```
4. 輸入網址並呈現我的餐廳清單首頁
```
http://localhost:3001
```

## 功能說明
+ 顯示所有餐廳清單：http://localhost:3001
+ 顯示個別餐廳詳細介紹：http://localhost:3001/restaurants/餐廳id
+ 搜尋餐廳：http://localhost:3001/search?keyword=搜尋關鍵字
+ 新增餐廳
+ 修改餐廳資料


