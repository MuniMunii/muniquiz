interface StatusResponsePost{
    errors:ZodErrors
    message:string
    status:boolean
    parseResponse:'Parse Success'
}
interface IssuesProps{
    path:string;
    message:string;
}
interface ZodErrors{
    issues:IssuesProps[]
}
interface ErrorProps{
    message:string,
    error:boolean
}
