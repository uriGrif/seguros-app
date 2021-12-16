#!/bin/bash
for file in ./seguros/*;
do
	FILENAME=${file##*/}
	COLLECTION=${FILENAME%.json}
	echo Importando $COLLECTION...
	
	./mongoimport.exe --uri DB_URL --collection $COLLECTION --type json --jsonArray --maintainInsertionOrder --file $file
done