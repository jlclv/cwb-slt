import csv

with open("./files/startups.csv","r") as csvFile, open("startups.txt","w") as txtFile:
    header = ("Name","StartupName","Location","StartupStage","Industry")
    reader = csv.DictReader(csvFile, header)
    writer = csv.writer(txtFile)
    next(reader, None)
    txtFile.write("["+"\n")

    for row in reader: 
        newDict = {"StartupID":reader.line_num-1}
        newDict.update(row)
        newDict["DescriptionVector"] = ""
        
        newDict_location = newDict["Location"]
        newDict_seedstage = newDict["StartupStage"]
        newDict_industry = newDict["Industry"]
        newDict_descvector = f"A startup in {newDict_location} in {newDict_seedstage} Stage focusing on {newDict_industry}"
        toWrite = f"{newDict}"
        startup = toWrite.replace("'DescriptionVector': ''",
                              f"'DescriptionVector': get_embedding('{newDict_descvector}')" )
        txtFile.write(startup + ',\n')
    
    txtFile.write("]")
    
with open ("startups.txt") as file:
    print(file.read())