import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import StartupExample from "../components/StartupExample";

function Match() {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    const [excelData, setExcelData] = useState([]);
    const [startups, setStartups] = useState([]);
    const [startupsCopy, setStartupsCopy] = useState([]);
    const [isDone, setIsDone] = useState(null);

    const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
    const {OpenAI} = require('openai');

    const endpoint = process.env.REACT_APP_search_endpoint;
    const indexName = process.env.REACT_APP_index_name;
    const searchKey = process.env.REACT_APP_search_api_key;
    const openapiKey = process.env.REACT_APP_openapi_key;

    const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(searchKey));
    const openai = new OpenAI({apiKey: openapiKey, dangerouslyAllowBrowser: true});
  
    const XLSX = require("xlsx");

    useEffect(()=>{
        if(startups.length === excelData.length && startups.length !== 0) {
            setIsDone(true)
            console.log(startups)
        }
    }, [startups,startupsCopy,excelData])

    const getEmbeddings = async(query) => {
        const embedding = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: query,
        });
        return(embedding.data[0].embedding)
    }

    const getStartupsVector = async(query) => {
        let startupList = [];
        let n = 1;
        const embedding = await getEmbeddings(query);

        const searchResults = await client.search("*",{
            vectorSearchOptions: {
                queries: [{
                    kind: "vector",
                    fields: ["DescriptionVector"],
                    kNearestNeighborsCount: 3,
                    vector: embedding,
                }],},
            });
        
            for await (const result of searchResults.results) {
                let newStartup = {...result.document}
                newStartup.score = result.score
                const newStartupKeys = Object.fromEntries(
                    Object.entries(newStartup).map(([k, v]) => [`${k}${n}`, v])
                )
                n += 1;
                startupList.push(newStartupKeys)
            }
            return(Object.assign({}, ...startupList))
    }

    const exportToExcelTop3 = () => {
        const worksheet = XLSX.utils.json_to_sheet(startups);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
        saveAs(blob, "Investor-Startup-Top3.xlsx");
    };
    const exportToExcelTop1 = () => {
        const worksheet = XLSX.utils.json_to_sheet(startupsCopy);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
        saveAs(blob, "Investor-Startup-Top1.xlsx");
    };

    const handleFile = (event) => {
        let selectedFile = event.target.files[0];
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if(selectedFile) {
            if(selectedFile && fileTypes.includes(selectedFile.type)){
                console.log(selectedFile)
                setTypeError(null);

                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(event)=>{
                    setExcelFile(event.target.result);
                }
            } else{
                setTypeError("Please upload an excel file.")
                setExcelFile(null);
            }
        } else{
            console.log('Please select your file')
        }
    }

    const handleData = (data) => {
        setStartups([]);
        setStartupsCopy([]);
        data.map((row) => {
            if (["Name","Company","Regions","Stage","Industry"].every(key => Object.keys(row).includes(key))) {
                const qTemp = `A startup in ${row.Regions} in ${(row.Stage.toLowerCase()==="agnostic"?"any":row.Stage)} Stage focusing on ${(row.Industry.toLowerCase()==="agnostic"?"any industry":row.Industry)}`
                getStartupsVector(qTemp).then(startup => {
                    let startupCopy = Object.assign({},startup);
                    const arr = ["StartupID2","StartupID3","Name2","Name3","Location2","Location3","StartupStage2","StartupStage3","score2","score3","Industry2","Industry3","StartupName2","StartupName3"]
                    arr.forEach(
                        (element) =>{ delete startupCopy[element]}
                    )
                    setStartups( startups => [...startups,Object.assign({},row,startup)])
                    setStartupsCopy( startupsCopy => [...startupsCopy,Object.assign({},row,startupCopy)])
                })
            } else{
                setTypeError("Incorrect format. Please follow the format given")
                setExcelFile(null);
            }
        })
    }

    const handleSubmission = async(event) => {
        event.preventDefault();
        if(excelFile !== null){
            const workbook = XLSX.read(excelFile, {type:'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            
            setExcelData(data);
            if (data){
                handleData(data);
            } else {
                setTypeError("Something went wrong. Please try again")
                setExcelFile(null);
            }

        }
    }

    return(
        <div className="wrapper">
            <h2 className="ms-4 mt-4 mb-2">Match startups and investors</h2>
            <p className="ms-4 mb-2">Upload the excel file (.xlsx) to start. Please follow the format below: </p>
            <StartupExample />
            
            <form className="form-group custom-form ms-4 me-4" onSubmit={handleSubmission}>
                <div className="d-flex">
                    <input type="file" className="form-control" required onChange={handleFile} />
                    <button type="submit" className="btn btn-success btn-md ms-2">Upload</button>
                </div>
                {typeError&&(
                    <div className="alert alert-danger mt-2" role="alert">{typeError}</div>
                )}
            </form>
                {isDone&&(
                    <button onClick={exportToExcelTop1} className="btn btn-success btn-md ms-4 mt-2">Top 1 Matches</button>
                )}
                {isDone&&(
                    <button onClick={exportToExcelTop3} className="btn btn-success btn-md ms-2 mt-2">Top 3 Matches</button>
                )}
        </div>
    )
}

export default Match;