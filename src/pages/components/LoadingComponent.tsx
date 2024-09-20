import Loader from "./Loader/loader"

interface Props{
    loading: boolean
    children: React.ReactNode
}

export default function LoadingComponent({loading, children}: Props){
    return (
        loading ? <div style={{width: "100%", display: "flex", justifyContent: "center"}}><Loader/></div> : children
    )
}