/*!
 *	Copyright (C) 2020 浦 公統
 *	Released under the MIT license.
 *	see https://opensource.org/licenses/MIT/
 */

/**
 *	端数を四捨五入して、指定された小数点以下桁数に数値を整形する
 *	@param	value			整形対象の数値
 *	@param	underPoint		小数第何位までに整形するか (0以上の数値を指定すること) (省略時: 0)
 *	@return	整形した数値 (文字列)
 */
function formatDecimal( value, underPoint = 0 )
{
	var formatted = '';								//	整形した数値
	var valueString = String( value );				//	対象数値の小数表現文字列化
	var valuePoint = ( valueString.indexOf( '.' ) > 0 ) ? valueString.indexOf( '.' ) : valueString.length;
													//	文字列化した数値の小数点位置
	var pointless = valueString.substring( 0, valuePoint ) + valueString.substring( valuePoint + 1 );
													//	小数点を除去した文字列化数値

	//	String() で数値が指数表現になる場合は、仮数部を使って小数表現に変換する
	//		toFixed( n ) は小数に対して用いると、1.005 が 1.00 になるなど、
	//		誤差が生じることがあるので、信頼性が要求される計算では使えない
	if ( valueString.indexOf( 'e' ) > 0 )
	{
		var valueEs = valueString.split( 'e' );		//	仮数部と指数部
		var valueE = Number( valueEs[1] );			//	指数の値

		valuePoint = ( valueEs[0].indexOf( '.' ) > 0 ) ? valueEs[0].indexOf( '.' ) : valueEs[0].length;
		pointless = valueEs[0].substring( 0, valuePoint ) + valueEs[0].substring( valuePoint + 1 );

		//	指数の分、小数点位置をずらす
		valuePoint += valueE;

		if ( valuePoint <= 0 || ( value < 0 && valuePoint <= 1 ) )
		{
			//	指数部がマイナスのため、先頭の数字が不足している場合
			//	先頭にゼロを追加して、0.0…… の形にする (小数点位置は 1 または 2(負の場合) になる)
			var zeros = '';

			if ( value < 0 )
			{
				zeros = '-';
				pointless = pointless.substring( 1 );
				valuePoint--;
			}

			for ( var i = valuePoint; i <= 0; i++ )
			{
				zeros += '0';
			}
			pointless = zeros + pointless;
			valuePoint = ( value < 0 ) ? 2 : 1;
		}
	}

	//	末尾にゼロを十分な数だけ追加しておく
	for ( var i = 0; i < valuePoint + underPoint; i++ )
	{
		pointless += '0';
	}

	var zeros = '';					//	数値の先頭のゼロおよび符号
	var valueTopNonZero = '0';		//	対象数値の最上位に現れる0以外の数字 (桁上がり判定に用いる)

	//	四捨五入の前に、先頭のゼロおよび符号をキープしておく
	for ( var i = 0; i < pointless.length; i++ )
	{
		if ( pointless.charAt( i ) == '-' || pointless.charAt( i ) == '0' )
		{
			zeros += pointless.charAt( i );
		}
		else
		{
			valueTopNonZero = pointless.charAt( i );
			break;
		}
	}

	var rounded = Math.round( Math.abs(
						Number( pointless.substring( 0, valuePoint + underPoint )
								+ '.' + pointless.substring( valuePoint + underPoint ) ) ) ).toFixed();
													//	桁をずらして四捨五入した数値 (整数)
													//		rounded は整数なので、toFixed() を使ってもOK

	//	四捨五入で最上位が桁上がりしたら、先頭のゼロあり⇒ゼロを減らす / ゼロなし⇒元の小数点位置をずらす
	if ( valueTopNonZero > '1' && rounded.charAt( 0 ) == '1' )
	{
		if ( zeros.length > 0 && zeros.charAt( zeros.length - 1 ) == '0' )
		{
			zeros = zeros.substring( 0, zeros.length - 1 );
		}
		else
		{
			valuePoint++;
		}
	}

	rounded = zeros + rounded;

	//	小数点を入れて整形
	if ( underPoint <= 0 )
	{
		formatted = rounded.substring( 0, valuePoint );
	}
	else
	{
		formatted = rounded.substring( 0, valuePoint )
						+ '.' + rounded.substring( valuePoint, valuePoint + underPoint );
	}

	return formatted;
}
