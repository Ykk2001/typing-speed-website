const darkTheme={
    label:'Dark',
    background:'black',
    color:'white',
    typeBoxText:'grey'
}

const redTheme={
    label:'Red',
    background:'red',
    color:'purple',
    typeBoxText:'pink'
}
const fledging={
    label:'Fledging',
    background:'#3B363F',
    color:'#D76275',
    typeBoxText:'#8E5568'
}

export const themeOptions=[
    { label:'Dark',value:darkTheme},
    { label:'Red',value:redTheme},
    {label:'Fledging',value:fledging}
]//this label and value i have to keep same as above to use inside Select (react-select)