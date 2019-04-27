echo off
	echo Comienza la creacion de la app
		echo borrando las ultimas versines que se crearon
			del C:\Users\antos\Antonio\reponline\esiApp\esi\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
			del C:\Users\antos\Antonio\reponline\esiApp\esi\platforms\android\app\build\outputs\apk\release\esi.apk
		echo borradas la ultimas versiones que se crearon
		echo creando la release
			ionic cordova build --release android
		echo fin de la creacion de la release
		echo firmando la release
			cd C:\Users\antos\Antonio\reponline\esiApp\esi\platforms\android\app\build\outputs\apk\release
			jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
		echo fin firma release
		echo creando la app
			c:\Users\antos\AppData\Local\Android\Sdk\build-tools\24.0.0\zipalign.exe -v 4 app-release-unsigned.apk esi.apk
		echo fin creando la app
	echo fin firmado de la release
echo Ha finalizado la creacion de la app