lines = []
tables = []
cont = 0

with open('doc_rptObjects.txt', 'r') as f:
    lines = f.readlines()

for l in lines:
    if " Tabla" in l:
        linea = l.replace(' ', '')
        linea = linea.replace('Tabla:', '')
        linea = linea.replace('PÃ¡gina:', '')
        linea = linea[:-2]
        if cont >= 9:
            linea = linea[:-1]
        if linea not in tables:
            tables.append(linea)
        cont += 1

for t in tables:
    print(t)