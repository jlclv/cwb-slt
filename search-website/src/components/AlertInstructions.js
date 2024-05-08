function AlertInstructions({text}){
    return(
        <div className="ms-5 me-5 alert alert-warning alert-dismissible fade show" role="alert">
            {text}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default AlertInstructions;