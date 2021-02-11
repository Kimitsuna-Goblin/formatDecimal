# formatDecimal

端数を四捨五入して、指定された小数点以下桁数に数値を整形するJavaScript関数
<BR>
A JavaScript function which rounds the number to the specified number of decimal places.

## 説明 - Description

### ファイル - Files

このライブラリは以下のファイルのみから成り立ちます。他のファイル等は必要ありません。
<BR>
This library is constituted by only the following file. No other files are need.

[formatDecimal.js](https://github.com/Kimitsuna-Goblin/formatDecimal/blob/master/formatDecimal.js) - 本体の JavaScript ファイルです。
<BR>
This is the JavaScript file.

### 機能 - Function

関数 formatDecimal() の引数に目的の数値と小数点以下桁数を与えると、
その数値の小数点表現を文字列で返します。
<BR>
When you give the target number and the number of decimal places to the function formatDecimal() as the argument,
the function returns the formatted string of the decimal point number.
<BR>
<BR>
この関数は JavaScript 標準の toFixed() で生じる誤差を回避しています。対象の数値が 1.7e-10 のような指数表現でも適切な文字列が得られます。
ただし、内部で Math.round() を使用しているため、Math クラスにおける整数の有効桁数の影響を受けます。
<BR>
This function avoids conversion errors which occur when you use the standard toFixed().
Even if the input value is an exponential notation such as 1.7e-10, a proper string can be obtained such as 0.00000000017.
However, since this function internally uses Math.round(), it is affected by the precision of the integer in the Math class.

## 使用方法 - Usage

ソースファイルと formatDecimal.js をリンクさせたり、ソースファイルに formatDecimal() 関数をコピペするなどしてご使用ください。
<BR>
You can use it with writing a link to the formatDecimal.js, or copy-pasting the source of the formatDecimal() to your source file.

## ライセンス - License

[MIT](https://github.com/Kimitsuna-Goblin/formatDecimal/blob/master/LICENSE)

## 著作者 - Author

[Kimitsuna-Goblin](https://github.com/Kimitsuna-Goblin) (浦 公統; Ura Kimitsuna)
