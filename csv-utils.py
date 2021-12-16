import csv
import json
import pandas as pd
import bson
import datetime
import os
import math

'''
ACTIVAR VENV
en Bash --> "source venv/Scripts/activate" y "deactivate"

dependencias

numpy==1.21.2
pandas==1.3.2
pymongo==3.12.0
'''

'''
INSTRUCCIONES

1. Exportar desde MSAcces a xlsx y de excel a .csv (IMPORTANTE: En Polizas.csv, cambiar a mano campo "id" por "Id" y "Medio de Pago" por "idMPago" y Adaptar nombres de colecciones y campos como en el archivo de tablas limpias. En Asegurados, cambiar "TipoPersona" a "X_TipoPersona" y "RD_TipoPersona" a "TipoPersona")
2. Guardar esos archivos en carpeta "before"
3. Crear Carpeta "middle" (ahi van los csv limpios)
4. Crear Carpeta "after" (ahi van los json)
5. Crear Carpeta "final" (ahi van los json de Asegurados, Cobertura y Polizas con Foreign Keys ya puestas)
6. Ejecutar programa (las ultimas 4 funciones)
7. Los resultados finales quedan en la carpeta "after", salvo x los 3 archivos de la carpeta "final"
8. Para agregar la columna "NombreAsegurado" (para evitar joins complicados en mongo), ejecutar el script pegado abajo

'''

'''
const Polizas = require("./final/Polizas.json");
const Asegurados = require("./final/Asegurados.json");
const fs = require("fs");

const results = Polizas.map(poliza => {
	const asegurado = Asegurados.find(
		asegurado => asegurado._id["$oid"] === poliza.idAsegurado["$oid"]
	);
	let p = poliza;
	if (asegurado) {
		p = {
			...poliza,
			NombreAsegurado: asegurado["Asegurado"]
		};
	}
	return p;
});

fs.writeFileSync("./Polizas.json", JSON.stringify(results), "utf-8");

'''

def clean_csv_columns(csvPath, newCsvPath, deleteColumns=[], keepColumns=[], displayAsInt=[], changeDateFormat=[], dateAux=True):
    data = pd.read_csv(csvPath)
    #newColumns = list(set(data.columns) - set(deleteColumns)) --> changes columns order
    if len(deleteColumns) > 0:
        newColumns = [item for item in data.columns if item not in deleteColumns]
        new_f = data[newColumns]
    elif len(keepColumns) > 0:
        newColumns = [item for item in data.columns if item in keepColumns]
        new_f = data[newColumns]
    else:
        new_f = data
    
    for col in displayAsInt:
        new_f[[col]] = new_f[[col]].fillna(0).astype(int)
        #changes those columns whose values should be ints (by default some are converted to float)
        #returns "SettingWithCopyWarning" but works
    
    for col in changeDateFormat:
        newDates = []
        for i in new_f[col]:
            if dateAux:
                if isinstance(i, str):
                    newDates.append(datetime.datetime.strptime(i, "%m/%d/%Y").strftime("%Y-%m-%d"))
                elif not math.isnan(i):
                    newDates.append(datetime.datetime.strptime(i, "%m/%d/%Y").strftime("%Y-%m-%d"))
                else:
                    newDates.append("")
            else:
                try:
                    if isinstance(i, str):
                        newDates.append(datetime.datetime.strptime(i, "%d-%b-%y").strftime("%Y-%m-%d"))
                    elif not math.isnan(i):
                        newDates.append(datetime.datetime.strptime(i, "%d-%b-%y").strftime("%Y-%m-%d"))
                    else:
                        newDates.append("")
                except ValueError:
                    newDates.append("")
        new_f[col] = newDates
    
    #print(new_f.head())
    new_f.to_csv(newCsvPath, index=False)

#clean_csv_columns('Asegurados.csv', 'asegurados-limpio.csv', ["Capitas", "Siniestros", "TipoPersona", "RD_TipoContacto", "RD_TipoDocumento", "RD_Documento"], ["RD_TipoPersona", "ValorAsegurado"],['FechaRegistro'])

def add_PK_objIds_to_csv(csvPath):
    df = pd.read_csv(csvPath)
    df.insert(0, "_id", [ bson.objectid.ObjectId() for i in range(len(df.index))])
    df.to_csv(csvPath, index=False)

#add_PK_objIds_to_csv('asegurados-limpio.csv')

def csv_to_json(csvPath, jsonPath):
    jsonArray = []
    #read csv file
    with open(csvPath, encoding='utf-8') as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader:
            row["_id"] = {'$oid': row["_id"]}
            for col in row:
                if isinstance(row[col], str):
                    if(row[col].isnumeric() and col != "NroPoliza"):
                        row[col] = int(row[col])   
            for col in row:
                if (str(row[col]).lower() in ["verdadero", "true"]):
                    row[col] = True
                if (str(row[col]).lower() in ["falso", "false"]):
                    row[col] = False

            jsonArray.append(row)

    #convert python jsonArray to JSON String and write to file
    with open(jsonPath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)

#csv_to_json('asegurados-limpio.csv', 'asegurados.json', ["Id", "RD_TipoPersona", "ValorAsegurado"], ["Patrimoniales", "ART"], ["_id"])

def add_FK_objIds_to_json(jsonPath, fkeys):
    #fkeys es un dictionary con {columnaFK : filePath}
    f = open(f'after/{jsonPath}', encoding="utf8")
    data = json.load(f)

    for fk in fkeys:
        aux = open(fkeys[fk], encoding="utf8")
        fkAux = json.load(aux)
        for i in data:
            for j in fkAux:
                if i[fk] == j["Id"]:
                    i[fk] = {'$oid': j["_id"]['$oid']}
        aux.close()
    
    f.close()
    new_f = open(f'final/{jsonPath}', "w+", encoding="utf8")
    json.dump(data, new_f)
    new_f.close()

#add_PK_objIds_to_csv('RD_TipoPersona.csv')
#csv_to_json('RD_TipoPersona.csv', 'RD_TipoPersona.json', ["id"])

#add_FK_objIds_to_json('asegurados copy.json', {'RD_TipoPersona' : 'RD_TipoPersona.json'})

def limpiar():
    clean_csv_columns('before/Asegurados.csv', 'middle/Asegurados.csv', deleteColumns=["Capitas", "Siniestros", "X_TipoPersona", "RD_TipoContacto", "RD_TipoDocumento", "RD_Documento"], displayAsInt=["TipoPersona", "ValorAsegurado"], changeDateFormat=['FechaRegistro'])

    clean_csv_columns('before/Coberturas.csv', 'middle/Coberturas.csv', displayAsInt=["idRiesgo"], changeDateFormat=['Fecha'])

    #IMPORTANTE: cambiar a mano campo "id" por "Id" y "Medio de Pago" por "idMPago"
    clean_csv_columns('before/Polizas.csv', 'middle/Polizas.csv', deleteColumns=["RD_idCompania", "RD_idSeccion", "idSeccion_bak", "idCompania_bak"], displayAsInt=["idAsegurado", "idSeccion", "idCompania", "idProductor", "idVigencia", "Capitas", "MotivoBaja", "idMPago"], changeDateFormat=["FechaRegistro", "FechaSolicitud", "f_Inicio", "f_Vencimiento"],dateAux=False)

    clean_csv_columns('before/Companias.csv', 'middle/Companias.csv', keepColumns=["Id", "Compania"])
    
    clean_csv_columns('before/MediosDePago.csv', 'middle/MediosDePago.csv', keepColumns=["Id", "Descripcion"])
    
    clean_csv_columns('before/Meses.csv', 'middle/Meses.csv', keepColumns=["Id", "Mes"])
    
    clean_csv_columns('before/MotivosBaja.csv', 'middle/MotivosBaja.csv', keepColumns=["Id", "MotivoBaja"])
    
    clean_csv_columns('before/Productores.csv', 'middle/Productores.csv', keepColumns=["Id", "Asegurador", "Matricula"])
            
    clean_csv_columns('before/TiposPersona.csv', 'middle/TiposPersona.csv', keepColumns=["Id", "descripcion"])
    
    clean_csv_columns('before/Riesgos.csv', 'middle/Riesgos.csv', keepColumns=["Id", "Riesgo"])

    clean_csv_columns('before/Secciones.csv', 'middle/Secciones.csv', keepColumns=["Id", "Seccion", "rd_id"])

    clean_csv_columns('before/Vigencias.csv', 'middle/Vigencias.csv', keepColumns=["Id", "Vigencia", "Meses"])
    
    return   

def generarPKs(dir):
    for filename in os.listdir(dir):
        add_PK_objIds_to_csv(f'{dir}/{filename}')

def convertirAJSON(dir):
    for filename in os.listdir(dir):
        csv_to_json(f'{dir}/{filename}', f'after/{filename[:-3]}json')

def generarFKs():
    aseguradosFks = {'TipoPersona' : 'after/TiposPersona.json'}
    coberturaFks = {'idPoliza' : 'after/Polizas.json', 'idRiesgo' : 'after/Riesgos.json'}
    polizasFks = {
        'idAsegurado': 'after/Asegurados.json',
        'idSeccion': 'after/Secciones.json',
        'idCompania': 'after/Companias.json',
        'idProductor': 'after/Productores.json',
        'idVigencia': 'after/Vigencias.json',
        'idMPago': 'after/MediosDePago.json',
        'idSeccion': 'after/Secciones.json',
        'idMotivoBaja': 'after/MotivosBaja.json'
    }
    
    add_FK_objIds_to_json('Asegurados.json', aseguradosFks)
    add_FK_objIds_to_json('Coberturas.json', coberturaFks)
    add_FK_objIds_to_json('Polizas.json', polizasFks)

limpiar()

generarPKs('middle')

convertirAJSON('middle')

generarFKs()