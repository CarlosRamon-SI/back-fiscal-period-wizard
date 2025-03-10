@echo off

set data_hora=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set data_hora=%data_hora: =0%
echo Backup gerado em: %data_hora%
copy /Y ".\database\appJson.db" ".\database\appJson.db.backup_%data_hora%"
echo Backup concluído!
