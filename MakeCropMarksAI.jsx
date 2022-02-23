/*
Название: MakeCropMarksAI.jsx
Приложение для использования: Adobe Illustrator CS3, CS4, CS5, CS6
Версия: 1.4.16
Язык реализации (Среда): JavaScript (ExtendScript Toolkit 2)
Операционные системы (Платформы): PC, Macintosh (Windows, Mac OS)
Условия распространения: Бесплатно; На Ваш риск
Назначение: Создание меток реза
Функциональные ограничения: Не работает с выделенными направляющими
Примечание: Создается дополнительный файл MakeCropMarksAI.ini для хранения настроек 
в папке с приложением Adobe Illustrator
Техническая поддержка: Sergey-Anosov@yandex.ru
https://sites.google.com/site/dtpscripting
===================================================
Name: MakeCropMarksAI.jsx
Application to use with: Adobe Illustrator CS3, CS4, CS5, CS6
Version: 1.4.16
Program language (Environment): JavaScript (ExtendScript Toolkit 2)
Operating systems (Platforms): PC, Macintosh (Windows, Mac OS)
Distribution conditions: Freeware; At your own risk
Functions: Makes crop marks 
Functional limitations: Can not process selection containing guides
Note: Creates an additional file MakeCropMarksAI.ini for setup data in the folder where
the application Adobe Illustrator is.
Technical support: Sergey-Anosov@yandex.ru
https://sites.google.com/site/dtpscripting
*/
// описание глобальных переменных
//
// название скрипта
var the_title = "MakeCropMarksAI";
// версия скрипта
var the_version = "1.4.16";
// активный документ
var AD; 
// активный артборд
var AA;
// количество артбордов в активном документе
var N_AB = 1;
// активный слой
var AL; 
// выбранный слой
var SL;
// количество слоев в активном документе
var AD_LL;
// выделение в активном документе
var the_sel;
// количество объектов в выделении
var N_sel = 0; 
// количество направлений (0=лево, 1=верх, 2=право, 3=низ)
var N_dir = 4;
// количество индексов для учета клипмасок (0=НЕ учитываем, 1= учитываем)
var N_c = 2;
// количество индексов для выбора границ (0=геометрические, 1= визуальные)
var N_b = 2;
// размерность массива для получения геометрических и визуальных размеров объекта (8)
var N_dir_b = N_dir * N_b;
// массив габаритов всего выделения
var SEL_SIZE;
// массив размеров выделенных объектов
var OBJ_SIZE;
// наличие клип. масок влияющих на выделение
var CLIP = false;
// чекбокс учета клип. масок
var CLIP_CB;
// значение чекбокса для учета клип. маски
var CLIP_CB_VAL = false;
// выход если непригодное выделение
var exit_if_bad_sel = false;
// выход если ошибка ввода
var exit_if_bad_input = false;
// выход если направляющие в выделении
var exit_if_guide = false;
// присутствуют текстовые фреймы с направляющими
var TF_guides = false;
// дропдаун для выбора объектов для построения меток
var OBJ_DROP;
// дропдаун для выбора единиц измерения
var UNITS_DROP;
// дропдаун выбора границ объектов
var BOUNDS_DROP;
// дропдаун выбора слоя
var LAYER_DROP;
// дропдаун выбора цвета для меток
var COLOR_DROP;
// выбранная опция цвета из диалога
var COLOR_VAL = 0;
// массив свотчей в документе
var SWATCHES = new Array();
// цвет для меток
var M_COLOR;// метки
var WHITE;// контур
// массив текстовых значений опций для границ объектов
var BOUNDS_LIST = 
[
	// опция для геометрических размеров
	"Geometric",
	// опция для визуальных размеров
	// (с учетом толщины обводки и эффектов)
	"Visible (consider strokes and effects)"
];
// начальный индекс для границ
var BOUNDS_INI;
// массив всех меток
var ALL_MARKS = new Array();
// массив координат построенных меток
var ALL_MARKS_BOUNDS = new Array();
// количество чекбоксов для направлений в диалоге
var N_dir_dial = 12;
// массив чекбоксов для выбора направлений для построения меток в диалоге
var DIR = new Array();
// массив значений чекбоксов для выбора направлений для построения меток в диалоге
var DIR_INI = new Array( N_dir_dial );
// чекбокс для построения белого контура
var W_CONT_CB;
// начальное значение чекбокса для построения белого контура
var W_CONT_INI;// логическое значение
// дропдаун группировки меток после их создания
var G_M_DROP;
// начальное значение группировки после построения
var G_M_INI;
// начальный список для дропдауна для группировки меток
var G_M_LIST = 
[ 
	"Nothing", // опция "нет группировки"
	"Marks only" // опция "только метки"
];
// если была автоматическая корректировка опции 
// для группировки меток и выделения после смены объектов 
// с выделения на артборды и обратно
var G_AUTO = false;
// длина метки по вертикали
var LENGTH_VER;
// начальное значение длины метки по вертикали
var LENGTH_VER_INI;
// длина метки по горизонтали
var LENGTH_HOR;
// начальное значение длины метки по горизонтали
var LENGTH_HOR_INI;
// отступ по вертикали
var OFFSET_VER;
// начальное значение отступа по вертикали
var OFFSET_VER_INI;
// отступ по горизонтали
var OFFSET_HOR;
// начальное значение отступа по горизонтали
var OFFSET_HOR_INI;
// вылет объектов по вертикали
var BLEED_VER;
// начальное значение вылета объектов по вертикали
var BLEED_VER_INI;
// вылет объектов по горизонтали
var BLEED_HOR;
// начальное значение вылета объектов по горизонтали
var BLEED_HOR_INI;
// поле ввода для толщины линии
var str_w_ed_text;
// численное значение для толщины линии
var SW_NUM;
// начальное значение для толщины линии
var SW_NUM_INI;
// дропдаун для единиц измерения для толщины линии
var str_un_drop;
// начальный индекс для единиц измерения для толщины линии
var SW_UN_INI;
// файловая система Windows
var WFS = ( File.fs == "Windows" );
// версия СС
var CC = ( parseInt( app.version ) >= 17 );
// опция для одного объекта в выделении
var SEL_OBJ_OPTION = "Selected object";
// опция для каждого объекта в выделении
var EACH_OBJ_OPTION = "Each object in selection"; 
// опция для целого выделения
var ENTIRE_SEL_OPTION = "Entire selection";
// опция для активного артборда
var AA_OPTION = "Artboard";
// опция для каждого артборда
var EACH_AB_OPTION = "Each artboard in document";
// объекты для построения меток
var OBJECTS_TO_MAKE;
// текст сообщения для ошибки ввода
var BAD_VAL_TEXT = "Bad value input!\n\n";
// текст условия для ошибки ввода
var CAN_NOT_BE = " can not be <= 0 !";
// список текстовых значений для единиц измерения
var UNITS_LIST =
[
	"mm", // 0 миллиметры
	"cm", // 1 сантиметры
	"pt", // 2 пункты
	"in" // 3 дюймы
];
// индекс выбранных единиц
var UNITS_INDEX = 0;
// текстовое значение выбранных единиц
var UNITS_TEXT = UNITS_LIST[ UNITS_INDEX ];
// чекбокс запомнить направления
var REM_DIR_CB;
// значение чекбокса запомнить направления
var REM_DIR = false;
// чекбокс для учета наложения объектов
var CONS_OVER_CB;
// учет наложения объектов
var CONS_OVER = true;
// номер текущего обрабатываемого объекта
var OBJ_i = 0;
// точность сравнения координат (допуск) в пунктах
// для объектов и меток при учете наложения
var PREC_MARKS_OBJ = 0.002;
// точность сравнения координат (допуск) в пунктах
// для сделанных меток и создаваемой метки
var PREC_MARKS = PREC_MARKS_OBJ * 2.5;
// текстовое значение для нуля
var ZERO_TEXT = "0";
// кнопка ОК
var okBtn;
//
// вызов главной подпрограммы
main();
// окончание выполнения скрипта :)))
//
// блок описания подпрограмм
//
// главная подпрограмма
function main() 
{
	// вызываем проверку документа и выделения
	if( CHECK_SELECTION() ) 
	{
		// если в порядке выделение и документ:
		// из файла устанавливаем начальные значения параметров для диалога
		INI_FILE_IO( false );
		//создаем диалог
		var dlg = new Window('dialog');
		// заголовок диалога
		dlg.text = the_title + " v." +the_version; 
		dlg.alignChildren = 'center';
		// ширина дропдаунов для выбора объектов, границ, слоя
		var DD_WIDTH = 90;
		// высота дропдаунов
		var DD_H = 20;
		// создание панели чекбоксов для выбора вариантов по направлению
		var mp = dlg.add('panel');
		var mp_left = WM( CSCC(5, 0), 5 );
		var mp_top = 5;
		var mp_right = WM( CSCC(435, 455), 435 );
		var mp_bottom = WM( CSCC(225, 233), 233 );
		mp.bounds = [mp_left, mp_top, mp_right, mp_bottom];
		// габариты чекбокса
		var cb_w = 20;// ширина
		var cb_h = 15;// высота
		// шаг чекбоксов по горизонтали 
		var cb_dx = 50;
		// шаг чекбоксов по вертикали 
		var cb_dy = 50;
		// высота текста для подсказки
		var tip_h = 18;
		//
		// подпрограмма создания группы в диалоге
		function MAKE_GROUP( where, g_orient, g_a )
		{
			var g = where.add('group');
			if( g_orient !== false ) g.orientation = g_orient;
			if( g_a !== false ) g.alignChildren = g_a;
			return g;
		};// end MAKE_GROUP
		// 
		// подпрограмма создания чекбокса
		function MAKE_CB( where, x, y, w, h, txt, ini )
		{
			var cb = where.add('checkbox');
			cb.value = ini;
			cb.bounds = [x, y, x + w, y + h];
			if( txt !== false )
			{
				cb.text = txt;
			};// if
			return cb;
		};// end MAKE_CB
		//
		// подпрограмма реакции на нажатие чекбокса
		function DIR_CB_onClick()
		{
			// если кнопка OK в диалоге не определена сразу выход
			if( okBtn === undefined ) return;
			// нажат ли хотя бы один чекбокс для направления
			var the_dir_stat = DIR_STATUS( DIR, undefined, false );
			// изменяем активность кнопки OK
			if( okBtn.enabled != the_dir_stat ) okBtn.enabled = the_dir_stat;
			return;
		};// end DIR_CB_onClick
		//
		// подпрограмма создания дропдауна
		function MAKE_DROP( where, txt, txt_w, x, y, w, h, arr, ini )
		{
			// начальное значение объекта для создания дропдауна и текста
			var dd_where = where;
			// начальное значение правой границы текста если НЕ задано создание текста
			var t_right = x;
			// если задано создание текстовой подсказки
			if( txt !== false )
			{
				// если задана ширина текста
				if( txt_w !== false )
				{
					var t_left = x;
					// добавляем смещение вниз для текста
					var t_top = y+3;
					t_right = t_left + txt_w;
					var t_bottom = y + h;
					// создаем статический текст с указанием размеров
					MAKE_ST( dd_where, txt, [ t_left, t_top, t_right, t_bottom ] );
					// добавляем отступ вправо для дропдауна
					t_right = t_right + 3;
				}
				// если задано создание текста и НЕ заданы размеры текста
				else
				{
					// создаем группу для текста и дропдауна
					dd_where = MAKE_GROUP( where, 'row', 'center' );
					// создаем статический текст без указания размеров
					MAKE_ST( dd_where, txt, false );
				};// if-else
			};// if
			var d = dd_where.add('dropdownlist');
			// задаем размеры дропдауна
			if( !( (x === false) && (y === false) && (h === false) ) )
			{
				var d_left = t_right;
				var d_top = y;
				var d_right = d_left + w;
				var d_bottom = d_top + h;
				d.bounds = [ d_left, d_top, d_right, d_bottom ];
			}
			// или только ширину дропдауна
			else
			{
				d.minimumSize.width = d.maximumSize.width = w;
			};// if-else
			// заполняем варианты
			for( var i=0; i < arr.length; i++) d.add( 'item', arr[i] );
			// начальное значение
			d.selection = ini;
			return d;
		};// end MAKE_DROP
		//
		// подпрограмма создания вертикальной или горизонтальной группы чекбоксов
		// hor: true - по горизонтали, false - по вертикали
		function H_V_CB_GROUP( hor, x, y, where )
		{
			// количество создаваемых чекбоксов
			var N_cb = 3;
			// массив чекбоксов
			var cb_arr = new Array( N_cb );
			// смещения чекбоксов по горизонтали
			var dx = ( hor ) ? ( [ WM( -3, 0 ), WM( -6, -5 ), WM( -10, -9 ) ] ) : ( [ 0, 0, 0 ] );
			// смещения чекбоксов по вертикали
			var dy = ( hor ) ? ( [ 0, 0, 0 ] )  : ( [ 0, WM( -3, -2 ), -5 ] );
			// положение чекбокса по горизонтали
			var x_cb = x;
			// положение чекбокса по вертикали
			var y_cb = y;
			// цикл по создаваемым чекбоксам
			for( var i = 0; i < N_cb; i++ )
			{
				// создаем чекбокс
				cb_arr[i] = MAKE_CB( where, x_cb + dx[i], y_cb + dy[i], WM( 15, cb_w ), cb_h, false, false );
				// координаты для следующего чекбокса
				x_cb = x_cb + ( (hor) ? cb_dx : 0 );// по горизонтали
				y_cb = y_cb + ( (hor) ? 0 : cb_dy );// по вертикали
			};// for
			// возвращаем массив чекбоксов
			return cb_arr;
		};// end H_V_CB_GROUP
		//
		// подпрограмма создания кнопки
		function MAKE_BUTTON(x, y, w, where, txt)
		{
			var b = where.add('button');
			var btn_h = 20;
			b.text = txt;
			if( !( (x === false) && (y === false) && (w === false) ) )
			{
				b.bounds = [x, y, x+w, y+btn_h];
			};// if
			return b;
		};// end MAKE_BUTTON
		//
		// подпрограмма создания блока выбора направлений
		function MAKE_DIRECTIONS( x, y )
		{
			// подпрограмма заполнения массива чекбоксов направлений
			function GET_DIR_CB( the_cb_arr )
			{
				// добавляем к массиву чекбоксов новые
				for( var i = 0; i < the_cb_arr.length; i++ )
				{
					DIR.push( the_cb_arr[i] );
				};// for
				return;				
			};// end GET_DIR_CB
			//
			// лево
			var left_dx = WM( 4, 0 );
			// чекбоксы 0, 1, 2
			GET_DIR_CB( H_V_CB_GROUP( false, x+2+left_dx, y+cb_h+2, mp ) );
			// право
			var right_dx = WM( 1, 0 );
			// чекбоксы 3, 4, 5
			GET_DIR_CB( H_V_CB_GROUP( false, x + (cb_w+ cb_dx)*2-10+right_dx, y+cb_h+2, mp ) );
			// низ
			var top_bottom_dx = WM( 5, 0 );
			var bottom_dy = WM( 0, -1 );
			var bottom_y = y + (cb_h +cb_dy)*2 - bottom_dy;
			// чекбоксы 6, 7, 8
			GET_DIR_CB( H_V_CB_GROUP( true, x+cb_w+top_bottom_dx, bottom_y-bottom_dy, mp ) );
			// верх
			var top_dy = WM( 0, -1);
			// чекбоксы 9, 10, 11
			GET_DIR_CB( H_V_CB_GROUP( true, x+cb_w+top_bottom_dx, y+top_dy, mp ) );
			// присваиваем длину массива для чекбоксов направлений
			DIR.length = N_dir_dial;
			// присваиваем дополнительные значения для чекбоксов направлений 
			for( var i = 0; i < N_dir_dial; i++ )
			{
				// если было задано запоминать направления
				// присваиваем значение чекбокса (был нажат или нет :)))
				if( REM_DIR ) DIR[i].value = DIR_INI[i];
				// присваиваем подпрограмму реакции на нажатие
				DIR[i].onClick = DIR_CB_onClick;
			};// for
			// создаем прямоугольник
			var rect = mp.add('panel');
			var s = 2;// отступ
			var rect_left = x+cb_w+s;
			var rect_top = y+cb_h+s;
			var rect_right = x + (cb_w-7+ cb_dx)*2-s+5;
			var rect_bottom = y + (cb_h +cb_dy)*2-s;
			rect.bounds = [rect_left, rect_top, rect_right, rect_bottom];
			var b_w = 85;
			var b_w_dx = 33;
			var b_uncheck_all_y = 10;
			var button_dx = WM( 2, 0 );
			var b_left = 10 - button_dx;
			// создаем кнопку снять все
			var UNCH_TEXT = "Uncheck" + WM( " all", "" );
			var b_uncheck_all = MAKE_BUTTON( b_left, b_uncheck_all_y, b_w, rect, UNCH_TEXT );
			b_uncheck_all.onClick = UNCHECK_ALL_ON_CLICK;
			//
			// подпрограмма реакции на нажатие кнопки Uncheck all
			function UNCHECK_ALL_ON_CLICK()
			{
				// отключаем все чекбоксы
				DIR_STATUS( DIR, false, true );
				// отключаем активность кнопки OK
				okBtn.enabled = false;
				return;
			};// end B_CLEAR_ON_CLICK
			//
			// создаем кнопку направления по умолчанию
			var b_dir_default_y = b_uncheck_all_y + b_w_dx;
			var b_dir_default = MAKE_BUTTON( b_left, b_dir_default_y, b_w, rect, "Default" );
			b_dir_default.onClick = B_DIR_DEFAULT_ON_CLICK;
			//
			// подпрограмма реакции на нажатие кнопки Default
			function B_DIR_DEFAULT_ON_CLICK()
			{
				// сначала отключаем все чекбоксы
				DIR_STATUS( DIR, false, true );
				// включаем "крайние" чекбоксы
				DIR_STATUS( [ DIR[0], DIR[2], DIR[3], DIR[5], DIR[6], DIR[8], DIR[9], DIR[11] ], true, true );
				// включаем активность кнопки OK
				okBtn.enabled = true;
				return;
			};// end B_DIR_DEFAULT_ON_CLICK
			//
			// создаем кнопку выделить все
			var b_check_all_y = b_dir_default_y + b_w_dx;
			var b_check_all = MAKE_BUTTON( b_left, b_check_all_y, b_w, rect, "Check all" );
			b_check_all.onClick = CHECK_ALL_ON_CLICK;
			//
			// подпрограмма реакции на нажатие кнопки Check all
			function CHECK_ALL_ON_CLICK()
			{
				// включаем все чекбоксы
				DIR_STATUS( DIR, true, true );
				// включаем активность кнопки OK
				okBtn.enabled = true;
				return;
			};// end CHECK_ALL_ON_CLICK
			//
			// положение для чекбоксов запомнить направления и учета наложения объектов
			var c_box_w = 140;// ширина чекбоксов с текстом подсказок
			var c_box_x = x + 2 + left_dx;// лево чекбоксов
			// чекбокс запомнить направления
			var REM_DIR_CB_y = bottom_y + WM( CSCC( 35, 39 ), 36 );
			var REM_DIR_CB_TEXT = "Remember directions";
			REM_DIR_CB = MAKE_CB( mp, c_box_x, REM_DIR_CB_y, c_box_w, cb_h, REM_DIR_CB_TEXT, REM_DIR );
			// чекбокс учета наложения объектов
			var CONS_OVER_CB_y = REM_DIR_CB_y + WM( CSCC( 24, 26 ), 25 );
			var CONS_OVER_CB_TEXT = "Consider overlapping";
			CONS_OVER_CB = MAKE_CB( mp, c_box_x, CONS_OVER_CB_y, c_box_w, cb_h, CONS_OVER_CB_TEXT, true );
			return;
		};// end MAKE_DIRECTIONS
		//
		// собственно создаем блок выбора направлений для меток
		MAKE_DIRECTIONS( mp_left + WM(CSCC( 0, 5), 0), mp_top + WM( 0, 2 ) +2 );
		//
		// подпрограмма создания панели ввода параметров
		function MAKE_PANEL( x, y, where, vert_ini, hor_ini, txt )
		{
			// высота панели
			var h = 20;
			// ширина поля ввода
			var w = 50;
			// ширина текста для подсказки
			var w_txt = 45;
			// ширина текста для единиц измерения
			var w_un = 30;
			// дополнительный сдвиг вправо для единиц измерения
			var dx = 3;
			// дополнительный сдвиг вниз для текста
			var dy_t = WM( CSCC(2, 0), 2);
			// текст подсказки для названия параметра
			MAKE_ST( where, txt, [ x, y + dy_t , x + w_txt, y + dy_t + tip_h ] );
			//
			// подпрограмма создания окна ввода с единицами
			function ED_TEXT( x_e, y_e, ini_txt, un_txt )
			{
				var et = where.add('edittext');
				var et_left = x_e, et_top = y_e, et_right = et_left+w, et_bottom = y_e+h;
				et.bounds = [et_left, et_top, et_right, et_bottom];
				et.text = ini_txt;
				//
				// подпрограмма реакции на ввод текста (в процессе)
				et.onChanging = function()
				{
					digit_on_Changing( et, ini_txt, ZERO_TEXT );
					return;
				};// end et_on_Changing
				//
				// подпрограмма реакции на ввод текста (окончание)
				et.onChange = function()
				{
					et.text = CHECK_ZERO_TEXT( et.text );
					return;
				};// end et.onChange
				//
				// текст для единиц измерения
				var un_left = et_right+dx, un_top = y_e; 
				var un = MAKE_ST( where, un_txt, [ un_left, un_top + dy_t, un_left + w_un, un_top + tip_h ] );
				return [et, un];
			};// end ED_TEXT
			//
			// лево для поля ввода для параметра по вертикали
			var x_et_vert = x + w_txt + dx;
			// поле ввода для параметра по вертикали
			var et_vert = ED_TEXT( x_et_vert, y, vert_ini, UNITS_TEXT );
			// поле ввода для параметра по горизонтали
			var et_hor = ED_TEXT( x_et_vert + 90, y, hor_ini, UNITS_TEXT );
			// возвращаем поля ввода с единицами измерения по вертикали [0] и по горизонтали [1]
			return [ et_vert, et_hor ];
		};// end MAKE_PANEL
		//
		// подпрограмма создания статического текста
		function MAKE_ST( where, txt, t_bounds )
		{
			var t = where.add( 'statictext' );
			if( txt !== false ) t.text = txt;
			if( t_bounds !== false ) t.bounds = t_bounds;
			return t;
		};// end MAKE_ST
		//
		// обработка поля ввода в процессе
		function digit_on_Changing( et, def, emp ) 
		// et - поле ввода
		// def - значение по умолчанию если ошибка ввода
		// emp - значение если пустое поле
		{
			// если была ошибка ввода
			if( exit_if_bad_input )
			{
				// отменяем ошибку ввода
				exit_if_bad_input = false;
				// активируем поле ввода
				et.active = true;
			};// if
			// получаем из поля ввода текстовую строку для перевода в число
			var STR = STR_FOR_NUM( et.text );
			// если строка из поля ввода не пригодна для перевода в число
			if( STR === false )
			{
				// считаем, что ошибка ввода
				exit_if_bad_input = true;
				// выводим сообщение об ошибке ввода
				alert( "Bad number input!" );
				// присваиваем текст по умолчанию в поле ввода
				et.text = def;
				// активируем поле ввода
				et.active = true;
			};// if
			// если пустая строка в поле ввода
			if( STR === "" )
			{
				// присваиваем текст если пустое поле
				et.text = emp;
			};// if
			return;
		};// end digit_on_Changing
		//
		// подпрограмма создания панели для опций
		function MAKE_OPTIONS_PANEL( x, y )
		{
			// массив для получения значений из подпрограмм создания панелей ввода
			var VER_HOR_ARR = new Array( 2 );
			// строка 1
			// верхняя граница заголовков
			var y_title = y;
			// верхняя граница заголовков с корректировкой
			var y_title_WM = y_title + WM( CSCC( 2, 0 ), 1 );
			// заголовок для вертикали
			var v_text_w = 50;// ширина
			var v_tip_x = x + v_text_w;// левая граница
			MAKE_ST( mp, "Vertical", [ v_tip_x, y_title_WM, v_tip_x + v_text_w, y_title_WM + tip_h ] );
			// заголовок для горизонтали
			var h_text_w = 70;// ширина
			var h_tip_x = x + h_text_w * 2;// левая граница
			MAKE_ST( mp, "Horizontal", [ h_tip_x, y_title_WM, h_tip_x + h_text_w, y_title_WM + tip_h ] );
			// шаг по вертикали для панелей
			var pan_dy = WM( 24, 25 );
			// строка 2
			// панель для длины
			var pan_y_length = y_title + pan_dy - 4;
			VER_HOR_ARR = MAKE_PANEL( x, pan_y_length, mp, LENGTH_VER_INI, LENGTH_HOR_INI, "Length:" );
			// длина вертикальных меток
			LENGTH_VER = VER_HOR_ARR[0][0];
			// единицы для вертикальных меток
			var LENGTH_VER_UN = VER_HOR_ARR[0][1];
			// длина горизонтальных меток
			LENGTH_HOR = VER_HOR_ARR[1][0];
			// единицы для горизонтальных меток
			var LENGTH_HOR_UN = VER_HOR_ARR[1][1];
			// строка 3
			// панель для оффсета (отступа)
			var pan_y_offset = pan_y_length + pan_dy;
			VER_HOR_ARR = MAKE_PANEL( x, pan_y_offset, mp, OFFSET_VER_INI, OFFSET_HOR_INI, "Offset:" );
			// отступ по вертикали
			OFFSET_VER = VER_HOR_ARR[0][0];
			// единицы для отступа по вертикали
			var OFFSET_VER_UN = VER_HOR_ARR[0][1];
			// отступ по горизонтали
			OFFSET_HOR = VER_HOR_ARR[1][0];
			// единицы для отступа по горизонтали
			var OFFSET_HOR_UN = VER_HOR_ARR[1][1];
			// строка 4
			// панель для вылета
			var pan_y_bleed = pan_y_offset + pan_dy;
			VER_HOR_ARR = MAKE_PANEL( x, pan_y_bleed, mp, BLEED_VER_INI, BLEED_HOR_INI, "Bleed:" );
			// вылет по вертикали
			BLEED_VER = VER_HOR_ARR[0][0];
			// единицы для вылета по вертикали
			var BLEED_VER_UN = VER_HOR_ARR[0][1];
			// вылет по горизонтали
			BLEED_HOR = VER_HOR_ARR[1][0];
			// единицы для вылета по горизонтали 
			var BLEED_HOR_UN = VER_HOR_ARR[1][1];
			// строка 5
			// дропдаун для основных единиц
			// верх для дропдауна ввода единиц
			var pan_y_units = pan_y_bleed + pan_dy;
			// ширина текста для подсказки для основных единиц
			var units_w = 35;
			// ширина дропдауна для основных единиц 
			var un_drop_w = WM( CSCC( 55, 65 ), 55 );
			// создаем дропдаун для основных единиц
			UNITS_DROP = MAKE_DROP( mp, "Units:", units_w, x, pan_y_units, un_drop_w, DD_H, UNITS_LIST, UNITS_INDEX );
			//
			// подпрограмма реакции на смену единиц измерения
			UNITS_DROP.onChange = function()
			{
				// значение из дропдауна выбора основных единиц
				UNITS_INDEX = UNITS_DROP.selection.index;
				// изменяем текстовые подсказки для единиц измерения
				LENGTH_VER_UN.text = LENGTH_HOR_UN.text = 
				OFFSET_VER_UN.text = OFFSET_HOR_UN.text = 
				BLEED_VER_UN.text = BLEED_HOR_UN.text = 
				UNITS_TEXT = UNITS_LIST[ UNITS_INDEX ];
				return;
			};// end UNITS_DROP.onChanging
			//
			// чекбокс для учета клипмаски
			var clip_y = pan_y_units + WM( CSCC( 3, 4 ), 3 );
			// начальное значение чекбокса для учета клипмаски
			CLIP_CB_VAL = CLIP;
			CLIP_CB = MAKE_CB( mp, x + units_w + un_drop_w + 7, clip_y, WM(CSCC(150,160),150), cb_h, "Consider clipping mask", CLIP );
			// активность чекбокса для учета клипмаски если требуется учет клипмаски чекбокс активен
			CLIP_CB.enabled = CLIP;
			// ширина текста для следующих дропдаунов:
			// толщина линии, группировка после, цвет меток
			var text_dd_w = 90;
			// строка 6
			// панель для толщины линии
			var str_w_y = pan_y_units + pan_dy+WM( CSCC(1, 2), 1);
			// создаем текст подсказки для толщины линии
			var str_w_tip_y = str_w_y+WM( CSCC(3, 2), 3);
			MAKE_ST( mp, "Stroke weight:", [ x, str_w_tip_y, x + text_dd_w, str_w_tip_y + tip_h ] );
			// создаем поле ввода для толщины линии
			str_w_ed_text = mp.add('edittext');
			// лево поля ввода для толщины линии
			var str_w_left = x + text_dd_w + 3;
			// ширина поля ввода для толщины линии
			var str_w_ed_tex_w = 55;
			// право поля ввода для толщины линии
			var str_w_right = str_w_left + str_w_ed_tex_w;
			// высота поля ввода для толщины линии
			var str_w_ed_tex_h = WM( CSCC(21, 22), 20 );
			// границы поля ввода для толщины линии
			str_w_ed_text.bounds = [ str_w_left, str_w_y, str_w_right, str_w_y+str_w_ed_tex_h ];
			// начальное значение поля ввода для толщины линии
			str_w_ed_text.text = SW_NUM_INI;
			//
			// подпрограмма реакции на ввод толщины линии (в процессе)
			str_w_ed_text.onChanging = function()
			{
				digit_on_Changing( str_w_ed_text, SW_NUM_INI, ZERO_TEXT );
				return;
			};// end sw_on_Changing
			//
			// подпрограмма реакции на ввод толщины линии (окончание)
			str_w_ed_text.onChange = function()
			{
				str_w_ed_text.text = CHECK_ZERO_TEXT( str_w_ed_text.text );
				return;
			};// end str_w_ed_text.onChange
			//
			// дропдаун для единиц для толщины линии
			// ширина дропдауна для единиц для толщины линии
			var str_un_drop_w = 60;
			// создаем дропдаун для единиц толщины линии
			str_un_drop = MAKE_DROP( mp, false, false, str_w_right +5, str_w_y, str_un_drop_w, DD_H, UNITS_LIST, SW_UN_INI );
			// увеличиваем шаг по вертикали
			pan_dy = WM( CSCC( 25, 26 ), 25);
			// ширина дропдаунов для группировки и цвета
			var drop_w = 120;
			// строка 7
			// группировка меток
			var g_m_y = str_w_y + pan_dy;
			// если есть выделение добавляем опцию группировать метки и выделение
			if( N_sel > 0 ) G_M_LIST.push( "Marks and selection" );
			// если начальная опция группировать метки и выделение
			// но в документе нет выделения
			if( (G_M_INI == 2) && (N_sel == 0) )
			{
				// начальную опцию ставим группировать только метки
				G_M_INI = 1;
				// автоматическая корректировка как бы была :)))
				G_AUTO = true;
			};// if
			// создаем дропдаун для группировки
			G_M_DROP = MAKE_DROP( mp, "Group after: ", text_dd_w, x, g_m_y, drop_w, DD_H, G_M_LIST, G_M_INI );
			//
			// подпрограмма реакции на изменение дропдауна для группировки
			G_M_DROP.onChange = function()
			{
				// если была автоматическая корректировка опции для группировки
				// и вручную принудительно изменили опцию "только метки"
				if( ( N_sel > 0 ) && G_AUTO && ( G_M_DROP.selection.index != 1 ) )
				{
					// тогда автоматической корректировки как бы не было :)))
					G_AUTO = false;
				};// if
				return;
			};// end G_M_DROP.onChange
			//
			// строка 8
			// дропдаун выбора цвета
			var c_drop_y = g_m_y + pan_dy;
			// создаем дропдаун выбора цвета
			COLOR_DROP = MAKE_DROP( mp, "Color of marks:", text_dd_w, x, c_drop_y, drop_w, DD_H, SWATCHES, COLOR_VAL );
			// строка 9
			// чекбокс для белого контура
			var w_cont_y = c_drop_y + pan_dy + WM( CSCC( 2, 4 ), 2 );
			W_CONT_CB = MAKE_CB( mp, x, w_cont_y, 200, cb_h, "White contour around marks", W_CONT_INI );
			return;
		};// end MAKE_OPTIONS_PANEL
		//
		// собственно создаем панель опций
		MAKE_OPTIONS_PANEL( WM( CSCC( 175, 180 ), 175 ), 2 );
		//
		// подпрограмма создания разделительной линии в диалоге
		function MAKE_LINE_DIAL() 
		{
			var the_line = dlg.add('panel');
			the_line.bounds = [mp_left, undefined, mp_right, undefined];
			return;
		};// end MAKE_LINE_DIAL
		//
		// создаем группу для выбора объектов и границ и слоя
		var OBJ_BOUNDS_LAYER = MAKE_GROUP( dlg, 'row', 'center' );
		// список объектов для построения
		var OBJECTS_ARR = new Array();
		// если в документе несколько артбордов
		if( N_AB > 1 )
		{
			// добавляем опцию для каждого артборда
			OBJECTS_ARR.push( EACH_AB_OPTION );
		};// if
		// опция активный артборд
		OBJECTS_ARR.push( AA_OPTION );
		// если выделен только 1 объект
		if( N_sel == 1 ) 
		{
			// опция для одного объекта
			OBJECTS_ARR.push( SEL_OBJ_OPTION );
		};// if
		// если выделено больше 1 объекта
		if( N_sel > 1 ) 
		{
			// опция для всего выделения
			OBJECTS_ARR.push( ENTIRE_SEL_OPTION );
			// опция для каждого объекта в выделении
			OBJECTS_ARR.push( EACH_OBJ_OPTION );
		};// if
		// "переворачиваем" массив объектов чтобы последняя опция стала первой
		OBJECTS_ARR.reverse();
		// дропдаун для объектов
		OBJ_DROP = MAKE_DROP( OBJ_BOUNDS_LAYER, "Object(s):", false, false, false, DD_WIDTH, DD_H, OBJECTS_ARR, 0 );
		OBJ_DROP.onChange = OBJ_DROP_ON_CHANGE;
		//
		// подпрограмма реакции на изменение в дропдауне выбора объектов для построения меток
		function OBJ_DROP_ON_CHANGE() 
		{
			// текстовое значение дропдауна выбора объектов
			OBJECTS_TO_MAKE = OBJ_DROP.selection.text;
			// если объект для построения меток активный артборд или каждый артборд
			if( (OBJECTS_TO_MAKE == AA_OPTION) || (OBJECTS_TO_MAKE == EACH_AB_OPTION) ) 
			{
				// деактивируем выбор границ
				BOUNDS_INI = DROP_ACTIVE( BOUNDS_DROP, false, BOUNDS_INI );
				// если был учет клипмасок деактивируем чекбокс для клипмаски
				if( CLIP ) CLIP_CB_VAL = CB_ACTIVE( CLIP_CB, false, CLIP_CB_VAL );
				// учитываем наложение объектов если каждый артборд
				var CONS_OVER_VAL = (OBJECTS_TO_MAKE == EACH_AB_OPTION);
				// проверяем опции для группировки меток если было выделение
				// если не было автоматической корректировки опции группировки
				// и если опция группировки меток и выделения
				if( ( N_sel > 0 ) && ( !G_AUTO ) && ( G_M_DROP.selection.index == 2 ) )
				{
					// ставим выделение на группировку только меток
					G_M_DROP.selection = 1;
					// автоматической корректировки как бы было :)))
					G_AUTO = true;
				};// if
			} 
			// если объект для построения меток НЕ артборд (НЕ артборды)
			else 
			{
				// активируем выбор границ
				BOUNDS_INI = DROP_ACTIVE( BOUNDS_DROP, true, BOUNDS_INI );
				// если был учет клипмасок активируем чекбокс для клипмаски
				if( CLIP ) CLIP_CB_VAL = CB_ACTIVE( CLIP_CB, true, CLIP_CB_VAL );
				// учитываем наложение объектов если каждый объект в выделении
				var CONS_OVER_VAL = (OBJECTS_TO_MAKE == EACH_OBJ_OPTION);
				// проверяем опции для группировки меток
				// если была автоматическая корректировка опции группировки
				// и если опция группировки только меток
				if( ( G_AUTO ) && ( G_M_DROP.selection.index == 1 ) )
				{
					// ставим выделение на группировку меток и выделения
					G_M_DROP.selection = 2;
					// автоматической корректировки как бы не было :)))
					G_AUTO = false;
				};// if
			};// if-else
			// активируем-деактивируем чекбокс учета наложения объектов
			CONS_OVER = CB_ACTIVE( CONS_OVER_CB, CONS_OVER_VAL, CONS_OVER );
			return;
		};// end OBJ_DROP_ON_CHANGE
		//
		// подпрограмма активации / деактивации чекбокса
		// cb - чекбокс
		// активация: act = true, деактивация act = false;
		// ini - начальное значение после активации
		function CB_ACTIVE( cb, act, ini ) 
		{
			// если чекбокс не создан выход
			if( cb === undefined ) return ini;
			// если чекбокс уже в заданном состоянии выход
			if( cb.enabled == act )
			{
				return ( act ? cb.value : ini );
			};// if
			// если деактивация
			if( !act ) 
			{
				// СНАЧАЛА получаем значение чекбокса
				var cb_value = cb.value;
				// деактивируем и отключаем чекбокс
				cb.enabled = cb.value = act;
			} 
			// если активация
			else 
			{
				// активируем чекбокс
				cb.enabled = act;
				// присваиваем начальное значение
				cb.value = ini;
				// ПОСЛЕ ЭТОГО получаем начальное значение чекбокса
				var cb_value = cb.value;
			};// if-else
			return cb_value;
		};// end CB_ACTIVE
		//
		// подпрограмма активации / деактивации дропдауна
		// the_drop - дропдаун
		// активация: act = true, деактивация act = false;
		// ini - начальное выделение, выбранная опция после активации
		function DROP_ACTIVE( the_drop, act, ini ) 
		{
			try
			{
				// если дропдаун не создан выход
				if( the_drop === undefined ) return ini;
				// если дропдаун уже в заданном состоянии
				if( the_drop.enabled == act )
				{
					return ( act ? the_drop.selection.index : ini );
				};// if
				// если деактивация
				if( !act ) 
				{
					// СНАЧАЛА получаем индекс выделения дропдауна
					var the_index = the_drop.selection.index;
					// добавляем вариант N/A
					var NA = the_drop.add('item', "N/A");
					// ставим выделение в дропдауне на N/A 
					NA.selected = true;
				} 
				// если активация
				else 
				{
					// удаляем вариант N/A
					the_drop.remove( the_drop.items[the_drop.items.length-1] );
					// ставим выделение в дропдауне начальное значение
					the_drop.selection = ini;
					// ПОСЛЕ ЭТОГО получаем индекс выделения дропдауна
					var the_index = the_drop.selection.index;
				};// if-else
				// присваиваем заданное состояние дропдауна
				the_drop.enabled = act;
			} catch ( error ) {};// try-catch
			// возвращаем значение индекса выделения дропдауна
			// для использования в переменной для начального выделения
			return the_index;
		};// end DROP_ACTIVE
		//
		// если выделены объекты создаем дропдаун выбора границ
		if( N_sel > 0 ) 
		{
			BOUNDS_DROP = MAKE_DROP( OBJ_BOUNDS_LAYER, "Bounds:", false, false, false, DD_WIDTH, DD_H, BOUNDS_LIST, BOUNDS_INI );
		};// if
		//
		// если в документе больше одного слоя создаем дропдаун выбора слоя
		if( AD_LL > 1 ) 
		{
			// список имен слоев в документе
			var LAYERS_LIST = new Array();
			// индекс активного слоя
			var LAYER_SEL = 0;
			for( var i=0; i < AD_LL; i++ )
			{
				// заполняем список имен слоев
				LAYERS_LIST[i] = AD.layers[i].name;
				// номер активного слоя
				if( AD.layers[i] == AL ) LAYER_SEL = i;
			};// for
			LAYER_DROP = MAKE_DROP( OBJ_BOUNDS_LAYER, "Layer:", false, false, false, (DD_WIDTH - WM( 13, 17 )), DD_H, LAYERS_LIST, LAYER_SEL );
		};// if
		// вызываем подпрограмму реакции на изменение дропдауна выбора объектов
		// чтобы присвоить начальные значения в диалоге
		OBJ_DROP_ON_CHANGE();
		// проводим разграничительную линию
		MAKE_LINE_DIAL();
		// создание панели кнопок (кнопка ОК, кнопка Cancel)
		var okPanel = MAKE_GROUP( dlg, 'row', 'center' );
		// кнопка ОК
		okBtn = MAKE_BUTTON( false, false, false, okPanel, 'OK');
		// кнопка OK активна если есть выбранные направления
		okBtn.enabled = DIR_STATUS( DIR, undefined, false );
		// кнопка Cancel
		var cancelBtn = MAKE_BUTTON( false, false, false, okPanel, 'Cancel');
		//
		// собственно показываем окно диалога
		var DIALOG_BUTTON = dlg.show();
		//
		// если выбрана первая кнопка (ОК) выполняем построение меток
		if( DIALOG_BUTTON == 1 ) 
		{
			// получаем значения из диалога
			//
			// объекты для построения меток (текстовое значение)
			OBJECTS_TO_MAKE = OBJ_DROP.selection.text;
			// направления
			for( var i = 0; i < N_dir_dial; i++ )
			{
				// получаем логические значения чекбоксов направлений
				// DIR_INI[i] будут использованы как начальные значения для направлений
				// при записи в файл данных
				DIR_INI[i] = DIR[i].value;
			};// for
			// длина по вертикали
			LENGTH_VER_INI = LENGTH_VER.text;// начальное значение (текст)
			LENGTH_VER = TEXT_AS_POINTS( LENGTH_VER_INI, UNITS_TEXT );// число в пунктах
			// длина по горизонтали
			LENGTH_HOR_INI = LENGTH_HOR.text;// начальное значение (текст)
			LENGTH_HOR = TEXT_AS_POINTS( LENGTH_HOR_INI, UNITS_TEXT );// число в пунктах
			// отступ (офсет) по вертикали
			OFFSET_VER_INI = OFFSET_VER.text;// начальное значение (текст)
			OFFSET_VER = TEXT_AS_POINTS( OFFSET_VER_INI, UNITS_TEXT );// число в пунктах
			// отступ (офсет) по горизонтали
			OFFSET_HOR_INI =OFFSET_HOR.text;// начальное значение (текст)
			OFFSET_HOR = TEXT_AS_POINTS( OFFSET_HOR_INI, UNITS_TEXT );// число в пунктах
			// вылет по вертикали
			BLEED_VER_INI = BLEED_VER.text;// начальное значение (текст)
			BLEED_VER = TEXT_AS_POINTS( BLEED_VER_INI, UNITS_TEXT );// число в пунктах
			// вылет по горизонтали
			BLEED_HOR_INI = BLEED_HOR.text;// начальное значение (текст)
			BLEED_HOR = TEXT_AS_POINTS( BLEED_HOR_INI, UNITS_TEXT );// число в пунктах
			// единицы измерения для толщины линии
			SW_UN_INI = str_un_drop.selection.index;// начальное значение число (индекс)
			// толщина линии
			SW_NUM_INI = str_w_ed_text.text;// начальное значение (текст)
			SW_NUM = TEXT_AS_POINTS ( SW_NUM_INI, UNITS_LIST[ SW_UN_INI ] );// число в пунктах
			// проверяем введенные значения длины меток по вертикали и горизонтали
			// они не могут быть меньше или равны 0
			var BAD_VAL_L = ( LE_ZERO( LENGTH_VER ) || LE_ZERO( LENGTH_HOR ) );
			if( BAD_VAL_L )
			{
				BAD_VAL_TEXT = BAD_VAL_TEXT+ "Crop mark length"+ CAN_NOT_BE + "\n";
			};// if
			// проверяем введенное значение толщины линии
			// оно не может быть меньше или равно 0
			var BAD_SW = LE_ZERO( SW_NUM );
			if( BAD_SW ) 
			{
				BAD_VAL_TEXT = BAD_VAL_TEXT + "Stroke weight" + CAN_NOT_BE + "\n";
			};// if
			// если есть ошибки ввода выход
			if( BAD_VAL_L || BAD_SW ) 
			{
				alert( BAD_VAL_TEXT );
				return;
			};// if
			// цвет меток индекс из дропдауна
			COLOR_VAL = COLOR_DROP.selection.index;// число
			// белый контур
			W_CONT_INI = W_CONT_CB.value;// логическое значение
			// группировка меток и выделения
			G_M_INI = G_M_DROP.selection.index;// начальное значение число (индекс)
			// границы объектов для построения
			// если есть выделенные объекты берем опцию из дропдауна границ
			// если нет выделения оставляем полученное начальное значение
			BOUNDS_INI = ( N_sel > 0 ) ? BOUNDS_DROP.selection.index : BOUNDS_INI;
			// если в документе слоев больше одного
			if( AD_LL > 1 ) 
			{
				// выбираем слой для построения меток из дропдауна выбора слоев
				SL = AD.layers[ LAYER_DROP.selection.index ];
			};// if
			// учет клип. маски
			if( CLIP ) CLIP_CB_VAL = CLIP_CB.value;// логическое значение
			// запомнить направления
			REM_DIR = REM_DIR_CB.value;// логическое значение
			// учесть наложение объектов
			CONS_OVER = CONS_OVER_CB.value;// логическое значение
			//
			// выполнение операции построения меток
			OPERATION();
			//
			// записываем данные из диалога как начальные значения в файл
			INI_FILE_IO( true );
		};// if DIALOG_BUTTON == 1
	};// if CHECK_SELECTION()
	return;
};//end main
//
// подпрограмма выполнения скрипта (в диалоге был ОК)
function OPERATION() 
{
	// если цвет меток НЕ Registration Auto
	if( COLOR_VAL != 0 )
	{
		// -1 потому что добавляли одну опцию (Registration Auto) в дропдаун цвет меток
		M_COLOR = AD.swatches[ COLOR_VAL - 1 ].color;
		// запоминаем имя свотча (вдруг пригодится для проверки :))
		var COLOR_NAME = SWATCHES[ COLOR_VAL ];
		// тип выбранного свотча
		var COLOR_TYPE = M_COLOR.typename;
		// дополнительная проверка цвета (если это градиент, паттерн, нет цвета и т.п.)
		if( (COLOR_TYPE == "GradientColor") || (COLOR_TYPE == "PatternColor") || (COLOR_TYPE == "NoColor") )
		{
			if( COLOR_TYPE == "GradientColor" ) var STR_COLOR_TYPE = "Gradient Color";
			if( COLOR_TYPE == "PatternColor" ) var STR_COLOR_TYPE = "Pattern Color";
			if( COLOR_TYPE == "NoColor" ) var STR_COLOR_TYPE = "No Color";
			// строка для предупреждения
			var STR_MSG = "Chosen swatch " + unescape( COLOR_NAME ) +"\n"+ "is "+ STR_COLOR_TYPE +"!\n\n" + "Continue anyway?";
			// выводим предупреждение
			if( !confirm( STR_MSG ) ) return;
		};// if
		// если задано построение контура вокруг меток
		if( W_CONT_INI )
		{
			// получаем "белый" цвет для контура вокруг меток
			switch( COLOR_TYPE )
			{
				// если выбранный цвет является спотом (в том числе и Registration)
				case( "SpotColor" ):
					WHITE = new SpotColor();
					WHITE.spot = AD.spots.getByName( COLOR_NAME );
					WHITE.tint = 0;
				break;// SpotColor
				// если выбранный цвет является CMYK
				case( "CMYKColor" ):
					WHITE_CMYK();
				break;// CMYKColor
				// если выбранный цвет является RGB
				case( "RGBColor" ):
					WHITE_RGB();
				break;// RGBColor
				// если выбранный цвет является Lab
				case( "LabColor" ):
					WHITE = new LabColor();
					WHITE.l = 100;
					WHITE.a = 0;
					WHITE.b = 0;
				break;// LabColor
				// если выбранный цвет является Gray
				case( "GrayColor" ):
					WHITE = new GrayColor();
					WHITE.gray = 0;
				break;// GrayColor
				// если выбранный цвет является Pattern
				case( "PatternColor" ):
				// если выбранный цвет является Gradient
				case( "GradientColor" ):
				// если выбранный цвет является NoColor
				case( "NoColor" ):
				// и во всех остальных случаях
				default:
					// если цветовая модель документа CMYK
					if( AD.documentColorSpace == DocumentColorSpace.CMYK )
					{
						WHITE_CMYK();
					}
					// если цветовая модель документа RGB
					else
					{
						WHITE_RGB();
					};// if-else
				break;// PatternColor, GradientColor, NoColor, default
			};// switch
			//
			// подпрограмма создания "белого" для CMYK
			function WHITE_CMYK()
			{
				WHITE = new CMYKColor();
				WHITE.black = 0;
				WHITE.cyan = 0;
				WHITE.magenta = 0;
				WHITE.yellow = 0;
				return;
			};// end WHITE_CMYK
			//
			// подпрограмма создания "белого" для RGB
			function WHITE_RGB()
			{
				WHITE = new RGBColor();
				WHITE.red = 255;
				WHITE.green = 255;
				WHITE.blue = 255;
				return;
			};// end WHITE_RGB
		};// if
	}
	// если цвет меток Registration Auto
	else
	{
		// подпрограмма присвоения Registration через имя
		function GET_REG_BY_NAME( the_name )
		{
			// цвет меток Registration
			M_COLOR = AD.swatches.getByName(the_name).color;
			// "белый" цвет для контура вокруг меток
			// начальное присвоение Registration, далее присваивается оттенок 0% 
			WHITE = AD.swatches.getByName(the_name).color;
			return;
		};// end GET_REG_BY_NAME
		//
		// создаем цвета Registration
		// будем пытаться напрямую обратиться к цвету Registration
		// если будет ошибка, будем считать, что приложение неанглийское 
		// или файл создан неанглийским Иллюстратором
		//
		// имя спота Registration для английской версии
		var REG_NAME_ENGLISH = "[Registration]";
		// пытаемся присваивать английское имя
		try
		{
			GET_REG_BY_NAME( REG_NAME_ENGLISH );
		}
		// если ошибка значит неанглийский Иллюстратор 
		// или документ из неанглийского Иллюстратора
		catch( error )
		{
			// найден ли спот приводки в спотах документа
			var REG_FOUND = false;
			try
			{
				// цикл по спотам в документе 
				for( var i = 0; i < AD.spots.length; i++ )
				{
					// текущий спот
					var the_spot = AD.spots[i];
					// имя спота
					var the_spot_name = the_spot.name;
					// цветовая модель спота
					var the_type = the_spot.colorType;
					// если цветовая модель Registration
					if( the_type == ColorModel.REGISTRATION )
					{
						// если первый символ имени "[" и последний символ имени "]"
						if( the_spot_name[0] == "[" && the_spot_name[the_spot_name.length-1] == "]")
						{
							// получаем неанглийский спот для приводки
							GET_REG_BY_NAME( the_spot_name );
							REG_FOUND = true;
						};// if
					};// if
				};// for i
			} catch( error ) { };// try-catch
			// если была ошибка или не найдено в спотах
			// создаем новый спот для Registration
			if( !REG_FOUND )
			{
				var NEW_REG = AD.spots.add();
				NEW_REG.colorType = ColorModel.REGISTRATION;
				NEW_REG.name = REG_NAME_ENGLISH;
				var NEW_REG_NAME = NEW_REG.name;
				GET_REG_BY_NAME( NEW_REG_NAME );
			};// if
		};// try-catch
		// даем 100% оттенок цвета меток Registration
		M_COLOR.tint = 100;
		// белый = 0% от цвета меток Registration
		WHITE.tint = 0;
	};// if-else
	// открываем выбранный слой
	if( !SL.visible ) SL.visible = true;
	if( SL.locked ) SL.locked = false;
	//
	// начинаем выполнение команд из диалога
	//
	// если объект для построения - активный артборд или каждый артборд
	if( (OBJECTS_TO_MAKE == AA_OPTION) || (OBJECTS_TO_MAKE == EACH_AB_OPTION) )
	{
		// если объект для построения - активный артборд
		if( OBJECTS_TO_MAKE == AA_OPTION )
		{
			// смещения начала координат
			var PAGE_DX = AD.rulerOrigin[0];// по горизонтали
			var PAGE_DY = AD.rulerOrigin[1];// по вертикали
			// строим метки для активного артборда
			MARKS( [ -PAGE_DX, AD.height - PAGE_DY, AD.width - PAGE_DX, -PAGE_DY ] );
		}
		// если объекты для построения - каждый артборд
		else
		{
			// если задан учет наложения объектов (артбордов)
			if( CONS_OVER )
			{
				// переопределяем массив размеров объектов 
				// для размеров артбордов
				OBJ_SIZE = new Array( N_AB );
				// переприсваиваем (формально) количество объектов для обработки
				N_sel = N_AB;
				// цикл по всем артбордам для получения размеров
				for( var i = 0; i < N_AB; i++ )
				{
					// в массивы размеров объектов записываем размеры артбордов
					OBJ_SIZE[ i ] = AD.artboards[ i ].artboardRect;
				};// for i
			};// if
			// цикл по всем артбордам для построения меток
			for( OBJ_i = 0; OBJ_i < N_AB; OBJ_i++ )
			{
				// размер текущего артборда
				var AB_SIZE = ( CONS_OVER ) ? OBJ_SIZE[ OBJ_i ] : AD.artboards[ OBJ_i ].artboardRect;
				// создаем метки для текущего артборда
				MARKS( AB_SIZE );
			};// for OBJ_i
		};// if-else
	}
	// если объект для построения - 
	// выделение целиком или каждый объект в выделении или только один выделенный объект
	else
	{
		// учет клипмаски переводим из логического значения в индекс
		// 1 - учитываем клипмаску, 0 - НЕ учитываем клипмаску
		var CLIP_INDEX = Number( CLIP_CB_VAL );
		// выделение целиком или выделен только один объект
		if( (OBJECTS_TO_MAKE == ENTIRE_SEL_OPTION) || (OBJECTS_TO_MAKE == SEL_OBJ_OPTION) )
		{
			MARKS( SEL_SIZE[ BOUNDS_INI ][ CLIP_INDEX ] );
		};// if
		//
		// каждый выделенный объект
		if( OBJECTS_TO_MAKE == EACH_OBJ_OPTION )
		{
			// переприсваиваем массив размеров чтобы можно было его использовать
			// для возможного учета наложения
			OBJ_SIZE = OBJ_SIZE[ BOUNDS_INI ][ CLIP_INDEX ];
			// цикл по объектам в выделении
			for( OBJ_i = 0; OBJ_i < N_sel; OBJ_i++ ) 
			{
				MARKS( OBJ_SIZE[ OBJ_i ] );
			};// for
		};// if
	};// if-else
	// если задана группировка после создания меток
	if( G_M_INI != 0 )
	{
		// если задана группировка только меток или меток и выделенных объектов
		// сначала группируем метки создаем группу для меток на выбранном слое
		var G_M = GROUP_OBJ( ALL_MARKS );
		// учитываем возможную ошибку группировки
		var g_err = ( G_M === false );
		// если задана группировка меток и выделения
		// группируем метки и выделение
		if( G_M_INI == 2 )
		{
			// снимаем старое выделение
			AD.selection = null;
			// группируем объекты в выделении
			var G_S = GROUP_OBJ( the_sel );
			// группируем объекты в выделении и метки
			var G = GROUP_OBJ( [ G_S, G_M ] );
			// учитываем возможную ошибку группировки
			g_err = ( g_err || ( G_S === false ) || ( G === false ) );
			// выделяем новую группу
			try
			{
				AD.selection = G;
			} catch( error ) { g_err = true };// try-catch
		};// if
		// если была ошибка группировки
		if( g_err )
		{
			// выводим сообщение
			alert("Can not group!");
			try
			{
				// восстанавливаем старое выделение в документе
				AD.selection = the_sel;
			} catch( error ) {};// try-catch
		};// if
		// для записи в файл данных учитываем возможную 
		// автоматическую корректировку опции для группировки
		if( G_AUTO && ( G_M_INI == 1 ) )
		{
			// присваиваем "старое" значение для группировки меток и выделения
			G_M_INI = 2;
		};// if
	};// if
	return;
};// end OPERATION
// 
// подпрограмма группировки объектов
function GROUP_OBJ( obj_arr )
{
	try
	{
		// количество объектов в массиве для создания группы
		var N = obj_arr.length;
		// если только 1 объект в массиве тогда группу НЕ создаем
		// и возвращаем этот объект - это как бы группа :)))
		if( N == 1 ) return obj_arr[0];
		// создаем группу на выбранном слое
		var G = SL.groupItems.add();
		// цикл по массиву объектов
		for( var i=0; i < obj_arr.length; i++ ) 
		{
			// добавляем выделенные объекты в группу
			obj_arr[i].move( G, ElementPlacement.INSIDE );
		};// for
	}
	catch( error )
	{
		// если была ошибка при группировке
		G = false;
	};// try-catch
	// возвращаем полученную группу
	return G;
};// end GROUP_OBJ
//
// подпрограмма проверки выделения
function CHECK_SELECTION() 
{
	// есть ли открытые документы
	if( app.documents.length < 1 ) 
	{
		alert( "There are no open documents!");
		return false;
	};// if
	// активный документ
	AD = app.activeDocument;
	// выделение в активном документе
	the_sel = AD.selection;
	// количество объектов в выделении
	N_sel = the_sel.length;
	// активный слой
	AL = AD.activeLayer;
	// выбранный слой (начальное значение)
	SL = AL;
	// количество слоев в активном документе
	AD_LL = AD.layers.length;
	//получаем размеры выделения
	SELECTION_DIM();
	// выход если направляющие в выделении
	if( exit_if_guide ) 
	{
		var TF_guides_STR = TF_guides ? "\nand/or text frames with text path converted to guide" : "";
		alert("There are some selected guides" + TF_guides_STR +"!\n"+"Can not process that!");
		return false;
	};// if
	// выход если выделение непригодно для операции
	if( exit_if_bad_sel )
	{
		alert("Can not process the selection!");
		return false;
	};// if
	// получаем единицы измерения в документе
	UNITS_INDEX = GET_DOC_UNITS_INDEX(); // индекс
	UNITS_TEXT = UNITS_LIST[ UNITS_INDEX ]; // текстовое значение
	// дополняем опцию для каждого объекта в выделении
	EACH_OBJ_OPTION = EACH_OBJ_OPTION +" ("+N_sel+" objects)";
	// дополняем опцию для артборда
	try
	{
		// если версия программы позволяет создавать артборды
		if( AD.hasOwnProperty("artboards") )
		{
			// количество артбордов в активном документе
			N_AB = AD.artboards.length;
			// если в активном документе больше 1 артборда
			if( N_AB > 1 )
			{
				// получаем индекс активного артборда
				var AA_INDEX = AD.artboards.getActiveArtboardIndex();
				// получаем активный артборд
				AA = AD.artboards[ AA_INDEX ];
				// добавляем имя артборда к опции для активного артборда
				AA_OPTION = "Active artboard";
				// если у активного артборда есть имя
				if( AA.hasOwnProperty("name") )
				{
					// добавляем имя активного артборда
					AA_OPTION = AA_OPTION +" ("+ unescape( AA.name ) + ")";
				}
				// если у активного артборда нет имени
				else
				{
					// добавляем номер активного артборда 
					AA_OPTION = AA_OPTION +" (Artboard "+ ( AA_INDEX +1 ).toString() + ")";
				};// if-else
				// дополняем опцию для каждого артборда
				EACH_AB_OPTION = EACH_AB_OPTION + " ("+N_AB+" items)";
			};// if
		};// if
	} catch ( error ) {};// try-catch
	// заполняем массив имен свотчей
	// самая первая опция Registration Auto 
	SWATCHES.push( "Registration (Auto)" );
	// цикл по свотчам документа
	for( var i = 0; i < AD.swatches.length; i++) 
	{
		// заполняем массив свотчей
		SWATCHES.push( AD.swatches[i].name );
	};// for i
	return true;
};// end CHECK_SELECTION()
//
// подпрограмма сравнения габаритных размеров 
// в массиве размеров объектов
// dir - направление 0=лево 1=верх 2=право 3=низ
// i - индекс объекта в массиве объектов
// m - текущее значение габаритного размера (минимум или максимум)
// для заданного направления
// b_i - текущий элемент массива размеров
// если индекс объекта 0, тогда габаритный размер = b_i
// (текущему размеру), потому что не с чем сравнивать :)
function COMPARE_BOUNDS( dir, i, m, b_i )
{
	// габаритный размер по заданному направлению
	// начальное присвоение = текущий элемент массива размеров
	var s = b_i;
	// если индекс объекта НЕ равен 0 (значит есть с чем сравнивать :)))
	if( i != 0 )
	{
		// если направление лево (0) или низ (3) тогда определяем минимальное 
		// значение из текущего минимума и текущего размера
		// если направление верх (1) или право (2) тогда определяем максимальное
		// значение из текущего максимума и текущего размера
		s = ( (dir == 0) || (dir == 3) ) ? Math.min( m, b_i ) : Math.max( m, b_i );
	};// if
	// возвращаем габаритный размер по заданному направлению
	// если индекс объекта был 0, тогда сразу возвращается текущий размер
	return s;
};// end COMPARE_BOUNDS
//
// подпрограмма определения границ по клипмаскам 
// (если они присутствуют в объекте ) и составным частям объекта
// которые не находятся в клипмасках
// возвращает массив границ по клипмаскам 
// дополнительно проверяется наличие направляющих в составных частях объекта
function CLIP_BOUNDS( the_obj ) 
{
	// если была ошибка при определении границ выделения
	// сразу выход
	if( exit_if_bad_sel ) return;
	// массив размеров на выходе
	// 0 - лево геометрические границы
	// 1 - верх геометрические границы
	// 2 - право геометрические границы
	// 3 - низ геометрические границы
	// 4 - лево визуальные границы
	// 5 - верх визуальные границы
	// 6 - право визуальные границы
	// 7 - низ визуальные границы
	var B = new Array( N_dir_b );
	// количество клипмасок в объекте эта переменная нужна только чтобы
	// учесть 0 или НЕ 0 для вызова подпрограммы GET_SIZE_BY_CLIP и COMPARE_BOUNDS
	var N_CLIP = 0;
	// 
	// подпрограмма определения габаритов объекта с учетом клипмасок
	function GET_SIZE_BY_CLIP( OBJ )
	{
		// цикл по направлениям
		for( var dir = 0; dir < N_dir; dir++ )
		{
			// геометрические границы
			B[dir] = COMPARE_BOUNDS( dir, N_CLIP, B[dir], OBJ.geometricBounds[dir] );
			// визуальные границы
			B[dir+N_dir] = COMPARE_BOUNDS( dir, N_CLIP, B[dir+N_dir], OBJ.visibleBounds[dir] );
		};// for
		// увеличиваем счетчик клипмасок
		if( N_CLIP == 0 ) N_CLIP++;
		return;
	};// end GET_SIZE_BY_CLIP
	//
	// подпрограмма обработки объектов ограниченных клипмасками
	// или "простых" объектов вне клипмасок
	function GET_CLIP_OBJECTS( the_obj ) 
	{
		// если объект является направляющей выход
		if( IS_GUIDE( the_obj ) ) return;
		// если объект группа
		if( the_obj.constructor.name == "GroupItem" ) 
		{
			// если объект клипгруппа
			if( the_obj.clipped ) 
			{
				try 
				{
					// получаем размер по контуру клипмаски ( pageItems[0] )
					GET_SIZE_BY_CLIP( the_obj.pageItems[0] );
					// если внутри клипмаски есть направляющие выход
					if( GUIDES_IN_OBJ( the_obj ) ) return;
				} catch ( error ) {};
				// если была клипгруппа, то возврат здесь
				return;
			};// if
			// если объект "просто" группа
			try 
			{
				// цикл по составным частям группы
				for( var i = 0; i < the_obj.pageItems.length; i++ ) 
				{
					// ищем клипмаски в составных частях группы
					GET_CLIP_OBJECTS( the_obj.pageItems[i] );
				};// for
			} catch (error) {};
			// если была группа, то возврат здесь
			return;
		};// if
		// если объект НЕ клипгруппа и НЕ группа получаем размеры здесь
		GET_SIZE_BY_CLIP( the_obj );
		return;
	};// end GET_CLIP_OBJECTS
	//
	// получаем объекты с клипмасками
	GET_CLIP_OBJECTS( the_obj );
	// возвращаем массив границ по клипмаскам
	return [ [ B[0], B[1], B[2], B[3] ], [ B[4], B[5], B[6], B[7] ] ];
};// end CLIP_BOUNDS
//
// подпрограмма определения является ли объект направляющей
function IS_GUIDE( the_obj )
{
	// если (пока :))) не обнаружены направляющие в выделении
	if( exit_if_guide === false )
	{
		try
		{
			// если объект имеет свойство направляющей и оно активно
			if( the_obj.hasOwnProperty("guides") )
			{
				if( the_obj.guides ) return ( exit_if_guide = true );
			};// if
			// если объект является составным контуром и является направляющей хотя бы один под-контур
			if( (the_obj.constructor.name == "CompoundPathItem") && (the_obj.pathItems[0].guides) )
			{
				return ( exit_if_guide = true );
			};// if
			// если объект это текстовый фрейм и имеет textPath переведенный в направляющую
			if( TF_HAS_GUIDE( the_obj ) )
			{
				TF_guides = true;
				return ( exit_if_guide = true );
			};// if
		} catch( error ) {};// try-catch
	};// if
	// возвращаем результат проверки равный глобальной переменной exit_if_guide
	return exit_if_guide;
};// end IS_GUIDE
//
// подпрограмма поиска направляющих в объекте
function GUIDES_IN_OBJ( the_obj )
{
	// если объект является направляющей возвращаем истина
	if( IS_GUIDE( the_obj ) ) return true;
	try
	{
		// определяем под-объекты в группе
		if( the_obj.hasOwnProperty( "pageItems" ) )
		{
			for( var i = 0; i < the_obj.pageItems.length; i++ ) 
			{
				// если в составных частях объекта направляющие возвращаем истина
				if( GUIDES_IN_OBJ( the_obj.pageItems[i] ) ) return true;
			};// for
		};// if
	} catch( error ) {};
	// если нет направляющих возвращаем ложь
	return false;
};// end GUIDES_IN_OBJ
//
// подпрограмма проверки есть ли у текстового фрейма
// text path как направляющая
function TF_HAS_GUIDE( TF )
{
	// если объект НЕ является текстовым фреймом возвращаем ложь
	if( TF.constructor.name != "TextFrame" ) return false;
	// если текстовый фрейм НЕ является обычным текстовым объектом,
	// тогда он является текстом внутри контура или текстом по контуру,
	// а эти контуры и могут быть направляющими :)))
	if( TF.kind != TextType.POINTTEXT )
	{
		try
		{
			if( TF.textPath.guides ) return true;
		} catch( error ) {};// try-catch
	};// if
	return false;
};// end TF_HAS_GUIDE
//
// подпрограмма вычисления размеров выделения
function SELECTION_DIM() 
{
	// присваиваем размерности массивам для размеров
	// габариты всего выделения
	// первый индекс 0 = геометрические границы 1 = визуальные границы
	SEL_SIZE = new Array( N_b );
	// размеры выделенных объектов
	// первый индекс 0 = геометрические границы 1 = визуальные границы
	OBJ_SIZE = new Array( N_b );
	// цикл по виду границ
	for( var b = 0; b < N_b; b++ )
	{
		// первый индекс 0 = геометрические границы 1 = визуальные границы
		SEL_SIZE[b] = new Array( N_c );
		OBJ_SIZE[b] = new Array( N_c );
		// цикл по учету клипмаски
		for( var c = 0; c < N_c; c++ )
		{
			// второй индекс 0 = НЕ учитываем клипмаску 1 = учитываем клипмаску
			SEL_SIZE[b][c] = new Array( N_sel );
			OBJ_SIZE[b][c] = new Array( N_sel );
		};// for c
	};// for b
	// цикл для каждого объекта в выделении
	for( var i = 0; i < N_sel; i++ ) 
	{
		// текущий объект в выделении
		var the_obj = the_sel[i];
		// промежуточный массив размеров для текущего объекта
		// ПЕРВЫЙ индекс = учет клипмаски, ВТОРОЙ индекс = вид границ
		var BOUNDS_i = [ OBJ_BOUNDS( the_obj ), CLIP_BOUNDS( the_obj ) ];
		// если ошибка при получении границ объекта или направляющие в выделении выход
		if( exit_if_bad_sel || exit_if_guide ) return;
		// цикл по виду границ
		for( var b = 0; b < N_b; b++ )
		{
			// цикл по учету клипмаски
			for( var c = 0; c < N_c; c++ )
			{
				// массив размеров текущего объекта
				// для текущего вида границ и учета клипмаски
				OBJ_SIZE[b][c][i] = BOUNDS_i[c][b];
				// цикл по направлениям 0=лево 1=верх 2=право 3=низ
				for( var dir = 0; dir < N_dir; dir++ )
				{
					// габариты всего выделения
					// для текущего вида границ и учета клипмаски и текущего направления
					SEL_SIZE[b][c][dir] = COMPARE_BOUNDS( dir, i, SEL_SIZE[b][c][dir], OBJ_SIZE[b][c][i][dir] );
					// если последний индекс для учета клипмаски и пока не установлена необходимость
					// учета клипмаски проверяем габариты с учетом клипмаски и без учета клипмаски
					if( (c == 1) && !CLIP )
					{
						// если НЕ равные размеры без учета клипмаски и с учетом клипмаски
						// значит требуется учет клипмаски
						CLIP = ( OBJ_SIZE[b][c-1][i][dir] != OBJ_SIZE[b][c][i][dir] );
					};// if
				};// for dir
			};// for c
		};// for b
	};// for i
	return;
};// end SELECTION_DIM
//
// подпрограмма получения границ выделенного объекта
function OBJ_BOUNDS( the_obj ) 
{
	// массив размеров на выходе
	// 0 - лево геометрические границы
	// 1 - верх геометрические границы
	// 2 - право геометрические границы
	// 3 - низ геометрические границы
	// 4 - лево визуальные границы
	// 5 - верх визуальные границы
	// 6 - право визуальные границы
	// 7 - низ визуальные границы
	var B = new Array( N_dir_b );
	try 
	{
		// цикл по направлениям 0=лево 1=верх 2=право 3=низ
		for( var dir = 0; dir < N_dir; dir++ )
		{
			// геометрические границы
			B[dir] = the_obj.geometricBounds[dir];
			// визуальные границы
			B[dir+N_dir] = the_obj.visibleBounds[dir];
		};// for
	} 
	catch ( error ) 
	{
		exit_if_bad_sel = true;
		return false;
	};// try-catch
	// возвращаем массив из двух массивов:
	// 0 - геометрические границы, 1 - визуальные границы
	return [ [ B[0], B[1], B[2], B[3] ], [ B[4], B[5], B[6], B[7] ] ];
};// end OBJ_BOUNDS
//
// подпрограмма чтения/записи в файл данных
// WRITE = true запись
// WRITE = false чтение
function INI_FILE_IO( WRITE )
{
	// ссылка на файл с настройками
	var INI_FILE;
	// существует ли файл с настройками
	var INI_EXISTS = false;
	// ошибки при обращении к файлу с настройками
	var INI_ERR = false;
	// строковый тип
	var STR_TYPE = "string";
	// логический тип
	var BOOL_TYPE = "boolean";
	// целый тип
	var INT_TYPE = "integer";
	//
	// подпрограмма открытия файла с настройками
	function INI_OPEN()
	{
		// существует ли файл с настройками
		INI_EXISTS = false;
		// ошибки при обращении к файлу с настройками
		INI_ERR = false;
		try
		{
			// получаем ссылку на файл с настройками используя 
			// путь к папке с приложением (Illustrator) и название активного скрипта
			INI_FILE = File( app.path + "/"+ the_title +".ini" );
			// существует ли файл данных с настройками
			INI_EXISTS = INI_FILE.exists;
		}
		// если была ошибка при обращении к файлу с настройками
		catch( error )
		{
			INI_ERR = true;
		};// try-catch
		// если НЕТ ошибок при обращении к файлу данных
		if( !INI_ERR )
		{
			try
			{
				// если WRITE истина (запись)
				if( WRITE )
				{
					// открываем файл с настройками на запись
					INI_FILE.open( "w" );
				}
				// если WRITE ложь (чтение)
				else
				{
					// если существует файл с настройками
					if( INI_EXISTS )
					{
						// открываем файл с настройками на чтение
						INI_FILE.open( "r" );
					};// if
				};// if-else
			}
			// если была ошибка при обращении к файлу с настройками
			catch( error )
			{
				INI_ERR = true;
			};// try-catch
			// если WRITE истина (запись)
			if( WRITE )
			{
				// проверяем еще раз на всякий случай :)))
				// существует ли файл данных с настройками
				try
				{
					INI_EXISTS = INI_FILE.exists;
				}
				catch( error )
				{
					INI_ERR = true;
				};// try-catch
			};// if
		};// if
		return;
	};// end INI_OPEN
	//
	// подпрограмма закрытия файла с настройками
	function INI_CLOSE()
	{
		// если файл с настройками существует
		if( INI_EXISTS )
		{
			try
			{
				// закрываем файл данных с настройками
				INI_FILE.close();
			}
			// если была ошибка при обращении к файлу с настройками
			catch( error )
			{
				INI_ERR = true;
			};// try-catch
		};// if
		return;
	};// end INI_CLOSE
	//
	// подпрограмма чтения/записи из/в файл/переменные окружения
	// VAR_NAME - имя переменной как строка
	// VAL - значение переменной
	// TYPE - тип переменной
	// DEF - значение по умолчанию (если ошибка чтения/записи)
	function VAR_RW( VAR_NAME, VAL, TYPE, DEF )
	{
		// ВНИМАНИЕ!
		// переменные окружения сохраняют свои значения 
		// только до перезапуска приложения Illustrator! 
		// для постоянного хранения данных они НЕ пригодны!
		//
		// текстовое значение имени для переменной окружения
		var ENV_NAME = the_title + "_" + VAR_NAME;
		// ошибка при обработке значения
		var VAR_ERR = false;
		//
		// подпрограмма преобразования переменной для чтения/записи
		// V - переменная
		function VAL_CONV( V  )
		{
			// подпрограмма преобразования типа переменной
			function TYPE_CONV()
			{
				// преобразованное значение
				var CONV_VAL = undefined;
				// преобразуем значения переменной V
				// строковый тип "string"
				// оставляем как было :)))
				if( TYPE == STR_TYPE ) CONV_VAL = V;
				// целый тип "integer"
				// при записи преобразуем целое значение в строковое 
				// при чтении преобразуем строковое значение в целое
				if( TYPE == INT_TYPE ) CONV_VAL = ( WRITE ) ? ( V.toString() ) : ( parseInt( V ) );
				// логический тип "boolean"
				// при записи преобразуем логические true или false в строковые "1" или "0"
				// при чтении преобразуем строковые "1" или "0" в логические true или false
				if( TYPE == BOOL_TYPE ) CONV_VAL = ( WRITE ) ? ( Number( V ).toString() ) : ( Boolean( parseInt( V ) ) );
				// проверка переменной при чтении
				if( !WRITE )
				{
					// проверяем возможность преобразовать строку в число
					var READ_VAR = STR_FOR_NUM( V );
					// если невозможно преобразовать строку в число тогда ошибка
					if( (READ_VAR === false) || (READ_VAR === "") || isNaN( READ_VAR ) ) VAR_ERR = true;
				};// if
				return CONV_VAL;
			};// end TYPE_CONV
			//
			try
			{
				// преобразуем значение
				V = TYPE_CONV();
			} 
			catch( error ) 
			{
				// если ошибка чтения/записи
				VAR_ERR = true;
			};// try-catch
			// возвращаем значение
			return V;
		};// end VAL_CONV
		//
		// подпрограмма записи переменной окружения
		function SET_ENV()
		{
			try
			{
				// записываем значение в переменную окружения
				$.setenv( ENV_NAME, VAL_CONV( VAL ) );
			} 
			catch( error ) 
			{
				// если ошибка записи
				VAR_ERR = true;
			};// try-catch
			return;
		};// end SET_ENV
		//
		// если запись 
		if( WRITE )
		{
			// если файл с настройками НЕ существует
			if( !INI_EXISTS )
			{
				// записываем значение в переменную окружения
				SET_ENV();
			}
			// если файл с настройками существует
			else
			{
				try
				{
					// записываем значение как строку в файл
					INI_FILE.writeln( VAL_CONV( VAL ) );
				} 
				// если была ошибка
				catch( error ) 
				{
					// записываем значение в переменную окружения
					SET_ENV();
				};// try-catch
			};// if-else
		}
		// если чтение
		else
		{
			// если файл с настройками НЕ существует
			if( !INI_EXISTS )
			{
				try
				{
					// получаем значение из переменной окружения
					// если переменная окружения определена (НЕ null) тогда преобразуем значение
					// если переменная окружения НЕ определена (null) присваиваем значение по умолчанию
					VAL = ( $.getenv( ENV_NAME ) !== null ) ? VAL_CONV( $.getenv( ENV_NAME ) ) : DEF;
				}
				// если была ошибка
				catch( error )
				{
					VAR_ERR = true;
				};// try-catch
			}
			// если файл с настройками существует
			else
			{
				try
				{
					// читаем значение как строку из файла
					VAL = VAL_CONV( INI_FILE.readln() );
				}
				// если была ошибка
				catch( error )
				{
					VAR_ERR = true;
				};// try-catch
			};// if-else
			// если была ошибка при обработке значения на чтении
			if( VAR_ERR )
			{
				// присваиваем значение по умолчанию
				VAL = DEF;
			};// if
		};// if-else
		return VAL;
	};// end VAR_RW
	//
	// подпрограмма присвоения (чтения)  и записи начальных значений 
	function INI_RW()
	{
		// длина метки по вертикали (строка)
		LENGTH_VER_INI = VAR_RW( "LENGTH_VER_INI", LENGTH_VER_INI, STR_TYPE, "5" );// 1
		// длина метки по горизонтали (строка)
		LENGTH_HOR_INI = VAR_RW( "LENGTH_HOR_INI", LENGTH_HOR_INI, STR_TYPE, "5" );// 2
		// отступ метки по вертикали (строка)
		OFFSET_VER_INI = VAR_RW( "OFFSET_VER_INI", OFFSET_VER_INI, STR_TYPE, "2" );// 3
		// отступ метки по горизонтали (строка)
		OFFSET_HOR_INI = VAR_RW( "OFFSET_HOR_INI", OFFSET_HOR_INI, STR_TYPE, "2" );// 4
		// вылет объекта по вертикали (строка)
		BLEED_VER_INI = VAR_RW( "BLEED_VER_INI",  BLEED_VER_INI, STR_TYPE, "0" );// 5
		// вылет объекта по горизонтали (строка)
		BLEED_HOR_INI = VAR_RW( "BLEED_HOR_INI", BLEED_HOR_INI, STR_TYPE, "0" );// 6
		// числовое значение толщины метки (строка)
		SW_NUM_INI = VAR_RW( "SW_NUM_INI", SW_NUM_INI, STR_TYPE, "0.25" );// 7
		// единицы измерения для толщины метки (индекс, число)
		SW_UN_INI = VAR_RW( "SW_UN_INI", SW_UN_INI, INT_TYPE, 2 );// 8
		// построение белого контура (логическое значение)
		W_CONT_INI = VAR_RW( "W_CONT_INI", W_CONT_INI, BOOL_TYPE, false );// 9
		// границы объектов (индекс, число)
		BOUNDS_INI = VAR_RW( "BOUNDS_INI", BOUNDS_INI, INT_TYPE, 0 );// 10
		// группировка после построения меток (индекс, число)
		G_M_INI = VAR_RW( "G_M_INI", G_M_INI, INT_TYPE, 0 );// 11
		// запомнить направления (логическое значение)
		REM_DIR = VAR_RW( "REM_DIR", REM_DIR, BOOL_TYPE, false );// 12
		// направления 13-24
		for( var i = 0; i < N_dir_dial; i++ )
		{
			// логическое значение 
			DIR_INI[i] = VAR_RW( "DIR_INI["+i.toString()+"]", DIR_INI[i], BOOL_TYPE, false );
		};// for
		//
		// если чтение из файла с настройками
		// тогда дополнительная проверка диапазонов дропдаунов
		if( !WRITE )
		{
			// подпрограмма проверки диапазона начального значения для дропдауна
			function DROP_INI( ini, max, def )
			{
				// если начальный индекс не укладывается в заданный диапазон
				// тогда возвращаем значение "по умолчанию"
				if( ( ini < 0 ) || ( ini > max ) ) return def;
				return ini;
			};// end DROP_INI_CHECK
			//
			// границы 
			BOUNDS_INI = DROP_INI( BOUNDS_INI, 1, 0 );
			// единицы для линии
			SW_UN_INI = DROP_INI( SW_UN_INI, 3, 2 );
			// группировка
			G_M_INI = DROP_INI( G_M_INI, 2, 0 );
		};// if
		return;
	};// end INI_RW
	//
	// открываем файл с настройками
	INI_OPEN();
	// собственно чтение/запись настроек для выполнения скрипта
	INI_RW();
	// закрываем файл с настройками
	INI_CLOSE();
	return;
};// end INI_FILE_IO
//
// функция чтения текстового ввода и перевода в число
function TEXT_TO_DIGIT( txt ) 
{
	// получаем строку подготовленную для перевода в число
	var str = STR_FOR_NUM( txt );
	// если ошибка или пустая строка тогда 0
	if( ( str === false ) || ( str === "" ) ) str = ZERO_TEXT;
	// возвращаем числовое значение
	return parseFloat( STR_FOR_NUM( str ) );
};// end TEXT_TO_DIGIT
//
// подпрограмма проверки является ли текстовое значение нулевым
function CHECK_ZERO_TEXT( the_text )
{
	// переводим текстовое значение в числовое
	var VAL = parseFloat( TEXT_TO_DIGIT( the_text ) );
	// если текст преобразуется в ноль или в НЕ-число
	// тогда возвращаем "0" иначе оставляем текст как был
	return ( (VAL == 0.) || isNaN( VAL ) ) ? ZERO_TEXT : the_text;
};// end CHECK_ZERO_TEXT
//
// подпрограмма подготовки строки для перевода в число
function STR_FOR_NUM( S )
{
	// результирующая строка
	var S_OUT = "";
	// количество десятичных точек (запятых)
	var N_C = 0;
	// количество знаков плюс
	var N_P = 0;
	// количество знаков минус
	var N_M = 0;
	// цикл по символам во входной строке
	for( var i = 0; i < S.length; i++ ) 
	{
		// текущий символ
		var S_i = S[i];
		// заменяем запятую на точку
		if( S_i == "," ) S_i = ".";
		// проверяем если символ НЕ цифра, НЕ плюс, НЕ минус, НЕ точка тогда ошибка
		if( ("-+.0123456789").indexOf( S_i ) == -1 ) return false;
		// проверяем количество точек
		if( ( S_i == "." ) && ( ++N_C > 1 ) ) return false;
		// проверяем количество минусов и его позицию в строке
		if( ( S_i == "-" ) && ( ( ++N_M > 1 ) || ( i != 0 ) ) ) return false;
		// проверяем количество плюсов и его позицию в строке
		if( ( S_i == "+" ) && ( ( ++N_P > 1 ) || ( i != 0 ) ) ) return false;
		// формируем результирующую строку
		S_OUT = S_OUT + S_i;
	};// for i
	return S_OUT;
};// end STR_FOR_NUM
//
// подпрограмма создания меток вокруг объекта
function MARKS( BOUNDS_ARR )
{
	// массив габаритов меток для текущего объекта
	var M = new Array( N_dir_dial );
	//
	// подпрограмма присвоения значений массивам размеров меток
	// hor: true - горизонтальные метки (слева и справа), false - вертикальные метки (сверху и снизу)
	function M_SET( hor )
	{
		// начальный индекс чекбокса
		var N = ( hor ) ? ( 0 ) : ( 6 );
		// вылеты
		var BLEED = ( hor ) ? ( -BLEED_VER ) : ( BLEED_HOR );
		// отступы
		var OFFS = ( hor ) ? ( OFFSET_HOR ) : ( OFFSET_VER );
		// длина метки
		var LEN = ( hor ) ? ( LENGTH_HOR ) : ( LENGTH_VER );
		// массив индексов для направлений
		var D = ( hor ) ? [ 1, 3, 1, 3 ] : [ 0, 0, 2, 2 ];
		// массив одинаковых значений позиций меток
		// эти позиции одинаковые для пар меток: лево-право и верх-низ
		var SAME_POS = 
		[
			// если горизонтальные метки: левая верхняя, правая верхняя - верх и низ
			// если вертикальные метки: верхняя левая, нижняя левая - лево и право
			( BOUNDS_ARR[ D[0] ] + BLEED ),
			// если горизонтальные метки: левая центр, правая центр - верх и низ
			// если вертикальные метки: верхняя центр, нижняя центр - лево и право
			GET_CENTER( BOUNDS_ARR[ D[1] ], BOUNDS_ARR[ D[2] ] ),
			// если горизонтальные метки: левая нижняя, правая нижняя - верх и низ
			// если вертикальные метки: верхняя правая, нижняя правая - лево и право
			( BOUNDS_ARR[ D[3] ] - BLEED )
		];
		// массив индексов для направлений
		D = ( hor ) ? [ 1, 3, 0, 2 ] : [ 0, 2, 3, 1 ];
		// количество чекбоксов на каждой стороне
		var N_cb = 3;
		// цикл по чекбоксам
		for( var i = N; i < ( N + N_cb ); i++ )
		{
			// индекс противоположной метки
			var i_N_cb = i + N_cb;
			// описываем элементы массива меток
			// как массивы координат
			M[ i ] = new Array( N_dir );// текущая метка
			M[ i_N_cb ] = new Array( N_dir );// противоположная метка
			// если горизонтальные метки: верх и низ
			// если вертикальные метки: лево и право
			// с одной стороны (слева или снизу)
			M[ i ][ D[ 0 ] ] = M[ i ][ D[ 1 ] ] = 
			// с противоположной стороны (справа или сверху)
			M[ i_N_cb ][ D[ 0 ] ] = M[ i_N_cb ][ D[ 1 ] ] =
			// одинаковые значения
			SAME_POS[ i - N ];
			// если горизонтальные метки: право и лево
			// если вертикальные метки: низ и верх
			// с одной стороны (слева или снизу)
			M[ i ][ D[ 3 ] ] = BOUNDS_ARR[ D[ 2 ] ] - OFFS;
			M[ i ][ D[ 2 ] ] = M[ i ][ D[ 3 ] ] - LEN;
			// с противоположной стороны (справа или сверху)
			M[ i_N_cb ][ D[ 2 ] ] = BOUNDS_ARR[ D[ 3 ] ] + OFFS;
			M[ i_N_cb ][ D[ 3 ] ] = M[ i_N_cb ][ D[ 2 ] ] + LEN;
		};// for
		return;
	};// end M_SET
	//
	//	индексы меток и чекбоксов
	//
	//		9	10	11
	// 	0					3
	//	1					4
	//	2					5
	//		6	7	8
	//
	// определяем координаты горизонтальных меток
	M_SET( true );
	// определяем координаты вертикальных меток
	M_SET( false );
	//
	// цикл по меткам (чекбоксам) вокруг объекта
	for( var m = 0; m < N_dir_dial; m++ )
	{
		// если чекбокс был нажат 
		if( DIR_INI[ m ] )
		{
			// определение из индекса горизонтальная или вертикальная метка
			// индекс для горизонтальных меток ( 0-5) если истина
			// индекс для вертикальных меток ( 6-11) если ложь
			// в данной версии скрипта НЕ используется (резерв)
			// var hor = ( ( m >= 0 ) && ( m <= 5 ) );
			// наложение текущей метки с другими ОБЪЕКТАМИ
			var OVER_OBJ = false;
			// если задан учет наложения ОБЪЕКТОВ
			if( CONS_OVER )
			{
				// цикл по "другим" объектам
				for( var i = 0; i < N_sel; i++ )
				{
					// пропускаем если индекс текущего "другого" объекта совпадает 
					// с индексом проверяемого объекта
					if( i == OBJ_i ) continue;
					// массив габаритов текущего "другого" объекта с учетом отступов и точности
					// точность направлена "внутрь" объекта для того чтобы лучше метка
					// была построена, чем НЕ построена :)))
					var S =
					[
						// левая граница текущего объекта с учетом отступа и точности
						( OBJ_SIZE[i][0] - OFFSET_HOR + PREC_MARKS_OBJ ),
						// верхняя граница текущего объекта с учетом отступа и точности
						( OBJ_SIZE[i][1] + OFFSET_VER - PREC_MARKS_OBJ ),
						// правая граница текущего объекта с учетом отступа и точности
						( OBJ_SIZE[i][2] + OFFSET_HOR - PREC_MARKS_OBJ ),
						// нижняя граница текущего объекта с учетом отступа и точности
						( OBJ_SIZE[i][3] - OFFSET_VER + PREC_MARKS_OBJ )
					];
					// M_m - массив габаритов будущей метки вокруг проверяемого объекта 
					// учитываем точность PREC_MARKS_OBJ для "уменьшения" габаритов метки,
					// чтобы она лучше была бы создана, чем НЕ была создана :)))
					var M_m = 
					[ 
						// левая граница метки с учетом точности
						( M[m][0] + PREC_MARKS_OBJ ), 
						// верхняя граница метки с учетом точности
						( M[m][1] - PREC_MARKS_OBJ ), 
						// правая граница метки с учетом точности
						( M[m][2] - PREC_MARKS_OBJ ), 
						// нижняя граница метки с учетом точности
						( M[m][3] + PREC_MARKS_OBJ ) 
					];
					// проверяем возможность построения метки
					// если невозможно построить метку дальше не проверяем по "другим" объектам
					if( ( OVER_OBJ = OVERLAP( S, M_m ) ) === true ) break;
				};// for i
			};// if CONS_OVER
			// собственно строим (или НЕ строим :))) метку для текущего нажатого чекбокса
			if( !OVER_OBJ ) MAKE_MARK( M[m] );
		};// if DIR_INI[ m ]
	};// for m
	return;
};// end MARKS
// 
// подпрограмма проверки наложения объектов
// A, B - массивы границ проверяемых объектов
function OVERLAP( A, B )
{
	// подпрограмма проверки наложения
	// hor: true - по горизонтали, false - по вертикали
	function OVER( hor )
	{
		// массив индексов для направлений
		// если проверка по горизонтали - лево (0) и право (2)
		// если проверка по вертикали - низ (3) и верх (1)
		var D = ( hor ) ? [ 0, 2 ] : [ 3, 1 ];
		// если левая граница А в ширине B (если нижняя граница А в высоте B)
		if( ( (A[ D[ 0 ] ] >= B[ D[ 0 ] ]) && (A[ D[ 0 ] ] <= B[ D[ 1 ] ]) ) ) return true;
		// если левая граница B в ширине A (если нижняя граница B в высоте A)
		if( ( (B[ D[ 0 ] ] >= A[ D[ 0 ] ]) && (B[ D[ 0 ] ] <= A[ D[ 1 ] ]) ) ) return true;
		// если правая граница А в ширине B (если верхняя граница А в высоте В)
		if( ( (A[ D[ 1 ] ] >= B[ D[ 0 ] ]) && (A[ D[ 1 ] ] <= B[ D[ 1 ] ]) ) ) return true;
		// если правая граница B в ширине A (если верхняя граница B в высоте A)
		if( ( (B[ D[ 1 ] ] >= A[ D[ 0 ] ]) && (B[ D[ 1 ] ] <= A[ D[ 1 ] ]) ) ) return true;
		return false;
	};// end OVER
	//
	// если было наложение по вертикали и горизонтали метку построить невозможно
	if( OVER( true ) && OVER( false ) ) return true;
	return false;
};// end OVERLAP
//
// подпрограмма создания метки
// BOUNDS_ARR - массив размеров новой метки
function MAKE_MARK( BOUNDS_ARR )
{
	// если метка с заданными размерами на "этом" месте создана тогда выход
	if( ALREADY_MADE( BOUNDS_ARR ) ) return;
	// если задан белый контур
	if( W_CONT_INI ) 
	{
		// сначала делаем расширенную "белую" линию (+1 pt)
		var W_L = MAKE_LINE( BOUNDS_ARR, false, (SW_NUM + 1.) );
	};// if
	// собственно делаем линию цветом меток
	var R_L = MAKE_LINE( BOUNDS_ARR, true, SW_NUM );
	// новая метка
	// если задан белый контур тогда метка - группа из "белой" и "цветной" меток
	// если НЕ задан белый контур метка это линия цвета меток
	var the_mark = ( W_CONT_INI ) ? GROUP_OBJ( [ W_L, R_L ] ) : R_L;
	// если задана группировка после создания меток
	if( G_M_INI != 0 )
	{
		// заносим метку в массив сделанных меток
		ALL_MARKS.push( the_mark );
	};// if
	// заносим координаты полученного объекта (метки) в массив
	ALL_MARKS_BOUNDS.push( BOUNDS_ARR );
	return;
};// end MAKE_MARK
//
// подпрограмма создания линии
// BOUNDS_ARR - массив размеров (0=лево, 1=верх, 2=право, 3=низ)
// the_color - цвет обводки
// the_weight - толщина обводки
function MAKE_LINE( BOUNDS_ARR, the_color, the_weight )
{
	try
	{
		// создаем новую линию на выбранном слое
		var the_line = SL.pathItems.add();
		the_line.setEntirePath( [ [BOUNDS_ARR[0], BOUNDS_ARR[3] ], [BOUNDS_ARR[2], BOUNDS_ARR[1] ] ] );
		// имеет обводку
		the_line.stroked = true;
		// НЕ имеет заливки
		the_line.filled = false;
		// НЕ имеет оверпринт
		the_line.strokeOverprint = false;
		// концы линий "обычные"
		the_line.strokeCap = StrokeCap.BUTTENDCAP;
		// НЕТ прозрачности
		the_line.opacity = 100;
		// НЕТ обтекания текста
		the_line.wrapped = false;
		// линия НЕ пунктирная (сплошная)
		the_line.strokeDashes = new Array();
		// присваиваем толщину линии
		the_line.strokeWidth = the_weight;
		// присваиваем цвет линии: цвет меток или "белый"
		the_line.strokeColor = ( the_color ) ? M_COLOR : WHITE;
		return the_line;
	} catch( error ) {};// try-ctach
};// end MAKE_LINE
//
// подпрограмма управления и контроля состояний чекбоксов
// the_arr - массив чекбоксов или значений для чекбоксов
// act - значение
// set: true - установить значение, false - получить значение 
function DIR_STATUS( the_arr, act, set )
{
	// входящий массив - чекбоксы
	var arr_cb = the_arr[0].hasOwnProperty( "value" );
	// цикл по входному массиву
	for( var i = 0; i < the_arr.length; i++ )
	{
		// если присваиваем значение
		if( set ) 
		{
			// чекбоксам
			if( arr_cb ) 
			{
				the_arr[i].value = act;
			}
			// переменным
			else 
			{
				the_arr[i] = act;
			};// if-else
		}
		// если получаем значение 
		else
		{
			// и хотя бы один чекбокс нажат
			// сразу возвращаем истина
			if( the_arr[i].value ) return true;
		};// if-else
	};// for
	return false;
};// end DIR_STATUS
//
// функция чтения текстового ввода в активных единицах и перевода в пункты
// u - активные единицы измерения вида "хх"
// txt - исходное значение
function TEXT_AS_POINTS( txt, u ) 
{
	// значение в пунктах
	var d = parseFloat( UnitValue( TEXT_TO_DIGIT( txt ), u ).as('pt') );
	// если не цифра, обнуляем
	if( isNaN( d ) ) 
	{
		exit_if_bad_input = true;
		d = 0.;
		return;
	};// if
	// возвращаем значение в пунктах
	return d;
};// end TEXT_AS_POINTS
//
// подпрограмма получения индекса активных единиц в документе
function GET_DOC_UNITS_INDEX() 
{
	var AD_units = AD.rulerUnits;
	if( AD_units == RulerUnits.Millimeters ) return 0;
	if( AD_units == RulerUnits.Centimeters ) return 1;
	if( AD_units == RulerUnits.Points ) return 2;
	if( AD_units == RulerUnits.Inches ) return 3;
	return 0;
};// end GET_DOC_UNITS_INDEX
//
// подпрограмма определения является ли значение меньше или равно 0
function LE_ZERO( x ) 
{
	try
	{
		if( x <= 0. ) return true;
	} catch( error ) {};
	return false;
};// end LE_ZERO
//
// подпрограмма проверки создана ли уже метка
// N - массив координат "новой" метки
function ALREADY_MADE( BOUNDS_ARR )
{
	// цикл по массиву сделанных меток
	for( var i = 0; i < ALL_MARKS_BOUNDS.length; i++ )
	{
		try
		{
			// массив границ текущей сделанной метки
			var M = ALL_MARKS_BOUNDS[i];
			// была ли сделана текущая метка
			// начальное присвоение истина потому что дальше идет цикл
			// проверки по направлениям и в нем && (логическое умножение)
			// то есть если хотя бы по одному направлению нет совпадения (ложь)
			// тогда результирующее значение будет ложь - на "этом" месте метка не сделана
			var MADE = true;
			// цикл по направлениям
			for( var dir = 0; dir < N_dir; dir++ )
			{
				// проверяем расхождение координат по текущему направлению
				// если расхождение хотя бы по одному направлению больше тогда считаем
				// что метка на заданном месте НЕ построена
				MADE = ( MADE && ( Math.abs( M[dir] - BOUNDS_ARR[dir] ) <= PREC_MARKS ) );
				// если расхождение хотя бы по одному направлению выход из цикла по направлениям
				// и проверка для следующей сделанной метки
				if( !MADE ) break;
			};// for dir
			// если метка была сделана возвращаем истина
			if( MADE ) return true;
		} catch( error ){};// try-catch
	};// for i
	// если условия не выполнились считаем что метка еще не создана
	return false;
};// end ALREADY_MADE
//
// подпрограмма вычисления центра между координатами
function GET_CENTER( MIN, MAX )
{
	return ( MIN + ( MAX - MIN ) / 2. );
};// end GET_CENTER
//
// подпрограмма присвоения значения переменной
// в зависимости от файловой системы
// W - Windows
// M - Macintosh
function WM( W, M )
{
	return ( WFS ? W : M );
};// end WM
//
// подпрограмма присвоения значения переменной
// в зависимости от версии CS или CC
function CSCC( CS_VAL, CC_VAL )
{
	return ( CC ? CC_VAL : CS_VAL );
};// end CSCC