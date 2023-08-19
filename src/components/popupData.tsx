interface Idata {
    label: string
    data: number
}

interface Iprops {
    data: Idata[]
}

const PopupData: React.FC<Iprops> = ({ data }) => {
    return (
        data.map(p => (
            <p><span className='font-medium'>{p.label}</span> - {p.data}</p>
        ))
    );
}

export default PopupData;